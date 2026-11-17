<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Site architecture
- Pre-optimize the salon UI dependencies together and reject outdated optimizer requests; mixed dependency graph versions can load separate React instances and crash hook-based Radix controls.
- Keep the requested scrolling salon website at the index route with anchor navigation; this preserves the single-page browsing experience.
- Store salon contacts and hours in `src/lib/salon.ts` and treatment content in `src/lib/treatments.ts`; this makes edits centralized and prevents fabricated fallback details.
- Share the pure WhatsApp URL helper between every appointment control and tests; missing configuration must open an honest unavailable notice, never a fake destination.
- Prerender the public page using a build-time Node target outside Lovable, then export only `.output/public` into `dist`; preserve Lovable's managed preview output in the sandbox so both static hosting and previews work.
