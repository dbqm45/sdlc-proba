---
artifact: design
change: CHG-1
phase: architecture
status: proposed
version: 1
author: natalia
created: 2026-10-31
updated: 2026-10-31
inputs: [docs/project/changes/CHG-1/intent.md]
---

# Projekt zmiany CHG-1

Plik Figmy: brak — projekt nie ma ustalonego pliku Figmy (pytanie do bramki).

Wymagania wywnioskowane z `intent.md` — brak odrębnego `requirements.md` (faza wymagań nie uruchomiona przed fazą design).

## Przepływy

### F1 — tor nominalny: odwiedzający widzi datę wdrożenia (flaga ON)

Odwiedzający wchodzi na stronę. Serwer odczytuje flagi; `show_last_deployed` jest włączona. Serwer odczytuje `config/build.json` i pobiera `deployed_at`. `renderPage` wstawia datę w stopce. Odwiedzający widzi datę wdrożenia w stopce.

### F2 — flaga wyłączona (tor przed rollout, domyślny)

Odwiedzający wchodzi na stronę. Serwer odczytuje flagi; `show_last_deployed` jest wyłączona. `renderPage` renderuje stronę bez daty. Stopka bez daty — tor nominalny przed R1, nie jest stanem błędu.

### F3 — błąd odczytu `config/build.json` (zachowanie TBD)

Odwiedzający wchodzi na stronę. Flaga `show_last_deployed` jest włączona. `config/build.json` jest niedostępny lub błędny. Zachowanie stopki nieustalone — pytanie do bramki (stan `server_error`).

### F4 — brak pola `deployed_at` w build.json (zachowanie TBD)

Odwiedzający wchodzi na stronę. Flaga ON, `config/build.json` wczytany poprawnie, ale brak pola `deployed_at` lub wartość pusta. Zachowanie stopki nieustalone — pytanie do bramki (stan `empty`).

## Ramki per wymaganie i stan

| Wymaganie | Ścieżka | Stan | Ramka | Uwagi |
|---|---|---|---|---|
| US-1 | Odwiedzający sprawdza aktualność strony | idle | brak | [projektant] Widok stopki z datą wdrożenia (flaga ON, build.json poprawny) — format daty, styl komponentu. |
| US-1 | Odwiedzający sprawdza aktualność strony | success | nie dotyczy | Strona SSR bez asynchronicznej akcji użytkownika; wartość dostarcza stan idle. |
| US-1 | Odwiedzający sprawdza aktualność strony | server_error | brak | [właściciel] Co wyświetla stopka gdy config/build.json niedostępny lub błąd odczytu — ukryć datę, pokazać fallback, czy HTTP 500? |
| US-1 | Odwiedzający sprawdza aktualność strony | empty | brak | [właściciel] Co wyświetla stopka gdy build.json istnieje, ale brak pola deployed_at lub wartość pusta? |

## Pytania do bramki

- [projektant] Który plik Figmy zawiera ramki CHG-1? Brak ustalonego pliku — ramki dla stanów idle, server_error, empty nie mogą być dopasowane.
- [projektant] Jaki jest format i styl daty w stopce (np. „Wdrożono: 31 paź 2026" albo ISO „2026-10-31")? Czy stopka to nowy komponent HTML, czy rozszerzenie istniejącego stylu strony?
- [właściciel] Co wyświetla stopka gdy config/build.json jest niedostępny lub błąd odczytu (stan server_error)?
- [właściciel] Co wyświetla stopka gdy build.json istnieje, ale brak pola deployed_at lub wartość pusta (stan empty)?
- [właściciel] Czy config/build.json powinien być gitignorowany i generowany wyłącznie przez skrypt wdrożenia, czy dopuszczalne jest commitowanie go z datą budowania lokalnego jako placeholdera? (pytanie przeniesione z intent.md)
