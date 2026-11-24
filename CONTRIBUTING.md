# Contributing

Thanks for helping improve the LeadJourney Cursor plugin.

## How changes land

- `main` is protected. Every change goes through a pull request, and a LeadJourney maintainer reviews and merges it.
- Pull requests are squash-merged.
- The **Validate plugin** check must pass.

## Making a change

1. Fork the repository and create a branch.
2. Make your change. Keep the layout Cursor expects:
   - `.cursor-plugin/plugin.json` — the manifest
   - `mcp.json` — the remote MCP server
   - `skills/<name>/SKILL.md` — skills, with `name` and `description` frontmatter
3. Run `node scripts/validate.mjs`.
4. Test locally: copy the repository to `~/.cursor/plugins/local/leadjourney` and reload Cursor.
5. Bump `version` in `plugin.json` and add a `CHANGELOG.md` entry.
6. Open a pull request.

## What we will not merge

- API keys, tokens or other credentials in any file.
- Changes that point `mcp.json` anywhere other than LeadJourney's hosted server.
