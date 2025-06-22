#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Running MCP Server Tests...\n');

// Test 1: Check if server starts without errors
function testServerStartup() {
  return new Promise((resolve) => {
    console.log('Test 1: Server Startup...');
    
    const serverPath = path.join(__dirname, '..', 'build', 'src', 'index.js');
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stderrOutput = '';
    
    server.stderr.on('data', (data) => {
      stderrOutput += data.toString();
    });

    // Kill server after 2 seconds
    setTimeout(() => {
      server.kill();
    }, 2000);

    server.on('close', (code) => {
      if (stderrOutput.includes('Weather MCP Server running on stdio')) {
        console.log('✅ Server starts successfully');
        resolve(true);
      } else {
        console.log('❌ Server startup failed');
        console.log('Expected: "Weather MCP Server running on stdio"');
        console.log('Got:', stderrOutput);
        resolve(false);
      }
    });
  });
}

// Test 2: Check if build files exist
function testBuildFiles() {
  const fs = require('fs');
  const buildPath = path.join(__dirname, '..', 'build', 'src', 'index.js');
  
  console.log('Test 2: Build Files...');
  
  if (fs.existsSync(buildPath)) {
    console.log('✅ Build files exist');
    return true;
  } else {
    console.log('❌ Build files missing');
    return false;
  }
}

// Run all tests
async function runTests() {
  let passed = 0;
  let total = 0;

  // Test build files
  total++;
  if (testBuildFiles()) passed++;

  // Test server startup
  total++;
  if (await testServerStartup()) passed++;

  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('💥 Some tests failed!');
    process.exit(1);
  }
}

runTests().catch(console.error);
