---
name: netlify-deployment
description: Regole di build, continuous deployment e pubblicazione Netlify del progetto Kopio Office.
---

# Netlify deployment skill

## Quando usarla

Usare questa skill per modificare o diagnosticare build, deploy, continuous deployment, contesti Netlify, `netlify.toml`, directory pubblicata, redirect SPA e integrazione tra repository e Netlify.

Non usarla per scrivere codice TypeScript Angular o per definire la composizione visuale delle pagine: usare `angular` o la skill della pagina pertinente.

## Policy di deploy attiva

- `main` è il production branch in continuous deployment.
- Ogni commit pushato su `main` esegue una nuova build e pubblica la produzione sull'URL ufficiale configurato nel progetto Netlify.
- Ogni pull request o merge request diretta verso `main` genera una Netlify Deploy Preview.
- Un commit locale non attiva il deploy finché non viene pushato al repository collegato.
- Il production URL e gli URL delle preview sono assegnati e gestiti da Netlify; non inventarli e non hardcodarli nel codice.

## Configurazione del repository

- `netlify.toml` è nella root del repository.
- Il comando di build è `npm run build`.
- La directory pubblicata è `dist/kopio-office/browser`; deve restare coerente con l'output configurato in `angular.json`.
- Il build usa Node.js 22 tramite `build.environment`.
- `context.production`, `context.branch-deploy` e `context.deploy-preview` possono sovrascrivere le impostazioni del contesto globale.
- Il redirect `/*` verso `/index.html` con status `200` abilita il deep link dell'applicazione SPA.
- `angular.json` pubblica gli asset da `public/**/*`; `raw/` non deve diventare un input runtime del build.

## Contesti Netlify

- `production` corrisponde ai deploy del branch `main` e all'URL ufficiale.
- `deploy-preview` corrisponde ai deploy generati dalle pull/merge request.
- `branch-deploy` riguarda branch non production soltanto quando è abilitato nelle impostazioni del sito Netlify; la presenza del blocco nel TOML non basta ad abilitarlo.
- Le impostazioni del sito configurate nella UI, come branch production, branch deploy abilitati, domini e variabili d'ambiente, non sono necessariamente rappresentate nel repository.

## Workflow operativo

1. Prima di cambiare il deploy, leggere `netlify.toml`, `angular.json` e gli script `package.json`.
2. Mantenere allineati nome del progetto Angular, directory di output e directory `publish`.
3. Non spostare il redirect SPA senza verificare il refresh diretto di `/home`, `/about` e `/projects/:slug`.
4. Non inserire segreti o credenziali nel repository; usare le variabili d'ambiente del progetto Netlify.
5. Dopo modifiche a build o configurazione, eseguire `npm run build` e controllare il deploy log Netlify quando il deploy remoto è disponibile.
6. Per una modifica UI, verificare anche una Deploy Preview e i deep link delle route coinvolte.

## Distinzione da GitHub Pages

`.github/workflows/deploy.yml` descrive un workflow GitHub Pages separato. Non usarlo come prova o configurazione del continuous deployment Netlify e non modificarlo per correggere un deploy Netlify, salvo richiesta esplicita.
