# DECISIONS

Quatro perguntas. Responda todas — é aqui que a gente entende as suas escolhas, e cada
resposta vira conversa na entrevista.

Objetividade vale mais que volume. Duas frases boas batem dois parágrafos genéricos.

---

## 1. O que acontece quando o fornecedor B demora 8 segundos?
O orquestrador (SearchService) aborta a requisição dele e retorna resultados parciais.

E por que você escolheu essa estratégia e não outra?

Eu escolhi usar o AbortController com um timeout global de 5.5s atrelado a um Promise.allSettled. Ao invés de apenas ignorar a promessa lenta (o que deixaria a conexão travando recursos de memória na thread Node), o sinal do AbortController é passado para o adaptador (via fetch), cortando ativamente o soquete de rede no limite de tempo, liberando os recursos e impedindo falhas em cascata.

---

## 2. Como você garante uma única reserva sob concorrência?

E o que quebra se subirem três instâncias da aplicação?

<!-- sua resposta aqui -->

---

## 3. Como você usou IA?

Quais ferramentas (Claude Code, Codex, Cursor, ChatGPT…), com que método (spec-driven, TDD
com agente, pair, revisão) — e **um ponto concreto onde você discordou dela** e seguiu por
outro caminho.

<!-- sua resposta aqui -->

---

## 4. Quanto tempo você demorou para concluir o desafio?

<!-- sua resposta aqui -->
