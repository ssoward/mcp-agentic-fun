#!/bin/bash
# Simple build and run script for MCP Agentic Development Platform

echo "MCP Agentic Development Platform - Build and Run Script"
echo "======================================"

# Check command line argument
MODE=${1:-help}

case $MODE in
    "build")
        echo "Building project..."
        npm run build
        echo "Build complete!"
        ;;
    "start")
        echo "Starting MCP server..."
        if [ ! -f "build/src/index.js" ]; then
            echo "Building first..."
            npm run build
        fi
        npm run start
        ;;
    "ui")
        echo "Starting UI server..."
        echo "Visit http://localhost:3000/ui.html"
        npm run ui
        ;;
    "client")
        echo "Starting Node.js client..."
        if [ ! -f "build/src/index.js" ]; then
            echo "Building first..."
            npm run build
        fi
        npm run client
        ;;
    "all")
        echo "Starting complete system..."
        if [ ! -f "build/src/index.js" ]; then
            echo "Building first..."
            npm run build
        fi
        echo "MCP Server + UI Server starting..."
        echo "UI will be available at http://localhost:3000/ui.html"
        npm run all
        ;;
    "test")
        echo "Running tests..."
        npm test
        ;;
    "demo")
        echo "Running system demo..."
        if [ -f "demo.sh" ]; then
            chmod +x demo.sh
            ./demo.sh
        else
            echo "demo.sh not found"
        fi
        ;;
    "clean")
        echo "Cleaning build directory..."
        rm -rf build/
        echo "Clean complete!"
        ;;
    "help")
        echo ""
        echo "Usage: ./run.sh [mode]"
        echo ""
        echo "Available modes:"
        echo "  build     - Build the TypeScript project"
        echo "  start     - Start the MCP server"
        echo "  ui        - Start the UI server"
        echo "  client    - Start the Node.js client"
        echo "  all       - Start both MCP server and UI server"
        echo "  test      - Run Jest tests"
        echo "  demo      - Run the complete system demonstration"
        echo "  clean     - Clean the build directory"
        echo "  help      - Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./run.sh build    # Build the project"
        echo "  ./run.sh ui       # Start UI server"
        echo "  ./run.sh all      # Start complete system"
        echo "  ./run.sh demo     # Run demonstration"
        echo ""
        ;;
    *)
        echo "Unknown mode: $MODE"
        echo "Use './run.sh help' for available options"
        exit 1
        ;;
esac
