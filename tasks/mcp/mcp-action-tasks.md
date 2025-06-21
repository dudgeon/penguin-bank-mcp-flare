# MCP Action Tasks

Based on the "What you can do with Penguin Bank MCP" section, here are the implementation tasks:

## Account Information

1. **Get Balance Function** (`get_balance`)
   - User: "What's my current balance?"
   - Response: "Your balance is $2,847.33 with $5,152.67 available credit"
   - Completion:
     - [ ] Painted door
     - [ ] Final

2. **Get Credit Limit Function** (`get_credit_limit`)
   - User: "What's my credit limit?"
   - Response: "Your credit limit is $8,000"
   - Completion:
     - [ ] Painted door
     - [ ] Final

## Transaction History

3. **Get Recent Transactions Function** (`get_recent_transactions`)
   - User: "Show me my last 5 purchases"
   - Response: "Here are your last 5 transactions:
     • Whole Foods - $67.43 (Today)
     • Netflix - $15.99 (Yesterday)
     • Shell Gas Station - $45.20 (Mar 2)
     • Amazon - $129.99 (Mar 1)
     • Starbucks - $6.75 (Mar 1)"
   - Completion:
     - [ ] Painted door
     - [ ] Final

4. **Search Transactions Function** (`search_transactions`)
   - User: "How much did I spend at Whole Foods this month?"
   - Response: "You spent $347.82 at Whole Foods across 8 transactions this month"
   - Completion:
     - [ ] Painted door
     - [ ] Final

5. **Get Pending Charges Function** (`get_pending_charges`)
   - User: "Any pending charges?"
   - Response: "Yes, $42.99 from Netflix is still processing and should post within 1-2 business days"
   - Completion:
     - [ ] Painted door
     - [ ] Final

## Payments & Transfers

6. **Make Payment Function** (`make_payment`)
   - User: "Pay $200 toward my balance"
   - Response: "✓ Payment of $200 scheduled for today. Your new balance will be $2,647.33"
   - Completion:
     - [ ] Painted door
     - [ ] Final

7. **Schedule Payment Function** (`schedule_payment`)
   - User: "Set up autopay for minimum due on the 15th"
   - Response: "✓ Autopay configured! Your minimum payment will be automatically paid on the 15th of each month"
   - Completion:
     - [ ] Painted door
     - [ ] Final

8. **Get Payment Due Date Function** (`get_payment_due_date`)
   - User: "When is my payment due?"
   - Response: "Your next payment of $35 (minimum due) is due on March 15th - that's in 12 days"
   - Completion:
     - [ ] Painted door
     - [ ] Final

## Card Management

9. **Freeze Card Function** (`freeze_card`)
   - User: "I can't find my card"
   - Response: "🔒 I've frozen your card for you. No charges can be made until you unfreeze it. Just let me know when you find it!"
   - Completion:
     - [ ] Painted door
     - [ ] Final

10. **Report Lost Card Function** (`report_lost_card`)
    - User: "My card was stolen"
    - Response: "I've immediately cancelled your card and ordered a replacement. Your new card will arrive in 3-5 business days at your registered address. A temporary virtual card is available in your app."
    - Completion:
      - [ ] Painted door
      - [ ] Final

11. **Update PIN Function** (`update_pin`)
    - User: "Change my PIN to something new"
    - Response: "I've sent a secure PIN update link to your phone ending in **7890. The link expires in 30 minutes for your security."
    - Completion:
      - [ ] Painted door
      - [ ] Final

## Disputes & Support

12. **Dispute Transaction Function** (`dispute_transaction`)
    - User: "I didn't make that $89 charge"
    - Response: "I've filed a dispute for the $89 charge. You'll receive a provisional credit within 2 business days while we investigate. We'll email you updates on the dispute status."
    - Completion:
      - [ ] Painted door
      - [ ] Final

13. **Get Statement Function** (`get_statement`)
    - User: "I need my January statement"
    - Response: "📄 I've downloaded your January 2025 statement. It shows a starting balance of $1,245.67 and ending balance of $2,847.33."
    - Completion:
      - [ ] Painted door
      - [ ] Final

---

## Implementation Notes

- Each function should handle natural language input similar to the user examples
- Responses should be conversational and include relevant details
- Functions should return structured data that can be formatted into natural language responses
- Error handling should provide helpful feedback to users
- Security considerations should be implemented for sensitive operations (payments, card management, etc.)

---

## Appendix: Additional Context, Tools, Prompts

### Development Context

**MCP Server Architecture:**
- Built on Cloudflare Workers platform
- TypeScript implementation
- RESTful API endpoints for each banking function
- Mock data for demonstration purposes
- Secure authentication and authorization patterns

**Target Integration:**
- Claude Desktop MCP client
- Other MCP-compatible AI assistants
- Web-based MCP playground for testing

### Development Tools

**Required Dependencies:**
```json
{
  "@cloudflare/workers-types": "^4.x",
  "typescript": "^5.x",
  "wrangler": "^3.x"
}
```

**Development Commands:**
```bash
# Local development
npm run dev

# Deploy to Cloudflare
npm run deploy

# Type checking
npm run type-check
```

**Testing Tools:**
- MCP Inspector for function testing
- Cloudflare Workers local development environment
- Claude Desktop for end-to-end testing

### Implementation Prompts

**For AI Assistant Development:**

1. **Function Implementation Prompt:**
   ```
   Implement the [FUNCTION_NAME] MCP function that:
   - Accepts natural language input: "[USER_EXAMPLE]"
   - Returns structured data for response: "[EXPECTED_RESPONSE]"
   - Includes proper error handling and validation
   - Follows banking security best practices
   ```

2. **Testing Prompt:**
   ```
   Test the [FUNCTION_NAME] function with these scenarios:
   - Happy path: "[USER_EXAMPLE]"
   - Edge cases: invalid inputs, missing data, network errors
   - Security validation: unauthorized access, malformed requests
   ```

3. **Integration Prompt:**
   ```
   Integrate [FUNCTION_NAME] with the MCP server:
   - Add function definition to MCP schema
   - Implement request/response handling
   - Add to function registry
   - Update documentation
   ```

### Mock Data Patterns

**Account Data:**
```typescript
interface AccountData {
  balance: number;
  availableCredit: number;
  creditLimit: number;
  lastUpdated: string;
}
```

**Transaction Data:**
```typescript
interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  status: 'posted' | 'pending';
}
```

**Payment Data:**
```typescript
interface Payment {
  amount: number;
  scheduledDate: string;
  type: 'one-time' | 'recurring';
  status: 'scheduled' | 'processing' | 'completed';
}
```

### Security Considerations

**Authentication:**
- API key validation for MCP client connections
- Rate limiting per client/function
- Request signing for sensitive operations

**Data Protection:**
- No real financial data storage
- Encrypted data transmission
- Audit logging for all operations

**Function-Specific Security:**
- Payment functions: Amount validation, duplicate prevention
- Card management: Multi-factor authentication simulation
- Account access: Session validation, timeout handling

### Error Handling Patterns

**Standard Error Responses:**
```typescript
interface ErrorResponse {
  error: string;
  code: string;
  message: string;
  suggestions?: string[];
}
```

**Common Error Scenarios:**
- Invalid input format
- Insufficient account balance
- Network/service unavailable
- Authentication failures
- Rate limit exceeded

### Testing Scenarios

**Functional Testing:**
- Each function with exact website examples
- Boundary value testing (amounts, dates)
- Invalid input handling

**Integration Testing:**
- MCP client connection
- Function discovery and execution
- Response formatting and display

**User Experience Testing:**
- Natural language input variations
- Response clarity and helpfulness
- Error message user-friendliness 