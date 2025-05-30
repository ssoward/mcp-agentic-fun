import { exec } from "child_process";

describe("MCP Server Agentic Demo", () => {
  it("should start the server without errors", (done) => {
    const proc = exec("node build/index.js", (error, stdout, stderr) => {
      expect(stderr).toContain("Weather MCP Server running on stdio");
      done(error || undefined);
    });
    setTimeout(() => {
      proc.kill();
    }, 1000);
  });
});
