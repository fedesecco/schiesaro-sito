---
name: hero-page
description: Specifica visiva e funzionale della landing hero di Kopio Office, con coordinate dinamiche e ingresso alla pagina progetti.
---

# Hero page skill

## Quando usarla

Usare questa skill per modificare la route `/`, `HeroComponent`, la hero iniziale o il comportamento di ingresso al portfolio.
La pagina è una soglia editoriale: non aggiungere menu, card, immagini o copy non presenti nelle fonti.

## Fonti di verità

- Implementazione: `src/app/pages/hero/hero.ts`, `hero.html`, `src/styles.scss` (`.landing-page*`).
- Route: `src/app/app.routes.ts`, path vuoto con lazy `HeroComponent`.
- Riferimento visivo: `raw/mockup/1 - Hero page.png`.
- Coordinate: `src/app/shared/utils/coordinates.ts` e stato locale del componente.
- Il file `raw/inidicazioni scritte.md` è vuoto: non usarlo per inventare copy.

## Composizione desktop

- Viewport intero (`100svh`), fondo bianco, nessuno scroll visibile.
- Titolo centrale, tipografia display sans molto pesante, maiuscolo, tracking negativo: `KOPIO OFFICE`.
- Le coordinate sono una coppia sinistra/destra sotto il titolo; il numero è diviso in parte maggiore e minore.
- Margini elastici già definiti dai token globali (`--page-pad`, `--coord-gutter`, `--site-title`).
- Il titolo è un vero link accessibile alla route `/home`: deve funzionare con click, tastiera e screen reader. Non usare `aria-disabled`, `routerLink=null` o una flag che lo renda non interattivo.

## Comportamento

- Mouse: `mousemove` aggiorna le coordinate usando la posizione relativa al viewport.
- Touch: `touchstart` e `touchmove` aggiornano le coordinate; su puntatore coarse non usare il tracking mouse.
- Device orientation: se disponibile, mostrare il prompt per abilitarla; la richiesta permesso deve partire da un gesto utente.
- Se il permesso è negato, il prompt non deve ripresentarsi nella stessa istanza.
- Cleanup obbligatorio del listener `deviceorientation` in `ngOnDestroy`.
- Il titolo deve avere un focus ring visibile, contrasto sufficiente e stato hover non distruttivo.

## Responsive

- Fino a `900px`: titolo ridotto e coordinate distribuite su due colonne.
- Fino a `720px`: coordinate compatte (`latitudine`/`longitudine` complete) al posto della coppia major/minor; titolo su tutta la riga.
- Conservare leggibilità e area cliccabile anche su viewport stretti; evitare overflow orizzontale.

## Vincoli dati

- Nessuna immagine o testo di mockup nella hero.
- Il link continua a puntare a `/home`, senza hardcode di URL assoluti.
- Non aggiungere coordinate geografiche fittizie: le coordinate della hero sono una visualizzazione generativa, non dati di progetto.

## Criteri di accettazione

1. Click e `Enter` sul titolo aprono `/home`.
2. Il link è esposto come link nella accessibility tree e ha focus visibile.
3. La pagina occupa il viewport senza scrollbar e conserva la composizione del mockup.
4. Coordinate mouse/touch/orientation continuano ad aggiornarsi e i listener vengono rimossi.
5. Nessun riferimento a `mock`, `placeholder` o dati provvisori nel componente.
