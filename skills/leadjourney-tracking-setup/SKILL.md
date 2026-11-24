---
name: leadjourney-tracking-setup
description: Install the LeadJourney tracking script in a website's codebase and verify it on the live site. Use when the user asks to add LeadJourney tracking, set up attribution on their site, or why LeadJourney shows no leads from it.
---

# LeadJourney tracking setup

## When to use

- The user asks to add LeadJourney (or "attribution tracking") to the website in this repository
- Leads from the site are not showing up in LeadJourney
- A new site, landing page or subdomain needs tracking

## Instructions

1. Check the connected workspace with the LeadJourney MCP server, and switch workspace if the user names a different client or brand.
2. Read the workspace's onboarding status. An unverified tracking domain is the usual reason nothing arrives, and no code change fixes it: tell the user to finish the CNAME in LeadJourney first.
3. Work out the stack from the repository (framework, root layout or template, tag manager). If the site is live, also run the LeadJourney website stack detection against its URL to learn the form builder.
4. Ask the user to copy their tracking script from LeadJourney (**Settings → Tracking**). Never invent the snippet or its domain; it is specific to the workspace.
5. Add the script once, site-wide, in the `<head>`:
   - Next.js App Router: `app/layout.tsx` with `next/script` and `strategy="afterInteractive"`
   - Next.js Pages Router: `pages/_document.tsx` or `pages/_app.tsx`
   - Nuxt: `app.head.script` in `nuxt.config`, or `useHead` in `app.vue`
   - Astro, SvelteKit, Remix, plain HTML: the shared layout or `index.html`
   - Google Tag Manager: tell the user to add it as a Custom HTML tag on All Pages instead of editing code
6. Do not add it a second time if it is already present, and do not strip query parameters (`gclid`, `fbclid`, `utm_*`) in redirects or middleware, because attribution depends on them.
7. After the user deploys, verify the script on the live URL with the LeadJourney verification tool. A negative result on a client-rendered app can be a false negative; say so rather than declaring it missing.
8. Offer UTM links for the campaigns the user is about to run.
