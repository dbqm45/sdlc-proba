---
artifact: design
phase: architecture
status: proposed
version: 1
author: tomasz
created: 2026-10-30
updated: 2026-10-30
inputs: [docs/project/changes/CHG-1/intent.md]
change: CHG-1
source: PRB-1
source_reported_at: 2026-10-30
---
# Projekt architektury CHG-1

## Rozwiązanie przyjęte

Wariant A z `intent.md`: data wdrożenia czytana z `config/build.json`, renderowana w stopce strony za flagą
`show_last_deployed`. Plik `config/build.json` generowany w kroku wdrożenia — analogia do istniejącego wzorca
`config/flags.*.json` (plik JSON w `config/`, czytany przez serwer przy starcie).

## Decyzje techniczne

### DT-1: Plik JSON jako źródło daty wdrożenia (nie zmienna środowiskowa)

**Powód:** Projekt czyta już `config/flags.*.json` z dysku przy obsłudze żądania. Dodanie `config/build.json`
z polem `deployedAt` (format ISO 8601, `YYYY-MM-DD`) jest spójne z istniejącym wzorcem i nie wymaga nowej
infrastruktury. Zmienna środowiskowa byłaby alternatywą, ale wymagałaby innej ścieżki w `server.js` i
utrudniałaby lokalne odtworzenie zachowania produkcyjnego.

**Struktura pliku:**
```json
{ "deployedAt": "2026-10-30" }
```

### DT-2: Flaga `show_last_deployed` w istniejącym systemie flag

**Powód:** System flag (`src/flags.js`, `config/flags.*.json`) obsługuje już `welcome_banner`. Dodanie
`show_last_deployed` do tych samych plików nie wymaga nowej infrastruktury i jest kompatybilne z ShipScope
(czyta `config/flags.{env}.json`). Stan domyślny: `enabled: false` na `prod` (bezpieczny rollout).

### DT-3: Odczyt `config/build.json` przy starcie serwera (nie per żądanie)

**Powód:** Data wdrożenia nie zmienia się w trakcie życia procesu. Odczyt przy starcie (`createServer`)
jest prostszy i eliminuje powtarzalne I/O. Zmiana daty (nowe wdrożenie) wymaga restartu serwera — co i tak
jest warunkiem wdrożenia. Bez zmiany: `readFlags` pozostaje per żądanie (flagi mogą się zmieniać bez restartu).

### DT-4: Renderowanie w elemencie `<footer>` w `src/page.js`

**Powód:** Stopka jest semantycznie właściwym miejscem dla metadanych strony. Wymaga dodania parametru
`deployedAt` do sygnatury `renderPage({ env, on, deployedAt })`. Wartość jest escapowana przez istniejącą
funkcję `escape()`. Renderowana tylko gdy `on('show_last_deployed')` zwraca `true`.

## Przepływ danych

```
Krok wdrożenia
  → zapisuje config/build.json { "deployedAt": "YYYY-MM-DD" }

createServer() (startup)
  → readBuildInfo() czyta config/build.json → { deployedAt }

GET /
  → readFlags(env) → flags
  → visitorOf(req) → visitor
  → renderPage({ env, on: (key) => isOn(flags, key, visitor.id), deployedAt })
     ↳ on('show_last_deployed') = true
        → <footer>Wdrożono: <date>YYYY-MM-DD</date></footer>
     ↳ on('show_last_deployed') = false
        → stopka niewidoczna
```

## Zmiany w komponentach

| Komponent | Zmiana |
|---|---|
| `config/build.json` | Nowy plik generowany przy wdrożeniu; pole `deployedAt` (ISO 8601). |
| `package.json` | Nowy skrypt `build` zapisujący `config/build.json` z bieżącą datą. |
| `.gitignore` | **Zależy od bramki B3** — patrz Pytania do bramki. |
| `src/server.js` | Odczyt `config/build.json` przy starcie; przekazanie `deployedAt` do `renderPage`. |
| `src/page.js` | Nowy parametr `deployedAt`; renderowanie `<footer>` za flagą `show_last_deployed`. |
| `config/flags.prod.json` | Wpis `"show_last_deployed": { "enabled": false, "rollout": 0 }` (domyślnie wyłączony). |
| `config/flags.test.json` | Wpis `"show_last_deployed": { "enabled": true, "rollout": 100 }` (widoczny w testach). |
| `test/page.test.js` | Nowe testy TDD: flag on → stopka z datą; flag off → brak stopki; escape daty. |

## Pytania do bramki

- [właściciel] Czy `config/build.json` ma być gitignorowany i generowany wyłącznie przez skrypt wdrożenia (`npm run build`), czy dopuszczalne jest commitowanie go z datą budowania lokalnego jako placeholdera deweloperskiego? Odpowiedź zmienia zakres TSK-1: wariant A dodaje `config/build.json` do `.gitignore` i wymaga skryptu; wariant B pozwala commitować plik z datą jako placeholder (nie wymaga skryptu wdrożenia).
- [właściciel] Kto jest właścicielem flagi `show_last_deployed` i podejmuje decyzję o przejściu z etapu `internal` do `100%`? Imię lub rola potrzebna do pola `owner` w `release.yaml` (obecnie: `właściciel produktu` jako placeholder).
