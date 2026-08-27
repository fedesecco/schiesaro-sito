---
name: project-detail-page
description: Specifica editoriale, visuale, responsive e interattiva della pagina `/projects/:slug`.
---

# Project detail page skill

## Quando usarla

Usare questa skill per modificare `ProjectDetailComponent`, il template del dettaglio, la navigazione tra slide e gli stili `.detail-page*`/`.detail-slide*`.

## Fonti di verità

- Implementazione: `src/app/pages/project-detail/project-detail.ts` e `project-detail.html`.
- Stili: `src/styles.scss`, sezione `.detail-page` e media query a `900px`/`720px`.
- Dati e modello: `src/app/content/projects-data.ts`, `src/app/models/site-content.model.ts`.
- Riferimenti desktop: `raw/mockup/8 - detail page text.png`, `raw/mockup/9 - detail page image.png`.
- Riferimenti mobile: `raw/mockup/5 - detail mobile, horizontal image.png`, `raw/mockup/6 - detail mobile, vertical image.png`, `raw/mockup/7 - detail mobile, text.png`.
- Indicazioni scritte: `raw/inidicazioni scritte.md` è attualmente vuoto; non inventare requisiti testuali da quel file.

## Struttura editoriale

- Route: `/projects/:slug`; slug non valido mostra un fallback chiaro con link a `/home`.
- Prima slide: testo, metadata e corpo editoriale del progetto.
- Slide successive: una media reale per slide, nell'ordine del fascicolo; le immagini sono pulite, senza didascalie, crediti o informazioni sovrapposte. L'alt resta disponibile per l'accessibilità.
- Il metadata block usa maiuscolo compatto e presenta solo valori disponibili: titolo, luogo/paese, tipo, superficie, anno. Mai rendere `00`, `0000` o stringhe segnaposto come dati reali.
- Il corpo mantiene la voce serif editoriale, larghezza leggibile e paragrafi separati se la fonte ne contiene più di uno.

## Composizione desktop (mockup 8–9)

- Superficie chiara, viewport pieno, chrome superiore bianco con brand grande centrato.
- La composizione orizzontale è formata da pannelli alti quanto il viewport, separati da un gap fisso di circa `15px`; quando il primo pannello è attivo, l'inizio del pannello successivo resta visibile a destra.
- Il titolo `KOPIO OFFICE` inizia sulla soglia della seconda metà della composizione; la riga coordinate usa la stessa soglia.
- Le coordinate sono una sola riga `major/minor` per latitudine e longitudine: la prima parte della prima coordinata parte a circa `15px` dal bordo sinistro, la seconda parte termina sul bordo della prima metà, la prima parte della seconda inizia dopo il gap di `15px` e la seconda parte termina a circa `15px` dal bordo destro.
- Area contenuti: carousel orizzontale con snap al centro; ogni slide desktop occupa circa `90vw`, con gap di `15px`, senza ridurre le slide landscape a una larghezza massima che nasconda la slide successiva.
- Il track deve avere larghezza basata sul contenuto e una coda sufficiente per centrare anche l'ultima slide; l'overflow orizzontale non può essere collassato dal contenitore flex.
- La slide testuale occupa un pannello completo e mantiene una colonna editoriale leggibile; le immagini usano dimensioni proporzionate all'orientamento senza crop arbitrario.
- Il blocco metadata parte vicino al chrome, senza un margine superiore sproporzionato.
- Il footer desktop persistente contiene soltanto l'indice globale `n/totale`; nessuna descrizione come `Curtain system`, `Photo: ...` o `Drag or use arrows`. Su mobile sono ammessi soltanto controlli iconici necessari alla navigazione, senza testo aggiuntivo.

## Composizione mobile (mockup 5–7)

- Header con `KOPIO OFFICE` molto grande, poi una sola riga di coordinate compatte quando il progetto le fornisce.
- Il viewport diventa una colonna verticale scorrevole: prima testo, poi immagini. Disabilitare lo snap orizzontale e non lasciare un carousel orizzontale nascosto.
- Immagini orizzontali e verticali occupano la larghezza utile mantenendo il rapporto originale; nessuna didascalia o informazione viene resa sotto la foto.
- Footer fisso/leggibile con il solo indice e, se necessario per l'interazione mobile, un controllo iconico con label accessibile; il controllo non deve aggiungere testo sull'immagine.
- Il body copy deve rimanere leggibile senza testo microscopico o righe troppo lunghe.

## Interazione e stato

- `slide` query parameter è 1-based per i link dalla home; internamente gli indici sono 0-based. Accettare valori mancanti, non numerici o fuori range con clamp sicuro.
- Cambiare slide aggiorna la query con `replaceUrl`, senza ricostruire la pagina e senza perdere il progetto.
- Su desktop, le fasce cliccabili sinistra e destra occupano ciascuna `20vw`: la fascia sinistra porta alla slide precedente se esiste, la destra alla successiva se esiste. Ai limiti non effettuare wrap circolare.
- Gli stessi limiti valgono per i pulsanti accessibili precedente/successivo; disabilitare il controllo quando non esiste la slide adiacente.
- Il drag pointer orizzontale, la rotella verticale convertita in scroll orizzontale e lo snap devono portare alla slide adiacente più vicina senza perdere la sincronizzazione con la query.
- L'indice attivo deve essere inizializzato dal parametro `slide` prima del primo render, senza mostrare transitoriamente `1/totale` quando è stata richiesta un'altra slide.
- Durante uno scroll programmato verso una slide, le posizioni intermedie dello smooth scroll non devono sovrascrivere l'indice attivo né produrre un flicker del contatore.
- Click al centro: snap alla slide più vicina.
- Il cursore di base non è una mano permanente: usare cursore neutro nel viewport e cursori direzionali sui controlli bordo.
- Sincronizzare il focus con la slide attiva dove possibile; usare `aria-current`/`aria-label` per indicatori e controlli.

## Accessibilità e performance

- Un heading reale identifica il progetto; immagini con alt descrittivo e `loading`/decoding adeguati. L'alt non viene mostrato come didascalia visuale.
- I pulsanti hanno nomi accessibili in italiano/inglese coerenti con il resto del sito; il testo non deve essere trasmesso solo da un'icona o da `+`.
- Rispetto di contrasto WCAG AA, focus visibile, target touch minimo e reduced-motion per transizioni non essenziali.
- I crediti fotografici sono gestiti tramite `LICENSE`/materiale editoriale, non stampati sotto ogni immagine del dettaglio.
- Non usare `innerHTML`, dati fittizi, SVG mock o copie di progetto inventate.

## Criteri di accettazione

1. Un progetto reale apre prima il testo, poi tutte le media reali nell'ordine corretto.
2. Desktop mostra l'inizio della slide successiva a destra quando la prima slide è attiva; le slide usano gap di circa `15px`.
3. Il contatore non mostra un indice intermedio durante l'apertura da query o durante uno scroll programmato.
4. Le fasce desktop da `20vw` navigano soltanto verso la slide adiacente esistente e non fanno wrap ai limiti.
5. Desktop rispetta la griglia di mockup per titolo, coordinate, pannelli e immagini; mobile rispetta la lettura verticale dei mockup.
6. Le immagini non mostrano didascalie, crediti o hint; il footer desktop mostra soltanto `n/totale` e quello mobile aggiunge solo eventuali controlli iconici necessari.
7. I controlli da tastiera/screen reader permettono di raggiungere ogni slide e tornare a `/home`.
8. `slide` resta coerente dopo click, drag, rotella, refresh e link diretto.
9. Missing project e asset non disponibile hanno una resa esplicita, senza placeholder grafici.
