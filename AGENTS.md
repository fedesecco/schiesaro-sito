# Kopio Office

## Scopo del progetto

Kopio Office è un sito portfolio Angular per presentare i progetti dello studio e le informazioni istituzionali.
È una singola applicazione Angular 21 con pagine standalone e contenuti editoriali tipizzati.

Struttura principale:

- `/` — hero iniziale; il titolo porta a `/home`.
- `/home` — portfolio con il placeholder `VIDEO` e le schede progetto.
- `/projects/:slug` — dettaglio editoriale e media di un progetto.
- `/about` — informazioni e contatti dello studio.
- `src/app/pages/` — componenti delle pagine.
- `src/app/content/` e `src/app/models/` — dati e contratti TypeScript normalizzati.
- `public/projects/` — asset statici realmente pubblicati dal browser.
- `raw/` — materiale sorgente immutabile; non è una directory runtime.
- `raw/mockup/` — riferimenti visuali, non contenuto da pubblicare.

## Routing delle skill

Leggere questa guida e soltanto le skill pertinenti al task; non caricare o duplicare le specifiche non coinvolte.

| Task | Skill | Quando usarla |
| --- | --- | --- |
| Codice TypeScript Angular | `.codex/skills/angular/SKILL.md` | Componenti, servizi, direttive, pipe, guard, DI, routing e API Angular in TypeScript. |
| Build, CD e deploy | `.codex/skills/netlify-deployment/SKILL.md` | `netlify.toml`, output build, contesti Netlify, deploy production/preview e diagnosi infrastrutturale. |
| Hero | `.codex/skills/hero-page/SKILL.md` | Route `/`, `HeroComponent`, coordinate e ingresso al portfolio. |
| Portfolio | `.codex/skills/projects-page/SKILL.md` | `/home`, card, sequenza `VIDEO`, gallerie e caricamento asset. |
| Dettaglio progetto | `.codex/skills/project-detail-page/SKILL.md` | `/projects/:slug`, slide, query parameter `slide` e layout dettaglio. |
| About | `.codex/skills/about-page/SKILL.md` | `/about`, contatti e contenuto istituzionale. |
| Lettura del raw | `.codex/skills/raw-content/SKILL.md` | Interpretare documenti, immagini e cartelle ricevute senza modificare le fonti. |
| Nuovo fascicolo | `.codex/skills/project-ingestion/SKILL.md` | Trasformare un fascicolo raw in dati, asset e progetto pubblicabile end-to-end. |
| Repository remoto | `.codex/skills/github/SKILL.md` | Branch, commit, pull/merge request, workflow e operazioni GitHub remote. |

Per un nuovo progetto usare prima `raw-content`, poi `project-ingestion`, e infine la skill della pagina coinvolta. Usare `angular` soltanto se il task modifica codice TypeScript Angular.

## Regole di implementazione

- Riutilizzare l'architettura e i contratti già presenti; non creare route o card dedicate quando la struttura generica le gestisce già.
- Lasciare `raw/` invariata. Non usare `/raw/...` nei template o nei dati runtime.
- Ricavare copy, metadata, coordinate, crediti e asset da fonti verificate; non inventare valori mancanti, lorem ipsum o placeholder editoriali.
- Copiare in `public/` soltanto gli asset realmente usati, organizzati per identificativo sorgente e con nomi semantici.
- Mantenere accessibilità, responsive behavior e deep link delle route esistenti.
- Prima di cambiare un contratto TypeScript o una route, cercare e aggiornare tutti i riferimenti.

## Continuous deployment attivo

- `main` è in continuous deployment: ogni commit pushato su `main` ricostruisce l'applicazione e pubblica la produzione sull'URL ufficiale configurato in Netlify.
- Ogni pull/merge request verso `main` genera una Netlify Deploy Preview.
- Un commit locale da solo non avvia il deploy: deve arrivare al repository remoto.
- L'URL di produzione e gli URL preview sono gestiti da Netlify e non vanno inventati o hardcodati nei file del progetto.
- `netlify.toml` è la configurazione Netlify per comando, directory pubblicata, Node, contesti e redirect SPA.
- `.github/workflows/deploy.yml` descrive un percorso GitHub Pages separato e non è la fonte della policy Netlify.

## Verifica

- Per modifiche TypeScript o build eseguire `npm run build`.
- Per modifiche UI verificare le route interessate in browser su desktop e mobile, inclusi deep link e asset.
- Per modifiche Netlify controllare il deploy log e, quando applicabile, sia la produzione sia la Deploy Preview.
- Non considerare concluso un task se il build output, gli asset runtime o le route pubbliche non corrispondono alla configurazione.
