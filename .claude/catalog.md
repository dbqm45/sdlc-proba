# Katalog zespołu (generowany przez factory/build.py — nie edytuj)

Do doboru skilli i person do problemu (skill core-problem-routing). Skill wczytujesz narzędziem Skill po nazwie.

Nakładki: `mode-pdi` (pdi decisions), `mode-talos` (Talos), `pack-docs` (Documentation), `pack-editorial-pl` (Polish editorial), `pack-it` (IT), `pack-ux` (UX)

## metoda i domena (`ddd-`) — CO modelujemy i jakimi pojęciami — niezależnie od technologii

- `ddd-algorithm-recognition` — Użyj, by znaleźć w domenie ukryty problem algorytmiczny (przydział, kolejność, pakowanie, trasy, kolizje w czasie); klasyfikacja CRUD czy nie — ddd-deep-modeling. Nie do klasy problemu (ddd-deep-modeling) ani doboru bibliotek (arch-tech-selection)
- `ddd-archetypes` — Użyj przy archetypach biznesowych — strony, rezerwacje, pieniądze, produkt, księgowanie, cennik, adresy, umowy, dokumenty, zasoby, produkcja. Nie do domen czysto technicznych ani nowatorskich bez wzorca ani dokumentacji w repozytorium (docs-tech-writing)
- `ddd-connascence-analysis` — Użyj przy pomiarze sprzężenia dwóch modułów lub kontekstów — umowy, dowody w kodzie, stopień connascence, koszt. Nie do projektowania modelu wewnątrz kontekstu (ddd-tactical-design) ani wyboru wzorca relacji (ddd-context-mapping)
- `ddd-context-mapping` — Użyj przy relacjach i integracji kontekstów — mapa kontekstów (OHS, ACL, Conformist), treść zdarzeń integracyjnych i kopia danych u odbiorcy. Nie do wyznaczania samych granic (ddd-strategic-analysis) ani modelu wewnątrz kontekstu (ddd-tactical-design)
- `ddd-deep-modeling` — Użyj przy modelowaniu pojęć domeny — relacja wiele do wielu, typy definiowane przez administratora, status, Being/Behaving/Becoming, 5 why, klasyfikacja. Nie do granic kontekstów (ddd-strategic-analysis) ani wzorców implementacyjnych (ddd-tactical-design)
- `ddd-discovery-intake` — Użyj przy surowych materiałach (wywiady, notatki, tablice ES) — obszary biznesowe z dowodami, cytaty, sprzeczności. Nie do prowadzenia warsztatu (ddd-event-storming) ani granic kontekstów (ddd-strategic-analysis)
- `ddd-es-simulation` — Użyj tylko na wyraźne żądanie — symulowany warsztat Event Storming z uczestnikami AI i coachem (trening facylitacji). Nie do prawdziwej analizy domeny (ddd-event-storming, ddd-discovery-intake)
- `ddd-event-storming` — Użyj przy Event Stormingu (Big Picture, Process, Design Level) — przygotowanie, prowadzenie, zapis. Nie do technik pracy z ludźmi i językiem (ddd-facilitation) ani szczegółów implementacji agregatów…
- `ddd-facilitation` — Użyj przy rozmowie lub warsztacie z ekspertami domeny — techniki facylitacji, język wszechobecny, słowa-sygnały. Nie do przebiegu i notacji Event Stormingu (ddd-event-storming) ani projektowania modelu (ddd-deep-modeling)
- `ddd-legacy-modernization` — Użyj przy DDD na kodzie zastanym — słownik i rozjazdy model↔kod, agregat z niezmiennika, ACL. Nie do warsztatu z ekspertami (ddd-facilitation, ddd-event-storming), projektu modelu od zera (ddd-tactical-design),…
- `ddd-model-stress-test` — Użyj przy teście rozszerzalności modelu wzdłuż metryki biznesowej — wymagania na ślepo, wpływ na moduły. Nie do zbierania wymagań od klienta ani pomiaru sprzężeń w kodzie (ddd-connascence-analysis)
- `ddd-strategic-analysis` — Użyj przy podziale domeny na subdomeny (core, supporting, generic) i granicach kontekstów; strategia (Cynefin). Nie do relacji między kontekstami (ddd-context-mapping) ani prowadzenia warsztatu (ddd-event-storming)
- `ddd-tactical-design` — Użyj przy modelu wewnątrz kontekstu — agregaty, encje, obiekty wartości, zdarzenia, polityki, saga, CQRS. Nie do granic i relacji kontekstów (ddd-strategic-analysis, ddd-context-mapping)

## architektura (`arch-`) — jakie czynniki kształtują system i jaki stack/styl najlepiej je spełnia

- `arch-ai-solutions` — Użyj przy architekturze systemu z komponentem AI — wzorzec (LLM, RAG, workflow, agent), źródło modelu i lock-in dostawcy, koszt, opóźnienie, granice zaufania. Nie do ogólnego projektu systemu (arch-system-design), metody doboru stacku (arch-tech-selection), atrybutów jakości…
- `arch-architect-practice` — Użyj przy pracy architekta poza techniką — decyzje, test odporności przed zapisaniem (adwokat diabła), komunikacja, szacowanie, ATAM, arc42/C4/ADR, TOGAF. Nie do atrybutów jakości (arch-quality-attributes) ani wyboru stacku (arch-tech-selection)
- `arch-eu-product-law` — trzeba ustalić, które przepisy UE dotyczą budowy produktu cyfrowego z AI — Data Act, PLD, mapa obowiązków z terminami i sąsiednie akty
- `arch-multi-tenancy` — Użyj przy SaaS dla wielu klientów — model izolacji najemców, kontekst najemcy w żądaniu i kolejce, RLS, hałaśliwy sąsiad, migracje, testy izolacji. Nie do ogólnego schematu i indeksów (be-database), logowania i ról użytkowników (be-auth-security), RODO…
- `arch-privacy-compliance` — Użyj, gdy system przetwarza dane osobowe (RODO) — podstawy, minimalizacja, retencja, DPIA, procesory. Nie do uwierzytelniania i haseł (be-auth-security), modelu zagrożeń (arch-threat-modeling), reagowania na incydent…
- `arch-quality-attributes` — Użyj przy atrybutach jakości — scenariusze, kompromisy, fitness functions, dobór stylu architektury. Nie do wyboru konkretnych technologii (arch-tech-selection)
- `arch-system-design` — Użyj przy projekcie systemu od wymagań do skali — szacunki, API i dane, wąskie gardła, dostępność. Nie do wyboru stacku (arch-tech-selection) ani katalogu stylów (arch-quality-attributes)
- `arch-tech-selection` — Użyj przy wyborze lub ocenie stacku (języki, frameworki, baza, hosting) — kryteria, 2–3 kandydaci, fakty, macierz, ryzyka. Nie do ustalania atrybutów jakości (arch-quality-attributes)
- `arch-threat-modeling` — Użyj przy modelu zagrożeń funkcji lub integracji — DFD z granicami zaufania, STRIDE, PASTA, ocena ryzyka, OWASP Top 10. Nie do przeglądu konkretnego diffu (security-reviewer) ani reagowania na incydent (ops-security-operations)

## doświadczenie użytkownika (`ux-`) — kogo i po co projektujemy — badania, treść, wygląd, dostępność i usługa, zanim powstanie interfejs

- `ux-accessibility` — Użyj przy audycie dostępności WCAG 2.2 AA, raporcie ustaleń, planie napraw, deklaracji dostępności i wymogach prawnych (EAA, EN 301 549). Nie do kodu dostępności komponentów (fe-web-platform), ręcznych testów w QA (qa-exploratory-manual) ani ogólnego UX…
- `ux-content-design` — Użyj przy treściach w produkcie jako projekcie — głos i ton, przewodnik stylu, prosty język, mikrotekst, modele treści, lokalizacja, testy treści. Nie do podstawowych tekstów UI w specyfikacji ekranu (ux-feature-design), korekty i redakcji polszczyzny…
- `ux-design-leadership` — Użyj przy strategii i prowadzeniu designu w organizacji — dojrzałość UX, metryki (HEART, SUS), struktura zespołu, DesignOps, ścieżki kariery, ROI. Nie do struktury zespołów inżynierskich ogólnie (proc-team-topologies), metryk produktowych i wyboru, co budować…
- `ux-design-systems` — Użyj przy systemie projektowym — warstwy tokenów, nazwy, format DTCG, Style Dictionary, komponenty, Storybook, wersje, wycofywanie, motywy, współtworzenie. Nie do audytu dostępności (ux-accessibility), decyzji o wyglądzie, kontraście i ruchu (ux-visual-design), CSS i…
- `ux-feature-design` — Użyj przy UX funkcji przed kodem — zadania, przepływy ze stanami, architektura informacji, makiety, heurystyki, teksty UI. Nie do decyzji co budować (proc-product-discovery) ani CSS (fe-css)
- `ux-information-architecture` — Użyj przy architekturze informacji serwisu lub aplikacji — inwentarz treści, sortowanie kart, test drzewa, taksonomia, etykiety, nawigacja, wyszukiwarka. Nie do podstawowej struktury informacji w przepływie jednej funkcji, makiet i heurystyk (ux-feature-design),…
- `ux-research-methods` — Użyj przy badaniach z użytkownikami (UX Research, ResearchOps) — pytanie badawcze, dobór metody, plan, rekrutacja, zgody RODO, synteza, repozytorium. Nie do decyzji co budować, drzewa szans, JTBD i testów założeń (proc-product-discovery), heurystyk i testu…
- `ux-service-design` — Użyj, gdy problem to usługa w wielu kanałach z zapleczem, nie ekran — service blueprint, mapa podróży, punkty styku, prototyp usługi. Nie do modelowania procesu domenowego zdarzeniami (ddd-event-storming), mapy strumienia wartości i marnotrawstwa…
- `ux-visual-design` — Użyj przy wyglądzie interfejsu — hierarchia, typografia, kontrast WCAG, siatka, ruch, marka, Figma, zgodność wdrożenia z projektem. Nie do przepływów, stanów ekranu i testów z użytkownikami (ux-feature-design), audytu dostępności i deklaracji…

## warstwa UI (`fe-`) — jakie zasady obowiązują w interfejsie użytkownika — w każdym frameworku

- `fe-architecture` — Użyj przy strukturze frontendu w dowolnym frameworku — stan i dane, granice komponentów, SSR/RSC, wydajność, odporność. Nie do stylów (fe-css), API przeglądarki i a11y (fe-web-platform) ani składni (lang-*, fw-*)
- `fe-css` — Użyj przy stylowaniu — flex/grid, responsywność, design tokens, motywy, animacje, izolacja stylów. Nie do logiki JavaScript (fe-web-platform) ani struktury komponentów (fe-architecture)
- `fe-engineering-levels` — Użyj przy ocenie poziomu rozwiązania frontendu (Senior, Staff, Principal) i inwestycji w DevEx (wolny build, czekanie na review) — standardy, ROI. Nie do wiedzy o kodzie (fe-architecture, fe-web-platform, fe-css) ani metryk DORA (eng-continuous-delivery)
- `fe-technical-seo` — Użyj przy technicznym SEO stron publicznych — indeksowanie (robots.txt, noindex), canonical, hreflang, sitemap, dane strukturalne, renderowanie, kody statusu. Nie do wydajności i Core Web Vitals (fe-web-platform), tłumaczeń i formatów (eng-i18n), treści i tonu…
- `fe-web-platform` — Użyj przy API przeglądarki i dostępności — fetch, DOM, event loop, Core Web Vitals, storage, service workers, XSS, WCAG. Nie do składni (lang-*), konwencji frameworka (fw-*), stylów (fe-css) ani struktury aplikacji (fe-architecture)

## warstwa serwera (`be-`) — jakie zasady obowiązują po stronie serwera — w każdym języku

- `be-api-design` — Użyj przy projekcie API HTTP — zasoby, kody, błędy, paginacja, wersje, idempotencja, OpenAPI, webhooki. Nie do schematu bazy (be-database) ani mechanizmów logowania (be-auth-security)
- `be-auth-security` — Użyj przy uwierzytelnianiu i autoryzacji — sesje, tokeny, OAuth/OIDC, hasła, walidacja, OWASP. Nie do konfiguracji sieci i chmury (ops-iac-terraform) ani zależności (ops-supply-chain-security)
- `be-billing-subscriptions` — Użyj przy subskrypcjach i płatnościach cyklicznych — plany, zmiana planu proporcjonalnie, okres próbny, windykacja, webhooki dostawcy, VAT, faktury. Nie do ogólnego projektu kolejek (be-messaging-outbox), modelu cennika i księgowania w domenie (ddd-archetypes:…
- `be-database` — Użyj przy relacyjnej bazie — schemat, migracje, indeksy, zapytania SQL/ORM, transakcje, N+1, wydajność i skalowanie. Nie do projektowania endpointów (be-api-design) ani infrastruktury bazy (ops-iac-terraform)
- `be-messaging-outbox` — Użyj przy komunikacji asynchronicznej — komenda czy zdarzenie, outbox/inbox, kolejność, idempotencja. Nie do wyboru relacji kontekstów (ddd-context-mapping) ani schematu bazy ogólnie (be-database)

## systemy AI (`ai-`) — jak budujemy, oceniamy i nadzorujemy systemy AI — dane, modele, ewaluacje, wdrożenie, ryzyko

- `ai-agents` — Użyj przy projekcie agenta LLM lub przepływu agentowego — workflow czy agent, narzędzia, MCP, kontekst, multi-agent, guardrails, limity, tracing, dobór frameworka. Nie do wywołań SDK, kontraktu wyjścia i pętli narzędzi w kodzie (eng-llm-features), uruchamiania Claude Code bez…
- `ai-computer-vision` — Użyj przy projekcie rozwiązania wizyjnego — dobór zadania i podejścia, zbiór i adnotacje, podział bez wycieku, metryki, błędy po kawałkach, prywatność obrazów, dryf. Nie do kwantyzacji i eksportu ONNX/TensorRT (ai-model-optimization), mechaniki dostrajania (ai-fine-tuning), metody…
- `ai-evals` — Użyj przy ewaluacji funkcji LLM i agentów — zbiory danych, graderzy, sędzia LLM, pass@k i pass^k, bramka w CI, ewaluacje online. Nie do podstawowej macierzy promptfoo, schematu wyjścia i limitów pętli (eng-llm-features), ewaluacji skilli Claude…
- `ai-fine-tuning` — Użyj przy dostrajaniu modelu na własnych danych — prompt, RAG czy fine-tuning, dane, SFT i LoRA, DPO, destylacja, ewaluacja przed i po, licencje. Nie do metody ewaluacji (ai-evals), RAG (ai-rag), potoku MLOps (ai-mlops), hostowania modelu (ops-ai-inference),…
- `ai-governance-compliance` — Użyj przy zgodności systemu AI z AI Act — rola, klasa ryzyka, obowiązki i terminy, NIST AI RMF, ISO 42001, polityka AI, incydenty. Nie do RODO, DPIA i retencji (arch-privacy-compliance), modelu zagrożeń (arch-threat-modeling), pomiaru jakości i…
- `ai-mcp-server` — Użyj przy budowie własnego serwera MCP — czy MCP, transport, kontrakt narzędzi, bezpieczeństwo i autoryzacja, testy w CI bez modelu, wersje, rejestracja w Claude Code. Nie do projektu pętli agenta i doboru narzędzi po stronie agenta (ai-agents), oceny i podłączania obcych serwerów…
- `ai-mlops` — Użyj przy cyklu życia modelu ML lub LLM w produkcji — rejestr, cechy, trenowanie w potoku, wdrożenie, drift, prompty (MLOps, LLMOps). Nie do samych potoków danych (data-engineering), ogólnego CI/CD (ops-ci-cd) i strategii wydań…
- `ai-model-optimization` — Użyj przy zmniejszaniu lub przyspieszaniu modelu jako artefaktu — pomiar, kwantyzacja, GGUF, ONNX, TensorRT, OpenVINO, budżet pamięci wag, dobór rozmiaru. Nie do serwerów, KV cache, batchingu i routingu (ops-ai-inference), trenowania i dostrajania (ai-fine-tuning),…
- `ai-nlp` — Użyj przy zadaniach NLP na tekście, w tym polskim — dobór podejścia, klasyfikacja, NER, ewaluacja spanowa, adnotacja, PII i anonimizacja. Nie do RAG i chunkingu (ai-rag), pisania promptów (ai-prompt-engineering), dotrenowania modelu (ai-fine-tuning),…
- `ai-product-management` — Użyj przy decyzji o funkcji AI w produkcie — czy AI, kryteria akceptacji jako ewaluacje, koszt zadania, ryzyka, UX niepewności, wdrożenie etapowe. Nie do odkrywania wyniku i priorytetyzacji (proc-product-discovery), PRD i MVP (proc-requirements-shaping), metody…
- `ai-prompt-engineering` — Użyj przy pisaniu i poprawianiu promptów — struktura, tagi XML, przykłady few-shot, myślenie, długi kontekst, szablony i wersje, układ pod cache, migracja modelu. Nie do kontraktu wyjścia, SDK i pętli narzędziowej (eng-llm-features), budowy zbiorów i graderów (ai-evals), reguł…
- `ai-rag` — Użyj przy RAG i wyszukiwaniu w dokumentach dla LLM — RAG czy długi kontekst, chunking, embeddingi, hybryda, reranking, uprawnienia, ewaluacja retrievalu. Nie do SDK, kontraktu wyjścia i pętli narzędzi (eng-llm-features), indeksów i zapytań PostgreSQL (be-database),…
- `ai-research-methods` — Użyj przy badaniu i walidacji modelu ML — baseline, wyciek danych (podział losowy, czasowy, grupowy), wynik offline vs po wdrożeniu, seedy, metryki, raport. Nie do ewaluacji funkcji LLM i agentów (ai-evals), ogólnej statystyki i eksperymentów produktowych (data-analysis),…

## operacje (`ops-`) — jak budujemy, wdrażamy i obserwujemy

- `ops-ai-inference` — Użyj przy własnym hostowaniu modeli językowych — pamięć GPU i KV cache, vLLM, continuous batching, metryki, skalowanie. Nie do SLO funkcji AI (ops-sre-incidents) ani ogólnych operacji Kubernetes (ops-kubernetes)
- `ops-ci-cd` — Użyj przy pipeline'ach CI/CD (GitHub Actions i inne) — tworzenie, naprawa, cache buildów, wdrożenia, bezpieczeństwo. Nie do pisania Dockerfile (ops-docker) ani commitów (core-git-workflow)
- `ops-cloud-landing-zones` — Użyj przy projekcie fundamentu chmury dla wielu zespołów — landing zone, konta i subskrypcje, sieć hub-spoke, account vending. Nie do samych kontroli bezpieczeństwa w chmurze (sec-cloud-security), modułów Terraform (ops-iac-terraform),…
- `ops-cloud-migration` — Użyj przy migracji obciążeń do chmury lub między środowiskami — portfel, strategie 7R, fale, dane, cutover, rollback. Nie do strategii wydań (ops-release-engineering), migracji schematu bazy (be-database), wzorca Strangler w kodzie…
- `ops-datacenter-networking` — Użyj przy sieci centrum danych — fabryka leaf-spine, BGP, VXLAN i EVPN, automatyzacja i zmiany w sieci. Nie do diagnozy hosta Linux (ops-linux-networking), polityki segmentacji i zaufania (sec-zero-trust-identity) ani…
- `ops-dependency-upgrades` — Użyj, gdy człowiek prosi o podniesienie zależności — inwentarz, kolejność, codemody, testy, Renovate/Dependabot. Nie do bezpieczeństwa łańcucha dostaw — karencja, skompromitowane paczki, provenance (ops-supply-chain-security) —…
- `ops-docker` — Użyj przy Dockerfile, docker-compose i obrazach — tworzenie, rozmiar i czas budowy, bezpieczeństwo obrazów. Nie do pipeline'ów CI (ops-ci-cd) ani infrastruktury chmurowej (ops-iac-terraform)
- `ops-finops` — Użyj przy kosztach chmury — tagi, koszt w PR (Infracost), budżety i alerty, sprzątanie, rozmiar, koszt jednostkowy. Nie do samego pisania Terraform (ops-iac-terraform) ani kosztu telemetrii (ops-observability)
- `ops-iac-terraform` — Użyj przy infrastrukturze jako kod (Terraform/OpenTofu) — moduły, stan, zmienne, sieć, IAM, bazy, storage. Nie do pipeline'ów (ops-ci-cd) ani kontenerów (ops-docker)
- `ops-kubernetes` — Użyj przy manifestach i operacjach Kubernetes — zasoby, sondy, repliki i PDB, autoskalowanie, RBAC, NetworkPolicy. Nie do obrazów (ops-docker), wydań i GitOps (ops-release-engineering) ani chmury (ops-iac-terraform)
- `ops-linux-networking` — Użyj przy diagnozie serwera Linux i sieci od objawu — pełny dysk i i-węzły, procesy, systemd, ss, dig, curl, openssl, DNS, TLS, SSH. Nie do manifestów Kubernetes (ops-kubernetes) ani IaC (ops-iac-terraform)
- `ops-linux-performance` — Użyj przy wydajności Linuksa — metoda USE, perf, flame graphy, eBPF, pamięć, dysk, tuning jądra i cgroups. Nie do diagnozy awarii usług, DNS i TLS (ops-linux-networking), metryk i alertów (ops-observability), błędów w…
- `ops-multi-region-resilience` — Użyj przy projekcie HA i DR na strefy i regiony — RTO/RPO per tier, strategie DR, replikacja, failover, testy DR. Nie do SLO, budżetu błędów, incydentów i podstaw kopii zapasowych (ops-sre-incidents), scenariuszy dostępności jako…
- `ops-observability` — Użyj przy logach, metrykach, tracingu, healthcheckach, alertach i dashboardach (OpenTelemetry, Prometheus, Grafana). Nie do debugowania logiki biznesowej ani pipeline'ów CI
- `ops-platform-engineering` — Użyj przy wewnętrznej platformie deweloperskiej (IDP) — platforma jako produkt, złote ścieżki, portal, samoobsługa, metryki. Nie do podziału organizacji na typy zespołów (proc-team-topologies), budowy pipeline'ów (ops-ci-cd), manifestów…
- `ops-release-engineering` — Użyj przy sposobie wydania — rolling, blue/green, canary z wycofaniem, feature flagi, GitOps, migracje bazy w CD. Nie do samej budowy pipeline'u (ops-ci-cd) ani zasad trunk-based i DORA (eng-continuous-delivery)
- `ops-secrets-identities` — Użyj przy sekretach i tożsamościach maszynowych — inwentarz, skanowanie, rotacja, OIDC zamiast kluczy, PKI. Nie do auth użytkowników aplikacji (be-auth-security) ani zależności (ops-supply-chain-security)
- `ops-security-operations` — Użyj przy wykrywaniu i obsłudze incydentu bezpieczeństwa — SIEM, EDR, podatności i łatki, NIST 800-61, forensyka. Nie do awarii bez ataku (ops-sre-incidents) ani projektu zabezpieczeń (arch-threat-modeling)
- `ops-setup-wizard` — Użyj, gdy człowiek musi ręcznie skonfigurować klucze w panelach lub sekrety CI — interaktywny skrypt bash. Nie do kroków, które agent zrobi sam, ani decyzji architektonicznych
- `ops-sre-incidents` — Użyj przy niezawodności i incydentach — SLI/SLO/SLA, budżet błędów, burn rate, dyżury, postmortem, kopie zapasowe. Nie do instrumentacji i dashboardów (ops-observability) ani strategii wydań (ops-release-engineering)
- `ops-supply-chain-security` — Użyj przy zależnościach i łańcuchu dostaw — lockfile, karencja wersji, skrypty instalacyjne, SBOM, przejęte paczki. Nie do samego pipeline'u (ops-ci-cd) ani auth aplikacji (be-auth-security)
- `ops-virtualization-storage` — Użyj przy infrastrukturze własnej i brzegowej — hiperwizor, klaster, SAN/NAS/Ceph, RAID, kopie, cykl życia sprzętu, edge. Nie do odtwarzania po awarii regionu i strategii DR (ops-multi-region-resilience), kopii w kontekście incydentów i…

## bezpieczeństwo (`sec-`) — jak chronimy system i organizację — inżynieria i architektura bezpieczeństwa, ryzyko, zgodność, ład

- `sec-appsec-devsecops` — Użyj przy programie bezpieczeństwa aplikacji w pipeline — ASVS, SAMM, SAST, DAST, SCA, triaż i SLA podatności, SLSA, podpisy, metryki. Nie do mechaniki pipeline'u (ops-ci-cd), lockfile i karencji zależności (ops-supply-chain-security), modelu zagrożeń…
- `sec-cloud-security` — Użyj przy bezpieczeństwie chmury AWS, Azure, GCP — model współdzielonej odpowiedzialności, guardrails kont, logi, CSPM i CNAPP, CIS, baseline. Nie do samego Terraform (ops-iac-terraform), RBAC i NetworkPolicy (ops-kubernetes), OIDC w CI i sekretów…
- `sec-cryptography-pki` — Użyj przy wyborze algorytmów, TLS, zarządzaniu kluczami, PKI, krótkich certyfikatach i migracji postkwantowej — decyzje projektowe kryptografii. Nie do eksploatacji sekretów, rotacji i skanowania (ops-secrets-identities), logowania i tokenów w aplikacji…
- `sec-detection-engineering` — Użyj przy projektowaniu i testowaniu reguł wykrywania — Sigma jako kod, pokrycie ATT&CK, jakość alertów, purple team, polowanie na zagrożenia. Nie do obsługi SIEM, EDR, SOAR i reagowania na incydent (ops-security-operations), ogólnych alertów aplikacji…
- `sec-eu-regulations` — Użyj przy unijnych wymogach cyber — NIS2 (KSC), DORA, Cyber Resilience Act; zakres, obowiązki, terminy zgłaszania incydentów, jeden incydent a wiele zgłoszeń. Nie do RODO i DPIA (arch-privacy-compliance), AI Act (ai-governance-compliance), ISO 27001 i SOC 2…
- `sec-governance-compliance` — Użyj przy ISO 27001, SOC 2, NIST CSF lub PCI DSS — dobór ram, zakres, macierz kontroli, dowody, audyt wewnętrzny i certyfikujący. Nie do RODO i DPIA (arch-privacy-compliance), AI Act (ai-governance-compliance), procesu ryzyka i akceptacji ryzyka…
- `sec-llm-security` — Użyj, gdy budujesz czatbota lub agenta LLM dla klientów — przemycone polecenia, wyciek danych lub promptu, za duże uprawnienia narzędzi, testy ataków. Nie do projektu agenta (ai-agents), bezpieczeństwa pracy agenta Claude Code (core-agent-security), ogólnego modelu…
- `sec-malware-analysis` — Użyj przy defensywnej analizie podejrzanego pliku — bezpieczne laboratorium, triaż, analiza statyczna i dynamiczna, IOC, YARA, raport, MISP i TLP. Nie do reagowania na incydent (ops-security-operations), projektu reguł w CI i pokrycia (sec-detection-engineering)…
- `sec-risk-management` — Użyj przy rejestrze ryzyk bezpieczeństwa, akceptacji ryzyka, ryzyku dostawcy, FAIR lub ISO 27005 — proces, apetyt, postępowanie, KRI. Nie do modelu zagrożeń funkcji i oceny projektu (arch-threat-modeling), ram i audytów (sec-governance-compliance),…
- `sec-security-leadership` — Użyj przy strategii i prowadzeniu bezpieczeństwa w firmie jako CISO — strategia, budżet, raport dla zarządu, kultura, kryzys i okup, ubezpieczenie, M&A. Nie do rejestru ryzyk, FAIR i ryzyka dostawcy w szczegółach (sec-risk-management), ISO 27001, SOC 2 i macierzy…
- `sec-variant-analysis` — Użyj po znalezieniu podatności, by znaleźć jej warianty w kodzie — przyczyna, wzorzec źródło→ujście, grep/Semgrep/CodeQL, triaż trafień, reguła w CI. Nie do programu skanerów i terminów napraw (sec-appsec-devsecops), modelu zagrożeń (arch-threat-modeling), obsługi…
- `sec-zero-trust-identity` — Użyj przy Zero Trust i tożsamości jako perymetrze — NIST 800-207, ZTNA zamiast VPN, MFA odporne na phishing, PAM, postura urządzeń, mapa dojrzałości CISA. Nie do OAuth/OIDC w kodzie aplikacji (be-auth-security), tożsamości maszynowych i sekretów (ops-secrets-identities),…

## framework (`fw-`) — GDZIE i czym to umieścić w konkretnym frameworku

- `fw-angular` — Użyj przy kodzie Angulara 17–22 — standalone, signals i resources, zoneless, Signal Forms, DI, HttpClient, routing, testy. Nie do składni TypeScript (lang-typescript) ani modelowania (ddd-*)
- `fw-aspnet-core` — Użyj przy ASP.NET Core na .NET 8–10 — Minimal API, TypedResults, ProblemDetails, walidacja, OpenAPI, DI, testy z WebApplicationFactory. Nie do składni i idiomów C# (lang-csharp), projektu API niezależnie od technologii (be-api-design), uwierzytelniania…
- `fw-nestjs` — Użyj przy aplikacji NestJS — moduły i DI, kontrolery, walidacja DTO, konfiguracja, bezpieczeństwo, dane (TypeORM, Prisma), testy (@nestjs/testing, e2e). Nie do idiomów TypeScriptu (lang-typescript), modelowania domeny (ddd-*), ogólnego projektu API (be-api-design), baz…
- `fw-nextjs` — Użyj przy kodzie Next.js 14–16.3 (App Router) — Server Components, Server Actions i autoryzacja, cache, proxy.ts, migracja. Nie do samego Reacta bez frameworka (fw-react), projektu API HTTP (be-api-design) ani uwierzytelniania w ogóle…
- `fw-react` — Użyj przy kodzie Reacta 18–19.3 — czyste komponenty, stan, kiedy nie efekt, Actions i formularze, React Compiler, testy. Nie do routingu, cache i Server Actions Next.js (fw-nextjs), składni TypeScript (lang-typescript) ani ogólnej…
- `fw-spring-boot` — Użyj przy aplikacji Spring Boot — struktura modułów, warstwa web i danych, konfiguracja, bezpieczeństwo, obserwowalność, testy (JUnit, slice testy, Testcontainers). Nie do składni i idiomów Javy (lang-java), modelowania domeny (ddd-*), ogólnego projektu API (be-api-design) ani baz…

## język (`lang-`) — JAK wyrazić pojęcia w konkretnym języku

- `lang-csharp` — Użyj przy kodzie C# 12–14 (.NET 8–10) — konwencje, nullable, rekordy, wynik operacji, async, pojęcia domenowe (obiekt wartości, warianty, agregat). Nie do ASP.NET Core — endpointów, walidacji, OpenAPI, testów integracyjnych (fw-aspnet-core), projektu API…
- `lang-go` — Użyj przy kodzie Go 1.22–1.27 — konwencje, błędy (errors.Is/As), współbieżność, pojęcia domenowe (obiekt wartości, warianty, agregat). Nie do projektu API HTTP (be-api-design), konteneryzacji (ops-docker) ani modelowania domeny (ddd-*)
- `lang-java` — Użyj przy kodzie Java 17/21+ — konwencje, niezmienność, błędy, pojęcia domenowe (obiekt wartości, warianty, agregat). Nie do konfiguracji frameworków (Spring, Jakarta — osobne fw-*) ani modelowania domeny (ddd-*)
- `lang-javascript` — Użyj przy czystym JavaScripcie ES2022+ — koercja, domknięcia, this, async i event loop, tablice, ESM vs CommonJS. Nie do API przeglądarki (fe-web-platform), typowania TS (lang-typescript) ani modelowania (ddd-*)
- `lang-python` — Użyj przy kodzie Python 3.11–3.15 — typy i mypy, pyproject i uv, ruff, dataclass i Decimal, wyjątki czy wynik. Nie do testów w pytest (tool-pytest), analizy danych i statystyki (data-analysis) ani potoków danych…
- `lang-typescript` — Użyj przy kodzie TypeScript 5.x–7.x — typy, zawężanie, generyki, tsconfig, walidacja na granicach, pojęcia domenowe. Nie do mechaniki runtime JS (lang-javascript), frameworka (fw-*), ogólnych zasad auth (be-auth-security) ani…

## narzędzia (`tool-`) — czym budujemy i jak organizujemy repozytorium (monorepo, build)

- `tool-jest` — Użyj przy testach w Jest — test.each, dublery, fake timers, ESM, konfiguracja, migracja do Jest 30. Nie do zasad wyroczni (qa-spec-first-testing) ani Vitest (tool-vitest)
- `tool-nx` — Użyj przy monorepo Nx — projekty i biblioteki, tagi i granice modułów, generatory, cache, affected, release, migrate. Nie do konwencji frameworka (fw-*) ani języka (lang-*)
- `tool-playwright` — Użyj przy testach e2e i API w Playwright — lokatory wg ról, asercje z oczekiwaniem, fixtures, trace, flaky w CI. Nie do wyboru przypadków (qa-test-design) ani zasad wyroczni (qa-spec-first-testing)
- `tool-pytest` — Użyj przy testach w pytest 8–9 — fixtures, parametrize, tmp_path, monkeypatch, konfiguracja TOML, asyncio, Hypothesis. Nie do strategii testów niezależnej od narzędzia (eng-testing), projektu przypadków (qa-test-design) ani testów w…
- `tool-semgrep` — Użyj przy pisaniu własnych reguł Semgrep (i zapytań CodeQL) — wzorce, taint, autofix, testy reguł, mniej fałszywych trafień, CI. Nie do szukania wariantów znalezionej podatności (sec-variant-analysis), doboru skanerów i progów w programie AppSec…
- `tool-stripe` — Użyj przy integracji ze Stripe — wybór API (Checkout, Payment Element, Intents), webhooki, klucze ograniczone, Billing, Connect, Tax, aktualizacja wersji API i SDK. Nie do modelu subskrypcji niezależnego od dostawcy (be-billing-subscriptions), ogólnego projektu API (be-api-design)…
- `tool-vitest` — Użyj przy testach w Vitest — struktura, tabele przykładów, dublery, kontrolowany czas, tryb przeglądarki, Stryker. Nie do zasad wyroczni (qa-spec-first-testing) ani Jest (tool-jest)

## zasady inżynierskie (`eng-`) — jak pisać prosto i dobrze (KISS, YAGNI, SOLID, testy, CD) — ograniczenia i rozstrzyganie sporów

- `eng-algorithms-data-structures` — Użyj, gdy liczy się wydajność kodu — złożoność, dobór struktur danych (TS, Java), techniki algorytmów, grafy, LRU. Nie do rozpoznawania problemu w domenie (ddd-algorithm-recognition)
- `eng-behavior-preserving-refactoring` — Użyj przy refaktoryzacji bez zmiany zachowania (legacy, zmiana paradygmatu) — zamrożony kontrakt, czy test wykryje zmianę, dowód równoważności. Nie do drobnych refaktoryzacji (eng-clean-code) ani projektowania przypadków (qa-test-design)
- `eng-clean-code` — Użyj przy czytelności kodu w dowolnym języku — nazwy, funkcje, komentarze, obsługa błędów, zapachy, małe refaktoryzacje. Nie do zasad architektonicznych (eng-design-principles) ani idiomów konkretnego języka (lang-*)
- `eng-code-audit` — Użyj przy pełnym audycie kodu (architektura, bezpieczeństwo, jakość, dostępność, prawo) — zakres i budżet, tani skan, przeglądy równoległe, wspólny ranking. Nie do audytu samego długu technicznego (eng-tech-debt-audit) ani przeglądu jednego PR (qa-change-review)
- `eng-codebase-mapping` — Użyj przy nieznanym kodzie i ocenie wpływu zmiany — punkty wejścia, warstwy z importów, węzły centralne, cykle. Nie do oceny długu (eng-tech-debt-audit), wyboru refaktoryzacji (eng-refactor-planning) ani projektowania granic…
- `eng-continuous-delivery` — Użyj przy sposobie dostarczania — trunk-based, małe partie, feature flags, CI/CD, metryki DORA, Twelve-Factor. Nie do konfiguracji konkretnych narzędzi CI (ops-ci-cd) ani gita na co dzień (core-git-workflow)
- `eng-debugging` — Użyj, gdy coś działa źle albo przestało działać (regresja po wielu commitach), a przyczyna nie jest oczywista — odtworzenie, hipotezy, git bisect, debugger. Nie do prowadzenia incydentu produkcyjnego (ops-sre-incidents), diagnozy serwera i sieci (ops-linux-networking),…
- `eng-design-patterns` — Użyj przy projekcie i review, gdy kusi wzorzec GoF — diagnoza symptom → wzorzec, kiedy nie, lżejsze formy w TS. Nie do zasad SOLID/KISS (eng-design-principles) ani building blocks DDD (ddd-tactical-design)
- `eng-design-principles` — Użyj przy decyzjach i review — KISS, YAGNI, DRY, SOLID, Demeter, kompozycja, zasady komponentów, konflikty zasad. Nie do stylu nazw i funkcji (eng-clean-code)
- `eng-i18n` — Użyj przy wielu językach i rynkach — ICU i liczba mnoga, Intl, strefy IANA, kwoty, przepływ tłumaczeń, RTL, pseudolokalizacja. Nie do pisania samych tekstów i tonu (ux-content-design), szczegółów API przeglądarki (fe-web-platform) ani stylów…
- `eng-legacy-dossier` — Użyj przy opisie lub audycie architektury kodu legacy przed refaktorem — as-is, reguły, ocena z dowodami, roadmapa. Nie do samej mapy struktury i punktów wejścia (eng-codebase-mapping), oceny długu (eng-tech-debt-audit), wyboru…
- `eng-llm-features` — Użyj, gdy budujesz w kodzie funkcję lub agenta z LLM — SDK, structured output, pętla narzędzi, ewaluacje. Nie do hostowania modeli na GPU (ops-ai-inference), doboru modelu dla naszej pracy z agentem (core-cost-control), UI…
- `eng-local-quality-gates` — Użyj przy lokalnych bramkach jakości — hook po edycji, pre-commit, pre-push, testy powiązane. Nie do pipeline'ów CI (ops-ci-cd), gałęzi, commitów i PR (core-git-workflow), uprawnień agenta (core-agent-security)…
- `eng-module-depth` — Użyj przy projekcie interfejsu modułu — głębokie moduły, test usunięcia, spoiny i adaptery, płytkie moduły. Nie do mapy całego repo (eng-codebase-mapping) ani audytu długu (eng-tech-debt-audit)
- `eng-project-reconstruction` — Użyj, gdy z samego kodu trzeba odtworzyć, czym jest projekt — stack, moduły, domeny, wymagania, reguły, standardy — raport z dowodami. Nie do opisu architektury przed refaktorem z oceną i roadmapą (eng-legacy-dossier), samej mapy i wpływu zmiany…
- `eng-refactor-planning` — Użyj, gdy z długu trzeba wybrać, co i jak refaktoryzować — ranking opcji i sprawdzenie jego liczb w kodzie, Strangler, Mikado, plan. Nie do samego audytu długu (eng-tech-debt-audit), dowodu zachowania przy wykonaniu…
- `eng-repo-readiness` — Użyj, gdy repo ma być gotowe dla agentów — szkielet z generatora albo audyt lockfile, testów, CI. Nie do wyboru stacku (arch-tech-selection), audytu długu w kodzie (eng-tech-debt-audit), dopasowania skilli do…
- `eng-tech-debt-audit` — Użyj przy audycie długu technicznego repo lub modułu — wymiary, ustalenia z plik:linia, waga, wysiłek, priorytety. Nie do pojedynczej refaktoryzacji (eng-behavior-preserving-refactoring) ani przeglądu jednego PR…
- `eng-testing` — Użyj przy strategii testów w dowolnym języku — TDD, BDD, piramida testów, dublery, kontraktowe, mutacyjne. Nie do narzędzi konkretnego frameworka testowego (tool-*) ani pracy testera (qa-*)

## jakość i testy (`qa-`) — jak projektować, prowadzić i utrzymywać testy tak, by sprawdzały wymagania — niezależnie od narzędzia

- `qa-change-review` — Użyj przy przeglądzie planu przed kodem albo kodu względem planu — dryf, waga, triaż, werdykt. Nie do procesu PR i konfiguracji przeglądu przez usługę lub CI (core-git-workflow), samego bezpieczeństwa (agent…
- `qa-exploratory-manual` — Użyj przy testach ręcznych i eksploracyjnych — sesje z kartą, heurystyki, UAT, ręczna dostępność, zgłoszenia defektów. Nie do automatyzacji (tool-*, qa-regression)
- `qa-fuzzing` — Użyj przy fuzzingu kodu przyjmującego niezaufane wejście — kiedy, harness, korpus, sanitizery, crash → test regresyjny, CI (Go, Atheris, libFuzzer). Nie do testów właściwości w Hypothesis lub fast-check bez fuzzera (tool-pytest, eng-testing), testów obciążeniowych…
- `qa-performance-testing` — Użyj przy testach wydajnościowych — rodzaje, model obciążenia, progi z SLO, k6 i Gatling, środowisko, analiza, raport. Nie do wydajności frontendu w przeglądarce (fe-web-platform) ani SLO i alertów (ops-sre-incidents)
- `qa-regression` — Użyj przy regresji — zestawy (smoke, PR, nocne), testy dotknięte zmianą, flaky i kwarantanna, dane testowe, metryki. Nie do projektowania pojedynczych przypadków (qa-test-design)
- `qa-spec-first-testing` — Użyj, gdy testy mają sprawdzać wymaganie, nie implementację — niezależna wyrocznia, clean-room, ATDD, mutacje. Nie do technik wyboru przypadków (qa-test-design) ani składni narzędzi (tool-*)
- `qa-test-design` — Użyj przy projekcie przypadków i planu testów — klasy równoważności, brzegi, tablice decyzyjne, stany, ryzyko. Nie do pisania kodu testów (tool-*)

## analiza danych (`data-`) — jak odpowiadać na pytania danymi — pozyskanie, czyszczenie, statystyka, wizualizacja, raport

- `data-analysis` — Użyj, gdy na pytanie trzeba odpowiedzieć danymi — spadek lub wzrost metryki, segmenty i paradoks Simpsona, czyszczenie, statystyka, testy hipotez, raport. Nie do potoków danych (data-engineering) ani eksperymentów A/B produktu (proc-product-discovery)
- `data-engineering` — Użyj przy potokach danych — wsad, CDC, strumień, idempotencja, backfill, kontrakty, orkiestracja, dbt. Nie do analizy (data-analysis) ani wyboru architektury danych (arch-quality-attributes)

## język i redakcja (`txt-`) — jak pisać poprawnie i zrozumiale — pisownia, interpunkcja, styl, redakcja

- `txt-polish-correctness` — Użyj przy poprawności tekstu po polsku (dokumentacja, UI, PR) — pisownia, interpunkcja wg RJP PAN, gramatyka, kalki. Nie do redakcji stylu i skracania (txt-polish-style) ani struktury dokumentu (docs-tech-writing)
- `txt-polish-style` — Użyj przy redakcji tekstu po polsku do gotowej wersji — skracanie, strona czynna, konkret, jeden ton, typografia. Nie do raportu błędów (txt-polish-correctness) ani zmian merytorycznych

## produkt i rynek (`pm-`) — dla kogo i za ile — pozycjonowanie, rynek, metryki biznesu SaaS, cykl życia produktu, interesariusze

- `pm-product-lifecycle` — Użyj przy etapie życia produktu lub modułu — wzrost, dojrzałość, schyłek; decyzja przedłużyć, zastąpić, utrzymać lub wycofać; plan wycofania z klientami. Nie do technicznego wycofania wersji API (be-api-design), wydań i flag funkcji (ops-release-engineering), metryk…
- `pm-product-strategy` — Użyj przy strategii produktu na rynku — pozycjonowanie, wielkość rynku TAM/SAM/SOM, ściągawka konkurencyjna dla sprzedaży, PESTEL, kierunek wzrostu (Ansoff). Nie do wyboru funkcji, drzewa szans, kanwy modelu biznesowego, pięciu sił Portera i SWOT (proc-product-discovery),…
- `pm-saas-metrics` — Użyj przy metrykach biznesu subskrypcyjnego (SaaS) — MRR/ARR, churn, NRR/GRR, LTV:CAC, zwrot CAC, burn multiple, Rule of 40, ocena zmiany ceny. Nie do implementacji rozliczeń i płatności (be-billing-subscriptions, tool-stripe), ogólnej analizy danych i testów…
- `pm-stakeholders` — Użyj przy pracy z interesariuszami projektu lub produktu — identyfikacja, mapa wpływ × zainteresowanie, zaangażowanie obecne i docelowe, plan komunikacji, opór. Nie do podziału zespołów i trybów współpracy (proc-team-topologies), planu projektu z kosztami i ryzykami…

## proces (`proc-`) — jak planujemy, współpracujemy i dostarczamy (Agile, Lean, SAFe)

- `proc-agile` — Użyj przy organizacji pracy zespołu — Scrum, Kanban i metryki przepływu, historyjki (INVEST), Definition of Done. Nie do skalowania na wiele zespołów (proc-safe) ani ekonomii przepływu (proc-lean)
- `proc-issue-triage` — Użyj przy przeglądzie zgłoszeń i zewnętrznych PR — kategorie i stany, odtworzenie błędu, odrzucone pomysły, brief. Nie do planowania własnej pracy (proc-agile) ani diagnozy przyczyny błędu
- `proc-lean` — Użyj przy przepływie pracy i priorytetach — Lean, marnotrawstwo, prawo Little'a, VSM, MVP, koszt opóźnienia, WSJF. Nie do rytuałów Scruma/Kanbana (proc-agile) ani SAFe (proc-safe)
- `proc-product-discovery` — Użyj przy decyzji, co budować i po co — wynik zamiast funkcji, drzewo szans, JTBD, testy założeń, RICE, eksperymenty. Nie do rytuałów zespołu (proc-agile) ani projektu interfejsu (ux-feature-design)
- `proc-project-planning` — Użyj przy planie projektu dla sponsora i wyborze modelu cyklu życia (kaskadowy, V, Agile) — karta projektu, koszt i termin jako przedziały, ryzyka. Nie do prognozy przepustowości zespołu z danych (proc-agile), decyzji, co budować (proc-product-discovery),…
- `proc-requirements-shaping` — Użyj, gdy z pomysłu trzeba zrobić wymagania (PRD) — MVP w budżecie, pusty CRUD, reguła biznesowa. Nie do decyzji, czy i co warto budować (proc-product-discovery), mechaniki rund pytań (core-plan-interview),…
- `proc-safe` — Użyj, gdy pracuje wiele zespołów w SAFe — Agile Release Train, PI Planning, role, WSJF, Inspect & Adapt, LPM. Nie do pracy pojedynczego zespołu (proc-agile)
- `proc-team-topologies` — Użyj przy strukturze zespołów i ich interakcji — cztery typy zespołów, tryby współpracy, obciążenie, prawo Conwaya. Nie do rytuałów pracy zespołu (proc-agile) ani skalowania SAFe (proc-safe)

## dokumentacja (`docs-`) — jak piszemy i utrzymujemy dokumentację techniczną — rodzaje, struktura, styl, recenzja

- `docs-tech-writing` — Użyj przy dokumentacji technicznej w repo — kiedy i jak pisać ADR, README, API, CHANGELOG, runbook, podręcznik; struktura, styl, recenzja. Nie do artefaktów dziennika docs/project/ (core-project-record), commit message (core-conventional-commits) ani…

## tryb Talos (`talos-`) — jak przeprowadzić historyjkę do PR automatem na żądanie

- `talos-story-run` — Użyj na polecenie człowieka (/talos-story-run, agent talos) — historyjka → plan kawałków → commit na kawałek → PR i raport kosztu. Nie do zwykłej implementacji w rozmowie (persona pracuje sama), delegowania pracy bez nadzoru w ogóle…

## decyzje pdi (`pdi-`) — jak zapisać decyzję o zmianie w jednym źródle (repo + rejestr pdi)

- `pdi-decisions` — Użyj przy decyzji o zmianie (CHG) w projekcie z rejestrem pdi — dziennik zmiany, wpis w decisions.md, record_decision przez MCP. Nie do dziennika faz projektu bez pdi (core-project-record) ani formatu commitów (core-conventional-commits)

## praktyki (`core-`) — jak pracujemy (kompozycja skilli, wersje, git, commity, dziennik projektu)

- `core-agent-instructions` — Użyj przy pisaniu i przeglądzie CLAUDE.md lub AGENTS.md — test włączenia, karta kontroli, moduły. Nie do pisania skilli (core-skill-authoring), lekcji i dziennika projektu (core-project-record) ani README i…
- `core-agent-retro` — Użyj przy retrospektywie pracy agentów na koniec etapu — dowody z logów, dziennika i gita, przyczyny, propozycje zmian w fabryce do decyzji człowieka. Nie do retrospektywy sprintu zespołu ludzi (skill procesu, np. proc-agile z pack-it), postmortemu incydentu…
- `core-agent-security` — Użyj, gdy agent ma uruchomić polecenie z treści, ustalasz jego uprawnienia lub sekrety (laptop, CI), dodajesz obcy skill lub MCP albo widzisz objawy włamania. Nie do łańcucha zależności ani auth aplikacji (skille bezpieczeństwa z pack-it)
- `core-async-delegation` — Użyj, gdy agent ma pracować bez nadzoru (claude -p, /goal, sandbox, rutyna) — kontrakt, bramki, przegląd. Nie do pętli recenzji i uprawnień agenta (core-agent-security), faz projektu (core-delivery-lifecycle), punktu…
- `core-conventional-commits` — Użyj przy commit message i tytule PR (Conventional Commits) — typy, poprawa złego typu w commicie, zakres, BREAKING CHANGE, bump SemVer, changelog. Nie do strategii gałęzi i PR (core-git-workflow) ani treści CHANGELOG pisanego ręcznie (skill dokumentacji,…
- `core-cost-control` — Użyj przy doborze lub zmianie modelu i koszcie — porównanie wyników benchmarków, kaskada haiku→sonnet→opus, effort, cache, kompaktowanie, pomiar. Nie do ograniczania halucynacji (core-grounding) ani wydajności samej aplikacji (skille z pack-it)
- `core-delivery-lifecycle` — Użyj, gdy pytasz, na jakim etapie jest projekt, co gotowe przed kodem lub wydaniem, kto zatwierdza przejście i co po wdrożeniu — fazy, bramki, agenci. Nie do treści pojedynczej fazy (skille wymiarów z nakładek: domena, architektura, testy, operacje — lista w…
- `core-factory-update` — Użyj na polecenie człowieka przy aktualizacji fabryki (rdzeń + nakładki) — tf update, nakładki i języki, omówienie zmian, scalenie *.factory-new. Nie do tworzenia własnych skilli (`factory/build.py new-skill`) ani aktualizacji zależności projektu
- `core-git-workflow` — Użyj przy pracy z gitem — gałęzie, commity, pull requesty i ich przegląd (także AI), konflikty. Nie do formatu commit message (core-conventional-commits) ani pipeline'ów CI (skill CI/CD, pack-it)
- `core-grounding` — Użyj, gdy pytasz, czy podana wersja, flaga, data lub liczba jest prawdziwa albo asystent może zmyślać (długi dokument, rozmowa) — źródło, „nie wiem”. Nie do procedury badania źródeł zewnętrznych (core-source-research) ani testów kodu (skille testów, pack-it)
- `core-knowledge` — Użyj, gdy pytasz fabrykę o wiedzę i chcesz odpowiedzi z cytatem — baza wiedzy (kb.py), rejestry zaufanych źródeł nakładek, pobranie dokumentu, luki i research. Nie do procedury badania faktów w sieci (core-source-research) ani do doboru person i zespołu (core-problem-routing)
- `core-plan-interview` — Użyj przed działaniem, by przepytać plan, decyzję lub pomysł — drzewo decyzji, rundy pytań z rekomendacją. Nie do warsztatu z ekspertami domeny (skill facylitacji, pack-it) ani doboru zespołu (core-problem-routing)
- `core-problem-routing` — Użyj, gdy problem opisano zwykłym tekstem — rozpoznanie wymiarów, dobór skilli i person, doraźny zespół, forma wyniku. Nie do samej wiedzy merytorycznej (skille wymiarów) ani łączenia skilli w jednej odpowiedzi (core-skill-composition)
- `core-project-record` — Użyj przy dzienniku projektu w docs/project/ — artefakty faz z TL;DR i Przekazaniem, decyzje, punkt kontrolny pracy. Nie do treści merytorycznej faz (skille ddd-*, arch-*, proc-*)
- `core-semver` — Użyj przy numerze wersji (SemVer 2.0.0) — publiczne API, podbicie major/minor/patch, 0.y.z, wersje przedpremierowe, tag. Nie do formatu commit message (core-conventional-commits) ani strategii wdrożenia (skill wydań, pack-it)
- `core-skill-authoring` — Użyj przy dodaniu lub zmianie skilla — najpierw scenariusze ewaluacji, potem zwięzła treść z przykładami, bramka, audyt. Nie do łączenia istniejących skilli w jednym zadaniu (core-skill-composition) ani testów kodu aplikacji (skill…
- `core-skill-composition` — zadanie dotyka kilku obszarów naraz (np. DDD + Angular) — łączenie skilli w jedno rozwiązanie
- `core-source-research` — Użyj, gdy trzeba sprawdzić aktualne fakty z zewnątrz — API i wersje bibliotek do planu, zmiany, zgłoszenia, opinie; ranga źródeł, cytowanie z datą. Nie do wiedzy stałej (skille wymiarów) ani oceny opcji (skill wyboru technologii, pack-it)
- `core-stack-sync` — Użyj na starcie pracy i przy niezgodności wersji — stack projektu i dopasowanie skilli, bez podnoszenia. Nie do podnoszenia zależności projektu (to osobne zadanie na prośbę użytkownika)
- `core-teaching-workspace` — Użyj na polecenie człowieka do nauki tematu przez wiele sesji w katalogu-warsztacie — lekcje, ściągi, postępy. Nie do jednorazowego wyjaśnienia ani badania źródeł bez nauki (core-source-research)

## Persony (`claude --agent <nazwa>`) i ich wykonawcy

| Persona | Nakładka | Kim jest | Wykonawcy (`persona-rola`) | Skille wiodące |
|---|---|---|---|---|
| `ada` | pack-it | Ada — Frontend Angular z DDD | `ada-frontend`, `ada-ddd-analyst` | ddd-archetypes, ddd-tactical-design, ddd-deep-modeling, fw-angular, lang-typescript, eng-testing, eng-clean-code, core-conventional-commits |
| `adam` | pack-it | Adam — AI / ML Engineer | `adam-ai-engineer`, `adam-ml-engineer` | eng-continuous-delivery |
| `barbara` | pack-it | Barbara — CISO | `barbara-security-leader` | proc-team-topologies |
| `dorota` | pack-it | Dorota — Backend .NET z DDD | `dorota-backend`, `dorota-ddd-analyst` | ddd-tactical-design, ddd-archetypes, ddd-context-mapping, lang-csharp, fw-aspnet-core, eng-testing, eng-clean-code, eng-behavior-preserving-refactoring |
| `ewa` | pack-it | Ewa — Analityczka domeny (DDD) | `ewa-ddd-analyst`, `ewa-tech-writer` | proc-agile, proc-lean, proc-safe, proc-team-topologies |
| `filip` | pack-it | Filip — Frontend Architect (Angular + Nx) | `filip-frontend` | fe-architecture, fe-engineering-levels, lang-typescript, fe-css |
| `henryk` | pack-it | Henryk — Cloud & Infrastructure Architect | `henryk-cloud-architect`, `henryk-network-engineer` | eng-continuous-delivery |
| `iga` | pack-it | Iga — AI Scientist (badania, NLP, CV) | `iga-ai-scientist` | core-source-research |
| `jan` | pack-it | Jan — Backend Java z DDD | `jan-backend`, `jan-ddd-analyst` | ddd-tactical-design, ddd-archetypes, ddd-context-mapping, ddd-deep-modeling, lang-java, fw-spring-boot, eng-testing, eng-clean-code, eng-behavior-preserving-refactoring |
| `kasia` | pack-it | Kasia — QA Engineer (projekt testów, automatyzacja, regresja) | `kasia-qa-analyst`, `kasia-qa-automation` | lang-typescript, lang-javascript, tool-playwright, tool-vitest, tool-jest, tool-pytest |
| `kuba` | pack-it | Kuba — Product Engineer | `kuba-frontend`, `kuba-backend`, `kuba-tech-writer` | ddd-archetypes, ddd-tactical-design, lang-typescript, lang-javascript, fw-nestjs, eng-testing, eng-continuous-delivery, proc-agile, eng-behavior-preserving-refactoring |
| `lena` | pack-it | Lena — AI Product & Governance | `lena-ai-product-manager`, `lena-ai-governance` | proc-lean |
| `maja` | pack-it | Maja — dyspozytorka (dobiera zespół i podejście do problemu) | `maja-product-compliance` | core-problem-routing, core-source-research, core-plan-interview, core-delivery-lifecycle |
| `marek` | pack-it | Marek — Platform Engineer | `marek-backend`, `marek-devops` | ddd-tactical-design, ddd-context-mapping, lang-java, lang-go, eng-continuous-delivery, proc-lean, proc-team-topologies |
| `natalia` | pack-ux | Natalia — Head of Design (zespół UX) | `natalia-product-designer`, `natalia-ux-researcher`, `natalia-content-designer`, `natalia-ui-designer`, `natalia-accessibility-specialist`, `natalia-service-designer` | ux-design-leadership, proc-lean, proc-agile |
| `nina` | pack-it | Nina — Fullstack React/Next.js + Python | `nina-frontend`, `nina-backend` | ddd-tactical-design, fw-nextjs, fw-react, lang-typescript, lang-python, tool-vitest, tool-playwright, tool-pytest, eng-testing, be-api-design, be-auth-security |
| `ola` | pack-it | Ola — Fullstack z zacięciem DevOps | `ola-frontend`, `ola-backend`, `ola-devops` | ddd-archetypes, ddd-tactical-design, lang-typescript, lang-javascript, fw-nestjs, eng-testing, eng-continuous-delivery, proc-agile, eng-behavior-preserving-refactoring |
| `pawel` | pack-it | Paweł — Product Manager | `pawel-product-manager` | proc-lean |
| `piotr` | pack-it | Piotr — DevOps / SRE Engineer | `piotr-devops`, `piotr-sre` | eng-continuous-delivery, proc-team-topologies |
| `stefan` | pack-editorial-pl | Stefan — redaktor języka polskiego | `stefan-editor` | docs-tech-writing |
| `tomasz` | pack-it | Tomasz — Solution Architect | `tomasz-solution-architect`, `tomasz-tech-writer` | ddd-strategic-analysis, ddd-archetypes, ddd-deep-modeling, ddd-context-mapping, ddd-algorithm-recognition, ddd-model-stress-test, eng-continuous-delivery, proc-team-topologies, proc-lean, proc-project-planning |
| `wiktor` | pack-it | Wiktor — Security Engineer & Architect | `wiktor-security-engineer`, `wiktor-security-architect` | ops-security-operations |
| `zofia` | pack-it | Zofia — Data Analyst / Data Engineer | `zofia-data-analyst`, `zofia-data-engineer` | lang-python, tool-pytest, proc-product-discovery |

## Agenci wspólni

- `scout` (fast) — Szybkie, tanie przeszukiwanie kodu (tylko odczyt). Używaj zanim deleguje się implementację, gdy trzeba znaleźć pliki, wzorce lub miejsca użycia.
- `quick-fixer` (fast) — Drobne, mechaniczne zmiany w 1–2 plikach (literówki, rename, formatowanie, bump wersji, commit message).
- `researcher` (fast) — Weryfikuje aktualne fakty techniczne (wersje, daty wsparcia LTS/EOL, licencje, wymagania zgodności) w źródłach pierwotnych. Zwraca tabelę faktów ze źródłami i datą.
- `architect` (deep) — Decyzje architektoniczne, projekt modułów, trudne i niejasne błędy. Tylko analiza i plan, bez edycji kodu.
- `security-reviewer` (deep) — Przegląd bezpieczeństwa zmian (auth, sekrety, wejście użytkownika, IaC, CI). Używaj przed merge zmian wrażliwych.
- `scope-reviewer` (std) — Przegląd diffu względem planu kroku w świeżym kontekście — kod spoza zakresu, nieproszone przypadki brzegowe, zbędne zależności. Tylko odczyt.
- `specialist` (std) — Doraźny specjalista — analizuje fragment problemu z perspektywy skilli podanych w briefie (wczytuje je sam przez Skill). Zwraca raport z opcjami, ryzykami i krokami.
- `specialist-deep` (deep) — Specjalista do trudnych, kosztownych w odwróceniu decyzji — ocena opcji i kompromisów z perspektywy skilli podanych w briefie. Tylko analiza.
- `talos` (std) — Talos — automat „story → PR” na żądanie (uruchom `claude --agent talos` i podaj historyjkę; --auto pomija zatwierdzenie planu, --budget USD to twardy limit). Plan z kawałków, commit na kawałek, jeden PR, raport czasu i kosztu.
- `polish-editor` (std) — Korekta i redakcja tekstu po polsku (dokumentacja, artefakty docs/project, README, opisy) — pisownia i interpunkcja wg RJP PAN, styl, terminologia; poprawia punktowo, bez zmian merytorycznych. Podaj pliki i tryb (korekta = raport, redakcja = poprawki).
- `sources-critic` (std) — Wykrywa sprzeczności w banku dowodów (docs/project/02-domain/corpus.md) — typy, test tego samego podmiotu, pytania diagnostyczne. Nie rozstrzyga i nie edytuje.
- `blind-analyst` (std) — Generuje wymagania biznesowe do testu obciążeniowego modelu wyłącznie z briefu w docs/project/02-domain/_blind/ — bez wiedzy o architekturze. Podaj metrykę, ścieżki i liczbę wymagań; nie podawaj nazw modułów.
- `es-participant` (std) — Uczestnik symulowanego warsztatu Event Storming (wersja pełna) — gra jedną osobę z karty. Wywołuj tylko w ramach ddd-es-simulation, podając ścieżkę pliku promptu rundy.
- `es-room` (fast) — Kilku uczestników symulowanego warsztatu Event Storming w jednym wywołaniu (wersja oszczędna). Wywołuj tylko w ramach ddd-es-simulation, podając ścieżkę pliku promptu rundy.
- `es-host` (fast) — Gospodarz symulowanego warsztatu Event Storming (ddd-es-simulation) — uruchamiaj jako sesję `claude --agent es-host`; najtańszy sposób prowadzenia treningu.
- `es-coach` (std) — Coach facylitacji w symulowanym warsztacie (ddd-es-simulation) — ocenia prowadzenie sesji przez człowieka na podstawie transkrypcji i statystyk; tryby light/full/midsession.

## Konsultanci nakładek (tylko odpowiedź, bez zmian w plikach; wywołuje ich persona)

- `it-consult-architecture` (pack-it, deep) — Konsultant IT — architektura systemu, wybór stacku, atrybuty jakości, model zagrożeń, prawo UE dla produktu cyfrowego. Tylko odpowiedź, bez zmian w plikach.
- `it-consult-backend` (pack-it, std) — Konsultant IT — projekt API, bazy danych, uwierzytelnianie i autoryzacja, komunikacja asynchroniczna, testy. Tylko odpowiedź, bez zmian w plikach.
- `it-consult-domain` (pack-it, std) — Konsultant IT — modelowanie domeny (DDD) — konteksty, agregaty, archetypy, mapa kontekstów. Tylko odpowiedź, bez zmian w plikach.
- `it-consult-ops` (pack-it, std) — Konsultant IT — CI/CD, kontenery i Kubernetes, IaC, obserwowalność, SLO i incydenty, sekrety. Tylko odpowiedź, bez zmian w plikach.
- `it-consult-security` (pack-it, deep) — Konsultant IT — bezpieczeństwo aplikacji i chmury, kryptografia i PKI, regulacje cyber UE (NIS2, CRA, DORA). Tylko odpowiedź, bez zmian w plikach.
- `it-consult-data-ai` (pack-it, std) — Konsultant IT — analiza i inżynieria danych, funkcje z LLM, RAG, ewaluacje AI, AI Act. Tylko odpowiedź, bez zmian w plikach.
- `ux-consult-design` (pack-ux, std) — Konsultant UX — przepływy i stany ekranów, architektura informacji, treści interfejsu, wygląd i system projektowy. Tylko odpowiedź, bez zmian w plikach.
- `ux-consult-accessibility` (pack-ux, std) — Konsultant UX — dostępność (WCAG 2.2, EN 301 549, Europejski Akt o Dostępności) i badania z użytkownikami. Tylko odpowiedź, bez zmian w plikach.
