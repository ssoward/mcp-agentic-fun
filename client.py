#!/usr/bin/env python3
"""
MCP Agentic Fun - Python Client
Extension 4: Expanded Client Options

This Python client demonstrates how to interact with the MCP server from Python,
providing an alternative to the Node.js CLI client and web UI.

Features:
- Command-line interface with argparse
- JSON-RPC communication over stdio
- Support for all agentic tools
- Input validation and error handling
- Colored output for better UX
"""

import sys
import json
import subprocess
import argparse
import time
from typing import Dict, Any, Optional

try:
    from colorama import init, Fore, Back, Style
    init()
    HAS_COLOR = True
except ImportError:
    # Fallback if colorama not available
    class MockColor:
        RED = YELLOW = GREEN = BLUE = CYAN = MAGENTA = WHITE = RESET = ""
    Fore = Style = MockColor()
    HAS_COLOR = False

class MCPClient:
    """Python client for MCP Agentic Fun server"""
    
    def __init__(self, server_path: str = "build/src/index.js"):
        self.server_path = server_path
        self.tools_cache: Optional[Dict] = None
    
    def call_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """Call a tool on the MCP server"""
        
        # Start the MCP server process
        process = subprocess.Popen(
            ["node", self.server_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Initialize the server
        init_request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "1.0",
                "capabilities": {},
                "clientInfo": {"name": "MCP Python Client", "version": "1.0.0"}
            }
        }
        
        # Tool call request
        tool_request = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/call",
            "params": {"name": tool_name, "arguments": arguments}
        }
        
        try:
            # Send initialization and tool requests
            process.stdin.write(json.dumps(init_request) + "\n")
            process.stdin.write(json.dumps(tool_request) + "\n")
            process.stdin.close()
            
            # Read response
            stdout, stderr = process.communicate(timeout=30)
            
            # Parse JSON responses
            lines = stdout.strip().split('\n')
            for line in lines:
                if line.startswith('{'):
                    try:
                        response = json.loads(line)
                        if response.get('id') == 2:
                            if 'result' in response:
                                return response['result']
                            elif 'error' in response:
                                raise Exception(f"MCP Error: {response['error']['message']}")
                    except json.JSONDecodeError:
                        continue
            
            raise Exception("No valid response received from MCP server")
            
        except subprocess.TimeoutExpired:
            process.kill()
            raise Exception("Tool call timed out")
        except Exception as e:
            process.kill()
            raise e
    
    def get_tools_list(self) -> Dict[str, Any]:
        """Get list of available tools"""
        if self.tools_cache:
            return self.tools_cache
            
        process = subprocess.Popen(
            ["node", self.server_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        init_request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "1.0",
                "capabilities": {},
                "clientInfo": {"name": "MCP Python Client", "version": "1.0.0"}
            }
        }
        
        tools_request = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/list",
            "params": {}
        }
        
        try:
            process.stdin.write(json.dumps(init_request) + "\n")
            process.stdin.write(json.dumps(tools_request) + "\n")
            process.stdin.close()
            
            stdout, stderr = process.communicate(timeout=10)
            
            lines = stdout.strip().split('\n')
            for line in lines:
                if line.startswith('{'):
                    try:
                        response = json.loads(line)
                        if response.get('id') == 2 and 'result' in response:
                            self.tools_cache = response['result']
                            return self.tools_cache
                    except json.JSONDecodeError:
                        continue
            
            raise Exception("No tools list received from MCP server")
            
        except subprocess.TimeoutExpired:
            process.kill()
            raise Exception("Tools list request timed out")

def print_colored(text: str, color: str = ""):
    """Print colored text if colorama is available"""
    if HAS_COLOR and color:
        print(getattr(Fore, color.upper()) + text + Style.RESET_ALL)
    else:
        print(text)

def print_result(result: Dict[str, Any]):
    """Pretty print tool result"""
    print_colored("\n📋 Tool Result:", "green")
    print_colored("=" * 50, "blue")
    
    if 'content' in result and isinstance(result['content'], list):
        for item in result['content']:
            if isinstance(item, dict) and 'text' in item:
                print(item['text'])
            else:
                print(json.dumps(item, indent=2))
    else:
        print(json.dumps(result, indent=2))
    
    print_colored("=" * 50, "blue")

def interactive_mode(client: MCPClient):
    """Interactive mode for tool selection and execution"""
    print_colored("\n🤖 MCP Agentic Fun - Interactive Mode", "cyan")
    print_colored("Type 'help' for commands, 'exit' to quit\n", "yellow")
    
    while True:
        try:
            command = input(f"{Fore.CYAN}mcp>{Style.RESET_ALL if HAS_COLOR else ''} ").strip()
            
            if command.lower() in ['exit', 'quit', 'q']:
                print_colored("Goodbye! 👋", "green")
                break
            elif command.lower() in ['help', 'h']:
                print_help()
            elif command.lower() in ['list', 'ls']:
                list_tools(client)
            elif command.lower().startswith('call '):
                # Parse tool call: call tool_name arg1=value1 arg2=value2
                parts = command[5:].split()
                if not parts:
                    print_colored("Error: No tool name provided", "red")
                    continue
                
                tool_name = parts[0]
                args = {}
                
                for arg_pair in parts[1:]:
                    if '=' in arg_pair:
                        key, value = arg_pair.split('=', 1)
                        # Try to parse as number if possible
                        try:
                            if '.' in value:
                                args[key] = float(value)
                            else:
                                args[key] = int(value)
                        except ValueError:
                            args[key] = value
                
                execute_tool(client, tool_name, args)
            else:
                print_colored("Unknown command. Type 'help' for available commands.", "red")
                
        except KeyboardInterrupt:
            print_colored("\nGoodbye! 👋", "green")
            break
        except EOFError:
            print_colored("\nGoodbye! 👋", "green")
            break

def print_help():
    """Print help information"""
    help_text = """
📚 Available Commands:
  help, h       - Show this help
  list, ls      - List available tools
  call <tool> [args] - Call a tool with arguments
  exit, quit, q - Exit the program

🛠️  Tool Call Examples:
  call get-alerts state=CA
  call get-forecast latitude=34.05 longitude=-118.25
  call get-news-headlines topic=technology
  call plan-trip destination=Paris date=2025-06-01
  call long-task seconds=5
  call remember-preference key=city value=SF
  call recall-preference key=city

📝 Arguments are passed as key=value pairs
   Numbers are automatically parsed (e.g., latitude=34.05)
   Strings don't need quotes unless they contain spaces
"""
    print_colored(help_text, "yellow")

def list_tools(client: MCPClient):
    """List available tools with descriptions"""
    try:
        tools_result = client.get_tools_list()
        tools = tools_result.get('tools', [])
        
        print_colored(f"\n🛠️  Available Tools ({len(tools)}):", "green")
        print_colored("=" * 60, "blue")
        
        for tool in tools:
            name = tool.get('name', 'Unknown')
            description = tool.get('description', 'No description')
            print_colored(f"  {name}", "cyan")
            print(f"    {description}")
            
            # Show required parameters
            schema = tool.get('inputSchema', {})
            required = schema.get('required', [])
            if required:
                print_colored(f"    Required: {', '.join(required)}", "yellow")
            print()
        
    except Exception as e:
        print_colored(f"Error listing tools: {e}", "red")

def execute_tool(client: MCPClient, tool_name: str, args: Dict[str, Any]):
    """Execute a tool with given arguments"""
    try:
        print_colored(f"\n🚀 Calling tool: {tool_name}", "cyan")
        print_colored(f"📝 Arguments: {json.dumps(args)}", "yellow")
        
        start_time = time.time()
        result = client.call_tool(tool_name, args)
        end_time = time.time()
        
        print_result(result)
        print_colored(f"⏱️  Execution time: {(end_time - start_time) * 1000:.0f}ms", "magenta")
        
    except Exception as e:
        print_colored(f"❌ Error: {e}", "red")

def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description="MCP Agentic Fun - Python Client",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument(
        '--tool', '-t',
        help='Tool name to call'
    )
    parser.add_argument(
        '--args', '-a',
        help='Tool arguments as JSON string'
    )
    parser.add_argument(
        '--interactive', '-i',
        action='store_true',
        help='Start interactive mode'
    )
    parser.add_argument(
        '--list', '-l',
        action='store_true',
        help='List available tools'
    )
    parser.add_argument(
        '--server',
        default='build/src/index.js',
        help='Path to MCP server script (default: build/src/index.js)'
    )
    
    args = parser.parse_args()
    
    try:
        client = MCPClient(args.server)
        
        if args.interactive:
            interactive_mode(client)
        elif args.list:
            list_tools(client)
        elif args.tool:
            tool_args = {}
            if args.args:
                try:
                    tool_args = json.loads(args.args)
                except json.JSONDecodeError as e:
                    print_colored(f"Error parsing arguments JSON: {e}", "red")
                    sys.exit(1)
            
            execute_tool(client, args.tool, tool_args)
        else:
            # Default to interactive mode
            interactive_mode(client)
            
    except Exception as e:
        print_colored(f"❌ Fatal error: {e}", "red")
        sys.exit(1)

if __name__ == "__main__":
    main()
