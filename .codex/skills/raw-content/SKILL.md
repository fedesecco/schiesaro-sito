---
name: raw-content
description: Regole per capire, normalizzare e organizzare i dati grezzi della cartella raw senza modificarne le fonti.
---

# Raw content skill

## Quando usarla

Usare questa skill quando una pagina o una feature deve essere costruita a partire da messaggi, documenti, immagini, cartelle condivise o altri materiali ricevuti in `raw/`. Per aggiungere un nuovo fascicolo completo al portfolio, proseguire con `project-ingestion`.

## Significato di raw

- `raw/` è una zona di ingresso per materiale esterno non ancora organizzato.
- Può contenere fonti eterogenee provenienti da persone diverse: testi, immagini, documenti Office, mockup, indicazioni e cartelle di progetto.
- Il contenuto può essere incompleto, duplicato, nominato in modo incoerente o destinato soltanto a orientare il design.
- `raw/` non è una cartella pubblica e non è un database runtime.

## Regola di immutabilità

- Lasciare `raw/` esattamente com'è: non rinominare, spostare, correggere, comprimere o cancellare file ricevuti.
- Trattare i file raw come fonti di verità e conservare la provenienza quando si normalizzano i contenuti.
- Se una fonte è vuota o non contiene un dato, omettere quel campo; non sostituirlo con `00`, lorem ipsum, placeholder o valori plausibili non verificati.

## Workflow di organizzazione

1. Mappare i fascicoli e distinguere contenuto editoriale, asset visivi, riferimenti grafici e materiale non pertinente alla pagina.
2. Leggere/estrarre i dati utili dai documenti e confrontarli con nomi file, dimensioni, orientamento e contenuto delle immagini.
3. Normalizzare i dati in modelli tipizzati e file applicativi appropriati, normalmente `src/app/models` e `src/app/content`.
4. Copiare soltanto gli asset binari realmente usati nella destinazione runtime organizzata, normalmente `public/`.
5. Rinominare gli asset copiati con nomi descrittivi, lowercase e kebab-case, raggruppati per identificativo originale del progetto, per esempio `/projects/08_VELO/velo-curtain-room.jpg`; non esporre `/raw/...` nel template o nel browser.
6. Configurare Angular per pubblicare `public/**/*`, non per leggere direttamente `raw/**/*` durante il build.
7. Verificare che l'asset copiato corrisponda alla fonte e che `raw/` non abbia subito modifiche.

## Organizzazione runtime

- `public/` contiene immagini e altri file statici consumati dal browser.
- `src/app/content/` contiene testo e record editoriali già capiti e normalizzati.
- `src/app/models/` contiene il contratto TypeScript dei dati.
- Non copiare intere cartelle raw con glob generici: escludere documenti, duplicati e fascicoli non utilizzati dalla pagina.
- Evitare categorie raw come `DISEGNI`, `IMMAGINI` o `FOTO` nella struttura runtime; usare cartelle per progetto e nomi file semantici.

## Mockup e riferimenti

- `raw/mockup/` è materiale di riferimento per composizione, proporzioni, interazioni e responsive design.
- Un mockup non è automaticamente un contenuto da pubblicare e non va trattato come dato reale.
- Placeholder temporanei ammessi dalla specifica devono essere implementati in modo esplicito e separati dai dati editoriali reali.

## Aggiunta di un fascicolo progetto

- Quando arriva una nuova cartella progetto sotto `raw/` o `raw/projects/`, usare `project-ingestion` per identità, normalizzazione, copia asset, integrazione Angular e verifica end-to-end.
- `raw-content` definisce l'invariante della sorgente; `project-ingestion` definisce la sequenza operativa per trasformarla in un progetto pubblicabile.

## Copyright e attribuzioni

- Un nome file, un simbolo `©` o una riga di credito indicano un'attribuzione, non una licenza d'uso.
- Conservare i crediti quando si rinominano o si copiano gli asset; pubblicare immagini di terzi soltanto quando la relativa autorizzazione è verificata.
- Il file root `LICENSE` descrive i diritti sul repository e non concede automaticamente diritti sulle fotografie o sugli altri materiali di terzi.
- Non dichiarare che tutto appartiene a Kopio Office quando la fonte identifica un autore o un titolare diverso.

## Criteri di verifica

- Nessun template o record runtime punta a `/raw/`.
- Gli asset utilizzati esistono nella struttura `public/` organizzata.
- Il build non include fascicoli raw non richiesti.
- I dati mancanti restano assenti e la UI li gestisce senza falsificarli.
- La diff dei file raw è vuota rispetto allo stato iniziale.
