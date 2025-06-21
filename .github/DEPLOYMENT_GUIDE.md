# 🚀 Quick Deployment Reference

## Emergency Commands

### Skip CI/CD (Emergency)
```bash
git commit -m "hotfix: critical bug [skip ci]"
```

### Manual Deploy (Backup)
```bash
# Pages only
npx wrangler pages deploy public --project-name=penguin-bank

# Worker only  
cd my-mcp-server && npm run deploy

# Both (run in parallel)
npx wrangler pages deploy public --project-name=penguin-bank & cd my-mcp-server && npm run deploy
```

## Status Checks

### GitHub Actions Status
- ✅ All checks passing → Safe to merge
- ⏳ Checks running → Wait before merging  
- ❌ Checks failed → Fix issues before merging

### Deployment URLs
- **Pages**: `https://penguin-bank.pages.dev` or `https://penguinbank.cloud`
- **Worker**: Check Cloudflare Dashboard for endpoint
- **Preview**: Check PR comments for preview URLs

## Common Workflows

### 1. Feature Development
```bash
git checkout -b feature/new-feature
# Make changes...
git push origin feature/new-feature
# Create PR → Preview deployment automatic
```

### 2. Hotfix
```bash
git checkout -b hotfix/critical-fix
# Fix the issue...
git push origin hotfix/critical-fix
# Create PR → Review → Merge → Auto deploy
```

### 3. Rollback (if needed)
```bash
# Revert the problematic commit
git revert <commit-hash>
git push origin main
# Auto deployment will rollback
```

## Monitoring Links

- [GitHub Actions](../../actions)
- [Cloudflare Pages](https://dash.cloudflare.com/pages)  
- [Cloudflare Workers](https://dash.cloudflare.com/workers)

## Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Deploy failed | Check Actions logs → Fix issue → Push again |
| Preview not working | Check PR comments for preview URL |
| Worker error | Check Cloudflare Workers logs |
| Pages not updating | Clear browser cache, check deployment status |

---
*For detailed setup instructions, see [CI_CD_SETUP.md](../CI_CD_SETUP.md)* 