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
		// Pay bill tool
		this.server.tool(
			"pay-my-bill",
			"Pay a credit card bill or make a payment towards the account balance",
			{ amount: z.number().positive().describe("Payment amount in dollars") },
			async ({ amount }) => ({
				content: [{ 
					type: "text", 
					text: `Payment of $${amount} has been scheduled. This is a demo - no actual payment was processed.` 
				}],
			})
		);

		// Check balance tool
		this.server.tool(
			"check-my-balance",
			"Check current account balance and available credit",
			{},
			async () => ({
				content: [{ 
					type: "text", 
					text: "Current balance: $2,847.33 | Available credit: $5,152.67 | Credit limit: $8,000.00 (Demo data)" 
				}],
			})
		);

		// Check recent transactions tool
		this.server.tool(
			"check-recent-transactions",
			"View recent credit card transactions and spending history",
			{ 
				limit: z.number().int().min(1).max(50).default(5).describe("Number of recent transactions to retrieve") 
			},
			async ({ limit }) => ({
				content: [{ 
					type: "text", 
					text: `Last ${limit} transactions (Demo data):
• Whole Foods - $67.43 (Today)
• Netflix - $15.99 (Yesterday) 
• Shell Gas Station - $45.20 (Mar 2)
• Amazon - $129.99 (Mar 1)
• Starbucks - $6.75 (Mar 1)` 
				}],
			})
		);

		// Lock card tool
		this.server.tool(
			"lock-my-card",
			"Immediately freeze/lock your credit card to prevent unauthorized use",
			{},
			async () => ({
				content: [{ 
					type: "text", 
					text: "🔒 Your card has been locked successfully. No new charges can be made until you unlock it. This is a demo - no actual card was locked." 
				}],
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
