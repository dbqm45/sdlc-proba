# sdlc-sandbox

Repo próbne całego przepływu SDLC na jednym komputerze (pdi, krok L5 planu „cały workflow lokalnie”). Mała aplikacja,
na której przechodzisz od zgłoszenia, przez fazy tf z bramkami w pdi i gotowość w ci_for_sdlc, po cięcia talosa,
wdrożenia, etapy flagi i ocenę skutku — w jeden dzień, bez Vercela, Supabase, tunelu i płatnych GitHub Actions.

Nie klonuj tego repo ręcznie. `uv run sdlc sandbox <nazwa>` w pdi zakłada z tego szablonu prywatne repo na Twoim
koncie, klonuje je, śledzi w ShipScope (z plikiem flag) i ustawia je jako repo faz tf. Cały przebieg krok po kroku:
`docs/przebieg-lokalny.md` w pdi.

## Aplikacja (decyzja DL4)

Statyczna strona podawana przez serwer Node bez zależności:
- `npm start` uruchamia ją pod adresem `http://localhost:8080/`; `APP_ENV=test|prod` wybiera plik flag;
- `npm test` uruchamia testy (`node:test`).

Flagi są w `config/flags.test.json` i `config/flags.prod.json`, w postaci
`{ "<klucz>": { "enabled": true|false, "rollout": 0-100 } }`. ShipScope czyta je przy wdrożonym commicie (źródło z
kodu: plik `config/flags.{env}.json`, `valuePath: enabled`, `rolloutPath: rollout`). Dziś za flagą jest jedno
zachowanie: `welcome_banner`, czyli baner powitalny, włączony na test i wyłączony na prod.

## tf

tf **5.51.1** w trybie zespołowym (`--shared`), z pakietami `pack-it`, `pack-ux` (plus `pack-editorial-pl`) i trybami
`mode-pdi`, `mode-talos`. `tf doctor` jest czysty. Aktualizacja: `python3 factory/update.py`.

Pliki workflow (`.github/workflows/sdlc-phase.yml`, `metric-watch.yml`, `change-check.yml` z ci_for_sdlc v0.1.35,
`team-factory.yml`) zostają na przyszłość, gdy Actions zadziałają. **Lokalny przebieg ich nie potrzebuje:** fazy
uruchamia pdi (`PDI_DISPATCH=local`), a gotowość wysyła `sdlc check`.

`.claude/pdi-metrics.json` opisuje metryki wdrożeń z ShipScope (`deployments`, `rollbacks`) dla
`metric_watch.py`. Repo próbne nie ma użytkowników, więc **skutek oceniasz ręcznie** w ocenie skutku (krok 9
przebiegu), a pasma kontrolne mają sens dopiero po kilku tygodniach wdrożeń.

## Zgłoszenie do wpisania (jedno)

Wpisz je w formularzu pdi (`uv run sdlc open`) albo w czacie Claude (`record_problem`):

- **Kto:** odwiedzający stronę sdlc-sandbox.
- **Czego nie może:** nie wie, czy strona jest aktualna — nie widać, kiedy ją ostatnio wdrożono.
- **Skutek:** nie ufa temu, co widzi, i pyta zespół, czy to już nowa wersja.
- **Obejście:** pyta na czacie.
- **Jak często:** przy każdym wdrożeniu.
- **Pomysł zgłaszającego:** stopka „Ostatnie wdrożenie: <data>”.

Zakres na jeden dzień:
- jedna flaga (np. `show_last_deployed`);
- dwa cięcia: (1) data wdrożenia z pliku `config/build.json` w stopce za flagą, (2) polski format daty i test;
- R1 to cała zmiana.

## Skrócenie czasu próby

- W decyzji B1 ustaw `review_by` na jutro (ocena skutku dzień po wydaniu).
- W `release.yaml` etapy flagi mają `min_days: 0`, np. `internal` → `100%`.
- `sdlc up` ustawia ShipScope na synchronizację co minutę (`SYNC_INTERVAL_MINUTES=1`). Zdarzenia wydania ShipScope
  sprawdza co 5 minut, więc między etapem flagi a bramką w pdi mija do ok. 6 minut.

## Kroki (skrót; pełna lista z oczekiwanymi wynikami w pdi `docs/przebieg-lokalny.md`)

1. `uv run sdlc up`, `uv run sdlc sandbox sdlc-proba`, `uv run sdlc open`.
2. Zgłoszenie (wyżej), triaż `accepted` w czacie.
3. Fazy intent → requirements → architecture → design: każda kończy się PR-em i bramką w skrzynce pdi; merge, potem
   decyzja.
4. `uv run sdlc check` → „Approve for implementation” w skrzynce; decyzja.
5. Talos: cięcia jako PR-y; merge.
6. `uv run sdlc deploy test`, `uv run sdlc deploy prod` → ShipScope: „Deployed (hidden)”.
7. Etapy flagi PR-ami do `config/flags.prod.json`, po każdym `sdlc deploy prod`; bramki etapów w skrzynce.
8. Następnego dnia: `uv run pdi-impact-review` → ocena skutku → decyzja.
