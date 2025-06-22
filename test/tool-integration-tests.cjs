#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Running Comprehensive MCP Tool Tests...\n');

// Test data for each tool
const toolTests = [
  {
    name: 'get-alerts',
    description: 'Weather alerts for a state',
    input: { state: 'CA' },
    expectedPatterns: ['CA', 'alerts'],
    category: 'Weather'
  },
  {
    name: 'get-news-headlines',
    description: 'News headlines (demo)',
    input: { topic: 'technology' },
    expectedPatterns: ['technology', 'headlines'],
    category: 'News'
  },
  {
    name: 'get-stock-price',
    description: 'Stock price (demo)',
    input: { symbol: 'AAPL' },
    expectedPatterns: ['AAPL', 'price'],
    category: 'Finance'
  },
  {
    name: 'remember-preference',
    description: 'Store preference in agent memory',
    input: { key: 'favorite_city', value: 'San Francisco' },
    expectedPatterns: ['favorite_city', 'San Francisco', 'stored'],
    category: 'Memory'
  },
  {
    name: 'recall-preference',
    description: 'Recall preference from agent memory',
    input: { key: 'favorite_city' },
    expectedPatterns: ['favorite_city', 'Preference'],
    category: 'Memory'
  },
  {
    name: 'get-logs',
    description: 'Server logs',
    input: {},
    expectedPatterns: ['Log', 'systems'],
    category: 'Monitoring'
  },
  {
    name: 'llm-summarize',
    description: 'LLM text summarization (demo)',
    input: { text: 'This is a long text that needs to be summarized for testing purposes.' },
    expectedPatterns: ['Summary', 'This is a long text'],
    category: 'AI'
  },
  {
    name: 'multi-agent-demo',
    description: 'Multi-agent collaboration (demo)',
    input: {},
    expectedPatterns: ['Agent A', 'Agent B', 'Agent C'],
    category: 'AI'
  }
];

// Test server startup and basic functionality
function testServerStartup() {
  return new Promise((resolve) => {
    console.log('Testing server startup and tool definitions...');
    
    const serverPath = path.join(__dirname, '..', 'build', 'src', 'index.js');
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stderrOutput = '';
    let stdoutOutput = '';
    
    server.stderr.on('data', (data) => {
      stderrOutput += data.toString();
    });

    server.stdout.on('data', (data) => {
      stdoutOutput += data.toString();
    });

    // Send initialize request
    const initRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "1.0",
        capabilities: {},
        clientInfo: { name: "Test Client", version: "1.0.0" }
      }
    };

    // Send tools/list request
    const toolsListRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    };

    setTimeout(() => {
      server.stdin.write(JSON.stringify(initRequest) + '\n');
      setTimeout(() => {
        server.stdin.write(JSON.stringify(toolsListRequest) + '\n');
        setTimeout(() => {
          server.kill();
        }, 1000);
      }, 500);
    }, 500);

    server.on('close', (code) => {
      const hasStartupMessage = stderrOutput.includes('Weather MCP Server running on stdio');
      const hasToolInfo = stderrOutput.includes('get-alerts');

      if (hasStartupMessage) {
        console.log('✅ Server startup: Passed');
        resolve({ success: true, output: stderrOutput + stdoutOutput });
      } else {
        console.log('❌ Server startup: Failed');
        console.log('Stderr:', stderrOutput.slice(0, 300));
        console.log('Stdout:', stdoutOutput.slice(0, 300));
        resolve({ success: false, output: stderrOutput + stdoutOutput });
      }
    });

    server.on('error', (error) => {
      console.log('❌ Server startup: Error -', error.message);
      resolve({ success: false, error: error.message });
    });
  });
}

// Test individual tools by calling them via direct client calls
function testToolDirect(toolTest) {
  return new Promise((resolve) => {
    console.log(`  Testing ${toolTest.name}...`);
    
    const serverPath = path.join(__dirname, '..', 'build', 'src', 'index.js');
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let hasResponded = false;
    
    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      output += data.toString();
    });

    // Send requests in sequence
    const initRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "1.0",
        capabilities: {},
        clientInfo: { name: "Test Client", version: "1.0.0" }
      }
    };

    const toolRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: toolTest.name,
        arguments: toolTest.input
      }
    };

    setTimeout(() => {
      // Send initialize first
      server.stdin.write(JSON.stringify(initRequest) + '\n');
      
      setTimeout(() => {
        // Then send tool call
        server.stdin.write(JSON.stringify(toolRequest) + '\n');
        
        setTimeout(() => {
          if (!hasResponded) {
            server.kill();
          }
        }, 3000);
      }, 500);
    }, 200);

    server.on('close', (code) => {
      if (hasResponded) return;
      hasResponded = true;

      // Check if output contains expected patterns (case-insensitive)
      const lowerOutput = output.toLowerCase();
      const matchedPatterns = toolTest.expectedPatterns.filter(pattern => 
        lowerOutput.includes(pattern.toLowerCase())
      );

      const success = matchedPatterns.length > 0; // At least one pattern should match

      if (success) {
        console.log(`    ✅ ${toolTest.name}: Passed (matched: ${matchedPatterns.join(', ')})`);
      } else {
        console.log(`    ❌ ${toolTest.name}: Failed`);
        console.log(`       Expected patterns: ${toolTest.expectedPatterns.join(', ')}`);
        console.log(`       Output sample: ${output.slice(0, 200)}...`);
      }

      resolve({ 
        success, 
        output, 
        matchedPatterns,
        expectedPatterns: toolTest.expectedPatterns 
      });
    });

    server.on('error', (error) => {
      if (hasResponded) return;
      hasResponded = true;
      console.log(`    ❌ ${toolTest.name}: Error - ${error.message}`);
      resolve({ success: false, error: error.message });
    });
  });
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting MCP Agentic Tool Test Suite\n');
  
  let totalTests = 0;
  let passedTests = 0;
  const results = {};

  // Test 1: Server startup
  console.log('📋 Basic Functionality Tests:\n');
  totalTests++;
  const serverTest = await testServerStartup();
  if (serverTest.success) passedTests++;
  console.log('');

  // Test 2: Individual tools by category
  console.log('🔧 Individual Tool Tests:\n');

  const categories = [...new Set(toolTests.map(t => t.category))];
  
  for (const category of categories) {
    console.log(`${category} Tools:`);
    const categoryTests = toolTests.filter(t => t.category === category);
    
    for (const test of categoryTests) {
      totalTests++;
      const result = await testToolDirect(test);
      if (result.success) passedTests++;
      results[test.name] = result;
      
      // Small delay between tests to avoid overwhelming the server
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('');
  }

  // Final results
  console.log('📊 Test Results Summary:');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  // Category breakdown
  console.log('\n📈 Results by Category:');
  for (const category of categories) {
    const categoryTests = toolTests.filter(t => t.category === category);
    const categoryPassed = categoryTests.filter(t => results[t.name]?.success).length;
    const percentage = ((categoryPassed / categoryTests.length) * 100).toFixed(0);
    console.log(`  ${category}: ${categoryPassed}/${categoryTests.length} (${percentage}%)`);
  }

  // Detailed failure report
  const failedTests = Object.entries(results).filter(([name, result]) => !result.success);
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    failedTests.forEach(([name, result]) => {
      console.log(`\n${name}:`);
      console.log(`  Error: ${result.error || 'Pattern matching failed'}`);
      if (result.expectedPatterns && result.matchedPatterns) {
        console.log(`  Expected: ${result.expectedPatterns.join(', ')}`);
        console.log(`  Matched: ${result.matchedPatterns?.join(', ') || 'None'}`);
      }
    });
  }

  console.log('\n🏁 Test Suite Complete!');
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Your MCP server is working perfectly.');
    process.exit(0);
  } else {
    console.log(`💡 ${passedTests}/${totalTests} tests passed. Some tools may need attention.`);
    process.exit(1);
  }
}

runTests().catch((error) => {
  console.error('Test suite error:', error);
  process.exit(1);
});
