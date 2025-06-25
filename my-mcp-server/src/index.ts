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
					text: JSON.stringify({
						checking_account: {
							current_balance: 3247.89,
							account_type: "checking"
						},
						savings_account: {
							current_balance: 12458.32,
							account_type: "savings"
						},
						credit_card: {
							current_balance: 2847.33,
							statement_balance: 2695.12,
							remaining_credit_limit: 5152.67,
							total_credit_limit: 8000.00,
							account_type: "credit_card"
						}
					}, null, 2) + " (Demo data)"
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
                        async ({ limit }) => {
                                const allTransactions = [
                                        {
                                                merchant_name: "Whole Foods",
                                                merchant_address: "123 Market St, San Francisco, CA",
                                                amount: 67.43,
                                                state: "posted",
                                                date: "2025-04-12",
                                                merchant_category: "grocery",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Netflix",
                                                merchant_address: "100 Stream Way, Los Gatos, CA",
                                                amount: 15.99,
                                                state: "pending",
                                                date: "2025-04-11",
                                                merchant_category: "entertainment",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Shell Gas Station",
                                                merchant_address: "900 Fuel Ave, Oakland, CA",
                                                amount: 45.2,
                                                state: "posted",
                                                date: "2025-04-10",
                                                merchant_category: "gas",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Amazon",
                                                merchant_address: "410 Terry Ave, Seattle, WA",
                                                amount: 129.99,
                                                state: "posted",
                                                date: "2025-04-09",
                                                merchant_category: "shopping",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Starbucks",
                                                merchant_address: "200 Coffee Rd, Seattle, WA",
                                                amount: 6.75,
                                                state: "posted",
                                                date: "2025-04-09",
                                                merchant_category: "coffee",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Uber",
                                                merchant_address: "San Francisco, CA",
                                                amount: 23.18,
                                                state: "posted",
                                                date: "2025-04-08",
                                                merchant_category: "transportation",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Target",
                                                merchant_address: "2500 First St, San Jose, CA",
                                                amount: 82.5,
                                                state: "posted",
                                                date: "2025-04-07",
                                                merchant_category: "shopping",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Spotify",
                                                merchant_address: "1 Music Pl, Los Angeles, CA",
                                                amount: 10.99,
                                                state: "pending",
                                                date: "2025-04-07",
                                                merchant_category: "entertainment",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "CVS Pharmacy",
                                                merchant_address: "3000 Health Dr, Daly City, CA",
                                                amount: 12.99,
                                                state: "posted",
                                                date: "2025-04-06",
                                                merchant_category: "pharmacy",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Home Depot",
                                                merchant_address: "400 Build Ln, Oakland, CA",
                                                amount: 75.85,
                                                state: "posted",
                                                date: "2025-04-05",
                                                merchant_category: "home improvement",
                                                account: "credit_card",
                                        },
                                        {
                                                merchant_name: "Payroll Deposit",
                                                merchant_address: "Acme Corp, San Francisco, CA",
                                                amount: 2400,
                                                state: "posted",
                                                date: "2025-04-15",
                                                merchant_category: "income",
                                                account: "checking",
                                        },
                                        {
                                                merchant_name: "Rent Payment",
                                                merchant_address: "123 Rental Ln, San Francisco, CA",
                                                amount: -2100,
                                                state: "posted",
                                                date: "2025-04-01",
                                                merchant_category: "housing",
                                                account: "checking",
                                        },
                                        {
                                                merchant_name: "ATM Withdrawal",
                                                merchant_address: "Main St ATM, San Francisco, CA",
                                                amount: -100,
                                                state: "posted",
                                                date: "2025-04-03",
                                                merchant_category: "cash",
                                                account: "checking",
                                        },
                                        {
                                                merchant_name: "Electric Company",
                                                merchant_address: "500 Energy Dr, San Francisco, CA",
                                                amount: -120.47,
                                                state: "posted",
                                                date: "2025-04-04",
                                                merchant_category: "utilities",
                                                account: "checking",
                                        },
                                        {
                                                merchant_name: "Trader Joe's",
                                                merchant_address: "150 Grocery St, San Francisco, CA",
                                                amount: -54.32,
                                                state: "posted",
                                                date: "2025-04-09",
                                                merchant_category: "grocery",
                                                account: "checking",
                                        },
                                ];
                                const transactions = allTransactions.slice(0, limit);
                                return {
                                        content: [
                                                {
                                                        type: "text",
                                                        text: JSON.stringify(transactions, null, 2) + " (Demo data)",
                                                },
                                        ],
                                };
                        }
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

		// About Penguin Bank tool
		this.server.tool(
			"about-penguin-bank",
			"Learn about Penguin Bank's mission, vision, and approach to AI-powered banking",
			{},
			async () => ({
				content: [{ 
					type: "text", 
					text: "Penguin Bank is a glimpse at the very near future, where customers use their AI tools like ChatGPT and Claude for every facet of their lives -- so of course they will use it for banking tasks. Now, with the arrival and embrace of MCP (Model Context Protocol), we know how this will happen. The only question is when, and which bank will get there first." 
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
