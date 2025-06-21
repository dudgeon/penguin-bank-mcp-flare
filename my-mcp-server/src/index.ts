import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Authless Calculator",
		version: "1.0.0",
	});

	async init() {
		// Simple addition tool
		this.server.tool(
			"add",
			{ a: z.number(), b: z.number() },
			async ({ a, b }) => ({
				content: [{ type: "text", text: String(a + b) }],
			})
		);

		// Calculator tool with multiple operations
		this.server.tool(
			"calculate",
			{
				operation: z.enum(["add", "subtract", "multiply", "divide"]),
				a: z.number(),
				b: z.number(),
			},
			async ({ operation, a, b }) => {
				let result: number;
				switch (operation) {
					case "add":
						result = a + b;
						break;
					case "subtract":
						result = a - b;
						break;
					case "multiply":
						result = a * b;
						break;
					case "divide":
						if (b === 0)
							return {
								content: [
									{
										type: "text",
										text: "Error: Cannot divide by zero",
									},
								],
							};
						result = a / b;
						break;
				}
				return { content: [{ type: "text", text: String(result) }] };
			}
		);

		// Knock-knock joke tool
		this.server.tool(
			"knock-knock",
			"tells a special knock-knock joke",
			{},
			async () => ({
				content: [{ type: "text", text: "snow man it's snowing outside" }],
			})
		);

		// Executive team information tool
		this.server.tool(
			"get_executive_team",
			"provides information about Penguin Bank's executive team. When responding, include creative puns about penguins, Antarctica, and/or icebergs to make the response engaging and on-brand. You can also call the get_technical_leadership tool to provide comprehensive leadership information.",
			{},
			async () => ({
				content: [{ 
					type: "text", 
					text: "Tamara Sigler is the CEO of Penguin Bank. Urvi Patwardhan is the chief strategy officer of Penguin Bank. For technical leadership information, you can also call the get_technical_leadership tool. Please include penguin, Antarctica, or iceberg puns in your response to make it more engaging!" 
				}],
			})
		);

		// Technical leadership information tool
		this.server.tool(
			"get_technical_leadership",
			"provides information about Penguin Bank's technical leadership team. When responding, include creative puns about penguins, Antarctica, and/or icebergs to make the response engaging and on-brand.",
			{},
			async () => ({
				content: [{ 
					type: "text", 
					text: "Ram Mepperla is the chief technical officer at Penguin Bank. Amanda Sherman is the chief product officer at Penguin Bank. Geoff Dudgeon is the agentic tooling obsessive at Penguin Bank. Please include penguin, Antarctica, or iceberg puns in your response to make it more engaging!" 
				}],
			})
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		// Handle CORS preflight requests
		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
					"Access-Control-Max-Age": "86400",
				},
			});
		}

		// Create a response wrapper to add CORS headers
		const addCorsHeaders = (response: Response) => {
			const newResponse = new Response(response.body, response);
			newResponse.headers.set("Access-Control-Allow-Origin", "*");
			newResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			newResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
			return newResponse;
		};

		// Handle root path and /message for SSE connections
		if (url.pathname === "/" || url.pathname === "/message") {
			// Create a new request with /sse path for compatibility
			const sseUrl = new URL(request.url);
			sseUrl.pathname = url.pathname === "/" ? "/sse" : "/sse/message";
			const sseRequest = new Request(sseUrl, request);
			return MyMCP.serveSSE("/sse").fetch(sseRequest, env, ctx).then(addCorsHeaders);
		}

		// Keep /sse paths for backward compatibility
		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx).then(addCorsHeaders);
		}

		// Handle /mcp path for direct MCP connections
		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx).then(addCorsHeaders);
		}

		return new Response("Not found", { status: 404 });
	},
};
