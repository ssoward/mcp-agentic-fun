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

// API endpoint to get available tools
app.get("/api/tools", (req, res) => {
  const tools = [
    {
      name: "get-alerts",
      description: "Get weather alerts for a state",
      category: "Weather",
      parameters: [
        { name: "state", type: "string", required: true, description: "State code (e.g., CA, NY)" }
      ]
    },
    {
      name: "get-forecast",
      description: "Get weather forecast for coordinates",
      category: "Weather", 
      parameters: [
        { name: "latitude", type: "number", required: true, description: "Latitude coordinate" },
        { name: "longitude", type: "number", required: true, description: "Longitude coordinate" }
      ]
    },
    {
      name: "get-state-forecast-summary",
      description: "Get forecast summary for a state",
      category: "Weather",
      parameters: [
        { name: "state", type: "string", required: true, description: "State code (e.g., CA, NY)" }
      ]
    },
    {
      name: "get-news-headlines",
      description: "Get latest news headlines for a topic",
      category: "News",
      parameters: [
        { name: "topic", type: "string", required: true, description: "News topic (e.g., technology, sports)" }
      ]
    },
    {
      name: "get-stock-price",
      description: "Get current stock price for a symbol",
      category: "Finance",
      parameters: [
        { name: "symbol", type: "string", required: true, description: "Stock symbol (e.g., AAPL, GOOGL)" }
      ]
    },
    {
      name: "plan-trip",
      description: "Plan a trip with itinerary",
      category: "Workflow",
      parameters: [
        { name: "destination", type: "string", required: true, description: "Destination city" },
        { name: "date", type: "string", required: true, description: "Trip date" }
      ]
    },
    {
      name: "remember-preference",
      description: "Store a user preference",
      category: "Memory",
      parameters: [
        { name: "key", type: "string", required: true, description: "Preference key" },
        { name: "value", type: "string", required: true, description: "Preference value" }
      ]
    },
    {
      name: "recall-preference",
      description: "Retrieve a stored preference",
      category: "Memory",
      parameters: [
        { name: "key", type: "string", required: true, description: "Preference key to retrieve" }
      ]
    },
    {
      name: "long-task",
      description: "Execute a long-running background task",
      category: "Tasks",
      parameters: [
        { name: "duration", type: "number", required: false, description: "Duration in seconds" }
      ]
    },
    {
      name: "get-logs",
      description: "Get system logs for monitoring",
      category: "Monitoring",
      parameters: [
        { name: "level", type: "string", required: false, description: "Log level (error, warn, info)" }
      ]
    },
    {
      name: "llm-summarize",
      description: "Summarize text using LLM",
      category: "AI",
      parameters: [
        { name: "text", type: "string", required: true, description: "Text to summarize" }
      ]
    },
    {
      name: "multi-agent-demo",
      description: "Demonstrate multi-agent collaboration",
      category: "AI",
      parameters: [
        { name: "task", type: "string", required: false, description: "Task for agents to collaborate on" }
      ]
    }
  ];
  
  res.json(tools);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Agentic Development Platform UI running at http://localhost:${PORT}/ui.html`);
});
