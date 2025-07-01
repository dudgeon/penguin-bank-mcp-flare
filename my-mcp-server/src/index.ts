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
			"Pay a credit card bill or make a payment towards the account balance. IMPORTANT: Before calling this tool, ensure you have collected ALL required information from the user: payment amount, source account (checking or savings), and payment type (minimum, statement_balance, custom_amount, or full_balance). If any information is missing, ask the user to provide it before calling this tool.",
			{ 
				amount: z.number().positive().describe("Payment amount in dollars"),
				source_account: z.enum(["checking", "savings"]).describe("Account to pay from - either 'checking' or 'savings'"),
				payment_type: z.enum(["minimum", "statement_balance", "custom_amount", "full_balance"]).describe("Type of payment - 'minimum' for minimum payment due, 'statement_balance' for full statement amount, 'custom_amount' for user-specified amount, or 'full_balance' to pay off entire credit card balance")
			},
			async ({ amount, source_account, payment_type }) => {
				// Validate payment amount against current balances
				const checking_balance = 3247.89;
				const savings_balance = 12458.32;
				const credit_card_balance = 2847.33;
				const statement_balance = 2695.12;
				const minimum_payment = 125.00;

				const source_balance = source_account === "checking" ? checking_balance : savings_balance;

				// Validate sufficient funds
				if (amount > source_balance) {
					return {
						isError: true,
						content: [{ 
							type: "text", 
							text: `Insufficient funds. ${source_account} account balance: $${source_balance.toFixed(2)}, requested payment: $${amount.toFixed(2)}. Please choose a lower amount or different source account.` 
						}]
					};
				}

				// Validate payment type matches amount
				let expected_amount;
				switch (payment_type) {
					case "minimum":
						expected_amount = minimum_payment;
						break;
					case "statement_balance":
						expected_amount = statement_balance;
						break;
					case "full_balance":
						expected_amount = credit_card_balance;
						break;
					case "custom_amount":
						expected_amount = amount; // Any amount is valid for custom
						break;
				}

				if (payment_type !== "custom_amount" && Math.abs(amount - expected_amount) > 0.01) {
					return {
						isError: true,
						content: [{ 
							type: "text", 
							text: `Payment amount mismatch. For payment type '${payment_type}', expected amount is $${expected_amount.toFixed(2)}, but received $${amount.toFixed(2)}. Please adjust the amount or change payment type to 'custom_amount'.` 
						}]
					};
				}

				// Process successful payment
				const new_source_balance = source_balance - amount;
				const new_credit_balance = Math.max(0, credit_card_balance - amount);
				const remaining_credit_limit = 8000.00 - new_credit_balance;

				return {
					content: [{ 
						type: "text", 
						text: JSON.stringify({
							payment_status: "successful",
							payment_details: {
								amount: amount,
								source_account: source_account,
								payment_type: payment_type,
								transaction_id: `TXN-${Date.now()}`,
								timestamp: new Date().toISOString()
							},
							updated_balances: {
								[source_account + "_account"]: {
									previous_balance: source_balance,
									new_balance: new_source_balance,
									account_type: source_account
								},
								credit_card: {
									previous_balance: credit_card_balance,
									new_balance: new_credit_balance,
									remaining_credit_limit: remaining_credit_limit,
									total_credit_limit: 8000.00,
									account_type: "credit_card"
								}
							},
							message: `Payment of $${amount.toFixed(2)} successfully processed from ${source_account} account to credit card.`
						}, null, 2) + " (Demo data - no actual payment was processed)"
					}],
				};
			}
		);

		// Check balance tool
		this.server.tool(
			"check-my-balance",
			"Get all active accounts and their current balances, including checking account balance, savings account balance, and credit card balances with available credit limits",
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
