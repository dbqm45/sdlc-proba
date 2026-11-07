---
artifact: requirements
phase: requirements
status: proposed
version: 1
author: ewa
created: 2026-11-07
updated: 2026-11-07
inputs: [docs/project/changes/CHG-4/intent.md, docs/project/changes/CHG-4/decisions.md]
change: CHG-4
source: PRB-36
source_reported_at: 2026-11-07
---
# Wymagania zmiany CHG-4

## TL;DR
Strona główna pokazuje w nagłówku znacznik środowiska („TEST" albo „PROD", w różnych kolorach) i ma `<title>`
z prefiksem środowiska, za flagą `env_badge`. Tekst niesie znaczenie, kolor je tylko wzmacnia. Przy wyłączonej fladze
strona jest bajt w bajt taka jak dziś. Kontrast tekstu znacznika ≥ 4,5:1. Ustalenia z bramek: CHG-4/D1 (DEC-0018),
CHG-4/D2 (DEC-0019). Nowych pytań do człowieka brak.

## Historia użytkownika
**US-01** — Tester od razu widzi, na jakim środowisku jest
Jako tester (lub członek zespołu) otwierający stronę sdlc-sandbox widzę na pierwszy rzut oka, czy to `test`, czy `prod`
(w nagłówku strony i na karcie przeglądarki), żeby nie zgłaszać błędów z jednego środowiska jako błędów z drugiego.

## Ustalenia z bramek (nie do ponownego pytania)
| Kwestia | Ustalenie | Źródło |
|---|---|---|
| Wariant | B: znacznik „TEST" i „PROD" w różnych kolorach, tekst jest nośnikiem znaczenia, plus prefiks środowiska w `<title>`; znacznik widoczny także na prod | CHG-4/D2, DEC-0019 |
| Flaga | `env_badge` | CHG-4/D2, DEC-0019 |
| Pomiar sukcesu | właściciel aplikacji (dbqm45) przegląda zgłoszenia z 4 tygodni po włączeniu; sukces = zero pomyłek środowiska | CHG-4/D2, DEC-0019 |
| Porażka | (a) przy wyłączonej fladze strona inna niż dziś; (b) kontrast tekstu znacznika poniżej 4,5:1 | CHG-4/D2, DEC-0019 |
| Przyjęcie zgłoszenia | PRB-36 jest problemem do rozwiązania | CHG-4/D1, DEC-0018 |

## Wymagania funkcjonalne

### FR-001 — Znacznik środowiska w nagłówku za flagą
Gdy `env_badge` jest włączona dla odwiedzającego, `GET /` zawiera w nagłówku strony (w `<main>`, przy `<h1>`)
element `<span class="env-badge env-badge--test" data-flag="env_badge">TEST</span>` albo
`<span class="env-badge env-badge--prod" data-flag="env_badge">PROD</span>`. Tekst to nazwa środowiska wielkimi
literami, wzięta wyłącznie z `env` serwera (`APP_ENV`), nigdy z parametru żądania. Renderowanie po stronie serwera,
bez JS klienta. Istniejący akapit „Środowisko: …" zostaje **[propozycja]** (jedna zmiana mniej, brak regresji).

**Kryteria akceptacji:**
- **E-01A** — test:
  ```
  wejście: renderPage({ env: 'test', on: k => k === 'env_badge' })
  oczekiwany wynik: HTML zawiera element z data-flag="env_badge", klasą env-badge--test i tekstem „TEST"; brak „PROD" w znaczniku
  ```
- **E-01B** — prod:
  ```
  wejście: renderPage({ env: 'prod', on: k => k === 'env_badge' })
  oczekiwany wynik: element z klasą env-badge--prod i tekstem „PROD"
  ```
- **E-01C** — zgodność z `APP_ENV` (metryka intentu):
  ```
  wejście: serwer z APP_ENV=prod, flaga ON, GET /?env=test
  oczekiwany wynik: 200, znacznik „PROD" (parametr żądania nie zmienia znacznika)
  ```
- **E-01D** — pozycja **[propozycja]**:
  ```
  wejście: flaga ON
  oczekiwany wynik: znacznik występuje w HTML po <h1> i przed akapitem „Środowisko"
  ```

### FR-002 — Prefiks środowiska w `<title>`
Gdy `env_badge` jest włączona, `<title>` ma postać `[TEST] sdlc-sandbox` albo `[PROD] sdlc-sandbox`
(format prefiksu **[propozycja]**; wymóg: nazwa środowiska na początku tytułu). Wartość escapowana.

**Kryteria akceptacji:**
- **E-02A** — test:
  ```
  wejście: env=test, flaga ON
  oczekiwany wynik: <title>[TEST] sdlc-sandbox</title>
  ```
- **E-02B** — prod:
  ```
  wejście: env=prod, flaga ON
  oczekiwany wynik: <title>[PROD] sdlc-sandbox</title>
  ```
- **E-02C** — flaga OFF:
  ```
  wejście: flaga OFF
  oczekiwany wynik: <title>sdlc-sandbox</title> (jak dziś)
  ```

### FR-003 — Flaga wyłączona: strona bez zmian
Przy `env_badge` wyłączonej HTML strony jest bajt w bajt taki jak przed zmianą (kryterium porażki (a), CHG-4/D2).

**Kryteria akceptacji:**
- **E-03A** — bajt w bajt:
  ```
  wejście: flaga env_badge OFF, env=test i env=prod, pozostałe flagi bez zmian
  oczekiwany wynik: wynik renderPage identyczny z wynikiem sprzed zmiany; istniejące testy test/page.test.js i test/server.test.js przechodzą bez modyfikacji
  ```
- **E-03B** — brak śladu:
  ```
  wejście: flaga OFF
  oczekiwany wynik: HTML nie zawiera „env-badge" ani „data-flag=\"env_badge\""
  ```

### FR-004 — Styl znacznika
`public/style.css` (jedyny plik stylu; CSP bez stylów inline) zawiera reguły `.env-badge`, `.env-badge--test`
i `.env-badge--prod` z różnymi kolorami tła. Kolor tekstu i tła każdego wariantu daje kontrast ≥ 4,5:1.
Znacznik nie zasłania treści (element w przepływie dokumentu, nie `position: fixed` nad treścią).

**Kryteria akceptacji:**
- **E-04A** — kontrast:
  ```
  wejście: kolory tekstu i tła z .env-badge--test i .env-badge--prod w public/style.css
  oczekiwany wynik: współczynnik kontrastu WCAG każdej pary ≥ 4,5 (liczony w teście z wartości z pliku CSS)
  ```
- **E-04B** — rozróżnialność:
  ```
  wejście: te same reguły
  oczekiwany wynik: kolory tła test i prod różne; sens znacznika czytelny z samego tekstu (kryterium: tekst „TEST"/„PROD" obecny w HTML, E-01A/B)
  ```
- **E-04C** — brak inline:
  ```
  wejście: HTML przy fladze ON
  oczekiwany wynik: brak atrybutu style i brak <style>/<script> (CSP default-src 'self' bez zmian)
  ```

### FR-005 — Konfiguracja flagi
`config/flags.test.json` i `config/flags.prod.json` zawierają klucz `env_badge` z `enabled` i `rollout`. Wartości
początkowe **[propozycja]**: test `enabled: true, rollout: 100`; prod `enabled: false, rollout: 0` (włączenie na prod
zapada w etapach rolloutu w fazie plan, nie tutaj; zob. intent.md, poza zakresem). Inne flagi bez zmian.

**Kryteria akceptacji:**
- **E-05A** — pliki flag:
  ```
  wejście: odczyt obu plików
  oczekiwany wynik: env_badge istnieje w obu; test → enabled true; prod → enabled false
  ```
- **E-05B** — brak regresji innych flag:
  ```
  wejście: te same pliki
  oczekiwany wynik: welcome_banner, show_last_deployed, deploy_counter bez zmian
  ```
- **E-05C** — nieznana flaga w kodzie:
  ```
  wejście: plik flag bez klucza env_badge (np. stary plik)
  oczekiwany wynik: znacznik niewidoczny, strona jak dziś (zachowanie `isOn` dla brakującego klucza, bez wyjątku)
  ```

## Wymagania jakości
**NF-001 — Eskapowanie HTML (musi).** Każda wartość wstawiana do HTML (nazwa środowiska w znaczniku i w `<title>`)
przechodzi przez `escape` z `src/page.js`. Weryfikacja: test z `env` zawierającym `<` (brak surowego znaku w HTML).

**NF-002 — Brak regresji przy fladze off (musi).** Zob. FR-003. Weryfikacja: E-03A, E-03B.

**NF-003 — Dostępność (musi).** Kontrast ≥ 4,5:1 (WCAG 2.2 AA, 1.4.3); znaczenie nie zależy wyłącznie od koloru
(1.4.1) — tekst „TEST"/„PROD" zawsze obecny. Weryfikacja: E-04A, E-04B.

**NF-004 — Wiarygodność (musi).** Znacznik zawsze zgodny z `APP_ENV` obsługującego procesu; gorsze od braku znacznika
jest pokazanie złego środowiska. Weryfikacja: E-01A–C.

**NF-005 — Bezpieczeństwo i ograniczenia (musi).** Brak nowych zależności (DL4); brak JS po stronie klienta; CSP
`default-src 'self'` bez zmian; środowisko tylko z `APP_ENV`. Weryfikacja: E-01C, E-04C.

**NF-006 — Wydajność (nie dotyczy).** Dodatek to stały fragment HTML, bez zapytań i I/O; progu czasu nie ustalamy.

**NF-007 — Pomiar skutku biznesowego (musi, poza kodem).** Właściciel aplikacji (dbqm45) przegląda zgłoszenia z 4
tygodni po włączeniu flagi; cel: zero pomyłek środowiska (CHG-4/D2, DEC-0019). Bazowej liczby sprzed zmiany repo nie
zbiera; to nie blokuje wydania.

## Priorytety
| ID | Opis | Waga | Wydanie |
|---|---|---|---|
| FR-001 | Znacznik TEST/PROD w nagłówku za flagą | musi | R1 |
| FR-002 | Prefiks środowiska w `<title>` | musi | R1 |
| FR-003 | Flaga off: strona bajt w bajt | musi | R1 |
| FR-004 | Styl: różne kolory, kontrast ≥ 4,5:1 | musi | R1 |
| FR-005 | Flaga `env_badge` w plikach flag | musi | R1 |
| NF-001 | Eskapowanie HTML | musi | R1 |
| NF-002 | Brak regresji przy fladze off | musi | R1 |
| NF-003 | Dostępność (kontrast, nie tylko kolor) | musi | R1 |
| NF-004 | Znacznik zgodny z `APP_ENV` | musi | R1 |
| NF-005 | Bezpieczeństwo, brak zależności, CSP | musi | R1 |
| NF-007 | Przegląd zgłoszeń po 4 tygodniach (właściciel) | musi | po R1 |

Poza zakresem (z intent.md i CHG-4/D2): favicon zależny od środowiska, zmiana adresów i konfiguracji wdrożeń, nowe
środowiska, blokada działań na złym środowisku, zmiany licznika wdrożeń (CHG-3) i stopki, włączenie flagi na prod.

## Ryzyka i hot spoty
- Konflikt przy scalaniu z CHG-3 w `src/page.js` i plikach flag (brak zależności merytorycznej) — uwaga dla fazy plan.
- Znacznik jest widoczny publicznie na prod po włączeniu flagi; to świadoma decyzja (CHG-4/D2). Moment włączenia
  rozstrzyga rollout w fazie plan.

## Pytania do bramki
Brak. Pytania z intent.md (znacznik na prod, pomiar, kryteria porażki) rozstrzygnięte w CHG-4/D2 (DEC-0019).


## Przegląd drugim modelem
*Dostawca: `None`, model: `None`, status: `unavailable`.*

- brak blokujących ustaleń
