import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

const server = new McpServer({
  name: "weather-agentic-demo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/geo+json",
  };
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

function formatAlert(feature: any): string {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}

server.tool(
  "get-alerts",
  "Get weather alerts for a state",
  {
    state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
  },
  async ({ state }) => {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<any>(alertsUrl);
    if (!alertsData) {
      return { content: [{ type: "text", text: "Failed to retrieve alerts data" }] };
    }
    const features = alertsData.features || [];
    if (features.length === 0) {
      return { content: [{ type: "text", text: `No active alerts for ${stateCode}` }] };
    }
    const formattedAlerts = features.map(formatAlert);
    const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;
    return { content: [{ type: "text", text: alertsText }] };
  }
);

server.tool(
  "get-forecast",
  "Get weather forecast for a location",
  {
    latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
    longitude: z.number().min(-180).max(180).describe("Longitude of the location"),
  },
  async ({ latitude, longitude }) => {
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest<any>(pointsUrl);
    if (!pointsData) {
      return { content: [{ type: "text", text: `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}.` }] };
    }
    const forecastUrl = pointsData.properties?.forecast;
    if (!forecastUrl) {
      return { content: [{ type: "text", text: "Failed to get forecast URL from grid point data" }] };
    }
    const forecastData = await makeNWSRequest<any>(forecastUrl);
    if (!forecastData) {
      return { content: [{ type: "text", text: "Failed to retrieve forecast data" }] };
    }
    const periods = forecastData.properties?.periods || [];
    if (periods.length === 0) {
      return { content: [{ type: "text", text: "No forecast periods available" }] };
    }
    const formattedForecast = periods.map((period: any) =>
      [
        `${period.name || "Unknown"}:`,
        `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}`,
        `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
        `${period.shortForecast || "No forecast available"}`,
        "---",
      ].join("\n")
    );
    const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`;
    return { content: [{ type: "text", text: forecastText }] };
  }
);

/**
 * Advanced agentic tool: get-state-forecast-summary
 * This tool demonstrates a multi-step agentic workflow:
 * 1. Fetch all active alerts for a state
 * 2. For each alert, fetch the forecast for the centroid of the alert area (simulated)
 * 3. Return a summary combining alerts and forecasts
 */
server.tool(
  "get-state-forecast-summary",
  "Get a summary of all active alerts and a sample forecast for a US state (demonstrates agentic chaining)",
  {
    state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
  },
  async ({ state }) => {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<any>(alertsUrl);
    if (!alertsData || !alertsData.features || alertsData.features.length === 0) {
      return { content: [{ type: "text", text: `No active alerts for ${stateCode}` }] };
    }
    // For demo: just use a fixed lat/lon for the state center (real code would parse geometry)
    const stateCenters: Record<string, [number, number]> = {
      CA: [36.7783, -119.4179],
      NY: [43.0000, -75.0000],
      TX: [31.0000, -100.0000],
      FL: [27.9944, -81.7603],
      // ...add more as needed
    };
    const [lat, lon] = stateCenters[stateCode] || [39.8283, -98.5795]; // Default: US center
    const pointsUrl = `${NWS_API_BASE}/points/${lat},${lon}`;
    const pointsData = await makeNWSRequest<any>(pointsUrl);
    let forecastText = "";
    if (pointsData && pointsData.properties?.forecast) {
      const forecastData = await makeNWSRequest<any>(pointsData.properties.forecast);
      if (forecastData && forecastData.properties?.periods?.length) {
        const period = forecastData.properties.periods[0];
        forecastText = `Sample forecast for state center: ${period.name}: ${period.detailedForecast}`;
      }
    }
    const formattedAlerts = alertsData.features.map(formatAlert).join("\n");
    return {
      content: [
        { type: "text", text: `Active alerts for ${stateCode}:\n${formattedAlerts}\n\n${forecastText}` },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Print onboarding instructions for users connecting via stdio
  console.error(`\nWeather MCP Server running on stdio!\n` +
    `Available tools:\n` +
    `- get-alerts: Get weather alerts for a US state (input: { state })\n` +
    `- get-forecast: Get weather forecast for a location (input: { latitude, longitude })\n` +
    `- get-state-forecast-summary: Advanced agentic tool — summary of alerts and a sample forecast for a state (input: { state })\n` +
    `\nSee README.md for usage examples and agentic documentation.\n`);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
