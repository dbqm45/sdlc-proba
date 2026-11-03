---
artifact: decisions
phase: plan
status: draft
version: 1
author: pdi
created: 2026-11-03
updated: 2026-11-03
inputs: []
change: CHG-3
source: PRB-27
source_reported_at: 2026-11-03
---
# Decyzje zmiany CHG-3

Wpisy dodaje `decision_record.py decision add CHG-3 …` (po zatwierdzeniu szkicu przez człowieka). `id` nadaje rejestr
pdi (`record_decision` przez MCP) i wpisuje `decision mark`; bez serwera pdi zostaje puste, a `wyslano: nie` — wyślesz
później (`decision pending`). Nie wymyślaj numerów.

<!-- Wzór wpisu:
## <co zdecydowano, jedno zdanie>
- ref: CHG-3/Dn (nadaje decision add)
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
- ref: CHG-3/D1
- id: DEC-0012
- wyslano: tak
- kiedy: 2026-11-03
- kto: pdi
- rodzaj: gate
- dlaczego: Przyjmujemy PRB-27 do pracy jako zmianę: licznik „Wdrożenia w ostatnich 7 dniach: N" na stronie głównej, za flagą deploy_counter (off na prod na start). Dlaczego: Zgłoszenie opisuje realny brak miary wprost na stronie; proponowane rozwiązanie mieści się w aktualnej architekturze sdlc-proba (strona + istniejący odczyt /deployments). Ryzyko regresji ograniczone nową flagą deploy_counter, domyślnie off na prod. Przebieg testowy A6 — triaż accepted z góry zatwierdzony przez właściciela 2026-11-03. (decyzja w skrzynce bramek pdi, DEC-0012)
- zrodlo: manual
- szkic: human
