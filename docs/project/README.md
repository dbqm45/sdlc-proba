<!-- WYGENEROWANO przez .claude/hooks/project_record.py — nie edytuj ręcznie -->
# Dziennik projektu

**Bieżąca faza:** Plan  ·  **Do akceptacji:** 12  ·  [Dziennik zdarzeń](journal.md)  ·  [Rejestr decyzji](decisions.md)

| Faza | Artefakt | Status | Wersja | Autor | Aktualizacja | TL;DR |
|---|---|---|---|---|---|---|
| Odkrywanie | [Zamiar zmiany CHG-1](changes/CHG-1/intent.md) | proposed | 1 | pdi | 2026-10-30 |  |
| Odkrywanie | [Zamiar zmiany CHG-3](changes/CHG-3/intent.md) | proposed | 1 | pdi | 2026-11-03 | Dodajemy na stronie głównej licznik „Wdrożenia w ostatnich 7 dniach: N" za flagą `deploy_counter` (off na prod na start). |
| Odkrywanie | [Zamiar zmiany CHG-4](changes/CHG-4/intent.md) | proposed | 1 | pdi | 2026-11-07 | Środowisko jest dziś na stronie tylko w zwykłym wierszu „Środowisko: test/prod", więc testerzy go nie zauważają. |
| Wymagania | [Wymagania zmiany CHG-1](changes/CHG-1/requirements.md) | proposed | 1 | ewa | 2026-10-30 |  |
| Wymagania | [Wymagania zmiany CHG-3](changes/CHG-3/requirements.md) | proposed | 1 | ewa | 2026-11-03 | Strona główna pokazuje „Wdrożenia w ostatnich 7 dniach: N" za flagą `deploy_counter` (test: on, prod: off). |
| Wymagania | [Wymagania zmiany CHG-4](changes/CHG-4/requirements.md) | proposed | 1 | ewa | 2026-11-07 | Strona główna pokazuje w nagłówku znacznik środowiska („TEST" albo „PROD", w różnych kolorach) i ma `<title>` |
| Architektura i stack | [Projekt zmiany CHG-1](changes/CHG-1/design.md) | proposed | 2 | natalia | 2026-10-31 |  |
| Architektura i stack | [Architektura zmiany CHG-3](changes/CHG-3/architecture.md) | proposed | 1 | tomasz | 2026-11-03 | Licznik wdrożeń liczy serwer: nowa funkcja `countDeployments` w `src/deployments.js` (jedno zapytanie `COUNT` |
| Architektura i stack | [Architektura zmiany CHG-4](changes/CHG-4/architecture.md) | proposed | 1 | tomasz | 2026-11-07 | Znacznik środowiska i prefiks `<title>` powstają w `renderPage` (`src/page.js`) z `env` serwera, tylko gdy `on('env_badge')`. |
| Plan | [Decyzje zmiany CHG-1](changes/CHG-1/decisions.md) | draft | 1 | pdi | 2026-10-31 |  |
| Plan | [Plan zmiany CHG-1](changes/CHG-1/plan.md) | proposed | 1 | tomasz | 2026-10-30 |  |
| Plan | [Decyzje zmiany CHG-3](changes/CHG-3/decisions.md) | draft | 1 | pdi | 2026-11-03 |  |
| Plan | [Plan zmiany CHG-3](changes/CHG-3/plan.md) | proposed | 1 | tomasz | 2026-11-03 | Jedno cięcie TSK-1 (R1 = MVP) za flagą `deploy_counter`: licznik „Wdrożenia w ostatnich 7 dniach: N” na stronie głównej. |
| Plan | [Decyzje zmiany CHG-4](changes/CHG-4/decisions.md) | draft | 1 | pdi | 2026-11-07 |  |
| Plan | [Plan zmiany CHG-4](changes/CHG-4/plan.md) | proposed | 1 | tomasz | 2026-11-07 | Jedno cięcie TSK-1 (R1 = MVP) za flagą `env_badge`: znacznik TEST/PROD w nagłówku i prefiks środowiska w `<title>`. |

## Ostatnie przekazanie — z [changes/CHG-4/plan.md](changes/CHG-4/plan.md)

Następny krok: faza design (wygląd znacznika: kolory, rozmiar, odstęp od `<h1>`), potem delivery TSK-1 metodą TDD.

## Ostatnie zdarzenia

| Kiedy | Kto | Faza | Zdarzenie |
|---|---|---|---|
| 2026-10-31 20:22 | nieznany | meta | Start pracy w toku: CHG-1: ocena skutku R1 — zamknięcie zmiany (docs/project/wip/chg-1-ocena-skutku-r1-zamkniecie-zmiany.md) |
| 2026-11-03 21:27 | nieznany | meta | Praca w toku chg-1-ocena-skutku-r1-zamkniecie-zmiany: done |
