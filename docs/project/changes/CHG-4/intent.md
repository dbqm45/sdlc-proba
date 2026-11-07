---
artifact: intent
phase: discovery
status: proposed
version: 1
author: pdi
created: 2026-11-07
updated: 2026-11-07
inputs: []
change: CHG-4
source: PRB-36
source_reported_at: 2026-11-07
---
# Zamiar zmiany CHG-4

## TL;DR
Środowisko jest dziś na stronie tylko w zwykłym wierszu „Środowisko: test/prod", więc testerzy go nie zauważają.
Proponujemy wyraźny, widoczny na pierwszy rzut oka znacznik środowiska w nagłówku strony, renderowany po stronie serwera,
za flagą. Przyjęcie PRB-36 rozstrzyga CHG-4/D1 (DEC-0018). Zakres znacznika na prod czeka na odpowiedź człowieka (niżej).

## Problem
Odwiedzający stronę sdlc-sandbox (zespół i testerzy) nie rozpoznają od razu, czy patrzą na wersję testową, czy
produkcyjną, bo strony wyglądają tak samo. Skutek: błędy z prod są zgłaszane jako błędy z test i odwrotnie, a zmianę
zdarza się sprawdzać na złym środowisku. Dziś ludzie patrzą na adres w przeglądarce albo pytają na czacie. Zdarza się to
codziennie, przy każdym sprawdzaniu wdrożenia (źródło: zgłoszenie PRB-36, dane od zgłaszającego).

Stan obecny (sprawdzony w kodzie): `src/page.js` renderuje `<p>Środowisko: <strong>${env}</strong></p>` — zwykły akapit
pod nagłówkiem, bez wyróżnienia. `env` pochodzi z `APP_ENV` (domyślnie `test`; `src/server.js`), dozwolone wartości
`test` i `prod` (`ENVIRONMENTS` w `src/flags.js`). Flagi: `config/flags.{test,prod}.json` (`readFlags`/`isOn`,
`enabled` + `rollout`). Styl: `public/style.css` (jeden plik, CSP `default-src 'self'`). Informacja więc już jest,
ale jest mało widoczna; problemem jest rozpoznawalność, nie brak danych.

## Warianty
Pomysł zgłaszającego to wariant A, nie wymaganie.

| Wariant | Koszt | Za | Przeciw |
|---|---|---|---|
| A. Znacznik „TEST" tylko na teście, za flagą (`env_badge`); prod bez znacznika | mały: zmiana `page.js`, reguła w `style.css`, flaga w obu plikach flag, testy | dokładnie to, o co prosi zgłaszający; prod bez zmian wizualnych | brak znacznika bywa niezauważony: prod rozpoznaje się po „braku czegoś"; jeśli flaga zostanie wyłączona lub błędnie ustawiona na teście, test wygląda jak prod, czyli ta sama pomyłka |
| B. Znacznik na obu środowiskach: „TEST" i „PROD" w różnych kolorach, w nagłówku, za flagą (`env_badge`); tekst zawsze obecny, kolor jako dodatek | mały: jak A, plus drugi wariant stylu | pozytywna informacja o obu środowiskach; pomyłka wymaga zignorowania napisu; kolor nie jest jedynym nośnikiem (tekst, kontrast WCAG) | zmienia wygląd prod (znacznik na stronie produkcyjnej widzą wszyscy odwiedzający) |
| C. Zmiana tytułu karty (`<title>`) i favicony zależnie od środowiska | mały–średni: `<title>` łatwo, favicon wymaga plików statycznych (serwer podaje dziś tylko `/style.css`) i zmiany routingu | widoczne na liście kart bez wchodzenia w treść | favicon wymaga nowego routingu plików statycznych; sam w sobie nie wystarcza przy jednej otwartej karcie |
| D. Pasek ostrzegawczy na całą szerokość tylko na teście (mocniejszy wizualnie wariant A) | mały–średni | trudny do przeoczenia | zajmuje miejsce, ten sam brak „znaczenia braku" na prod co w A |
| E. Nic nie zmieniać; zalecić patrzenie na adres | zerowy | brak ryzyka | problem zostaje: codzienne pomyłki, ręczne sprawdzanie |

## Wybrany wariant
**[propozycja]** B, z elementem C (`<title>` z prefiksem środowiska, bez nowych plików statycznych): znacznik z tekstem
„TEST" lub „PROD" w nagłówku strony, w innym kolorze dla każdego środowiska, renderowany po stronie serwera, za flagą
`env_badge`. Uzasadnienie: problemem jest rozpoznawalność, więc najpewniej pomaga pozytywne oznaczenie obu środowisk, a nie
tylko jednego (A: brak znacznika na prod jest sygnałem, który łatwo przeoczyć, i zawodzi razem z flagą). Tekst zostaje
nośnikiem znaczenia, kolor tylko je wzmacnia (dostępność: kontrast i brak zależności od samego koloru). `<title>`
dodaje drugi, tani sygnał na liście kart bez zmiany routingu. Bez nowych zależności, bez skryptów po stronie klienta.

Zgłaszający proponuje wariant A (bez znacznika na prod). Różnica jest decyzją produktową — dotyczy wyglądu prod — więc
**decyzja o znaczniku na prod należy do człowieka** (pytanie 1 niżej). Jeśli odpowiedź brzmi „prod bez znacznika",
wybieramy A (ze wzmocnieniem C). Wybór wariantu zapisze bramka, nie ta faza.

## Metryki sukcesu
- Z włączoną flagą każda strona główna zawiera znacznik z tekstem środowiska zgodnym z `APP_ENV` (próg: test
  jednostkowy `renderPage` dla `test` i `prod`: 0 rozbieżności między `env` a tekstem znacznika).
- Z wyłączoną flagą HTML strony jest bajt w bajt taki jak dziś (próg: istniejące testy strony przechodzą bez zmian).
- Pomyłki środowiska w zgłoszeniach błędów: spadek względem stanu bieżącego. **[założenie: bazowa liczba pomyłek
  nie jest zbierana w repo — pytanie 2 niżej: kto i jak policzy zgłoszenia „prod/test pomylone" przed i po.]**
  Proponowany próg do potwierdzenia: brak takich pomyłek w 4 tygodniach po włączeniu **[propozycja]**.
- Znacznik spełnia kontrast tekstu co najmniej 4,5:1 (WCAG 2.2 AA) i jest czytelny bez koloru (próg: sprawdzenie
  kontrastu w teście lub przeglądzie, nośnik znaczenia to tekst).

## Poza zakresem
- Zmiana adresów, domen i konfiguracji wdrożeń; nowe środowiska poza `test` i `prod`.
- Pozostałe części strony (licznik wdrożeń CHG-3, stopka „Ostatnie wdrożenie").
- Blokada lub ostrzeżenie przy działaniach na złym środowisku (to inny problem niż rozpoznanie).
- Favicon zależny od środowiska (wymaga routingu plików statycznych), chyba że człowiek tego zażąda.
- Włączenie flagi na prod (zapada w etapach rolloutu, nie w tej fazie).

## Ograniczenia
- Brak nowych zależności (decyzja DL4: Node bez zależności) i brak JS po stronie klienta; CSP `default-src 'self'`
  zostaje bez zmian (bez skryptów i stylów inline — styl w `public/style.css`).
- Znaczenie nie może zależeć wyłącznie od koloru (dostępność); kontrast co najmniej 4,5:1.
- Nazwa środowiska pochodzi wyłącznie z `APP_ENV` (nie z parametru żądania), a wartość jest escapowana jak reszta strony.
- Pozostałe ograniczenia (budżet, termin, urządzenia) — brak w zgłoszeniu.

## Kiedy to porażka
Brak w zgłoszeniu. Robocze kryteria **[propozycja]**, do potwierdzenia przez człowieka (pytanie 3):
- znacznik pokazuje inne środowisko niż faktycznie obsługujące stronę (gorsze niż brak znacznika);
- testerzy dalej mylą środowiska w zgłoszeniach mimo włączonej flagi;
- znacznik na prod odstrasza lub myli zwykłych odwiedzających albo zasłania treść.

## Powiązania
- Zgłoszenie PRB-36; triaż: CHG-4/D1 (DEC-0018).
- Kod: `src/page.js`, `public/style.css`, `src/flags.js`, `config/flags.{test,prod}.json`, `src/server.js` (`APP_ENV`).
- Ta sama strona co CHG-3 (licznik wdrożeń, `src/page.js`, flagi): możliwy konflikt przy scalaniu, brak zależności
  merytorycznej. CHG-1: inny temat.

## Pytania do bramki
- Właściciel aplikacji sdlc-proba: czy na produkcji ma być widoczny znacznik „PROD" (wariant B), czy prod ma zostać bez znacznika, jak proponuje zgłaszający (wariant A)?
- Właściciel aplikacji sdlc-proba: kto i jak zmierzy spadek pomyłek środowiska w zgłoszeniach błędów (źródło liczb przed i po, okres pomiaru) i jaki próg uznajecie za sukces?
- Właściciel aplikacji sdlc-proba: kiedy ta zmiana jest porażką, nawet jeśli znacznik działa (np. widoczny publicznie na prod, zasłania treść, testerzy nadal się mylą)?
