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
        echo "Starting UI server with legacy interface..."
        echo "Visit http://localhost:3000/ui.html"
        npm run ui
        ;;
    "ui:enhanced")
        echo "Starting UI server with enhanced interface..."
        echo "Visit http://localhost:3000/ui-enhanced.html"
        npm run ui:enhanced
        ;;
    "ui:advanced")
        echo "Starting UI server with advanced interface..."
        echo "🚀 Advanced UI Features:"
        echo "  - Data Visualization Dashboard"
        echo "  - Visual Workflow Builder"
        echo "  - Real-time Performance Analytics" 
        echo "  - Interactive Tool Configuration"
        echo "  - Toast Notification System"
        echo "  - Advanced Error Handling"
        echo ""
        echo "Visit http://localhost:3000/ui-advanced.html"
        npm run ui:advanced
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
        echo "Starting complete system with advanced UI..."
        if [ ! -f "build/src/index.js" ]; then
            echo "Building first..."
            npm run build
        fi
        echo "MCP Server + Advanced UI Server starting..."
        echo "Advanced UI will be available at http://localhost:3000/ui-advanced.html"
        npm run all
        ;;
    "test")
        echo "Running basic server tests..."
        npm run test
        ;;
    "test:tools")
        echo "Running tool integration tests..."
        npm run test:tools
        ;;
    "test:full")
        echo "Running full comprehensive test suite..."
        npm run test:full
        ;;
    "test:all")
        echo "Running all test suites..."
        echo "📋 Test Coverage:"
        echo "  - Basic server functionality"
        echo "  - Individual tool testing"
        echo "  - Comprehensive integration tests"
        echo "  - Protocol compliance validation"
        npm run test:all
        ;;
    "demo")
        echo "Running enhanced system demo..."
        if [ -f "demo-enhanced.sh" ]; then
            chmod +x demo-enhanced.sh
            ./demo-enhanced.sh
        elif [ -f "demo.sh" ]; then
            chmod +x demo.sh
            ./demo.sh
        else
            echo "No demo script found"
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
        echo "🚀 MCP Agentic Development Platform Commands:"
        echo ""
        echo "Build & Start:"
        echo "  build           - Build the TypeScript project"
        echo "  start           - Start the MCP server"
        echo "  all             - Start both MCP server and advanced UI server"
        echo ""
        echo "User Interfaces:"
        echo "  ui              - Start UI server (legacy interface)"
        echo "  ui:enhanced     - Start UI server (enhanced interface)"
        echo "  ui:advanced     - Start UI server (advanced interface with all features)"
        echo ""
        echo "Clients:"
        echo "  client          - Start the Node.js client"
        echo ""
        echo "Testing:"
        echo "  test            - Run basic server tests"
        echo "  test:tools      - Run tool integration tests"
        echo "  test:full       - Run comprehensive test suite"
        echo "  test:all        - Run all test suites"
        echo ""
        echo "Utilities:"
        echo "  demo            - Run the enhanced system demonstration"
        echo "  clean           - Clean the build directory"
        echo "  help            - Show this help message"
        echo ""
        echo "🎯 Recommended Commands:"
        echo "  ./run.sh ui:advanced    # Start with advanced UI (recommended)"
        echo "  ./run.sh test:all       # Run comprehensive testing"
        echo "  ./run.sh demo           # See full system demonstration"
        echo ""
        echo "🌐 UI Access URLs:"
        echo "  Legacy:    http://localhost:3000/ui.html"
        echo "  Enhanced:  http://localhost:3000/ui-enhanced.html"
        echo "  Advanced:  http://localhost:3000/ui-advanced.html"
        echo ""
        ;;
    *)
        echo "Unknown mode: $MODE"
        echo "Use './run.sh help' for available options"
        exit 1
        ;;
esac
