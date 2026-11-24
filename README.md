# LeadJourney

Cursor plugin that connects agents to [LeadJourney](https://leadjourney.io) through LeadJourney's official remote [Model Context Protocol](https://modelcontextprotocol.io/) server.

LeadJourney is marketing attribution: it follows a click from the ad or post that produced it to the lead it became and the revenue that lead eventually earned. Ask which channels, campaigns and creatives bring leads and revenue, read a single lead's journey, run custom reports, and set up tracking on a website — from the signed-in LeadJourney workspace.

## Install

1. Open **Cursor Settings → Plugins**.
2. Search for **LeadJourney**.
3. Click **Install**, then complete the LeadJourney sign-in prompt.

Or run `/add-plugin leadjourney` in chat.

To add only the MCP server, use the **Add to Cursor** button in LeadJourney under **Atlas settings → MCP**, or open this link:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=leadjourney&config=eyJ1cmwiOiJodHRwczovL2FwaS5sZWFkam91cm5leS5pby9tY3AifQ%3D%3D
```

## MCP

```json
{
  "mcpServers": {
    "leadjourney": {
      "type": "http",
      "url": "https://api.leadjourney.io/mcp"
    }
  }
}
```

Auth is OAuth against LeadJourney. Cursor prompts for LeadJourney sign-in when the plugin connects — there is no API key or client ID to configure.

## Before you connect

You need a LeadJourney account with access to a workspace. Which tools appear depends on the permissions your account holds in the active workspace.

## What agents can do

| Category | Capabilities |
| --- | --- |
| Workspaces | See the connected account, list workspaces, switch the active one, check what the plan includes |
| Reports | Traffic channel, campaign and ad creative reports with leads, conversions, spend and revenue |
| Report builder | Any metric by any dimension, filtered and grouped, beyond the fixed reports |
| Leads | Search leads by email, phone or name and read a lead's full journey |
| Live ad data | Read Google, Meta and other connected ad platforms live: metrics, breakdowns, settings, recommendations |
| Dashboards | Create dashboards and add or remove reports |
| Tracking | Detect a site's CMS and form builder, verify the tracking script, manage tracking domains, build UTM and short links |
| Apps | Read app status, manage triggers and send-back rules, map events onto CRM stages |
| Automations & agents | Create, test, dry-run and run automations and AI agents |

The hosted runtime is the source of truth for tool names and schemas.

## Skills

- **leadjourney-tracking-setup** — install the LeadJourney tracking script in a website's codebase (Next.js, Nuxt, plain HTML and others), then verify it on the live site.

## Notes

- Tool calls run as the LeadJourney user who authorizes the connection and cannot exceed that user's workspace permissions.
- Changes to live ad accounts are only ever requested: nothing on an ad account changes until a person confirms it inside LeadJourney.
- LeadJourney hosts the server itself; this plugin does not wrap a local stdio server.
- Revoke access at any time in LeadJourney under **Atlas settings → MCP → Connected applications**.

## Privacy and terms

The plugin sends your requests to LeadJourney's MCP server, which answers them from your LeadJourney workspace. How LeadJourney handles that data is set out in its privacy policy.

- Privacy policy: https://leadjourney.io/privacy-policy/
- Terms and conditions: https://leadjourney.io/terms-conditions

## Docs

- Website: https://leadjourney.io
- Server URL: https://api.leadjourney.io/mcp

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md). Report security issues privately as described in [SECURITY.md](SECURITY.md).

## License

MIT
