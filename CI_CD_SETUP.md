# CI/CD Pipeline Setup Guide

This repository uses GitHub Actions to automatically deploy both the static site (Cloudflare Pages) and the MCP Worker to Cloudflare whenever changes are merged to the main branch.

## Features

✅ **Smart Deployments**: Only deploys components that have changed  
✅ **Parallel Execution**: Pages and Worker deployments run simultaneously  
✅ **Quality Checks**: Includes linting and type checking for the Worker  
✅ **Preview Deployments**: Automatic preview deployments for pull requests  
✅ **Deployment Summary**: Clear status reporting in GitHub  

## Prerequisites

Before the CI/CD pipeline can work, you need to set up the following:

### 1. Cloudflare API Credentials

1. **Get your Account ID**:
   - Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Copy your Account ID from the right sidebar

2. **Create an API Token**:
   - Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use the "Edit Cloudflare Workers" template
   - **Account Resources**: Include your account
   - **Zone Resources**: Include all zones (or specific zones if preferred)
   - Click "Continue to Summary" → "Create Token"
   - **Important**: Copy the token immediately - you won't see it again!

### 2. GitHub Repository Secrets

Add these secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `CLOUDFLARE_API_TOKEN` | Your API token from step 1 | Allows GitHub to deploy to Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | Your Account ID from step 1 | Specifies which Cloudflare account to use |

### 3. Create Cloudflare Projects

#### Pages Project
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Click **Create application** → **Pages** → **Upload assets**
3. Name your project: `penguin-bank` (or use your existing project name)
4. Upload any file temporarily (the CI/CD will handle real deployments)

#### Worker Project
The Worker project will be created automatically when you first deploy via the CI/CD pipeline.

## How It Works

### Deployment Triggers

- **Main Branch**: Full deployment of both Pages and Worker
- **Pull Requests**: Preview deployments with status checks
- **Smart Detection**: Only deploys components that have changed

### Pipeline Jobs

1. **Change Detection**: Analyzes which parts of the codebase changed
2. **Deploy Pages**: Deploys static site from `public/` directory
3. **Deploy Worker**: Builds and deploys MCP server from `my-mcp-server/`
4. **Quality Checks**: Runs type checking and linting on Worker code
5. **Summary**: Reports deployment status

### File Structure

```
penguin-bank-mcp-flare/
├── .github/workflows/deploy.yml    # CI/CD pipeline configuration
├── public/                         # Static site files (Pages)
│   ├── index.html
│   ├── images/
│   └── ...
├── my-mcp-server/                  # MCP Worker source
│   ├── src/
│   ├── package.json
│   ├── wrangler.jsonc
│   └── ...
└── wrangler.jsonc                  # Pages configuration
```

## Usage

### Automatic Deployments

1. **Merge to main**: Push or merge changes to the `main` branch
2. **GitHub Actions**: Pipeline automatically runs
3. **Deployment**: Updated code goes live on Cloudflare

### Manual Deployment

If you need to deploy manually:

```bash
# Deploy Pages
npx wrangler pages deploy public --project-name=penguin-bank

# Deploy Worker
cd my-mcp-server
npm run deploy
```

### Preview Deployments

- Open a Pull Request
- GitHub Actions will create preview deployments
- Check the PR comments for preview URLs
- Review changes before merging

## Monitoring

### GitHub Actions

- View pipeline status: **Actions** tab in your repository
- Check logs for troubleshooting
- Review deployment summaries

### Cloudflare Dashboard

- **Pages**: [dash.cloudflare.com/pages](https://dash.cloudflare.com/pages)
- **Workers**: [dash.cloudflare.com/workers](https://dash.cloudflare.com/workers)
- Monitor performance, logs, and analytics

## Troubleshooting

### Common Issues

**❌ "Invalid API token"**
- Verify `CLOUDFLARE_API_TOKEN` is set correctly
- Ensure token has proper permissions
- Check if token has expired

**❌ "Account ID not found"**
- Verify `CLOUDFLARE_ACCOUNT_ID` matches your Cloudflare account
- Ensure account ID is copied correctly

**❌ "Project not found"**
- Create the Pages project in Cloudflare Dashboard first
- Ensure project name matches in the workflow

**❌ "Build failed"**
- Check the Actions logs for specific error messages
- Verify all dependencies are properly listed in `package.json`
- Ensure TypeScript compiles without errors

### Getting Help

1. Check the **Actions** tab for detailed error logs
2. Review [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
3. Check [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)

## Security Best Practices

✅ **Never commit API tokens** to your repository  
✅ **Use GitHub Secrets** for all sensitive data  
✅ **Scope API tokens** to minimum required permissions  
✅ **Regularly rotate** API tokens  
✅ **Monitor deployment logs** for suspicious activity  

## Advanced Configuration

### Custom Deployment Conditions

Edit `.github/workflows/deploy.yml` to customize when deployments run:

```yaml
# Only deploy on specific file changes
- 'src/**'
- 'public/**'

# Skip deployment with commit message
git commit -m "docs: update README [skip ci]"
```

### Environment Variables

Add environment variables in Cloudflare Dashboard:
1. Go to your Worker → **Settings** → **Variables**
2. Add production environment variables
3. Use `wrangler secret put` for sensitive values

### Multiple Environments

Create separate workflows for staging/production:
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

---

## Next Steps

1. ✅ Set up API credentials
2. ✅ Add GitHub secrets
3. ✅ Create Cloudflare projects
4. ✅ Test the pipeline with a small change
5. ✅ Monitor your first deployment

Your CI/CD pipeline is now ready! 🚀 