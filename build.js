const fs = require('fs-extra');
const matter = require('gray-matter');
const Handlebars = require('handlebars');
const path = require('path');
const { marked } = require('marked');

// Register Handlebars helpers
Handlebars.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
});

Handlebars.registerHelper('case', function(value, options) {
    if (value === this.switch_value) {
        return options.fn(this);
    }
});

Handlebars.registerHelper('default', function(options) {
    return options.fn(this);
});

Handlebars.registerHelper('isOdd', function(index) {
    return index % 2 === 1;
});

Handlebars.registerHelper('formatResponse', function(response) {
    if (!response) return '';
    // First parse markdown inline, then convert remaining newlines to <br> tags
    const markdownParsed = marked.parseInline(response);
    const withBreaks = markdownParsed.replace(/\n/g, '<br>\n');
    return new Handlebars.SafeString(withBreaks);
});

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

Handlebars.registerHelper('gt', function(a, b) {
    return a > b;
});

Handlebars.registerHelper('markdown', function(text) {
    if (!text) return '';
    // Parse markdown and return as safe HTML
    return new Handlebars.SafeString(marked(text));
});

Handlebars.registerHelper('markdownInline', function(text) {
    if (!text) return '';
    // Simple inline markdown parsing - just links and basic formatting
    let result = text
        // Parse links: [text](url) -> <a href="url">text</a>
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline decoration-gray-400 hover:decoration-gray-600">$1</a>')
        // Parse bold: **text** -> <strong>text</strong>
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Parse italic: *text* -> <em>text</em>
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Parse code: `text` -> <code>text</code>
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    return new Handlebars.SafeString(result);
});



async function registerPartials() {
    const partialsDir = path.join(__dirname, 'templates', 'partials');
    const partialFiles = await fs.readdir(partialsDir);
    
    for (const file of partialFiles) {
        if (file.endsWith('.hbs')) {
            const partialName = path.basename(file, '.hbs');
            const partialContent = await fs.readFile(path.join(partialsDir, file), 'utf8');
            Handlebars.registerPartial(partialName, partialContent);
        }
    }
}

async function build() {
    try {
        console.log('🔨 Starting build process...');
        
        // Register partials
        await registerPartials();
        console.log('✅ Partials registered');
        
        // Read content file
        const contentFile = await fs.readFile('content/index.md', 'utf8');
        const { data } = matter(contentFile);
        console.log('✅ Content parsed');
        
        // Read main template
        const templateFile = await fs.readFile('templates/layout.hbs', 'utf8');
        const template = Handlebars.compile(templateFile);
        console.log('✅ Template compiled');
        
        // Generate HTML
        const html = template(data);
        console.log('✅ HTML generated');
        
        // Ensure public directory exists
        await fs.ensureDir('public');
        
        // Write to public directory
        await fs.writeFile('public/index.html', html);
        console.log('✅ Generated public/index.html');
        
        // Copy static assets if they don't exist in public
        const assetsToCheck = [
            'images',
            'favicon.ico',
            'manifest.json'
        ];
        
        for (const asset of assetsToCheck) {
            const publicPath = path.join('public', asset);
            if (!(await fs.pathExists(publicPath))) {
                console.log(`⚠️  Warning: ${asset} not found in public directory`);
            }
        }
        
        console.log('🎉 Build completed successfully!');
        console.log('📁 Output: public/index.html');
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run build if this script is called directly
if (require.main === module) {
    build();
}

module.exports = { build }; 