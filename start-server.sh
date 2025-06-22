#!/bin/bash

# MCP Agentic Development Platform Startup Script
# This script starts the server with proper permissions for ports 80 and 443

echo "Starting MCP Agentic Development Platform..."

# Kill any existing server processes
pkill -f 'node server.cjs' || true

# Wait a moment for processes to terminate
sleep 2

# Start the server with sudo (required for ports 80 and 443)
sudo node server.cjs

echo "Server started successfully!"
