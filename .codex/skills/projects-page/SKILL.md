---
name: projects-page
description: Specifica visiva, dati e interazioni della pagina portfolio `/home` di Kopio Office.
---

# Projects page skill

## Quando usarla

Usare questa skill per modificare `ProjectsComponent`, il portfolio `/home`, la griglia delle schede progetto o il caricamento degli asset editoriali.

## Fonti di verità

- Implementazione: `src/app/pages/projects/projects.ts`, `projects.html`, `.home-page*`, `.project-card*`, `.project-gallery*` in `src/styles.scss`.
- Modello: `src/app/models/site-content.model.ts`.
- Dati: `src/app/content/projects-data.ts`.
- Asset sorgente reali: `raw/projects/04_LFF` e `raw/projects/08_VELO`.
- Riferimenti visivi: `raw/mockup/3 - home project.png` e `raw/mockup/4 - home mobile.png`.
- Coordinate del chrome: `src/app/shared/utils/coordinates.ts`.

## Contenuto reale

Il portfolio corrente contiene i due fascicoli già normalizzati:

- `08_VELO`: titolo `VELO`, Milano (IT), `OFFICE`, `135m2`, anno `2024`; testo editoriale estratto da `TESTI/TESTI.docx`; foto di Martina Simonato e due disegni.
- `04_LFF`: il fascicolo raw contiene `04_D1.jpg`, `04_I1.jpg`, `04_I2.jpg`; il nome di progetto è `LFF`. Il fascicolo non contiene testo, luogo, superficie, anno o coordinate: mostrare solo ciò che è presente e non riempire i campi mancanti con zeri o copy inventato.

- Questa lista descrive la baseline, non un limite del portfolio: un nuovo fascicolo approvato va aggiunto seguendo `project-ingestion`, senza rimuovere o riscrivere i progetti esistenti.
- I nomi tecnici raw restano confinati alla fonte. Nel runtime gli asset sono copiati in cartelle che conservano l'identificativo originale del progetto, con nomi file descrittivi, lowercase e kebab-case:

  ```text
  public/projects/
  ├── 04_LFF/
  │   ├── lff-front-view.jpg
  │   ├── lff-overhead-view.jpg
  │   └── lff-structural-drawing.jpg
  └── 08_VELO/
      ├── velo-curtain-room.jpg
      ├── velo-plan.jpg
      └── ...
  ```

- I dati puntano agli URL organizzati `/projects/04_LFF/...` e `/projects/08_VELO/...`; non esporre nel browser `DISEGNI`, `IMMAGINI`, `FOTO`, spazi o il prefisso `©` dei file raw.


## Aggiunta di nuovi progetti

- Una nuova cartella `raw/<project-folder>` o `raw/projects/<project-folder>` richiede integrazione completa: record in `projectsData`, asset selezionati in `public/projects/<project-folder>/`, slug e link al dettaglio.
- La home consuma l'array dei progetti; non duplicare manualmente card o route per il nuovo fascicolo.
- Il placeholder `VIDEO` resta indipendente e deve continuare ad aprire e chiudere ogni ciclo di scroll.
- Per naming, provenienza, diritti, dati mancanti e smoke test usare la checklist di `project-ingestion`.

## Composizione desktop

- Route a viewport pieno (`100svh`) con scroll verticale interno.
- All'ingresso della route la prima sezione è un placeholder video bianco da `100vw × 100vh`, con la parola `VIDEO` centrata.
- Il placeholder è intenzionalmente separato dai progetti: non va sostituito con una cover di LFF o VELO e non richiede un asset fotografico.
- Header/chrome con brand centrale sticky durante il passaggio tra video e progetti; i progetti mostrano coordinate solo quando il fascicolo le fornisce.
- Ogni progetto è una sezione autonoma: chrome coordinate in alto, metadata a sinistra, galleria orizzontale a destra.
- Prima immagine più grande; le successive rispettano l'orientamento reale (`portrait`/`landscape`) e possono partire desaturate, ma non devono perdere informazione o accessibilità.
- Titolo e ogni immagine sono controlli/link che aprono `/projects/:slug`; il click di un'immagine può passare `slide` per aprire quella media.
- Preload immagini in idle time soltanto dopo il render e con cleanup del callback.

## Composizione mobile

- Sotto `720px`, una card diventa verticale: metadata, poi immagini a tutta larghezza in ordine sorgente.
- Coordinate compatte e chrome coerente con la hero; niente overflow orizzontale involontario.
- Il placeholder video resta `100vw × 100vh`, bianco, con `VIDEO` centrato anche su mobile.
- Le immagini portrait mantengono il rapporto verticale; non usare `object-fit: cover` per nascondere parti dell'opera.
- Titoli e immagini devono avere focus keyboard e label/alt significativi.

## Sequenza e loop dello scroll

- La sequenza visuale è sempre: `VIDEO` iniziale → tutti i progetti nell'ordine dei dati → `VIDEO` finale.
- La sequenza completa viene renderizzata in tre copie consecutive per ottenere un loop verticale senza fine.
- Dopo il render, lo scroll viene posizionato sulla copia centrale; l'utente entra quindi sempre dal placeholder video.
- Quando lo scroll si avvicina al primo terzo, aggiungere una sequenza completa; quando supera il secondo terzo, sottrarne una. Il salto deve essere invisibile e non rubare il focus.
- Dopo l'ultimo progetto si incontra il placeholder video della copia successiva, poi il ciclo ricomincia dai progetti.

## Interazioni e accessibilità

- Le sezioni duplicate sono una tecnica di presentazione: evitare id HTML duplicati e annunci ripetitivi non necessari.
- Un titolo è preferibilmente un `RouterLink` semantico; se si usa un button, deve avere `aria-label` e comportamento equivalente.
- Il focus ring deve rimanere visibile su fondo chiaro e su fotografia.
- `VIDEO` deve avere un nome accessibile che chiarisca che è un placeholder in attesa del video reale.

## Vincoli dati e build

- Capire i fascicoli in `raw/`, lasciare `raw/` invariata e copiare soltanto le immagini realmente usate in `public/projects/...`.
- I dati testuali normalizzati vivono in `src/app/content`/`src/app/models`; gli URL runtime puntano a `/projects/...`, mai a `/raw/...`.
- Eliminare `public/mock`, ogni `mock/*` nei dati e ogni progetto dimostrativo (`Glam Pavilion`, `Field House`).
- Il placeholder video può essere CSS/HTML, ma non deve introdurre immagini o copy di progetto falsi.
- Non lasciare coordinate `00.000000`, testi placeholder o campi di progetti non presenti nei fascicoli.

## Criteri di accettazione

1. `/home` mostra il placeholder `VIDEO` a `100vw × 100vh` all'ingresso e dopo l'ultimo progetto.
2. `/home` mostra LFF, VELO e ogni nuovo progetto approvato con immagini della propria fonte organizzata.
3. L'hero e le card non richiedono alcun asset `public/mock`.
4. Il loop mantiene il placeholder iniziale/finale e non produce salti percepibili durante lo scroll.
5. Titolo e media portano al dettaglio corretto; lo slide richiesto viene rispettato.
6. Desktop e mobile seguono i mockup home senza tagliare le foto.
7. Un asset mancante non genera un'immagine mock o un errore silenzioso che mascheri il problema.
