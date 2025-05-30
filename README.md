# MCP Agentic Fun

This project demonstrates a Model Context Protocol (MCP) server in TypeScript using the @modelcontextprotocol/sdk. It exposes several agentic tools and advanced agentic workflows.

## Features

- `get-alerts`: Get weather alerts for a US state.
- `get-forecast`: Get weather forecast for a location (latitude/longitude).
- `get-state-forecast-summary`: **Advanced agentic example** — Fetches all active alerts for a state and provides a sample forecast for the state center, demonstrating multi-step agentic reasoning and tool chaining.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Build the project:
   ```sh
   npm run build
   ```
3. Run the server:
   ```sh
   npm start
   ```

## Usage

You can connect this MCP server to any MCP-compatible client (e.g., Claude for Desktop, custom clients, or via VS Code with `.vscode/mcp.json`).

### Example Tool Calls

- **Get alerts:**
  - Input: `{ "state": "CA" }`
  - Output: List of active weather alerts for California.
- **Get forecast:**
  - Input: `{ "latitude": 34.05, "longitude": -118.25 }`
  - Output: Weather forecast for Los Angeles, CA.
- **Get state forecast summary (advanced):**
  - Input: `{ "state": "NY" }`
  - Output: All active alerts for New York and a sample forecast for the state center.

## Advanced Agentic Concepts

- **Multi-step Reasoning:** The `get-state-forecast-summary` tool demonstrates how an agent can chain multiple tool calls and combine their results.
- **Extensibility:** You can add more agentic tools by following the examples in `src/index.ts`.

## MCP Integration

A `.vscode/mcp.json` is provided for VS Code integration. You can also connect this server to Claude for Desktop or other MCP clients. See [MCP Protocol Documentation](https://modelcontextprotocol.io/llms-full.txt) for more details.

## Local MCP Client

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
