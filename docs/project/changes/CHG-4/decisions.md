---
artifact: decisions
phase: plan
status: draft
version: 1
author: pdi
created: 2026-11-07
updated: 2026-11-07
inputs: []
change: CHG-4
source: PRB-36
source_reported_at: 2026-11-07
---
# Decyzje zmiany CHG-4

Wpisy dodaje `decision_record.py decision add CHG-4 …` (po zatwierdzeniu szkicu przez człowieka). `id` nadaje rejestr
pdi (`record_decision` przez MCP) i wpisuje `decision mark`; bez serwera pdi zostaje puste, a `wyslano: nie` — wyślesz
później (`decision pending`). Nie wymyślaj numerów.

<!-- Wzór wpisu:
## <co zdecydowano, jedno zdanie>
- ref: CHG-4/Dn (nadaje decision add)
- id:
- wyslano: nie
- kiedy: RRRR-MM-DD
- kto: <osoba lub rola, która zdecydowała>
- rodzaj: product | technical | process | triage | intent | gate | other
- dlaczego: <1–5 zdań, tylko z rozmowy>
- zrodlo: claude-cli | claude-ai | slack | confluence | jira | manual | console | ci_for_sdlc | meeting
- szkic: ai | human
- ustalenie: <tylko odpowiedź na ustalenie ci_for_sdlc, np. DES-001:TSK-1>
- skutek: <opcjonalnie przy ustaleniu: resolve | accept_risk | dismiss | confirm>
- pochodzenie: <tylko decyzja z rejestru pdi: pdi (decision import)>
- pytanie: <pytanie z „Pytania do bramki”, na które odpowiedział człowiek (decision gate --answers)>
- odpowiedz: <jego odpowiedź; pary pytanie/odpowiedz mogą się powtarzać>
-->

## Bramka triage: approved
- ref: CHG-4/D1
- id: DEC-0018
- wyslano: tak
- kiedy: 2026-11-07
- kto: pdi
- rodzaj: gate
- dlaczego: Przyjmujemy PRB-36: niewidoczne środowisko na stronie sdlc-sandbox jest problemem do rozwiązania. Dlaczego: Codzienne pomyłki testerów przy raportowaniu błędów (prod vs test) mają realny wpływ na jakość zgłoszeń; zgłoszenie spełnia kryteria przyjęcia. (decyzja w skrzynce bramek pdi, DEC-0018)
- zrodlo: manual
- szkic: human

## Bramka B1: approved
- ref: CHG-4/D2
- id: DEC-0019
- wyslano: tak
- kiedy: 2026-11-07
- kto: pdi
- rodzaj: gate
- dlaczego: Zatwierdzam intencję CHG-4: wariant B (znaczniki TEST/PROD) z prefiksem w <title>, za flagą env_badge. Dlaczego: Problem z PRB-36 to słaba widoczność środowiska; wariant B rozwiązuje ją na obu środowiskach, tekst nie zależy od koloru. (decyzja w skrzynce bramek pdi, DEC-0019)
- zrodlo: manual
- szkic: human
- pytanie: Właściciel aplikacji sdlc-proba: czy na produkcji ma być widoczny znacznik „PROD" (wariant B), czy prod ma zostać bez znacznika, jak proponuje zgłaszający (wariant A)?
- odpowiedz: Tak, wariant B: znacznik TEST i PROD w różnych kolorach, tekst jest nośnikiem znaczenia; plus prefiks w <title>.
- pytanie: Właściciel aplikacji sdlc-proba: kto i jak zmierzy spadek pomyłek środowiska w zgłoszeniach błędów (źródło liczb przed i po, okres pomiaru) i jaki próg uznajecie za sukces?
- odpowiedz: Właściciel aplikacji (dbqm45): przegląd zgłoszeń z 4 tygodni po włączeniu; sukces to zero pomyłek środowiska.
- pytanie: Właściciel aplikacji sdlc-proba: kiedy ta zmiana jest porażką, nawet jeśli znacznik działa (np. widoczny publicznie na prod, zasłania treść, testerzy nadal się mylą)?
- odpowiedz: Gdy przy wyłączonej fladze strona nie jest identyczna jak dziś albo kontrast spadnie poniżej 4,5:1.

## Bramka B2: approved
- ref: CHG-4/D3
- id: DEC-0020
- wyslano: tak
- kiedy: 2026-11-07
- kto: pdi
- rodzaj: gate
- dlaczego: Wymagania CHG-4 (FR-001–FR-005, wymagania jakości) przyjęte bez zmian jako podstawa architektury. Dlaczego: Wymagania pokrywają wariant B z DEC-0019 (znacznik TEST/PROD, prefiks w <title>, flaga env_badge), mają sprawdzalne kryteria porażki (strona bez zmian przy wyłączonej fladze, kontrast ≥ 4,5:1) i nie zostawiają otwartych pytań. (decyzja w skrzynce bramek pdi, DEC-0020)
- zrodlo: manual
- szkic: human

## Bramka B3: approved
- ref: CHG-4/D4
- id: DEC-0021
- wyslano: tak
- kiedy: 2026-11-07
- kto: pdi
- rodzaj: gate
- dlaczego: Plan CHG-4 przyjęty: opcja A (znacznik i prefiks <title> renderowane na serwerze za flagą env_badge), jedno cięcie TSK-1 w R1, cel: pokrycie zmienionych linii ≥ 90%, bez progów mutacji i wydajności. Dlaczego: Opcja A spełnia ograniczenia z architecture.md (flaga off = strona bez zmian, brak JS klienta, CSP bez zmian, brak nowych zależności); B łamie zakaz JS klienta, C dubluje szablon. Zmiana to kilka linii renderowania, więc jedno cięcie i próg pokrycia wystarczą. Drugi przegląd planu nie odbył się (brak klucza API) — zatwierdzam na podstawie własnego przeglądu. (decyzja w skrzynce bramek pdi, DEC-0021)
- zrodlo: manual
- szkic: human
- pytanie: Właściciel aplikacji sdlc-proba: kto jest właścicielem flagi `env_badge` (decyduje o przejściu etapów rolloutu, w tym o włączeniu znacznika na prod) i czy `remove_by: 2027-03-31` w release.yaml (propozycja Tomasza) jest właściwą datą usunięcia flagi?
- odpowiedz: Właściciel flagi env_badge: dbqm45. remove_by: 2027-03-31 — akceptuję.
- pytanie: Właściciel aplikacji sdlc-proba: jakie kryterium wyjścia z etapu `test` przed włączeniem na prod (propozycja w release.yaml: min. 3 dni na test, znacznik „TEST” widoczny, `<title>` z prefiksem, zero błędów 5xx w logu serwera)?
- odpowiedz: Akceptuję propozycję: min. 3 dni na test, znacznik „TEST” i prefiks [TEST] w <title> widoczne, zero błędów 5xx w logu serwera. Włączenie na prod osobną zmianą po mojej decyzji.
- pytanie: Właściciel aplikacji sdlc-proba: czy akceptujecie brak progu testów mutacyjnych (ADR-3, powód: StrykerJS to nowa zależność wbrew DL4), a jako jedyny próg jakości kodu pokrycie zmienionych linii ≥ 90%?
- odpowiedz: Akceptuję brak progu mutacji (ADR-3: StrykerJS to nowa zależność wbrew DL4). Jedyny próg jakości kodu: pokrycie zmienionych linii ≥ 90%, sprawdzane z raportu node --test --experimental-test-coverage.

## Projekt CHG-4 przyjęty bez ramek Figmy: pigułka TEST/PROD pod <h1> w kolorach z design.md, prefiks [TEST]/[PROD] w <title>, tekst jako nośnik znaczenia, bez JS i ARIA.
- ref: CHG-4/D5
- id: DEC-0022
- wyslano: tak
- kiedy: 2026-11-07
- kto: console
- rodzaj: gate
- dlaczego: Zmiana jest mała i w pełni opisana tabelą wyglądu; kontrast obu wariantów sprawdzony skryptem wg WCAG (11,93:1 i 6,54:1, próg 4,5:1) i dodatkowo sprawdzi go test E-04A. Brak systemu projektowego w sdlc-sandbox, więc ramki Figmy nie dodałyby informacji.
- zrodlo: console
- szkic: human
- pochodzenie: pdi
- pytanie: Projektant (właściciel pliku Figmy): podaj link do pliku Figmy i ramki (z `node-id`) dla wierszy z `brak`, albo zdecyduj, że ramki ma naszkicować agent; do tego czasu wiersze zostają bez ramek.
- odpowiedz: Figmy nie ma i nie będzie dla tej zmiany. Ramki nie są potrzebne: wygląd w pełni opisuje tabela w design.md, a kontrast sprawdza test E-04A. Wiersze z „brak” zostają bez ramek.
- pytanie: Projektant: czy kolory (`#ffd54f`/`#1d1d1f` dla TEST, `#b3261e`/`#ffffff` dla PROD), rozmiar i kształt pigułki z sekcji „Przepływy" są zgodne z systemem projektowym sdlc-sandbox?
- odpowiedz: sdlc-sandbox nie ma systemu projektowego. Akceptuję propozycję: TEST #ffd54f/#1d1d1f (11,93:1), PROD #b3261e/#ffffff (6,54:1), pigułka inline-block, padding .25rem .75rem, border-radius 999px, tekst .875rem, odstęp .5rem pod <h1>, w przepływie dokumentu.
- pytanie: US-01 idle (Tester otwiera `GET /` na `test`, flaga `env_badge` włączona): brak ramki — Pytanie do projektanta: ramka strony z pigułką „TEST" (żółte tło, ciemny tekst) i kartą `[TEST] sdlc-sandbox`; FR-001, FR-002, FR-004
- odpowiedz: Bez ramki. Wygląd z tabeli w design.md; sprawdzają testy FR-001, FR-002, FR-004.
- pytanie: US-01 success (Tester otwiera `GET /` na `prod`, flaga włączona): brak ramki — Pytanie do projektanta: ramka z pigułką „PROD" (czerwone tło, biały tekst) i kartą `[PROD] sdlc-sandbox`; rozpoznanie środowiska bez czytania adresu
- odpowiedz: Bez ramki. Wygląd z tabeli w design.md; rozpoznanie środowiska po tekście „PROD” i prefiksie [PROD].
- pytanie: US-01 idle (Flaga `env_badge` wyłączona (prod do czasu rollout)): brak ramki — Pytanie do projektanta: ramka referencyjna = dzisiejsza strona bez zmian (FR-003, bajt w bajt); wystarczy zrzut obecnej strony
- odpowiedz: Bez ramki. Wzorcem jest obecna strona; „bajt w bajt” sprawdza test E-03A.
- pytanie: FR-001 idle (Znacznik w nagłówku, wąski ekran (≈ 320 px)): brak ramki — Pytanie do projektanta: ramka mobilna; pigułka nie zawija się i nie wychodzi poza `main`
- odpowiedz: Bez ramki. Pigułka inline-block z krótkim tekstem; sprawdzę ręcznie na 320 px po wdrożeniu na test.
- pytanie: FR-001 success (Znacznik w nagłówku przy włączonej fladze): brak ramki — Pytanie do projektanta: ramka desktop z kolejnością `<h1>` → pigułka → akapit „Środowisko" (E-01D)
- odpowiedz: Bez ramki. Kolejność <h1> → pigułka → akapit „Środowisko” sprawdza test E-01D.
- pytanie: FR-004 idle (Para kolorów test i prod): brak ramki — Pytanie do projektanta: karta tokenów kolorów; wartości poniżej są propozycją, kontrast liczy test E-04A
- odpowiedz: Bez ramki. Kolory przyjęte jak w pytaniu 2.
- pytanie: FR-004 success (Kontrast obu wariantów ≥ 4,5:1): brak ramki — Pytanie do projektanta: ramka z zapisem kontrastu; sprawdzenie w teście, nie w Figmie
- odpowiedz: Bez ramki. Kontrast sprawdzony skryptem (11,93:1 i 6,54:1), w delivery sprawdzi go test E-04A.

## Bramka approve-for-implementation: approved
- ref: CHG-4/D6
- id: DEC-0023
- wyslano: tak
- kiedy: 2026-11-07
- kto: pdi
- rodzaj: gate
- dlaczego: CHG-4 zatwierdzona do budowy: TSK-1 (znacznik TEST/PROD i prefiks <title> za flagą env_badge) wg planu DEC-0021 i projektu DEC-0022, cel: pokrycie zmienionych linii ≥ 90%. Dlaczego: Wymagania (DEC-0020), plan z celami (DEC-0021) i projekt (DEC-0022) zatwierdzone, PR-y faz scalone, ci_for_sdlc zgłosił gotowość. Jedno małe cięcie bez nowych zależności, za flagą wyłączoną na prod. (decyzja w skrzynce bramek pdi, DEC-0023)
- zrodlo: manual
- szkic: human
