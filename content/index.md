---
title: "Penguin Bank - AI-Powered Banking"
description: "AI assistants are getting more helpful. Banking made simple with MCP integration. Auto-building with SSG!"
layout: "home"

# Hero Section Data
hero:
  section_id: "hero"
  tagline_id: "hero-tagline"
  taglines:
    - "Hey, Claude - please pay my credit card bill."
    - "Hey, ChatGPT - please lock my card."
    - "Hey, Gemini - how much did I spend on groceries this month?"

# Carousel Data for SSG Generation
carousels:
  intro:
    section_id: "intro"
    section_title: "AI assistants are getting more helpful"
    track_id: "intro-track"
    dots_id: "intro-dots"
    slides:
      - title: "People are using AI assistants in more ways every day"
        icon: "shield-check"
        bullets:
          - "Search your Gmail and calendar directly in Claude"
          - "Get help with writing, research, and planning"
          - "AI assistants are becoming essential daily tools"
      - title: "MCPs connect AI to your services"
        icon: "lock"
        bullets:
          - "Secure connections between AI and your apps"
          - "Same technology that powers Gmail integration"
          - "Your data stays private and protected"
      - title: "Banking where you already work"
        icon: "credit-card"
        bullets:
          - "No app switching - stay in your AI assistant"
          - "Handle all credit card tasks conversationally"
          - "Banking that adapts to your workflow"

  features:
    section_id: "features"
    section_title: "Banking made simple"
    track_id: "features-track"
    dots_id: "features-dots"
    background_class: "bg-gray-50"
    slides:
      - title: "Check recent transactions"
        icon: "chart-line"
        bullets:
          - "View spending by category or merchant"
          - "Search transactions with natural language"
          - "Get instant insights about your habits"
      - title: "Make payments"
        icon: "credit-card"
        bullets:
          - "Pay any amount with simple commands"
          - "Schedule future payments easily"
          - "Set up autopay in seconds"
      - title: "Order replacement cards"
        icon: "search"
        bullets:
          - "Instantly freeze lost or stolen cards"
          - "Order replacements with one request"
          - "Get virtual card access immediately"

  connect:
    section_id: "connect"
    section_title: "Try it yourself"
    track_id: "connect-track"
    dots_id: "connect-dots"
    copy_url:
      text: "Try the Penguin Bank MCP server today."
      url: "https://mcp.penguinbank.cloud/"
      field_id: "mcp-url"
      copy_icon_id: "copy-icon"
      copied_icon_id: "copied-icon"
    slides:
      - title: "Cloudflare Playground"
        image: "/images/carousel/cloudflare-image.png"
        alt: "Cloudflare Workers playground interface"
        bullets:
          - "[Cloudflare AI Playground](https://playground.ai.cloudflare.com/) supports any remote MCP server today"
          - "Try Penguin Bank instantly in your browser"
          - "No setup or installation required"
          - "Perfect for testing before connecting"
      - title: "Connect to Claude Desktop"
        icon: "cpu"
        bullets:
          - "Add Penguin Bank to your Claude config"
          - "Enjoy seamless banking in your workflow"
          - "Works with all Claude Desktop features"
      - title: "Other MCP Clients"
        icon: "shield"
        bullets:
          - "Works with any MCP-compatible client"
          - "Future-proof your banking integration"
          - "Part of the growing MCP ecosystem"

  feedback:
    section_id: "feedback"
    section_title: "Help us build the future"
    track_id: "feedback-track"
    dots_id: "feedback-dots"
    slides:
      - title: "What features do you want?"
        icon: "message-circle"
        bullets:
          - "Investment account integration"
          - "Budgeting and savings goals"
          - "Multi-bank account management"
      - title: "How can we improve?"
        icon: "settings"
        bullets:
          - "Better natural language understanding"
          - "More detailed transaction insights"
          - "Faster response times and reliability"
      - title: "Share your experience"
        icon: "star"
        bullets:
          - "Tell us what works well for you"
          - "Report any issues or bugs you find"
          - "Suggest new use cases and workflows"

# Banking Functions Data
functions:
  section_id: "functions"
  section_title: "What you can do with Penguin Bank MCP"
  background_class: "bg-gray-50"
  categories:
    - id: "account-information"
      title: "Account Information"
      functions:
        - name: "get_balance"
          status: "coming soon"
          user_input: "What's my current balance?"
          response: "Your balance is $2,847.33 with $5,152.67 available credit"
        - name: "get_credit_limit"
          status: "coming soon"
          user_input: "What's my credit limit?"
          response: "Your credit limit is $8,000"
    
    - id: "transaction-history"
      title: "Transaction History"
      functions:
        - name: "get_recent_transactions"
          status: "coming soon"
          user_input: "Show me my last 5 purchases"
          response: "Here are your last 5 transactions:\n• Whole Foods - $67.43 (Today)\n• Netflix - $15.99 (Yesterday)\n• Shell Gas Station - $45.20 (Mar 2)\n• Amazon - $129.99 (Mar 1)\n• Starbucks - $6.75 (Mar 1)"
        - name: "search_transactions"
          status: "coming soon"
          user_input: "How much did I spend at Whole Foods this month?"
          response: "You spent $347.82 at Whole Foods across 8 transactions this month"
        - name: "get_pending_charges"
          status: "coming soon"
          user_input: "Any pending charges?"
          response: "Yes, $42.99 from Netflix is still processing and should post within 1-2 business days"
    
    - id: "payments-transfers"
      title: "Payments & Transfers"
      functions:
        - name: "make_payment"
          status: "coming soon"
          user_input: "Pay $200 toward my balance"
          response: "✓ Payment of $200 scheduled for today. Your new balance will be $2,647.33"
        - name: "schedule_payment"
          status: "coming soon"
          user_input: "Set up autopay for minimum due on the 15th"
          response: "✓ Autopay configured! Your minimum payment will be automatically paid on the 15th of each month"
        - name: "get_payment_due_date"
          status: "coming soon"
          user_input: "When is my payment due?"
          response: "Your next payment of $35 (minimum due) is due on March 15th - that's in 12 days"
    
    - id: "card-management"
      title: "Card Management"
      functions:
        - name: "freeze_card"
          status: "coming soon"
          user_input: "I can't find my card"
          response: "🔒 I've frozen your card for you. No charges can be made until you unfreeze it. Just let me know when you find it!"
        - name: "report_lost_card"
          status: "coming soon"
          user_input: "My card was stolen"
          response: "I've immediately cancelled your card and ordered a replacement. Your new card will arrive in 3-5 business days at your registered address. A temporary virtual card is available in your app."
        - name: "update_pin"
          status: "coming soon"
          user_input: "Change my PIN to something new"
          response: "I've sent a secure PIN update link to your phone ending in **7890. The link expires in 30 minutes for your security."
    
    - id: "disputes-support"
      title: "Disputes & Support"
      functions:
        - name: "dispute_transaction"
          status: "coming soon"
          user_input: "I didn't make that $89 charge"
          response: "I've filed a dispute for the $89 charge. You'll receive a provisional credit within 2 business days while we investigate. We'll email you updates on the dispute status."
        - name: "get_statement"
          status: "coming soon"
          user_input: "I need my January statement"
          response: "📄 I've downloaded your January 2025 statement. It shows a starting balance of $1,245.67 and ending balance of $2,847.33."

# Footer Data
footer:
  section_id: "footer"
  links:
    - text: "About MCPs"
      href: "#intro"
    - text: "Features"
      href: "#features"
    - text: "Get Started"
      href: "#connect"
    - text: "Functions"
      href: "#functions"
    - text: "Feedback"
      href: "#feedback"
  copyright: "Penguin Bank is a demonstration MCP server for AI-powered banking. © 2025 Geoff Dudgeon."
---

<!-- 
SSG TEMPLATE INSTRUCTIONS:
This markdown file provides structured data for generating the Penguin Bank website.
An SSG should use this data to programmatically generate:

1. HERO SECTION: Use hero.taglines array for cycling text
2. CAROUSEL SECTIONS: Use carousels object to generate each section:
   - Loop through carousels.{name}.slides to create carousel-slide divs
   - Use section_id, track_id, dots_id for proper HTML IDs
   - Generate navigation arrows and dots programmatically
3. FUNCTIONS SECTION: Use functions.categories to generate function cards:
   - Loop through categories to create category divs with proper IDs
   - Loop through functions within each category for chat examples
4. FOOTER: Use footer.links and footer.copyright

REQUIRED HTML STRUCTURE FOR SSG:
- All carousel containers need: bg-{color} rounded-xl shadow-sm overflow-hidden relative mb-8
- Carousel tracks need: carousel-track class with proper ID
- Navigation needs: carousel-nav absolute positioning with onclick handlers
- Dots need: flex justify-center gap-2 pb-6 with proper ID
- Function cards need: bg-white rounded-xl p-8 shadow-sm with hover effects
- Chat containers need: max-w-2xl mx-auto mb-8 structure

JAVASCRIPT DEPENDENCIES:
- Carousel navigation functions (navigateCarousel, goToSlide, initCarousel)
- Touch/swipe event handlers for mobile
- Hero tagline cycling animation
- Copy URL functionality
- Tailwind CSS configuration with penguin color theme

EXAMPLE SSG TEMPLATE USAGE (Liquid/Nunjucks style):
{% for carousel_name, carousel_data in carousels %}
<section id="{{ carousel_data.section_id }}" class="py-16 px-4{% if carousel_data.background_class %} {{ carousel_data.background_class }}{% endif %}">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">{{ carousel_data.section_title }}</h2>
    <div class="bg-{% if carousel_data.background_class %}white{% else %}gray-50{% endif %} rounded-xl shadow-sm overflow-hidden relative mb-8">
      <div class="carousel-track" id="{{ carousel_data.track_id }}">
        {% for slide in carousel_data.slides %}
        <div class="carousel-slide py-12 px-8 md:py-12 md:px-8">
          <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="w-full h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-500 order-1{% if loop.index0 % 2 == 1 %} md:order-2{% endif %}">
              <!-- Icon SVG based on slide.icon -->
            </div>
            <div class="order-2{% if loop.index0 % 2 == 1 %} md:order-1{% endif %}">
              <h3 class="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">{{ slide.title }}</h3>
              <ul class="space-y-5 text-gray-600 text-lg leading-relaxed list-none">
                {% for bullet in slide.bullets %}
                <li class="flex items-start">{{ bullet }}</li>
                {% endfor %}
              </ul>
            </div>
          </div>
        </div>
        {% endfor %}
      </div>
      <div class="carousel-nav absolute top-1/2 -translate-y-1/2 left-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer" onclick="navigateCarousel('{{ carousel_name }}', -1)">‹</div>
      <div class="carousel-nav absolute top-1/2 -translate-y-1/2 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer" onclick="navigateCarousel('{{ carousel_name }}', 1)">›</div>
      <div class="flex justify-center gap-2 pb-6" id="{{ carousel_data.dots_id }}"></div>
    </div>
  </div>
</section>
{% endfor %}

# Penguin Bank - AI-Powered Banking

*This content is managed in structured YAML frontmatter above for SSG generation. The SSG should use the data structures to programmatically generate carousel slides, function cards, and other dynamic content rather than hardcoding HTML elements.*
--> 