# Quick Start Guide - MCP Agentic Development Platform

This guide will help you quickly build and run the MCP Agentic Development Platform project.

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **Python 3** (for Python client, optional)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build and Run
Use the provided run script for easy management:

**On macOS/Linux:**
```bash
./run.sh all
```

**On Windows:**
```cmd
run.bat all
```

This will:
- Build the TypeScript project
- Start the MCP server
- Start the UI server at http://localhost:3000/ui.html

## 📋 Available Commands

### Build Commands
```bash
# Build the project
./run.sh build

# Clean build directory
./run.sh clean
```

### Run Commands
```bash
# Start only the MCP server
./run.sh start

# Start only the UI server
./run.sh ui

# Start both (recommended for full experience)
./run.sh all

# Start Node.js client for testing
./run.sh client
```

### Testing Commands
```bash
# Run Jest tests
./run.sh test

# Run complete system demonstration
./run.sh demo
```

## 🌐 Web Interface

Once running with `./run.sh all` or `./run.sh ui`, visit:
**http://localhost:3000/ui.html**

The web interface provides:
- Interactive tool testing
- Dynamic system diagrams
- Real-time tool execution
- Visual workflow representation

## 🔧 Manual npm Commands

If you prefer using npm directly:

```bash
# Build project
npm run build

# Start MCP server only
npm run start

# Start UI server only
npm run ui

# Start both servers
npm run all

# Run tests
npm test
```

## 🐍 Python Client (Optional)

If you want to use the Python client:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Python client
python3 client.py
```

## 📁 Project Structure

```
├── src/                    # TypeScript source code
├── build/                  # Compiled JavaScript output
├── ui.html                 # Web interface
├── server.cjs             # UI server
├── client.js              # Node.js client
├── client.py              # Python client
├── run.sh                 # Unix/Linux/macOS run script
├── run.bat                # Windows run script
└── demo.sh                # System demonstration
```

## 🛠️ Development Workflow

1. **Make changes** to TypeScript files in `src/`
2. **Build** with `./run.sh build`
3. **Test** with `./run.sh test`
4. **Run** with `./run.sh all`
5. **Demo** with `./run.sh demo`

## 🎯 What's Included

The MCP Agentic Development Platform system includes:

- **13 Agentic Tools** for various operations
- **Dynamic Web UI** with interactive diagrams
- **Multi-language Clients** (Node.js + Python)
- **Complete Documentation** and examples
- **Automated Testing** with Jest
- **Cross-platform Scripts** for easy operation

## 🆘 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
./run.sh clean
./run.sh build
```

### Port Conflicts
If port 3000 is in use, kill existing processes:
```bash
# Find processes using port 3000
lsof -i :3000

# Kill process by PID
kill -9 <PID>
```

### Permission Issues (macOS/Linux)
```bash
# Make scripts executable
chmod +x run.sh
chmod +x demo.sh
```

## 📚 Next Steps

1. Visit the web interface at http://localhost:3000/ui.html
2. Try the interactive tool demos
3. Explore the dynamic system diagrams
4. Run the complete system demonstration: `./run.sh demo`
5. Check out the main README.md for detailed documentation

---

**Happy coding! 🎉**
