# Plano de migração do projeto padrão para o projeto Destamed Soluções

## 1. Objetivo

Migrar a estrutura funcional do projeto padrão para o projeto da Destamed Soluções, preservando os módulos de negócio já existentes e adaptando a identidade visual, navegação e regras da empresa.

A migração tem como foco transformar o app em um cockpit de gestão para:

- contratos
- clientes
- propostas
- ordens de serviço
- serviços
- usuários
- dashboard operacional

---

## 2. Base de origem

A base funcional está no projeto padrão em:

- C:\github\padrao\padrao\src\app

Os módulos já existentes demonstram que a solução foi projetada para um sistema operacional real, com:

- login
- dashboard
- clientes
- contratos
- propostas
- serviços
- ordens de serviço
- usuários
- configurações

---

## 3. Base de destino

A aplicação Destamed Soluções já possui a estrutura inicial do Ionic/Angular, mas ainda está em template genérico. A intenção da migração é substituir esse template por uma estrutura funcional e alinhada ao negócio.

Estrutura-alvo do projeto:

```text
src/
  app/
    core/
      models/
      services/
      guards/
      interceptors/
      utils/
    shared/
      components/
      layouts/
      pipes/
      directives/
    features/
      auth/
      dashboard/
      clientes/
      contratos/
      propostas/
      ordens-servico/
      servicos/
      usuarios/
      configuracoes/
```

---

## 4. Mapeamento dos módulos do projeto padrão para o novo projeto

### 4.1 Login

Origem:
- login

Destino:
- feature auth

Objetivo:
- manter autenticação por usuário, senha e empresa
- adaptar o layout para a marca Destamed
- integrar com a API do projeto final

### 4.2 Dashboard

Origem:
- home

Destino:
- feature dashboard

Objetivo:
- criar painel com indicadores de contratos, ordens, pendências e status
- manter navegação rápida para as áreas principais

### 4.3 Clientes

Origem:
- cliente

Destino:
- feature clientes

Objetivo:
- manter cadastro, listagem e detalhamento de clientes
- adicionar filtros por situação e histórico de contratos

### 4.4 Contratos

Origem:
- contrato

Destino:
- feature contratos

Objetivo:
- manter listagem, aprovação, reprovação, detalhe e status
- adaptar para a linguagem e regras da Destamed

### 4.5 Propostas

Origem:
- proposta

Destino:
- feature propostas

Objetivo:
- manter fluxo de criação e aprovação de proposta
- ligar ao cliente e ao contrato

### 4.6 Ordens de serviço

Origem:
- ordem

Destino:
- feature ordens-servico

Objetivo:
- manter ciclo de atendimento e acompanhamento da execução
- adicionar status e histórico de atualização

### 4.7 Serviços

Origem:
- servico

Destino:
- feature servicos

Objetivo:
- manter cadastro de serviços e categorias
- relacionar com contratos e ordens

### 4.8 Usuários

Origem:
- usuario

Destino:
- feature usuarios

Objetivo:
- manter permissões, perfil e acesso
- preparar o sistema para gestão de usuários e papéis

### 4.9 Configuração

Origem:
- configuracao

Destino:
- feature configuracoes

Objetivo:
- manter parâmetros do sistema, empresa e estrutura operacional

---

## 5. Fase 1 - Preparação da migração

### Tarefas
- validar que o projeto padrão está estável e funcional
- identificar os módulos realmente úteis para o MVP
- confirmar quais telas serão mantidas e quais serão adaptadas
- definir a paleta de cores, branding e nomenclatura da Destamed

### Entregáveis
- mapa de módulos originais
- lista de módulos prioritários para MVP
- definição da estrutura final do projeto

---

## 6. Fase 2 - Reestruturação do projeto Destamed

### Objetivo
Remover o template genérico e deixar o projeto pronto para receber a lógica atual do padrão.

### Tarefas
- limpar componentes de exemplo do template Ionic
- substituir textos genéricos por nomenclatura da Destamed
- atualizar menu principal e navegação inicial
- criar a estrutura de módulos e pastas do novo projeto
- manter app-routing funcional com as rotas reais do sistema

### Entregáveis
- projeto com estrutura limpa e alinhada à empresa
- menu e navegação adaptados
- telas base do cockpit prontas

---

## 7. Fase 3 - Migração de módulos funcionais

### Ordem sugerida
1. login
2. dashboard
3. clientes
4. contratos
5. propostas
6. serviços
7. ordens de serviço
8. usuários
9. configurações

### Objetivo
Copiar a lógica funcional dos módulos do padrão e adaptar para a estrutura atual do projeto Destamed.

### Ações
- mover arquivos da pasta app do projeto padrão para o projeto Destamed
- ajustar imports e caminhos
- corrigir módulos e rotas dos componentes
- adaptar nomes para a convenção do projeto Destamed
- verificar serviços e interfaces

---

## 8. Fase 4 - Padronização da camada de negócio

### Tarefas
- criar ou padronizar models e interfaces
- revisar services e integração com backend
- manter LocalStorageService e autenticação funcional
- definir padrão para status de contrato, proposta e ordem
- ajustar enums e tipos de dados para os nomes reais da Destamed

### Resultado esperado
A base de domínio do sistema deve ficar consistente e pronta para evolução.

---

## 9. Fase 5 - Customização visual e UX

### Objetivo
A aplicação precisa parecer uma solução da empresa, e não um scaffold genérico.

### Tarefas
- definir branding da Destamed
- atualizar cores primárias e secundárias
- criar identidade visual para dashboard, cards, botões e tabelas
- ajustar nomes de menus e textos para o contexto real
- garantir responsividade para mobile e web

### Itens visuais prioritários
- toolbar principal
- menu lateral
- cards de dashboard
- listas de contratos e solicitações
- botões de ação
- telas de detalhes

---

## 10. Fase 6 - Fluxo do MVP da Destamed

### MVP proposto

#### Dashboard
- resumo de contratos ativos
- pendências de serviço
- ordens em andamento
- alertas de vencimento

#### Contratos
- cadastro
- listagem
- detalhamento
- aprovação/reprovação
- status

#### Solicitações de serviço
- criação
- carregamento por cliente e contrato
- atualização de status
- acompanhamento de prazo

#### Clientes
- cadastro e histórico

#### Configuração
- parâmetros básicos da empresa e permissões

---

## 11. Critérios de migração bem-sucedida

A migração será concluída quando:

- o projeto Destamed rodar com estrutura limpa
- o login estiver funcionando corretamente
- o dashboard estiver funcional
- clientes, contratos e ordens estiverem integrados no fluxo
- os módulos do padrão estiverem convertidos para a arquitetura do Destamed
- a interface estiver personalizada para a marca
- a navegação estiver coerente e estável

---

## 12. Riscos e mitigação

### Risco 1: imports quebrados
Mitigação:
- revisar todos os caminhos e módulos
- ajustar imports após migração

### Risco 2: textos e nomenclaturas antigas
Mitigação:
- substituição por linguagem da Destamed
- valiação visual em cada módulo

### Risco 3: estrutura duplicada
Mitigação:
- manter apenas a arquitetura funcional necessária do projeto padrão
- descartar componentes genéricos que não serão usados

### Risco 4: excesso de escopo
Mitigação:
- focar no MVP primeiro
- deixar melhorias e expansões para a segunda etapa

---

## 13. Ordem de implementação recomendada

1. limpar template padrão
2. montar a estrutura de módulos da Destamed
3. migrar login
4. migrar dashboard
5. migrar clientes
6. migrar contratos
7. migrar propostas
8. migrar serviços
9. migrar ordens
10. migrar usuários e configurações
11. validar fluxo completo
12. ajustar UX e branding

---

## 14. Recomendação final

A melhor estratégia é migrar o projeto padrão como base funcional e não como cópia literal do código. O ideal é:

- reutilizar a lógica já validada de negócio
- adaptar a arquitetura para a identidade da Destamed
- reduzir escopo para um MVP de alta utilidade
- evoluir o projeto de forma incremental

Esse caminho permite que a equipe avance rápido sem perder a qualidade e a clareza do produto.

---

## 15. Próximo passo imediato

O próximo passo é:

- criar a estrutura final do app no projeto Destamed
- atualizar as rotas principais
- migrar o módulo de login e dashboard
- depois migrar clientes e contratos

Assim, o projeto sairá do estado genérico e passará a ter uma base funcional real para gestão da Destamed Soluções.
