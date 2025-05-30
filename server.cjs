// Simple Express server to serve the UI and proxy MCP tool calls
// Use CommonJS syntax for compatibility with 'type': 'module' in package.json
const express = require("express");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());
app.use(express.static(".")); // Serve ui.html and static files

app.post("/mcp-client", (req, res) => {
  const { tool, args } = req.body;
  console.log(`[Proxy] Received tool call:`, tool, args);
  const serverProc = spawn("node", ["build/src/index.js"], { stdio: ["pipe", "pipe", "pipe"] });
  const initializeRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "1.0",
      capabilities: {},
      clientInfo: { name: "MCP Agentic Development Platform UI", version: "1.0.0" }
    }
  };
  const toolRequest = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: { name: tool, arguments: args }
  };
  let initialized = false;
  let responded = false;
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      console.log('[Proxy] Timeout waiting for MCP server response');
      res.status(504).json({ error: "Timeout waiting for MCP server response" });
      serverProc.kill();
    }
  }, 30000); // 30 seconds

  // Buffer for accumulating stdout data
  let buffer = "";
  function extractJSONObjects(str) {
    const objects = [];
    let depth = 0;
    let start = null;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '{') {
        if (depth === 0) start = i;
        depth++;
      } else if (str[i] === '}') {
        depth--;
        if (depth === 0 && start !== null) {
          objects.push(str.slice(start, i + 1));
          start = null;
        }
      }
    }
    let rest = "";
    if (depth > 0 && start !== null) {
      rest = str.slice(start);
    }
    return { objects, rest };
  }

  serverProc.stdout.on("data", (data) => {
    buffer += data.toString();
    const { objects, rest } = extractJSONObjects(buffer);
    buffer = rest;
    for (const objStr of objects) {
      try {
        const msg = JSON.parse(objStr);
        if (!initialized && msg.id === 1) {
          initialized = true;
          console.log('[Proxy] MCP server initialized');
          serverProc.stdin.write(JSON.stringify(toolRequest) + "\n");
        } else if (msg.id === 2 && msg.result && !responded) {
          responded = true;
          clearTimeout(timeout);
          console.log('[Proxy] MCP server tool result:', msg.result);
          res.json(msg.result);
          serverProc.kill();
        }
      } catch (e) {
        console.log('[Proxy] Parse error:', e);
      }
    }
  });
  serverProc.stderr.on("data", (data) => {
    console.log('[Proxy] MCP server stderr:', data.toString());
  });
  serverProc.stdin.write(JSON.stringify(initializeRequest) + "\n");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Agentic Development Platform UI running at http://localhost:${PORT}/ui.html`);
});
