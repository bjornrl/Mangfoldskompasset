# Mangfoldskompasset

En statisk nettside som viser en kuratert samling av kommunale **tiltak**
finansiert gjennom **Bufdir** sine tilskuddsordninger, til inspirasjon for andre
kommuner. Hvert kort viser hva som ble gjort, hvem som sto bak, hvor det skjedde,
hva det kostet og hvor pengene kom fra.

Bygget med **Next.js + TypeScript + Tailwind CSS** og eksporteres som en helt
statisk side (ingen backend). Alle data ligger i én JSON-fil du redigerer for
hånd.

---

## Kom i gang lokalt

```bash
npm install
npm run dev
```

Åpne http://localhost:3000 i nettleseren.

> **Merk:** Siden henter `data/activities.json` med `fetch()`. Det betyr at den
> må serveres over HTTP (slik `npm run dev` og Netlify gjør). Hvis du åpner den
> eksporterte `out/index.html` direkte via `file://`, vil de fleste nettlesere
> blokkere `fetch()` av sikkerhetshensyn, og listen blir tom. Kjør i stedet en
> lokal server, f.eks. `npm run dev` eller `npx serve out`.

## Bygg for produksjon

```bash
npm run build
```

Dette genererer en statisk side i mappen `out/`. Den kan hostes hvor som helst.

---

## Legge til et nytt tiltak

All data ligger i **`public/data/activities.json`** — en JSON-liste (array) med
ett objekt per tiltak. For å legge til et nytt tiltak, kopier et eksisterende
objekt og fyll inn nye verdier:

```json
{
  "id": "4",
  "title": "Tittel på tiltaket",
  "description": "Full beskrivelse av hva som ble gjort.\n\nSkill avsnitt med en blank linje (\\n\\n) – disse beholdes i detaljvisningen.",
  "responsible": "Ansvarlig organisasjon eller person",
  "location": "Kommune/sted",
  "total_cost": 250000,
  "funding_source": "Bufdir – Tilskudd til X-ordningen 2024",
  "year": 2024,
  "tags": ["barn og unge", "inkludering"]
}
```

### Hva hvert felt betyr

| Felt             | Type         | Beskrivelse                                                                 |
| ---------------- | ------------ | --------------------------------------------------------------------------- |
| `id`             | tekst        | Unik id. Må være forskjellig fra alle andre, f.eks. `"4"`.                   |
| `title`          | tekst        | Tittelen på tiltaket.                                                        |
| `description`    | tekst        | Full beskrivelse. Skill avsnitt med `\n\n` (blank linje) – beholdes i detalj. |
| `responsible`    | tekst        | Organisasjon eller person som er ansvarlig.                                  |
| `location`       | tekst        | By/kommune. Brukes også i nedtrekksfilteret «Sted».                         |
| `total_cost`     | tall         | Total kostnad i hele kroner, **uten** mellomrom eller «kr» (f.eks. `250000`). |
| `funding_source` | tekst        | Finansieringskilde, f.eks. «Bufdir – Tilskudd til …».                        |
| `year`           | tall         | Året tiltaket ble finansiert/gjennomført (f.eks. `2024`).                    |
| `tags`           | liste m/tekst | Temaord brukt til filtrering, f.eks. `["fritid", "inkludering"]`.           |

### Regler å huske

- Hele filen må være **gyldig JSON**: dobbeltfnutter `"` rundt all tekst, komma
  mellom objekter, **ingen** komma etter det siste objektet.
- `total_cost` og `year` er **tall** — ikke sett dem i fnutter.
- Sett inn linjeskift i beskrivelsen som `\n\n` for nytt avsnitt.
- Filtrene (sted og tema) genereres automatisk fra dataene, så nye steder og
  tags dukker opp av seg selv.

Tips: lim inn innholdet i en JSON-validator (f.eks. <https://jsonlint.com>) hvis
du er usikker på om filen er gyldig.

---

## Struktur

```
app/
  layout.tsx          App-skall, font og metadata
  page.tsx            Hovedside: henter data, filtrering, grid
  globals.css         Tailwind + grunnstil
components/
  ActivityCard.tsx    Kort i kompakt visning
  FilterBar.tsx       Filter for sted (nedtrekk) og tema (pills)
  ActivityModal.tsx   Detaljvisning (lukkes med Esc eller klikk utenfor)
lib/
  types.ts            TypeScript-typen Activity
  format.ts           Formatering av kroner og tekst
public/
  data/activities.json  ← all data redigeres her
netlify.toml          Byggekonfig for Netlify
```

---

## Deploye til Netlify

Netlify leser `netlify.toml` automatisk. Den er allerede satt opp med:

- **Build command:** `npm run build`
- **Publish directory:** `out`

To måter:

1. **Via Git (anbefalt):** Push repoet til GitHub/GitLab og koble det til
   Netlify. Hver gang du redigerer `data/activities.json` og pusher, bygges og
   publiseres siden på nytt automatisk.

2. **Manuelt:** Kjør `npm run build` lokalt og dra mappen `out/` inn i Netlify
   sitt «Deploy»-felt (drag & drop).

Etter at du har lagt til et nytt tiltak, må siden bygges/deployes på nytt for at
endringen skal vises i produksjon (steg 1 gjør dette automatisk ved push).
