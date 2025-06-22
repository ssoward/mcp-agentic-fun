#!/bin/bash

# SSL Certificate Setup Script for MCP Agentic Platform
# This script generates self-signed SSL certificates for development/testing

echo "Setting up SSL certificates for MCP Agentic Platform..."

# Create SSL directories if they don't exist
sudo mkdir -p /etc/ssl/private
sudo mkdir -p /etc/ssl/certs

# Generate private key
echo "Generating private key..."
sudo openssl genrsa -out /etc/ssl/private/server.key 2048

# Generate certificate signing request
echo "Generating certificate signing request..."
sudo openssl req -new -key /etc/ssl/private/server.key -out /tmp/server.csr -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=3.92.147.210"

# Generate self-signed certificate (valid for 365 days)
echo "Generating self-signed certificate..."
sudo openssl x509 -req -days 365 -in /tmp/server.csr -signkey /etc/ssl/private/server.key -out /etc/ssl/certs/server.crt

# Set appropriate permissions
sudo chmod 600 /etc/ssl/private/server.key
sudo chmod 644 /etc/ssl/certs/server.crt

# Clean up temporary files
sudo rm /tmp/server.csr

echo "SSL certificates have been generated successfully!"
echo "Private key: /etc/ssl/private/server.key"
echo "Certificate: /etc/ssl/certs/server.crt"
echo ""
echo "Note: These are self-signed certificates for development use."
echo "For production, consider using certificates from a trusted CA like Let's Encrypt."
