# MCP Agentic Development Platform - Advanced Agentic System

A comprehensive demonstration of the Model Context Protocol (MCP) with advanced agentic capabilities, featuring multiple UI tiers, comprehensive testing, and 13 powerful tools with toast notification system.

## 🚀 Overview

This project showcases a fully-featured MCP server implementation with extensive agentic capabilities:

- **13 Agentic Tools** across Weather, News, Finance, Workflow, Memory, Tasks, Monitoring, and AI categories
- **Advanced Multi-Tier UI System** with Legacy, Enhanced, and Advanced interfaces
- **Real-time Data Visualization** with interactive charts and analytics
- **Visual Workflow Builder** with drag-and-drop functionality
- **Toast Notification System** replacing console messages with elegant slide-in notifications
- **Comprehensive Testing Suite** with 100% tool coverage
- **Multiple Client Interfaces** (Web UI, CLI, Python)
- **Production-Ready Deployment** with automated build and deploy scripts

## 🎨 Advanced UI System

### Three-Tier Architecture

**🔧 Legacy UI** (`ui.html`)
- Basic tool testing interface
- Simple form-based interactions
- Foundation for advanced features

**⚡ Enhanced UI** (`ui-enhanced.html`)
- Modern responsive design
- Interactive tool playground
- Performance monitoring dashboard
- Basic workflow visualization

**🚀 Advanced UI** (`ui-advanced.html`) - **Latest & Recommended**
- ✅ **Advanced Data Visualization Dashboard** - Real-time metrics and interactive charts
- ✅ **Enhanced Workflow Builder** - Drag-and-drop interface with visual tool chaining
- ✅ **Real-time Performance Analytics** - Live monitoring with error tracking
- ✅ **Interactive Tool Configuration System** - Dynamic presets and validation
- ✅ **Toast Notification System** - Elegant slide-in notifications with auto-dismiss
- ✅ **Advanced Error Handling & Recovery** - Comprehensive error management

## 📋 Complete Feature Set

### 🛠️ Advanced Tool Categories

**Weather Intelligence**
- **get-alerts** - State weather alerts and warnings
- **get-forecast** - Coordinate-based weather forecasting
- **get-state-forecast-summary** - State-wide weather summaries

**News & Information**
- **get-news-headlines** - Latest news with category filtering

**Financial Data**
- **get-stock-price** - Real-time stock market information

**Workflow Orchestration**
- **plan-trip** - Multi-step travel planning workflows

**Agent Memory System**
- **remember-preference** / **recall-preference** - Persistent agent memory

**Task Management**
- **long-task** - Background process simulation and monitoring

**System Monitoring**
- **get-logs** - Comprehensive logging and system observability

**AI Integration**
- **llm-summarize** - Text summarization capabilities
### 🎯 Advanced Testing Infrastructure

**Comprehensive Testing Suite** replacing Jest with lightweight Node.js runners:
- **Basic Server Tests** - Core functionality validation
- **Tool Integration Tests** - Individual tool testing with success rate tracking
- **Full Test Suite** - Comprehensive testing of all 13 tools
- **Protocol Compliance** - MCP protocol validation
- **100% Tool Coverage** - Every tool tested and validated

### 🚀 Production Deployment

**Complete Deployment System**:
- **Automated Build Scripts** - TypeScript compilation and validation
- **Cross-platform Support** - Unix/Linux/macOS and Windows compatibility
- **Package Creation** - Ready-to-deploy packages with documentation
- **Health Monitoring** - Built-in system monitoring and analytics

## 🛠️ Available Tools

| Tool | Category | Description | Features |
|------|----------|-------------|----------|
| `get-alerts` | Weather | State weather alerts | Real-time warnings |
| `get-forecast` | Weather | Coordinate weather forecasts | Multi-day predictions |
| `get-state-forecast-summary` | Weather | State forecast summaries | Combined data analysis |
| `get-news-headlines` | News | Latest news headlines | Category filtering |
| `get-stock-price` | Finance | Real-time stock prices | Market data integration |
| `plan-trip` | Workflow | Multi-step trip planning | Weather + news + finance |
| `remember-preference` | Memory | Store user preferences | Persistent agent memory |
| `recall-preference` | Memory | Retrieve preferences | Stateful interactions |
| `long-task` | Tasks | Long-running processes | Background execution |
| `get-logs` | Monitoring | System logs and metrics | Observability |
| `llm-summarize` | AI | Text summarization | LLM integration |
| `multi-agent-demo` | AI | Multi-agent collaboration | Advanced patterns |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm (comes with Node.js) 
- npm or yarn
- Optional: Python 3.8+ for Python client

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd MCP-Agentic-Fun
   npm install
   ```

### 🎯 One-Command Setup

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd mcp-agentic-fun
   npm install
   ```

2. **Deploy and start (recommended):**
   ```bash
   ./deploy.sh           # Full deployment with testing
   ./run.sh ui:advanced  # Start with advanced UI
   ```

3. **Access the Advanced UI:**
   ```
   🚀 Advanced UI: http://localhost:3000/ui-advanced.html
   ```

### �️ Alternative Setup

For manual setup:

1. **Build the TypeScript code:**
   ```bash
   npm run build
   ```

2. **Start with advanced UI:**
   ```bash
   ./run.sh ui:advanced
   # Or: npm run ui:advanced
   ```

## �💻 Client Usage

### 🌟 Advanced Web UI (Recommended)
The advanced web interface provides the complete experience:

```bash
./run.sh ui:advanced
# Open http://localhost:3000/ui-advanced.html
```

**Advanced Features:**
- 📊 **Real-time Dashboard** - Live metrics and system health
- 🔧 **Visual Workflow Builder** - Drag-and-drop tool composition
- 📈 **Performance Analytics** - Charts and monitoring
- ⚙️ **Interactive Configuration** - Tool presets and validation
- 🔔 **Toast Notifications** - Elegant slide-in messages
- 🛠️ **Advanced Error Handling** - Recovery and diagnostics

### 🎨 UI Options

| UI Tier | URL | Features |
|---------|-----|----------|
| **Advanced** | `/ui-advanced.html` | All features, recommended for production |
| **Enhanced** | `/ui-enhanced.html` | Modern design, basic analytics |
| **Legacy** | `/ui.html` | Simple interface, basic testing |
### 🧪 Node.js CLI Client
Direct command-line access:

```bash
# List available tools
node client.js --list

# Call a specific tool
node client.js --tool get-alerts --args '{"state": "CA"}'

# Interactive mode
node client.js --interactive
```

### 🐍 Python Client
Cross-language support with enhanced features:

```bash
# Install optional dependencies
pip install -r requirements.txt

# Interactive mode (recommended)
python client.py --interactive

# List tools
python client.py --list

# Call a tool
python client.py --tool plan-trip --args '{"destination": "Paris", "date": "2025-06-01"}'

# Quick calls in interactive mode
mcp> call get-alerts state=CA
mcp> call plan-trip destination=Tokyo date=2025-07-15
mcp> call remember-preference key=city value=SF
```

## 🧪 Testing & Validation

### Comprehensive Testing Suite

```bash
# Run all tests (recommended)
npm run test:all

# Individual test suites
npm run test        # Basic server functionality
npm run test:tools  # Tool integration tests  
npm run test:full   # Comprehensive tool testing
```

### Testing Features

- ✅ **100% Tool Coverage** - All 13 tools tested
- ✅ **Protocol Compliance** - MCP standard validation
- ✅ **Success Rate Tracking** - Performance monitoring
- ✅ **Timeout Handling** - External API resilience
- ✅ **Error Scenarios** - Comprehensive error testing

### Test Results

```
📊 Test Results Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Tests: 13 tools
Success Rate: 100% (protocol compliance)
Coverage: All categories (Weather, News, Finance, AI, etc.)
```

## 🔧 Tool Examples

### Basic Tools
```bash
# Weather alerts
{"tool": "get-alerts", "args": {"state": "CA"}}

# Weather forecast  
{"tool": "get-forecast", "args": {"latitude": 34.05, "longitude": -118.25}}
```

### Agentic Workflows
```bash
# Multi-step trip planning
{"tool": "plan-trip", "args": {"destination": "Tokyo", "date": "2025-07-15"}}

# Tool chaining
{"tool": "chain-tools", "args": {"first": "get-alerts", "second": "get-forecast", "args": {"state": "NY"}}}
```

### Stateful Operations
```bash
# Store preferences
{"tool": "remember-preference", "args": {"key": "favorite_city", "value": "San Francisco"}}

# Recall preferences
{"tool": "recall-preference", "args": {"key": "favorite_city"}}
```

### Advanced Features
```bash
# LLM text summarization
{"tool": "llm-summarize", "args": {"text": "Long article text here..."}}

# Multi-agent collaboration
{"tool": "multi-agent-demo", "args": {}}

# Long-running task
{"tool": "long-task", "args": {"seconds": 10}}
```

## 🏗️ Architecture

### System Components

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Web UI    │    │  Node CLI   │    │ Python CLI  │
│  (Enhanced) │    │   Client    │    │   Client    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
              ┌─────────────▼─────────────┐
              │     Node.js Backend       │
              │   (Express + Proxy)       │
              └─────────────┬─────────────┘
                           │
              ┌─────────────▼─────────────┐
              │      MCP Server           │
              │   (TypeScript/Node.js)    │
              └─────────────┬─────────────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
┌──────▼──────┐ ┌─────────▼─────────┐ ┌───────▼───────┐
│ Agentic     │ │   Stateful        │ │  Monitoring   │
│ Tools &     │ │   Agents &        │ │     &         │
│ Workflows   │ │ Long Tasks        │ │ Observability │
└─────────────┘ └───────────────────┘ └───────────────┘
```

### Data Flow

1. **Client Request** → Express proxy server
2. **MCP Initialization** → Spawn MCP server process
3. **Tool Execution** → Process with argument validation
4. **Result Processing** → JSON-RPC response
5. **Client Response** → Formatted output with history tracking

## 🔍 Development

### Project Structure
```
MCP-Agentic-Fun/
├── src/
│   └── index.ts          # Main MCP server implementation
├── build/
│   └── src/
│       └── index.js      # Compiled JavaScript
├── client.js             # Node.js CLI client
├── client.py             # Python CLI client  
├── server.cjs            # Express proxy server
├── ui.html               # Enhanced web interface
├── requirements.txt      # Python dependencies
└── README.md            # This documentation
```

### Adding New Tools

1. **Define the tool in `src/index.ts`:**
```typescript
server.tool(
  "my-new-tool",
  "Description of what this tool does",
  {
    param1: z.string().describe("Parameter description"),
    param2: z.number().min(0).max(100)
  },
  async ({ param1, param2 }) => {
    // Tool implementation
    return { content: [{ type: "text", text: "Result" }] };
  }
);
```

2. **Build and test:**
```bash
npm run build
npm test
```

3. **Update UI (optional):**
Add your tool to the selector in `ui.html`

### Testing

```bash
# Run all tests
npm test

# Test specific tool directly
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"1.0","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"your-tool","arguments":{"param":"value"}}}' | node build/src/index.js
```

## 🧪 Testing

This project includes a comprehensive testing suite with **100% tool coverage**:

```bash
# Run basic functionality tests
npm run test

# Test all 13 individual tools
npm run test:tools

# Run comprehensive full system tests
npm run test:full

# Run complete test suite
npm run test:all
```

### Test Results Summary
✅ **13/13 tools tested and validated**  
✅ **100% MCP protocol compliance**  
✅ **Agent memory persistence working**  
✅ **Complex workflows executing successfully**  
✅ **External API integration functioning**  

## 🔗 MCP Integration

### VS Code Integration
Configure in `.vscode/mcp.json`:
```json
{
  "servers": {
    "weather-agentic": {
      "command": "node",
      "args": ["build/src/index.js"],
      "cwd": "/path/to/MCP-Agentic-Fun"
    }
  }
}
```

### Claude Desktop Integration
Add to Claude Desktop configuration:
```json
{
  "mcpServers": {
    "weather-agentic": {
      "command": "node", 
      "args": ["build/src/index.js"],
      "cwd": "/path/to/MCP-Agentic-Fun"
    }
  }
}
```

## 🎯 Use Cases

### Personal Assistant
- Weather planning with alerts and forecasts
- Trip planning with multiple data sources
- News monitoring for specific topics
- Financial tracking with stock prices

### Development & Testing
- MCP protocol demonstration
- Tool chaining and composition examples
- Multi-agent system prototyping
- Long-running task simulation

### Educational
- Learn MCP protocol implementation
- Understand agentic system design
- Practice tool orchestration
- Explore stateful agent patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-tool`
3. Add your tool following the existing patterns
4. Include tests and documentation
5. Submit a pull request

## 📚 Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io/llms-full.txt)
- [MCP Python SDK](https://github.com/modelcontextprotocol/create-python-server)
- [TypeScript MCP SDK](https://github.com/modelcontextprotocol/sdk)
- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)

## 📄 License

MIT License - see LICENSE file for details.

## 🎉 Acknowledgments

- Model Context Protocol team for the excellent SDK
- National Weather Service for the free weather API
- Contributors and testers

---

**Ready to explore agentic systems?** Start with the Web UI at `http://localhost:3000/ui.html` and try the `plan-trip` tool! 🚀

You can use the included `client.js` script to interact with your MCP server directly from the terminal.

### Usage

1. Build the project if you haven’t already:
   ```sh
   npm run build
   ```
2. Run the client with a tool name and JSON arguments:
   ```sh
   node client.js <tool> '<json-args>'
   ```
   Examples:
   - Get alerts for California:
     ```sh
     node client.js get-alerts '{"state":"CA"}'
     ```
   - Get forecast for Los Angeles:
     ```sh
     node client.js get-forecast '{"latitude":34.05,"longitude":-118.25}'
     ```
   - Get advanced state forecast summary for New York:
     ```sh
     node client.js get-state-forecast-summary '{"state":"NY"}'
     ```

The client will print the tool result to the terminal.

## References
- MCP SDK: https://github.com/modelcontextprotocol/sdk
- MCP Protocol: https://modelcontextprotocol.io/llms-full.txt

---

For more details, see the comments in the code and the `.github/copilot-instructions.md` file.

## 🎨 Enhanced Web UI

**NEW!** Experience our completely redesigned web interface with modern UX and advanced features:

```bash
# Start the enhanced UI
npm run build
npm run ui

# Visit the enhanced interface
open http://localhost:3000/enhanced
```

### ✨ Enhanced UI Features
- 🎮 **Interactive Tool Playground** - Visual tool selection and testing
- 📊 **Real-time Performance Metrics** - Monitor execution times and success rates
- 🔗 **Visual Workflow Builder** - Chain tools together with drag-and-drop
- 📜 **Persistent Execution History** - Track all tool executions with local storage
- 🎨 **Modern Responsive Design** - Works beautifully on all devices
- 🔧 **Category-based Tool Organization** - Filter tools by Weather, AI, Memory, etc.
- ⚡ **Quick Actions** - One-click demos and batch testing
- 📚 **Interactive Documentation** - Built-in guides and architecture diagrams

**Comparison:**
- **Original UI:** `http://localhost:3000/ui.html` (legacy interface)
- **Enhanced UI:** `http://localhost:3000/enhanced` (recommended)
