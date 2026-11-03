---
artifact: decisions
phase: plan
status: draft
version: 1
author: pdi
created: 2026-11-03
updated: 2026-11-03
inputs: []
change: CHG-2
source: PRB-24
source_reported_at: 2026-11-03
---
# Decyzje zmiany CHG-2

Wpisy dodaje `decision_record.py decision add CHG-2 …` (po zatwierdzeniu szkicu przez człowieka). `id` nadaje rejestr
pdi (`record_decision` przez MCP) i wpisuje `decision mark`; bez serwera pdi zostaje puste, a `wyslano: nie` — wyślesz
później (`decision pending`). Nie wymyślaj numerów.

<!-- Wzór wpisu:
## <co zdecydowano, jedno zdanie>
- ref: CHG-2/Dn (nadaje decision add)
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
- ref: CHG-2/D1
- id: DEC-0010
- wyslano: tak
- kiedy: 2026-11-03
- kto: pdi
- rodzaj: gate
- dlaczego: Przyjmujemy PRB-24 jako testowe zgłoszenie na potrzeby §0a przebiegu lokalnego A6. Dlaczego: Treść jest świadomie testowa (source_url: „A6 §0a 2026-11-03, dogfooding") — celem jest sprawdzić izolację Z8a dla fazy intent: logi `docker network create --internal`/`run`/`rm`, brak dostępu do `~/.sdlc/env` i `~/.ssh/id_ed25519` w kontenerze, blokada egress do `example.com`. Dowód izolacji pochodzi z konfiguracji kontenera w logu (montowania, `--internal`, zmienne env), a nie wyłącznie z zachowania persony. Sama CHG zostanie odrzucona na B1 po zebraniu dowodów — nie wchodzi do requirements. (decyzja w skrzynce bramek pdi, DEC-0010)
- zrodlo: manual
- szkic: human
