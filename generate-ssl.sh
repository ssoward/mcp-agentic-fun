#!/bin/bash

# Enhanced SSL Certificate Generator for MCP Agentic Platform
# Creates properly configured self-signed certificates with SAN (Subject Alternative Names)

SSL_DIR="/home/ec2-user/mcp-agentic-fun/ssl"
CERT_FILE="$SSL_DIR/cert.pem"
KEY_FILE="$SSL_DIR/key.pem"
CONFIG_FILE="$SSL_DIR/openssl.cnf"

# Create SSL directory if it doesn't exist
mkdir -p "$SSL_DIR"

# Create OpenSSL configuration file with proper extensions
cat > "$CONFIG_FILE" << EOF
[req]
default_bits = 4096
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = v3_req

[dn]
C=US
ST=Virginia
L=Amazon
O=MCP Agentic Platform
OU=Development
CN=ec2-3-92-147-210.compute-1.amazonaws.com

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = ec2-3-92-147-210.compute-1.amazonaws.com
DNS.2 = 3.92.147.210
DNS.3 = localhost
IP.1 = 3.92.147.210
IP.2 = 127.0.0.1
EOF

echo "Generating enhanced SSL certificate with Subject Alternative Names..."

# Generate private key
openssl genrsa -out "$KEY_FILE" 4096

# Generate certificate with the configuration
openssl req -new -x509 -key "$KEY_FILE" -out "$CERT_FILE" -days 365 -config "$CONFIG_FILE" -extensions v3_req

# Set proper permissions
chmod 600 "$KEY_FILE"
chmod 644 "$CERT_FILE"

echo "SSL certificate generated successfully!"
echo "Certificate: $CERT_FILE"
echo "Private Key: $KEY_FILE"
echo "Valid for: ec2-3-92-147-210.compute-1.amazonaws.com, 3.92.147.210, localhost"
