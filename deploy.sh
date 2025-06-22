#!/bin/bash
# Production Deployment Script for MCP Agentic Development Platform
# This script handles building, testing, and deploying the complete platform

set -e  # Exit on any error

echo "🚀 MCP Agentic Development Platform - Production Deployment"
echo "============================================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        log_warning "Node.js version $NODE_VERSION detected. Recommended version is 18+."
    fi
    
    log_success "Prerequisites check completed"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm install
    log_success "Dependencies installed successfully"
}

# Build the project
build_project() {
    log_info "Building TypeScript project..."
    npm run build
    
    if [ ! -f "build/src/index.js" ]; then
        log_error "Build failed - output file not found"
        exit 1
    fi
    
    log_success "Project built successfully"
}

# Run comprehensive tests
run_tests() {
    log_info "Running comprehensive test suite..."
    
    echo ""
    log_info "Step 1/3: Basic server tests..."
    npm run test
    
    echo ""
    log_info "Step 2/3: Tool integration tests..."
    npm run test:tools
    
    echo ""
    log_info "Step 3/3: Full comprehensive tests..."
    npm run test:full
    
    log_success "All tests completed successfully"
}

# Validate deployment
validate_deployment() {
    log_info "Validating deployment files..."
    
    # Check required files
    REQUIRED_FILES=(
        "build/src/index.js"
        "server.cjs"
        "ui.html"
        "ui-enhanced.html"
        "ui-advanced.html"
        "package.json"
    )
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            log_error "Required file missing: $file"
            exit 1
        fi
    done
    
    # Check test files
    TEST_FILES=(
        "test/simple-test.cjs"
        "test/tool-integration-tests.cjs"
        "test/full-tool-test-suite.cjs"
    )
    
    for file in "${TEST_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            log_warning "Test file missing: $file"
        fi
    done
    
    log_success "Deployment validation completed"
}

# Create deployment package
create_package() {
    log_info "Creating deployment package..."
    
    PACKAGE_NAME="mcp-agentic-platform-$(date +%Y%m%d-%H%M%S)"
    PACKAGE_DIR="dist/$PACKAGE_NAME"
    
    # Create package directory
    mkdir -p "$PACKAGE_DIR"
    
    # Copy essential files
    cp -r build/ "$PACKAGE_DIR/"
    cp server.cjs "$PACKAGE_DIR/"
    cp ui.html "$PACKAGE_DIR/"
    cp ui-enhanced.html "$PACKAGE_DIR/"
    cp ui-advanced.html "$PACKAGE_DIR/"
    cp package.json "$PACKAGE_DIR/"
    cp README.md "$PACKAGE_DIR/"
    cp PROJECT_DESCRIPTION.md "$PACKAGE_DIR/"
    
    # Copy test files if they exist
    if [ -d "test" ]; then
        cp -r test/ "$PACKAGE_DIR/"
    fi
    
    # Create run scripts
    cat > "$PACKAGE_DIR/start.sh" << 'EOF'
#!/bin/bash
echo "Starting MCP Agentic Development Platform..."
echo "Advanced UI will be available at http://localhost:3000/ui-advanced.html"
node server.cjs
EOF
    
    cat > "$PACKAGE_DIR/start.bat" << 'EOF'
@echo off
echo Starting MCP Agentic Development Platform...
echo Advanced UI will be available at http://localhost:3000/ui-advanced.html
node server.cjs
EOF
    
    # Make scripts executable
    chmod +x "$PACKAGE_DIR/start.sh"
    
    # Create deployment info
    cat > "$PACKAGE_DIR/DEPLOYMENT_INFO.md" << EOF
# MCP Agentic Development Platform - Deployment Package

**Package Created:** $(date)
**Version:** $(npm pkg get version | tr -d '"')
**Platform:** $(uname -s) $(uname -m)

## Quick Start

### Unix/Linux/macOS:
\`\`\`bash
./start.sh
\`\`\`

### Windows:
\`\`\`cmd
start.bat
\`\`\`

## Access URLs

- **Advanced UI (Recommended):** http://localhost:3000/ui-advanced.html
- **Enhanced UI:** http://localhost:3000/ui-enhanced.html  
- **Legacy UI:** http://localhost:3000/ui.html

## Features Included

✅ Advanced Data Visualization Dashboard
✅ Visual Workflow Builder with Drag & Drop
✅ Real-time Performance Analytics
✅ Interactive Tool Configuration System
✅ Toast Notification System
✅ Advanced Error Handling & Recovery
✅ 13 MCP Agentic Tools
✅ Comprehensive Testing Suite

## Testing

Run tests with:
\`\`\`bash
npm run test:all
\`\`\`

## Documentation

See PROJECT_DESCRIPTION.md for complete technical details.
EOF
    
    # Create archive
    tar -czf "dist/$PACKAGE_NAME.tar.gz" -C "dist" "$PACKAGE_NAME"
    
    log_success "Deployment package created: dist/$PACKAGE_NAME.tar.gz"
    echo ""
    echo "📦 Package Contents:"
    echo "   - Complete built application"
    echo "   - All UI variants (Legacy, Enhanced, Advanced)"
    echo "   - Testing suite"
    echo "   - Cross-platform start scripts"
    echo "   - Documentation"
    echo ""
}

# Main deployment flow
main() {
    echo ""
    DEPLOY_MODE=${1:-full}
    
    case $DEPLOY_MODE in
        "quick")
            log_info "Quick deployment mode (skip tests)"
            check_prerequisites
            install_dependencies
            build_project
            validate_deployment
            log_success "Quick deployment completed"
            ;;
        "test-only")
            log_info "Test-only mode"
            run_tests
            ;;
        "package")
            log_info "Package creation mode"
            validate_deployment
            create_package
            ;;
        "full"|*)
            log_info "Full deployment mode"
            check_prerequisites
            install_dependencies
            build_project
            run_tests
            validate_deployment
            create_package
            ;;
    esac
    
    echo ""
    log_success "🎉 MCP Agentic Development Platform deployment completed!"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Start the server: ./run.sh ui:advanced"
    echo "   2. Open: http://localhost:3000/ui-advanced.html"
    echo "   3. Explore the advanced features and tools"
    echo ""
    echo "📋 Available Commands:"
    echo "   ./run.sh help        # See all available commands"
    echo "   ./run.sh test:all    # Run comprehensive tests"
    echo "   ./run.sh demo        # See guided demonstration"
    echo ""
}

# Show usage if help requested
if [ "$1" = "help" ] || [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo ""
    echo "Usage: ./deploy.sh [mode]"
    echo ""
    echo "Deployment Modes:"
    echo "  full      - Complete deployment with tests (default)"
    echo "  quick     - Fast deployment without tests"
    echo "  test-only - Run tests only"
    echo "  package   - Create deployment package only"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh           # Full deployment"
    echo "  ./deploy.sh quick     # Quick deployment"
    echo "  ./deploy.sh test-only # Test existing build"
    echo "  ./deploy.sh package   # Create distribution package"
    echo ""
    exit 0
fi

# Run main deployment
main "$@"
