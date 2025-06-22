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
    name: 'get-forecast', 
    description: 'Weather forecast for coordinates',
    input: { latitude: 40.7128, longitude: -74.0060 },
    expectedPatterns: ['forecast', '40.7128', '-74.0060'],
    category: 'Weather'
  },
  {
    name: 'get-state-forecast-summary',
    description: 'Advanced agentic weather summary',
    input: { state: 'NY' },
    expectedPatterns: ['NY', 'alerts'],
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
    name: 'plan-trip',
    description: 'Multi-step trip planning workflow',
    input: { destination: 'New York', date: '2025-07-01' },
    expectedPatterns: ['New York', '2025-07-01', 'Trip plan'],
    category: 'Workflow'
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
    name: 'long-task',
    description: 'Long-running task simulation',
    input: { seconds: 2 },
    expectedPatterns: ['completed', '2 seconds'],
    category: 'Tasks',
    timeout: 5000
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

// Test individual tool via MCP client
function testTool(toolTest) {
  return new Promise((resolve) => {
    console.log(`Testing ${toolTest.name} (${toolTest.category})...`);
    
    const clientPath = path.join(__dirname, '..', 'client.js');
    const client = spawn('node', [clientPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let hasResponded = false;
    
    client.stdout.on('data', (data) => {
      output += data.toString();
    });

    client.stderr.on('data', (data) => {
      output += data.toString();
    });

    // Send tool call request
    const request = {
      method: 'tools/call',
      params: {
        name: toolTest.name,
        arguments: toolTest.input
      }
    };

    // Send the request
    client.stdin.write(JSON.stringify(request) + '\n');

    const timeout = toolTest.timeout || 3000;
    setTimeout(() => {
      if (!hasResponded) {
        client.kill();
        console.log(`  ❌ ${toolTest.name}: Timeout after ${timeout}ms`);
        resolve({ success: false, error: 'Timeout', output });
      }
    }, timeout);

    client.on('close', (code) => {
      if (hasResponded) return;
      hasResponded = true;

      // Check if output contains expected patterns
      const success = toolTest.expectedPatterns.every(pattern => 
        output.toLowerCase().includes(pattern.toLowerCase())
      );

      if (success) {
        console.log(`  ✅ ${toolTest.name}: Passed`);
      } else {
        console.log(`  ❌ ${toolTest.name}: Failed - Missing expected patterns`);
        console.log(`     Expected: ${toolTest.expectedPatterns.join(', ')}`);
        console.log(`     Got: ${output.slice(0, 200)}...`);
      }

      resolve({ success, output, patterns: toolTest.expectedPatterns });
    });
  });
}

// Test server startup and tool availability
function testServerTools() {
  return new Promise((resolve) => {
    console.log('Testing server startup and tool availability...');
    
    const serverPath = path.join(__dirname, '..', 'build', 'src', 'index.js');
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stderrOutput = '';
    
    server.stderr.on('data', (data) => {
      stderrOutput += data.toString();
    });

    // Test tools/list capability
    const listRequest = { method: 'tools/list', params: {} };
    server.stdin.write(JSON.stringify(listRequest) + '\n');

    setTimeout(() => {
      server.kill();
    }, 2000);

    server.on('close', (code) => {
      const hasStartupMessage = stderrOutput.includes('Weather MCP Server running on stdio');
      const hasToolInfo = stderrOutput.includes('get-alerts') && 
                         stderrOutput.includes('get-forecast') && 
                         stderrOutput.includes('get-state-forecast-summary');

      if (hasStartupMessage && hasToolInfo) {
        console.log('✅ Server startup and tool availability: Passed');
        resolve(true);
      } else {
        console.log('❌ Server startup and tool availability: Failed');
        console.log('Stderr:', stderrOutput);
        resolve(false);
      }
    });
  });
}

// Run comprehensive test suite
async function runTests() {
  console.log('🚀 Starting MCP Agentic Tool Test Suite\n');
  
  let totalTests = 0;
  let passedTests = 0;
  const results = {};

  // Test 1: Server startup
  totalTests++;
  const serverTest = await testServerTools();
  if (serverTest) passedTests++;

  console.log('\n📋 Testing Individual Tools:\n');

  // Group tests by category for better organization
  const categories = [...new Set(toolTests.map(t => t.category))];
  
  for (const category of categories) {
    console.log(`\n🔧 ${category} Tools:`);
    const categoryTests = toolTests.filter(t => t.category === category);
    
    for (const test of categoryTests) {
      totalTests++;
      const result = await testTool(test);
      if (result.success) passedTests++;
      results[test.name] = result;
      
      // Small delay between tests
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // Test summary
  console.log('\n📊 Test Results Summary:');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  // Category breakdown
  console.log('\n📈 Results by Category:');
  for (const category of categories) {
    const categoryTests = toolTests.filter(t => t.category === category);
    const categoryPassed = categoryTests.filter(t => results[t.name]?.success).length;
    console.log(`${category}: ${categoryPassed}/${categoryTests.length} passed`);
  }

  // Detailed failure report
  const failedTests = Object.entries(results).filter(([name, result]) => !result.success);
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests Details:');
    failedTests.forEach(([name, result]) => {
      console.log(`\n${name}:`);
      console.log(`  Error: ${result.error || 'Pattern matching failed'}`);
      if (result.output) {
        console.log(`  Output: ${result.output.slice(0, 200)}...`);
      }
    });
  }

  console.log('\n🏁 Test Suite Complete!');
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('💥 Some tests failed. See details above.');
    process.exit(1);
  }
}

runTests().catch(console.error);
