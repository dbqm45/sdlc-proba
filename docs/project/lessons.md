# Lekcje projektu

Krótki zbiór reguł, żeby kolejna sesja nie powtarzała tych samych błędów (skill core-project-record). Najwyżej 10 wpisów
na kategorię, najważniejsze na górze.

## Wykonanie i weryfikacja

## Powłoka i narzędzia

- 2026-11-03 **Fałszywy alarm reguły z rejestru `html-in-template-string` (CWE-116 w wyniku skanu z PR 19) wycisz wyjątkiem w linii z powodem,
  nie zmianą zapisu kodu** — Kontekst: skan bezpieczeństwa Talosa (`security_scan.py`, reguły semgrep z rejestru) na
  tekście, który nie trafia do HTML: komunikat użycia na stderr z `<env>` (PR 19), nagłówek `Link: <…>; rel="next"`
  (PR 21); `.semgrep.yml` projektu tylko dokłada reguły, a `security_scan.py` nie ma opcji wyłączenia reguły z rejestru · Zamiast tego: sprawdź, że
  tekst nie trafia na stronę, a wstawione wartości są zakodowane albo sprawdzone, potem dopisz na końcu linii
  `// nosemgrep: javascript.lang.security.html-in-template-string — <dlaczego to nie HTML>` (semgrep dopasowuje
  końcówkę id, więc działa z rejestrem i z lokalną kopią reguł) i wymień wyjątek w opisie PR; nie składaj
  napisu inaczej tylko po to, żeby wzorzec reguły przestał pasować — to ukrywa decyzję przed przeglądem · Dotyczy:
  wszystko

## Domena i ograniczenia

## Ustalenia człowieka
