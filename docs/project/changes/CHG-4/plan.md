---
artifact: plan
phase: plan
status: proposed
version: 1
author: tomasz
created: 2026-11-07
updated: 2026-11-07
inputs: [docs/project/changes/CHG-4/intent.md, docs/project/changes/CHG-4/requirements.md, docs/project/changes/CHG-4/architecture.md, docs/project/changes/CHG-4/decisions.md]
change: CHG-4
source: PRB-36
source_reported_at: 2026-11-07
tasks: [TSK-1]
---
# Plan zmiany CHG-4

## TL;DR
Jedno cięcie TSK-1 (R1 = MVP) za flagą `env_badge`: znacznik TEST/PROD w nagłówku i prefiks środowiska w `<title>`.
Fundamentu nie ma: mechanizm flag, `renderPage` i `public/style.css` już istnieją. Podział (np. osobno styl, osobno HTML)
dałby kawałki bez własnej wartości. Wariant B: CHG-4/D2 (DEC-0019); wymagania: CHG-4/D3 (DEC-0020); architektura: `architecture.md`.

Cięcia (TSK) — każde daje wartość samo i kończy się weryfikacją. Klucze cięć są w `tasks` nagłówka,
linia wydania (R1 = MVP) i flaga — w `release.yaml` (te same wartości co w kolumnach poniżej).

| Cięcie | Rodzaj | Wydanie | Flaga | Wartość | Wymagania | Odblokowuje | Pliki | Weryfikacja |
|---|---|---|---|---|---|---|---|---|
| TSK-1 | cięcie | R1 | env_badge | użytkownik może od razu rozpoznać po znaczniku w nagłówku i prefiksie karty, czy strona działa na `test`, czy na `prod` | US-01, FR-001, FR-002, FR-003, FR-004, FR-005, NF-001, NF-002, NF-003, NF-004, NF-005 | — | `src/page.js`, `public/style.css`, `config/flags.test.json`, `config/flags.prod.json`, `test/page.test.js`, `test/server.test.js`, `test/flags.test.js` | `npm test` → 0 (testy E-01A…E-05C napisane najpierw, czerwone przed kodem; w tym E-03A: HTML przy off identyczny z zamrożonym HTML sprzed zmiany dla `test` i `prod`, E-04A: kontrast ≥ 4,5 liczony z `public/style.css`); `config/flags.prod.json` → `env_badge.enabled == false` |

## Kolejność i zależności
Jedno cięcie, brak zależności. Gwiazda przewodnia (najmniejszy przepływ end-to-end dowodzący tezy) = samo TSK-1: od `GET /`
przez flagę i `APP_ENV` do HTML ze znacznikiem. Kolejność w TSK-1 (TDD): testy akceptacyjne → `page.js` → `style.css` → pliki flag.

## Etapy rolloutu flagi (zob. release.yaml)
1. `test` — flaga on od wdrożenia (FR-005); min. 3 dni, zero błędów 5xx w logu serwera, znacznik „TEST” i prefiks `[TEST]` widoczne.
2. `prod` — włączenie `enabled: true, rollout: 100` osobną zmianą po decyzji właściciela flagi; to nie jest część TSK-1.
   Od włączenia biegnie 4-tygodniowy przegląd zgłoszeń (NF-007, CHG-4/D2): sukces = zero pomyłek środowiska.
Po etapie 100% i przeglądzie: PR usuwający flagę przed `remove_by`.

## Niewiadome
| Niewiadoma | Właściciel | Blokuje |
|---|---|---|
| właściciel flagi, data `remove_by`, kryterium wyjścia etapu `test` (wartości w release.yaml to [propozycja]) | właściciel aplikacji | nie blokuje delivery TSK-1; blokuje włączenie na prod |
| próg mutacji: pominięty (ADR-3) | właściciel aplikacji | nie |

## Poza zakresem MVP (kandydaci do R2, bez planowania teraz)
Favicon zależny od środowiska (wymaga routingu plików statycznych), blokada lub ostrzeżenie przy działaniach na złym środowisku
(intent.md, CHG-4/D2).

## Rozważone opcje

### Opcja A — Znacznik i prefiks `<title>` renderowane na serwerze, styl w `style.css`, za flagą (wybór)
- Plusy: znacznik w pierwszym HTML (bez JS, bez drugiego żądania); zgodne z CSP i DL4; flaga off = HTML bez zmian; tekst niesie znaczenie.
- Minusy: znacznik widoczny publicznie na prod po włączeniu (świadoma decyzja CHG-4/D2); możliwy konflikt tekstowy z CHG-3 w `src/page.js`.
- Koszt: mały: ~10 linii w `page.js`, 3 reguły CSS, 2 wpisy flag, testy; brak nauki ani nowych zależności.

### Opcja B — Znacznik wstawiany skryptem klienta na podstawie `/health`
- Plusy: `page.js` bez zmian; można wyłączyć bez zmiany HTML.
- Minusy: wymaga JS i zmiany CSP (nowy plik skryptu), drugie żądanie, błysk strony bez znacznika, nie działa bez JS; sprzeczne z NF-005.
- Koszt: średni: nowy plik statyczny i routing, testy przeglądarkowe; łamie ograniczenie „brak JS klienta”.

### Opcja C — Osobny szablon strony dla środowiska z włączoną flagą
- Plusy: brak warunków w głównym szablonie.
- Minusy: duplikacja HTML, rozjazd szablonów (ryzyko dla „bajt w bajt” i dla CHG-3), więcej do utrzymania.
- Koszt: średni i rosnący z każdą zmianą strony.

**Wybór:** Opcja A — najprostsze rozwiązanie spełniające czynniki z `architecture.md` (flaga off = strona jak dziś, tekst jako nośnik znaczenia,
CSP bez zmian, brak zależności); B łamie ograniczenia, C dubluje szablon bez zysku.

## Cele zmiany (targets)

Mierzalne progi przed B4 (Z7b-1, DZ7); te same wartości w `release.yaml` pod kluczem `targets`. Progi uzasadniono ryzykiem kodu:
zmiana to kilka linii czystego renderowania, więc pokrycie ma być prawie pełne; mutacji nie stawiamy (ADR-3).

| Nazwa                      | Rodzaj      | Próg       | Narzędzie | Uzasadnienie (czynnik / ryzyko) |
|----------------------------|-------------|------------|-----------|---------------------------------|
| pokrycie zmienionych linii | coverage    | >= 90%     | `node --test --experimental-test-coverage` | każda zmieniona linia `src/page.js` to gałąź flaga on/off; niepokryta oznaczałaby niesprawdzone „bajt w bajt” lub znacznik (N4). Granularność „zmienione linie” sprawdzana ręcznie z raportu **[założenie]** |
| mutacje zmienionego kodu   | mutation    | — (brak)   | —         | StrykerJS to nowa zależność, wbrew DL4; asercje na dokładny HTML zastępują ją (ADR-3, pytanie do bramki) |
| p95 dla `GET /`            | performance | — (brak)   | —         | stały fragment HTML, bez I/O (NF-006: nie dotyczy) |

## Pytania do bramki
- Właściciel aplikacji sdlc-proba: kto jest właścicielem flagi `env_badge` (decyduje o przejściu etapów rolloutu, w tym o włączeniu znacznika na prod) i czy `remove_by: 2027-03-31` w release.yaml (propozycja Tomasza) jest właściwą datą usunięcia flagi?
- Właściciel aplikacji sdlc-proba: jakie kryterium wyjścia z etapu `test` przed włączeniem na prod (propozycja w release.yaml: min. 3 dni na test, znacznik „TEST” widoczny, `<title>` z prefiksem, zero błędów 5xx w logu serwera)?
- Właściciel aplikacji sdlc-proba: czy akceptujecie brak progu testów mutacyjnych (ADR-3, powód: StrykerJS to nowa zależność wbrew DL4), a jako jedyny próg jakości kodu pokrycie zmienionych linii ≥ 90%?

## Przekazanie
Następny krok: faza design (wygląd znacznika: kolory, rozmiar, odstęp od `<h1>`), potem delivery TSK-1 metodą TDD.


## Przegląd drugim modelem
*Dostawca: `None`, model: `None`, status: `unavailable`.*

- brak blokujących ustaleń
