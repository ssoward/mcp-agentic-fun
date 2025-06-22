#!/bin/bash

# Deployment script for MCP Agentic Platform with SSL on ports 80/443
# This script deploys the updated server to EC2 with SSL support

EC2_IP="3.92.147.210"
EC2_USER="ec2-user"
KEY_PATH="/Users/ssoward/.ssh/MCPAgentic.pem"

echo "Deploying MCP Agentic Platform with SSL to EC2..."

# Copy updated files to EC2
echo "Copying updated server files..."
scp -i "$KEY_PATH" server.cjs setup-ssl.sh "$EC2_USER@$EC2_IP:/home/ec2-user/"

# Connect to EC2 and perform deployment
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_IP" << 'EOF'
echo "Setting up SSL certificates..."
chmod +x setup-ssl.sh
./setup-ssl.sh

echo "Stopping existing server (if running)..."
sudo pkill -f "node.*server.cjs" || true

echo "Starting server on ports 80/443 with SSL..."
cd /home/ec2-user
sudo node server.cjs &

echo "Server started. Checking if it's running..."
sleep 3
if sudo netstat -tlnp | grep -E ':80|:443'; then
    echo "✅ Server is running on ports 80/443"
else
    echo "❌ Server may not be running properly"
fi

echo "Deployment complete!"
echo "HTTP:  http://3.92.147.210/ui-advanced.html"
echo "HTTPS: https://3.92.147.210/ui-advanced.html"
echo ""
echo "Note: HTTPS will show a security warning due to self-signed certificate."
echo "Click 'Advanced' -> 'Proceed to site' to continue."
EOF

echo "Deployment script completed!"
