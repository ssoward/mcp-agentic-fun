// MCP Client Example: Call tools on the local MCP server via stdio
// Usage: node client.js <tool> <json-args>
// Example: node client.js get-alerts '{"state":"CA"}'

import { spawn } from "child_process";

const [,, tool, argsJson] = process.argv;
if (!tool || !argsJson) {
  console.error("Usage: node client.js <tool> <json-args>");
  process.exit(1);
}

const args = JSON.parse(argsJson);
const serverProc = spawn("node", ["build/index.js"], { stdio: ["pipe", "pipe", "inherit"] });

const initializeRequest = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {}
};
const toolRequest = {
  jsonrpc: "2.0",
  id: 2,
  method: "callTool",
  params: {
    tool,
    arguments: args
  }
};

let initialized = false;
serverProc.stdout.on("data", (data) => {
  try {
    const lines = data.toString().split("\n");
    for (const line of lines) {
      if (line.trim().startsWith("{")) {
        const msg = JSON.parse(line);
        if (!initialized && msg.id === 1) {
          initialized = true;
          serverProc.stdin.write(JSON.stringify(toolRequest) + "\n");
        } else if (msg.id === 2 && msg.result) {
          console.log("Tool result:", JSON.stringify(msg.result, null, 2));
          serverProc.kill();
        }
      }
    }
  } catch (e) {
    // Ignore parse errors
  }
});

serverProc.stdin.write(JSON.stringify(initializeRequest) + "\n");
