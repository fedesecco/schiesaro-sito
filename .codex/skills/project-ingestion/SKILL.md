---
name: project-ingestion
description: Procedura end-to-end per trasformare un nuovo fascicolo in raw in un progetto Angular completo, organizzato e pubblicabile.
---

# Project ingestion skill

## Quando usarla

Usare questa skill quando arriva una nuova cartella, per esempio `raw/projects/055_test` o `raw/055_test`, e viene richiesto di aggiungerla al portfolio senza contesto precedente.
Applicarla insieme a `raw-content`, `projects-page`, `project-detail-page` e alla skill Angular del repository.

## Obiettivo

Trasformare una fonte raw eterogenea in quattro risultati coerenti:

1. record editoriale tipizzato in `src/app/content/projects-data.ts`;
2. eventuali estensioni del contratto in `src/app/models/site-content.model.ts`;
3. asset binari selezionati e rinominati in `public/projects/<folder-name>/`;
4. progetto raggiungibile end-to-end da `/home` e `/projects/:slug`.

La procedura non modifica mai la cartella raw.

## Fase 1 — Scoperta della fonte

- Leggere la struttura della repo e le skill pertinenti prima di modificare file.
- Cercare la cartella richiesta direttamente sotto `raw/` e sotto `raw/projects/`; il nome della cartella è un identificativo di provenienza, non necessariamente il titolo editoriale. Escludere `mockup`, indicazioni e altre cartelle che non rappresentano il fascicolo richiesto.
- Mappare ricorsivamente i file e classificarli come testo, fotografia, disegno, video, mockup, duplicato o materiale non pertinente.
- Leggere i documenti disponibili (`docx`, `pdf`, txt e simili) con gli strumenti di lettura; non dedurre testo da nomi file se esiste una fonte testuale.
- Ispezionare le immagini per dimensioni, rapporto, orientamento, contenuto visivo e metadati di attribuzione.
- Usare `raw/mockup` solo per capire layout e interazioni; non trattarlo come contenuto del nuovo progetto.

## Fase 2 — Identità e dati

- Conservare il nome della cartella sorgente esattamente nel percorso pubblico: `055_test` resta `public/projects/055_test/`.
- Ricavare titolo, luogo, paese, tipo, superficie, anno, coordinate, teaser e corpo esclusivamente da fonti verificabili.
- Se il titolo non è fornito, usare come titolo provvisorio il solo identificativo della cartella, senza trasformarlo in un nome creativo; segnalare l'assenza nel risultato.
- Generare uno `slug` URL-safe, lowercase e kebab-case dal titolo verificato; in caso di collisione usare un suffisso derivato dall'identificativo sorgente.
- Mantenere i campi non disponibili assenti: i modelli del repository prevedono proprietà opzionali. Non usare zeri, lorem ipsum, stringhe vuote presentate come dati, coordinate inventate o copy descrittivo non documentato.
- Conservare i paragrafi del documento come `body: string[]`; usare `teaser` solo se è un estratto fedele o un dato esplicitamente fornito.
- Convertire unità o coordinate soltanto quando la conversione è deterministica; se il formato è ambiguo, conservare il dato originale o ometterlo e segnalarlo.

## Fase 3 — Asset runtime

- Copiare in `public/projects/<folder-name>/` solo le immagini realmente usate dalle pagine; non pubblicare documenti raw, duplicati, cartelle `15x10` o materiale non pertinente.
- Non copiare categorie sorgente come `DISEGNI`, `IMMAGINI` o `FOTO` nella struttura runtime.
- Rinominare ogni asset con lowercase, kebab-case e un significato leggibile, per esempio:

  ```text
  public/projects/055_test/
  ├── 055-test-front-view.jpg
  ├── 055-test-interior-detail.jpg
  └── 055-test-plan.jpg
  ```

- Evitare nomi numerici generici (`01.jpg`, `D1.jpg`, `IMG_1234.jpg`) quando il contenuto consente una descrizione semantica.
- Mantenere in `ProjectMedia` `width`, `height`, `orientation`, `alt`, `caption` e `credit`; l'alt descrive la scena, la caption identifica la vista e il credit conserva l'autore.
- Per fotografie di terzi, il credit non equivale a una licenza: pubblicare solo con autorizzazione verificata e non alterare l'attribuzione.
- Gli URL del dataset devono puntare a `/projects/<folder-name>/<semantic-file>.jpg`, mai a `/raw/...`.

## Fase 4 — Integrazione Angular

- Aggiungere il record all'array `projectsData`; l'home e il dettaglio usano già la route generica, quindi non creare una route dedicata per ogni progetto.
- Adeguare il modello soltanto se il nuovo contenuto introduce un requisito reale non rappresentabile; mantenere campi opzionali e tipi stretti.
- Usare `NgOptimizedImage` con dimensioni intrinseche corrette nei template che renderizzano le media.
- Non modificare `angular.json` per aggiungere `raw/`: il build deve pubblicare `public/**/*`.
- Verificare che la home includa automaticamente il nuovo progetto dentro la sequenza `VIDEO → progetti → VIDEO`, senza sostituire o duplicare manualmente il placeholder video.
- Verificare che il dettaglio gestisca correttamente sia progetti con slide testuale sia fascicoli composti soltanto da immagini.
- Aggiornare caption, alt, crediti, indice slide e mapping del query parameter `slide` senza rompere i progetti già presenti.

## Fase 5 — Completezza e decisioni

Prima di chiudere l'integrazione, controllare:

- quale fonte sostiene ogni campo editoriale;
- quali asset sono stati esclusi e perché;
- quale nome sorgente è stato mantenuto nella cartella pubblica;
- quale slug è stato scelto e perché;
- quali dati o autorizzazioni mancano.

Chiedere all'utente solo informazioni realmente bloccanti, come un titolare dei diritti non identificabile o un conflitto tra due titoli. Per campi editoriali non essenziali, procedere omettendoli e dichiarare l'assenza; non fermare l'intera integrazione per riempire placeholder.

## Fase 6 — Verifica obbligatoria

- Cercare vecchi path, nomi raw o `/raw/` in `src`, `public` e `angular.json`.
- Verificare che ogni `src` in `projectsData` abbia un file corrispondente in `public/projects/<folder-name>/`.
- Verificare che la struttura runtime non contenga `DISEGNI`, `IMMAGINI`, `FOTO` o nomi con spazi/`©`.
- Verificare che `raw/` non abbia modifiche.
- Eseguire diagnostica TypeScript e `npm run build`.
- Avviare il sito e controllare `/home`, il link del titolo, il nuovo `/projects/:slug`, il primo e l'ultimo asset, il deep link `?slide=...`, le dimensioni mobile e il loop verticale.
- Controllare che il browser non richieda asset da `/raw/`, non mostri 404 e non introduca overflow orizzontale inatteso.
- Verificare che `LICENSE`/credit e i diritti degli asset siano rispettati.

## Non fare

- Non rinominare o ripulire file dentro `raw/`.
- Non aggiungere un glob generico `raw/projects/**/*` al build.
- Non copiare una cartella raw intera in `public/`.
- Non usare mockup, lorem ipsum o immagini segnaposto come dati del progetto.
- Non inventare metadati mancanti per rendere uniforme la scheda.
- Non considerare conclusa l'aggiunta quando il record esiste ma il dettaglio, gli asset pubblici o i link della home non funzionano.
