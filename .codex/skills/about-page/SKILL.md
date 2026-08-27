---
name: about-page
description: Specifica editoriale, visiva e accessibile della pagina `/about` di Kopio Office.
---

# About page skill

## Quando usarla

Usare questa skill per modificare `AboutComponent`, la route `/about`, i contatti dello studio o la composizione editoriale istituzionale.

## Fonti di verità

- Implementazione: `src/app/pages/about/about.ts`, `about.html`.
- Stili: `src/styles.scss`, sezioni `.about-page*` e `.site-chrome`.
- Riferimento visivo: `raw/mockup/10 - desktop about.png`.
- Dati già presenti nel progetto: contatti Riccardo Modolo e Giacomo Schiesaro, email dello studio, città Milano e Vicenza.
- `raw/inidicazioni scritte.md` è vuoto; non ricostruire testo dal lorem ipsum del mockup.

## Composizione desktop

- Pagina chiara a scroll verticale, con chrome superiore e brand `KOPIO OFFICE` centrato.
- Coordinate laterali nel chrome solo se sono dati verificati; non visualizzare `00.000000` come valore reale.
- Dopo un ampio respiro verticale, colonna contatti a sinistra dell'area editoriale e corpo serif nella colonna centrale/destra.
- Footer basso con email, città e codice paese; i link email/telefono devono restare nativi e accessibili.
- Il mockup definisce proporzioni e ritmo, non contenuto da copiare: il lorem ipsum non è prodotto.

## Responsive

- Sotto `720px`, usare una singola colonna con padding laterale stabile; contatti prima del testo.
- Footer disposto in colonna e senza posizionamento assoluto che copra il contenuto.
- Il brand resta leggibile senza overflow; link e contatti mantengono target touch adeguato.

## Contenuti e assenza dati

- Conservare solo informazioni provenienti da fonti del progetto o fornite dall'utente.
- Se introduzione o corpo non sono disponibili, non sostituirli con lorem ipsum, copy dimostrativo o frasi che dichiarano di essere mock: nascondere il blocco o lasciare un contenuto reale verificato.
- Contatti e città esistenti possono essere mantenuti; verificare sempre che `mailto:` e `tel:` corrispondano al testo mostrato.
- Non usare coordinate placeholder; il modello può rendere il blocco coordinate opzionale.

## Accessibilità

- Usare heading semantici (`h1` per il nome della sezione o il titolo editoriale) e landmark header/main/footer.
- Ogni contatto deve avere nome, email e telefono testuali; i link devono avere focus ring visibile.
- Garantire contrasto WCAG AA, ordine di tab coerente e nessun testo indispensabile trasmesso solo tramite posizione.

## Criteri di accettazione

1. `/about` segue la gerarchia del mockup senza mostrare lorem ipsum o dati `00`.
2. I contatti verificati funzionano come email/telefono e il brand torna a `/home`.
3. Desktop e mobile non sovrappongono corpo e footer e consentono scroll completo.
4. Modifiche successive usano dati tipizzati e non aggiungono testo non documentato.
