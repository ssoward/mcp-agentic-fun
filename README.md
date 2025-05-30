# MCP Agentic Development Platform - Complete Agentic System

A comprehensive demonstration of the Model Context Protocol (MCP) with advanced agentic capabilities, featuring 7 major extensions and multiple client interfaces.

## 🚀 Overview

This project showcases a fully-featured MCP server implementation with extensive agentic capabilities:

- **13 Agentic Tools** with various complexity levels
- **Multi-step Workflows** and tool chaining
- **Stateful Agents** with persistent memory
- **Long-running Tasks** and background processes
- **Multiple Client Interfaces** (Web UI, CLI, Python)
- **Enhanced Developer Experience** with comprehensive documentation
- **Advanced Features** including LLM integration and multi-agent collaboration

## 📋 Seven Major Extensions

### 1️⃣ Extension 1: More Agentic Tools & Workflows
- **get-news-headlines** - Latest news for any topic
- **get-stock-price** - Real-time stock prices
- **plan-trip** - Multi-step workflow combining weather, news, and finance
- **chain-tools** - Tool composition and chaining demonstration

### 2️⃣ Extension 2: Enhanced Web UI
- **Tabbed Interface** with Tool Call, History, and Documentation tabs
- **Input Validation** with real-time error feedback
- **Tool Call History** with persistent local storage
- **Enhanced Visualization** with system architecture diagram

### 3️⃣ Extension 3: Stateful Agents & Long-running Tasks
- **remember-preference** / **recall-preference** - Agent memory system
- **long-task** - Simulates background processes up to 30 seconds
- **Persistent State** across tool calls

### 4️⃣ Extension 4: Expanded Client Options
- **Web UI** - Rich browser-based interface
- **Node.js CLI** - Command-line client with interactive mode
- **Python Client** - Cross-language support with colorized output
- **Multiple Interface Options** for different use cases

### 5️⃣ Extension 5: Robustness & Observability
- **get-logs** - Server logging and monitoring
- **Extended Timeouts** for long-running workflows
- **Error Handling** and graceful degradation
- **Performance Monitoring** with execution time tracking

### 6️⃣ Extension 6: Documentation & Developer Experience
- **Comprehensive README** with examples and setup guides
- **Interactive Documentation** tab in Web UI
- **Python Requirements** file for easy setup
- **Code Comments** and inline documentation

### 7️⃣ Extension 7: Advanced Agentic Features
- **llm-summarize** - Simulated LLM integration for text processing
- **multi-agent-demo** - Multi-agent collaboration demonstration
- **Tool Orchestration** with complex workflows

## 🛠️ Available Tools

| Tool | Type | Description |
|------|------|-------------|
| `get-alerts` | Core | Weather alerts for US states |
| `get-forecast` | Core | Weather forecast for coordinates |
| `get-state-forecast-summary` | Agentic | Combined alerts + forecast (tool chaining) |
| `get-news-headlines` | Extension | Latest news headlines by topic |
| `get-stock-price` | Extension | Stock prices by symbol |
| `plan-trip` | Workflow | Multi-step trip planning (weather + news + finance) |
| `chain-tools` | Composition | Tool chaining demonstration |
| `remember-preference` | Stateful | Store user preferences in agent memory |
| `recall-preference` | Stateful | Retrieve stored preferences |
| `long-task` | Background | Simulate long-running processes |
| `get-logs` | Monitoring | Access server logs and monitoring data |
| `llm-summarize` | AI | Text summarization via simulated LLM |
| `multi-agent-demo` | Advanced | Multi-agent collaboration simulation |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Optional: Python 3.8+ for Python client

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd MCP-Agentic-Fun
   npm install
   ```

2. **Build the TypeScript code:**
   ```bash
   npm run build
   ```

3. **Start the web UI server:**
   ```bash
   npm start
   # Or: node server.cjs
   ```

4. **Access the Web UI:**
   ```
   http://localhost:3000/ui.html
   ```

## 💻 Client Usage

### Web UI (Recommended)
The enhanced web interface provides the best experience:

```bash
npm start
# Open http://localhost:3000/ui.html
```

**Features:**
- Tool selector with dynamic argument forms
- Real-time input validation
- Tool call history with localStorage persistence
- Interactive documentation
- System architecture visualization

### Node.js CLI Client
Direct command-line access:

```bash
# List available tools
node client.js --list

# Call a specific tool
node client.js --tool get-alerts --args '{"state": "CA"}'

# Interactive mode
node client.js --interactive
```

### Python Client
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
