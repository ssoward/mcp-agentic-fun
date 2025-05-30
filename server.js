// Simple Express server to serve the UI and proxy MCP tool calls
import express from "express";
import { spawn } from "child_process";

const app = express();
app.use(express.json());
app.use(express.static(".")); // Serve ui.html and static files

app.post("/mcp-client", (req, res) => {
  const { tool, args } = req.body;
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
    params: { tool, arguments: args }
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
            res.json(msg.result);
            serverProc.kill();
          }
        }
      }
    } catch (e) {}
  });
  serverProc.stdin.write(JSON.stringify(initializeRequest) + "\n");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Agentic Fun UI running at http://localhost:${PORT}/ui.html`);
});
