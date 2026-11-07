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
