@echo off
REM MCP Agentic Fun - Build and Run Script for Windows
REM Usage: run.bat [mode]

echo MCP Agentic Fun - Build and Run Script
echo ======================================

REM Check command line argument
if "%1"=="" (
    set MODE=help
) else (
    set MODE=%1
)

if "%MODE%"=="build" (
    echo Building project...
    npm run build
    echo Build complete!
    goto :eof
)

if "%MODE%"=="start" (
    echo Starting MCP server...
    if not exist "build\src\index.js" (
        echo Building first...
        npm run build
    )
    npm run start
    goto :eof
)

if "%MODE%"=="ui" (
    echo Starting UI server...
    echo Visit http://localhost:3000/ui.html
    npm run ui
    goto :eof
)

if "%MODE%"=="client" (
    echo Starting Node.js client...
    if not exist "build\src\index.js" (
        echo Building first...
        npm run build
    )
    npm run client
    goto :eof
)

if "%MODE%"=="all" (
    echo Starting complete system...
    if not exist "build\src\index.js" (
        echo Building first...
        npm run build
    )
    echo MCP Server + UI Server starting...
    echo UI will be available at http://localhost:3000/ui.html
    npm run all
    goto :eof
)

if "%MODE%"=="test" (
    echo Running tests...
    npm test
    goto :eof
)

if "%MODE%"=="demo" (
    echo Running system demo...
    if exist "demo.sh" (
        bash demo.sh
    ) else (
        echo demo.sh not found
    )
    goto :eof
)

if "%MODE%"=="clean" (
    echo Cleaning build directory...
    if exist "build" rmdir /s /q build
    echo Clean complete!
    goto :eof
)

if "%MODE%"=="help" (
    echo.
    echo Usage: run.bat [mode]
    echo.
    echo Available modes:
    echo   build     - Build the TypeScript project
    echo   start     - Start the MCP server
    echo   ui        - Start the UI server
    echo   client    - Start the Node.js client
    echo   all       - Start both MCP server and UI server
    echo   test      - Run Jest tests
    echo   demo      - Run the complete system demonstration
    echo   clean     - Clean the build directory
    echo   help      - Show this help message
    echo.
    echo Examples:
    echo   run.bat build    # Build the project
    echo   run.bat ui       # Start UI server
    echo   run.bat all      # Start complete system
    echo   run.bat demo     # Run demonstration
    echo.
    goto :eof
)

echo Unknown mode: %MODE%
echo Use 'run.bat help' for available options
exit /b 1
