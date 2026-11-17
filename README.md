# Perfect Skin by Michele

Luxe Nederlandstalige, statisch te publiceren salonwebsite. React, Vite, Tailwind CSS v4 en de TanStack Start-router van de Lovable-basis. Geen database, login, online reserveringssysteem, serverfunctie of betaalde API. De productiepagina wordt tijdens het bouwen vooraf naar HTML gerenderd; op Cloudflare Pages draait geen server.

## Lokaal starten

Gebruik Node.js 22.12 of nieuwer en npm.

```sh
npm install
npm run dev
```

## Gegevens bijwerken

- `src/lib/salon.ts`: WhatsApp, telefoon, e-mail, Instagram (volledige https-URL), adres, openingstijden en persoonlijke foto.
- Telefoon en WhatsApp: wijzig uitsluitend de centrale `phone`-waarde in `src/lib/salon.ts`. Deze staat op `06 22863731`; de internationale WhatsApp-bestemming `31622863731` wordt automatisch daarvan afgeleid. Alle afspraakknoppen gebruiken dezelfde configuratie en vullen het algemene bericht of de gekozen behandeling in.
- `src/lib/treatments.ts`: beschrijvingen, prijzen en behandeltijden. Deze laatste twee blijven leeg totdat de echte waarden bekend zijn.
- `src/assets/`: tijdelijke, gegenereerde sfeerfoto's. Geen echte behandelresultaten en geen portret van Michele. Vervang de bestanden of imports voor eigen foto's. Voor een persoonlijk portret kun je een lokaal bestand in `public/images/` zetten en het pad daarvan als `michelePhoto` invullen. Pas na echte resultaatfoto's ook de bijbehorende sfeerbeeldlabels aan.
- `src/styles.css`: centrale huisstijl en mobiele vormgeving.
- `src/routes/index.tsx`: alle teksten, SEO en paginaonderdelen.

## Publicatie via GitHub en Cloudflare Pages Free

1. Bewaar deze broncode in een eigen nieuwe GitHub-repository. Voeg geen `node_modules`, `dist`, `.output`, `.git` uit andere projecten of geheimen toe.
2. Open Cloudflare → Workers & Pages → Create application → Pages → Connect to Git.
3. Selecteer uitsluitend de nieuwe repository en gewenste branch.
4. Gebruik framework **React + Vite** (of **None** als die optie ontbreekt), build command **`npm run build`**, output directory **`dist`**.
5. Stel eventueel `NODE_VERSION` in op `22`. Er zijn geen API-sleutels of andere omgevingsvariabelen nodig; stel geen Lovable-sandboxvariabelen in.
6. Publiceer en controleer de homepage, mobiele navigatie en WhatsApp na het invullen van het echte nummer.

`npm run build` voert ook de automatische `postbuild` uit. Die controleert of de homepage is gerenderd en kopieert uitsluitend de statische inhoud van `.output/public` naar `dist`. Upload nooit de `.output/server`-map. Lovable behoudt intern zijn eigen voorbeeldweergave-indeling; de zelfstandige export wordt buiten die omgeving gemaakt. Google Fonts is een gratis, optionele lettertypebron; de pagina heeft lokale systeemlettertype-fallbacks.

Geen bestaande externe projecten zijn aangepast of verbonden. Er is nog niets gepubliceerd. Een volledige zelfstandige productiebuild buiten Lovable moet voor publicatie nog op de eigen machine of in Cloudflare worden bevestigd.

## Controles

```sh
npm test
```

Tests controleren onder andere alle openingstijden, het echte WhatsApp-nummer, de veilige afhandeling van ontbrekende nummers en de exacte algemene en behandelingsspecifieke berichten. Alle afspraakknoppen en de contactlinks zijn op desktop en mobiel gecontroleerd.
