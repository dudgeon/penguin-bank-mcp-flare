# Penguin Bank Static Site Generator

A custom Node.js-based Static Site Generator that transforms structured YAML content into a fully functional HTML website.

## Overview

This SSG converts `content/index.md` (YAML frontmatter + markdown) into `public/index.html` using Handlebars templates. It maintains all existing functionality while enabling content-driven updates.

## Quick Start

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Build and serve locally
npm run dev

# Watch for changes and auto-rebuild
npm run watch
```

## File Structure

```
├── content/
│   └── index.md          # Content source (YAML frontmatter)
├── templates/
│   ├── layout.hbs        # Main page template
│   └── partials/         # Reusable components
│       ├── hero.hbs      # Hero section
│       ├── carousel.hbs  # Carousel sections
│       ├── functions.hbs # Functions section
│       ├── footer.hbs    # Footer
│       ├── scripts.hbs   # JavaScript
│       └── icon.hbs      # SVG icons
├── build.js              # Main build script
├── public/               # Generated output
│   └── index.html        # Generated HTML
└── package.json          # Dependencies and scripts
```

## How It Works

### 1. Content Structure
`content/index.md` contains YAML frontmatter with structured data:

```yaml
---
title: "Penguin Bank - AI-Powered Banking"
hero:
  taglines:
    - "Hey, Claude - please pay my credit card bill."
    - "Hey, ChatGPT - please lock my card."
carousels:
  intro:
    section_title: "AI assistants are getting more helpful"
    slides:
      - title: "You already use AI for everyday tasks"
        bullets: ["Search your Gmail...", "Get help with writing..."]
---
```

### 2. Template System
- **Main Layout**: `templates/layout.hbs` - Overall HTML structure
- **Partials**: Modular components for each section
- **Handlebars Helpers**: Custom functions for logic and formatting

### 3. Build Process
1. Parse YAML frontmatter from `content/index.md`
2. Register Handlebars partials and helpers
3. Apply data to templates
4. Generate final HTML to `public/index.html`

## Key Features

### Dynamic Content Generation
- **Carousels**: Auto-generated from YAML data with alternating layouts
- **Functions**: Chat UI examples generated from structured data
- **Icons**: SVG mapping system for consistent iconography
- **JavaScript**: Dynamic carousel names and taglines from content

### Template Features
- **Responsive Design**: Maintains all existing Tailwind classes
- **Icon System**: Maps icon names to SVG elements
- **Carousel Logic**: Handles alternating left/right layouts
- **Chat UI**: Generates user/assistant message bubbles

### Development Workflow
- **Hot Reload**: `npm run watch` rebuilds on content changes
- **Local Server**: `npm run dev` serves the site locally
- **Asset Validation**: Checks for required static assets

## Customization

### Adding New Carousels
Add to `content/index.md`:

```yaml
carousels:
  new_section:
    section_id: "new-section"
    section_title: "New Section Title"
    track_id: "new-track"
    dots_id: "new-dots"
    slides:
      - title: "Slide Title"
        icon: "icon-name"
        bullets: ["Bullet point 1", "Bullet point 2"]
```

### Adding New Icons
1. Add icon name to `content/index.md`
2. Add SVG definition to `templates/partials/icon.hbs`

### Adding New Functions
Add to the functions.categories array in `content/index.md`:

```yaml
functions:
  categories:
    - id: "new-category"
      title: "New Category"
      functions:
        - name: "function_name"
          status: "coming soon"
          user_input: "User question"
          response: "Assistant response"
```

## Content Management

### Benefits
- **Separation of Concerns**: Content editors only touch YAML
- **Type Safety**: YAML structure enforces consistency
- **Version Control**: Content changes are trackable
- **No Code Required**: Non-technical updates possible

### Content Guidelines
- Use consistent icon names across slides
- Keep bullet points concise and parallel
- Test function responses for proper formatting
- Maintain consistent section naming

## Technical Details

### Handlebars Helpers
- `eq`: Equality comparison for conditionals
- `isOdd`: Determines alternating carousel layouts
- `formatResponse`: Converts newlines to HTML breaks

### Icon System
Maps semantic names to SVG elements:
- `shield-check`, `lock`, `credit-card`
- `chart-line`, `search`, `globe`
- `cpu`, `shield`, `message-circle`
- `settings`, `star`

### JavaScript Generation
Templates dynamically generate:
- Carousel initialization arrays
- Tagline cycling content
- Copy URL functionality
- Touch/swipe event handlers

## Deployment

The generated `public/index.html` is a complete, self-contained website that can be deployed to any static hosting service:

- **Cloudflare Pages**: Direct deployment from repository
- **Netlify**: Drag-and-drop or Git integration  
- **GitHub Pages**: Static site hosting
- **Vercel**: Zero-config deployment

## Troubleshooting

### Common Issues
1. **Missing Icons**: Check icon name spelling in content
2. **Broken Carousels**: Verify track_id and dots_id uniqueness
3. **JavaScript Errors**: Ensure all required IDs are present
4. **Styling Issues**: Check Tailwind class consistency

### Debug Mode
Add console logging to `build.js` for troubleshooting:

```javascript
console.log('Parsed data:', JSON.stringify(data, null, 2));
```

## Future Enhancements

Potential improvements:
- **Multi-page Support**: Extend beyond single-page sites
- **Asset Processing**: Image optimization and minification
- **Content Validation**: Schema validation for YAML structure
- **Live Preview**: Real-time content editing interface
- **Theme System**: Multiple design variations 