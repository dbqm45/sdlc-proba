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
