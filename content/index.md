---
title: "Penguin Bank - AI-Powered Banking"
description: "AI assistants are getting more helpful. Banking made simple with MCP integration."
layout: "home"
---

<!-- 
HTML SECTION MAPPING:
- Hero Section: <header class="penguin-gradient section-padding">
- MCP Introduction: <section id="intro" class="section-padding">
- Features: <section id="features" class="section-padding bg-light">
- Get Started: <section id="connect" class="section-padding">
- Functions: <section id="functions" class="section-padding bg-light">
- Feedback: <section id="feedback" class="section-padding">
- Footer: <footer>

KEY JAVASCRIPT IDs:
- hero-tagline: Cycling taglines
- mcp-url: URL input field for copying
- copy-icon: Default copy button state (clipboard icon)
- copied-icon: Success copy button state (checkmark icon)
- intro-track: MCP introduction carousel
- features-track: Features carousel  
- connect-track: Get started carousel
- feedback-track: Feedback carousel

COMPONENT CLASSES:
- .copy-url-container: Responsive container for "try it today" text and URL field
- .copy-url-text: "Try it today" text with responsive alignment
- .carousel-container: Carousel wrapper
- .carousel-slide: Individual slides
- .feature-card: Function category containers
- .chat-container: Individual function examples
- .function-label: Function name labels
- .chat-message: User/assistant chat bubbles
-->

# Hero Section
<!-- HTML: <header class="penguin-gradient section-padding"> -->

## Taglines
<!-- HTML: <p class="hero-tagline hero-tagline-cycling" id="hero-tagline"> with JavaScript cycling -->
- "Hey, Claude - please pay my credit card bill."
- "Hey, ChatGPT - please lock my card."
- "Hey, Gemini - how much did I spend on groceries this month?"

# Sections

## AI assistants are getting more helpful
<!-- HTML: <section id="intro" class="section-padding"> -->

### Carousel Slides
<!-- HTML: <div class="carousel-container"> with carousel-track id="intro-track" -->

#### Slide 1: You already use AI for everyday tasks
<!-- HTML: <div class="carousel-slide"> with carousel-card class -->
- Search your Gmail and calendar directly in Claude
- Get help with writing, research, and planning
- AI assistants are becoming essential daily tools

#### Slide 2: MCPs connect AI to your services
- Secure connections between AI and your apps
- Same technology that powers Gmail integration
- Your data stays private and protected

#### Slide 3: Banking where you already work
- No app switching - stay in your AI assistant
- Handle all credit card tasks conversationally
- Banking that adapts to your workflow

## Banking made simple
<!-- HTML: <section id="features" class="section-padding bg-light"> -->

### Carousel Slides
<!-- HTML: <div class="carousel-container"> with carousel-track id="features-track" -->

#### Slide 1: Check recent transactions
- View spending by category or merchant
- Search transactions with natural language
- Get instant insights about your habits

#### Slide 2: Make payments
- Pay any amount with simple commands
- Schedule future payments easily
- Set up autopay in seconds

#### Slide 3: Order replacement cards
- Instantly freeze lost or stolen cards
- Order replacements with one request
- Get virtual card access immediately

## Try it yourself
<!-- HTML: <section id="connect" class="section-padding"> -->

### Try it today text and URL copy
<!-- HTML: <div class="copy-url-container"> with responsive layout -->
**Text:** "Try the Penguin Bank MCP server today."
**URL Field:** `https://mcp.penguinbank.cloud/` with copy button functionality
- Desktop: Text appears to the left of URL field
- Mobile: Text stacked above URL field
- Copy button with icon feedback (clipboard → checkmark)

### Carousel Slides
<!-- HTML: <div class="carousel-container"> with carousel-track id="connect-track" -->

#### Slide 1: Cloudflare Playground
- Try Penguin Bank instantly in your browser
- No setup or installation required
- Perfect for testing before connecting

#### Slide 2: Connect to Claude Desktop
- Add Penguin Bank to your Claude config
- Enjoy seamless banking in your workflow
- Works with all Claude Desktop features

#### Slide 3: Other MCP Clients
- Works with any MCP-compatible client
- Future-proof your banking integration
- Part of the growing MCP ecosystem

## Functions
<!-- HTML: <section id="functions" class="section-padding bg-light"> -->
**Heading:** "What you can do with Penguin Bank MCP"

### Account Information
<!-- HTML: <div class="feature-card"> -->

#### Get Balance Function
<!-- HTML: <div class="chat-container"> with function-label and chat-message elements -->
**Function:** `get_balance` - coming soon
**User:** "What's my current balance?"
**Response:** "Your balance is $2,847.33 with $5,152.67 available credit"

#### Get Credit Limit Function
<!-- HTML: <div class="chat-container"> with function-label and chat-message elements -->
**Function:** `get_credit_limit` - coming soon
**User:** "What's my credit limit?"
**Response:** "Your credit limit is $8,000"

### Transaction History
<!-- HTML: <div class="feature-card"> -->

#### Get Recent Transactions Function
<!-- HTML: <div class="chat-container"> with function-label and chat-message elements -->
**Function:** `get_recent_transactions` - coming soon
**User:** "Show me my last 5 purchases"
**Response:** "Here are your last 5 transactions:
• Whole Foods - $67.43 (Today)
• Netflix - $15.99 (Yesterday)
• Shell Gas Station - $45.20 (Mar 2)
• Amazon - $129.99 (Mar 1)
• Starbucks - $6.75 (Mar 1)"

#### Search Transactions Function
**Function:** `search_transactions` - coming soon
**User:** "How much did I spend at Whole Foods this month?"
**Response:** "You spent $347.82 at Whole Foods across 8 transactions this month"

#### Get Pending Charges Function
**Function:** `get_pending_charges` - coming soon
**User:** "Any pending charges?"
**Response:** "Yes, $42.99 from Netflix is still processing and should post within 1-2 business days"

### Payments & Transfers
<!-- HTML: <div class="feature-card"> -->

#### Make Payment Function
<!-- HTML: <div class="chat-container"> with function-label and chat-message elements -->
**Function:** `make_payment` - coming soon
**User:** "Pay $200 toward my balance"
**Response:** "✓ Payment of $200 scheduled for today. Your new balance will be $2,647.33"

#### Schedule Payment Function
**Function:** `schedule_payment` - coming soon
**User:** "Set up autopay for minimum due on the 15th"
**Response:** "✓ Autopay configured! Your minimum payment will be automatically paid on the 15th of each month"

#### Get Payment Due Date Function
**Function:** `get_payment_due_date` - coming soon
**User:** "When is my payment due?"
**Response:** "Your next payment of $35 (minimum due) is due on March 15th - that's in 12 days"

### Card Management
<!-- HTML: <div class="feature-card"> -->

#### Freeze Card Function
<!-- HTML: <div class="chat-container"> with function-label and chat-message elements -->
**Function:** `freeze_card` - coming soon
**User:** "I can't find my card"
**Response:** "🔒 I've frozen your card for you. No charges can be made until you unfreeze it. Just let me know when you find it!"

#### Report Lost Card Function
**Function:** `report_lost_card` - coming soon
**User:** "My card was stolen"
**Response:** "I've immediately cancelled your card and ordered a replacement. Your new card will arrive in 3-5 business days at your registered address. A temporary virtual card is available in your app."

#### Update PIN Function
**Function:** `update_pin` - coming soon
**User:** "Change my PIN to something new"
**Response:** "I've sent a secure PIN update link to your phone ending in **7890. The link expires in 30 minutes for your security."

### Disputes & Support
<!-- HTML: <div class="feature-card"> -->

#### Dispute Transaction Function
<!-- HTML: <div class="chat-container"> with function-label and chat-message elements -->
**Function:** `dispute_transaction` - coming soon
**User:** "I didn't make that $89 charge"
**Response:** "I've filed a dispute for the $89 charge. You'll receive a provisional credit within 2 business days while we investigate. We'll email you updates on the dispute status."

#### Get Statement Function
**Function:** `get_statement` - coming soon
**User:** "I need my January statement"
**Response:** "📄 I've downloaded your January 2025 statement. It shows a starting balance of $1,245.67 and ending balance of $2,847.33."

## Help us build the future
<!-- HTML: <section id="feedback" class="section-padding"> -->

### Carousel Slides
<!-- HTML: <div class="carousel-container"> with carousel-track id="feedback-track" -->

#### Slide 1: What features do you want?
- Investment account integration
- Budgeting and savings goals
- Multi-bank account management

#### Slide 2: How can we improve?
- Better natural language understanding
- More detailed transaction insights
- Faster response times and reliability

#### Slide 3: Share your experience
- Tell us what works well for you
- Report any issues or bugs you find
- Suggest new use cases and workflows

## Footer
<!-- HTML: <footer> with footer-content class -->

### Links
<!-- HTML: <div class="footer-links"> -->
- About MCPs
- Features
- Get Started
- Functions
- Feedback

### Copyright
"© 2024 Penguin Bank. A demonstration MCP server for AI-powered banking." 