# Build and Run System Documentation

## Overview

This document describes the comprehensive build and run system for the MCP Agentic Development Platform project, designed to simplify development, testing, and deployment workflows.

## 🔧 System Components

### 1. Main Run Scripts

#### `run.sh` (Unix/Linux/macOS)
A comprehensive bash script that provides unified access to all project operations:

```bash
./run.sh [mode]
```

**Available Modes:**
- `build` - Build the TypeScript project
- `start` - Start the MCP server only
- `ui` - Start the UI server only  
- `client` - Start the Node.js client
- `all` - Start both MCP server and UI server (recommended)
- `test` - Run Jest tests
- `demo` - Run the complete system demonstration
- `clean` - Clean the build directory
- `help` - Show help message

#### `run.bat` (Windows)
Windows batch file equivalent providing the same functionality:

```cmd
run.bat [mode]
```

### 2. Package.json Scripts

The npm scripts are the foundation of the build system:

```json
{
  "scripts": {
    "build": "tsc && chmod 755 build/src/index.js",
    "start": "node build/src/index.js",
    "ui": "node server.cjs",
    "client": "node client.js",
    "all": "npm run build && concurrently \"npm run start\" \"npm run ui\"",
    "test": "jest --passWithNoTests --config jest.config.mjs"
  }
}
```

### 3. TypeScript Configuration

The `tsconfig.json` is configured to:
- Compile TypeScript to JavaScript in `build/` directory
- Preserve source directory structure
- Use ES2022 target with Node16 modules
- Generate executable files with proper permissions

## 🚀 Usage Patterns

### Quick Start (Most Common)
```bash
# Build and run everything
./run.sh all
```
This will:
1. Build the TypeScript project
2. Start the MCP server on stdio
3. Start the UI server on http://localhost:3000/ui.html
4. Display both outputs concurrently

### Development Workflow
```bash
# 1. Clean previous build
./run.sh clean

# 2. Build project
./run.sh build

# 3. Run tests
./run.sh test

# 4. Start complete system
./run.sh all

# 5. Run demonstration
./run.sh demo
```

### Individual Component Testing
```bash
# Test UI only
./run.sh ui

# Test MCP server only  
./run.sh start

# Test Node.js client
./run.sh client
```

## 📁 Build Output Structure

After running `./run.sh build`, the file structure is:

```
build/
├── src/
│   └── index.js          # Main MCP server (executable)
└── test/
    └── server.test.js    # Compiled tests
```

## 🔄 How It All Works Together

### 1. Build Process
- TypeScript compiler (`tsc`) reads `tsconfig.json`
- Compiles `src/index.ts` → `build/src/index.js`
- Sets executable permissions on the output file
- Preserves directory structure from source

### 2. MCP Server (`npm run start`)
- Runs the compiled MCP server at `build/src/index.js`
- Operates over stdio (standard input/output)
- Provides 13 agentic tools via JSON-RPC

### 3. UI Server (`npm run ui`)
- Runs Express server from `server.cjs`
- Serves static files including `ui.html`
- Provides web interface at http://localhost:3000/ui.html
- Enables visual interaction with MCP tools

### 4. Concurrent Mode (`npm run all`)
- Uses `concurrently` package to run both servers
- MCP server handles tool execution
- UI server provides web interface
- Both run simultaneously for full experience

## 🛠️ Advanced Features

### Error Handling
- Build failures are caught and reported
- Missing dependencies trigger warnings
- Invalid modes show help message
- Automatic rebuilding when necessary

### Cross-Platform Support
- Unix shell script for macOS/Linux
- Windows batch file for Windows systems
- Consistent command interface across platforms
- Proper path handling for each OS

### Development Convenience
- Automatic dependency checking
- Smart build detection (only builds when needed)
- Colored output for better readability (in advanced version)
- Comprehensive help system

## 🧪 Testing Integration

### Unit Tests
```bash
./run.sh test
```
- Runs Jest test suite
- Uses `jest.config.mjs` configuration
- Tests all TypeScript components
- Provides coverage reporting

### System Tests
```bash
./run.sh demo
```
- Runs complete system demonstration
- Tests all 13 agentic tools
- Validates web UI functionality
- Checks Python client integration
- Verifies all 7 major extensions

## 🔧 Customization

### Adding New Modes
To add a new mode to the run script:

1. Add case in the `case` statement:
```bash
"newmode")
    echo "Running new mode..."
    # Add your commands here
    ;;
```

2. Update help text to include the new mode

### Modifying Build Process
- Edit `tsconfig.json` for TypeScript compilation options
- Modify `package.json` scripts for build steps
- Update run scripts to reflect any path changes

### Environment Configuration
The system respects standard Node.js environment variables:
- `NODE_ENV` for environment-specific behavior
- `PORT` for server port configuration (if implemented)
- `DEBUG` for debug output (if implemented)

## 📊 Performance Considerations

### Build Time
- TypeScript compilation is typically fast (<5 seconds)
- Incremental builds when only source files change
- Clean builds remove all artifacts for fresh start

### Runtime Performance
- MCP server is lightweight, operates on stdio
- UI server serves static content efficiently
- Concurrent mode allows both to run without blocking

### Resource Usage
- Low memory footprint for both servers
- CPU usage minimal during idle
- Network usage only for UI server (local traffic)

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   ./run.sh clean
   ./run.sh build
   ```

2. **Port Conflicts**
   ```bash
   # Kill existing processes on port 3000
   pkill -f "node.*server"
   ```

3. **Permission Issues**
   ```bash
   chmod +x run.sh
   chmod +x demo.sh
   ```

4. **Missing Dependencies**
   ```bash
   npm install
   ```

### Debug Mode
For detailed debugging, run npm commands directly:
```bash
npm run build 2>&1 | tee build.log
npm run start 2>&1 | tee server.log
```

## 📈 Future Enhancements

Potential improvements to the build system:

1. **Watch Mode**: Automatic rebuilding on source changes
2. **Environment Profiles**: Different configurations for dev/prod
3. **Docker Support**: Containerized deployment options
4. **CI/CD Integration**: GitHub Actions workflow files
5. **Package Management**: Automated dependency updates
6. **Performance Monitoring**: Build time and runtime metrics

---

This build and run system provides a robust, user-friendly foundation for developing and operating the MCP Agentic Development Platform project across different platforms and use cases.
