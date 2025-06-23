---
title: "Penguin Bank - AI-Powered Banking"
description: "AI assistants are getting more helpful. Banking made simple with MCP integration."
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
    section_title: "AI assistants are coming for your app"
    track_id: "intro-track"
    dots_id: "intro-dots"
    slides:
      - title: "People are using AI assistants in more ways every day"
        image: "/images/carousel/chatgpt-web-search.jpg"
        bullets:
          - "ChatGPT started with general knowledge."
          - "Web search made it more reliable and trustworthy."
          - "Long-term memory has enhanced personalization."
          - "With each leap, these apps are becoming more indispensible for more tasks."
      - title: "The new frontier is performing real work in your favorite services"
        image: "/images/carousel/chatgpt-app-store.jpg"
        bullets:
          - "ChatGPT has tried a number of integration patterns - the industry is now coalescing around 'connectors.'"
          - "ChatGPT can now search your Gmail, Calendar, and Dropbox files."
          - "AI assistants are plausibly becoming the next operating system."
      - title: "MCP will allow assistants to integrate with any company or service"
        image: "/images/carousel/farmers-market.jpg"
        bullets:
          - "Previous integrations relied on direct partnerships between AI and App providers - If your app was not chosen, users could not interact with it via ChatGPT."
          - "AI assistant providers are starting to embrace the Model Context Protocol (MCP) as a way to plug any service into your favorite AI assistant."
          - "Any company (e.g. bank) can publish an MCP Server, and users of compatible AI assistants can use it."

  features:
    section_id: "features"
    section_title: "Imagine: servicing your credit card from your favorite AI app"
    track_id: "features-track"
    dots_id: "features-dots"
    background_class: "bg-gray-50"
    videos:
      section_id: "features-videos"
      title: "Demo"
      videos:
        - vimeo_id: "1095464947"
          description: "Imagine: servicing your credit card from your favorite AI app."
        - vimeo_id: "1095466953"
          description: "Paypal has already launched basic MCP functionality for consumers (this is live, real data)."
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
      - title: "Perform multi-step tasks"
        icon: "credit-card"
        bullets:
          - "AI assistants can combine these tools to perform more complex tasks."
          - "e.g. 'Please pay my statement balance; transfer money from savings first if you need to.'"


  connect:
    section_id: "connect"
    section_title: "Try Penguin Bank MCP today"
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
        image: "/images/carousel/cloudflare-image.jpg"
        alt: "Cloudflare Workers playground interface"
        bullets:
          - "[Cloudflare AI Playground](https://playground.ai.cloudflare.com/) supports any remote MCP server today."
          - "Try Penguin Bank instantly in your browser; no account or installation required."
          - "More flexible requirements than Claude and ChatGPT."
      - title: "Connect to Claude Desktop"
        image: "/images/carousel/claude-mcp.png"
        bullets:
          - "Anthropic recently added MCP server support for all Pro customers."
          - "We anticipate this feature rolling out more broadly to free users in the future."
          - "Just go to Settings > [Integrations](https://claude.ai/settings/integrations) > Add Integration"
          - "All Penguin Bank functions work for Pro users in the desktop app and browser."
      - title: "ChatGPT"
        image: "/images/carousel/chatgpt-mcp.png"
        bullets:
          - "ChatGPT recently added MCP servers for Team, Edu, and Enterprise customer."
          - "For now, only works in 'deep research' queries."
          - "Tool support limited to 'search' and 'fetch' tools."
          - "While OpenAI lags Anthropic for MCP support, we anticipate broad access and support in the future."
      - title: "Other MCP Clients"
        image: "/images/carousel/laptop-mcp-logo.png"
        bullets:
          - "Penguin Bank MCP Works with any MCP-compatible client."
          - "New [MCP Clients](https://modelcontextprotocol.io/clients) are appearing every week."



# Banking Functions Data
functions:
  section_id: "functions"
  section_title: "What you can do with Penguin Bank MCP"
  background_class: "bg-gray-50"
  categories:
    - id: "account-information"
      title: "Account Information"
      functions:
        - name: "check-my-balance"
          status: "available today"
          user_input: "What's my current balance?"
          response: "Your balance is $2,847.33 with $5,152.67 available credit"
        - name: "get_credit_limit"
          status: "coming soon"
          user_input: "What's my credit limit?"
          response: "Your credit limit is $8,000"
    
    - id: "transaction-history"
      title: "Transaction History"
      functions:
        - name: "check-recent-transactions"
          status: "available today"
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
        - name: "pay-my-bill"
          status: "available today"
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
        - name: "lock-my-card"
          status: "available today"
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