# Plano de ação - Cockpit de Soluções

## 1. Visão geral

O projeto será um cockpit digital para gestão de contratos e solicitações de serviços da Destamed Soluções. O objetivo é centralizar o acompanhamento de clientes, contratos, pendências, solicitações e status operacionais em uma plataforma simples, funcional e visualmente profissional.

A solução será desenvolvida inicialmente como MVP, com foco em produtividade e visibilidade operacional para a equipe.

---

## 2. Objetivo do produto

Criar uma aplicação web/mobile para:

- controlar contratos ativos e vencidos
- registrar e acompanhar solicitações de serviços
- visualizar status por cliente, contrato e equipe
- facilitar a comunicação entre operação, gestão e cliente
- reduzir retrabalho e atrasos no ciclo de atendimento

---

## 3. Público-alvo

### Usuários principais
- Gestor/administrador
- Coordenador de operações
- Equipe de atendimento/execução
- Cliente interno ou externo com acesso limitado

### Perfis de uso
- Visualização de contratos e pendências
- Criação e acompanhamento de solicitações
- Atualização de status de execução
- Consulta de histórico e dados do cliente

---

## 4. Escopo do MVP

### Módulo 1 - Dashboard
- resumo geral de contratos
- quantidade de contratos ativos
- solicitações em andamento
- vencimentos próximos
- indicadores por status

### Módulo 2 - Gestão de contratos
- cadastro de contrato
- cliente vinculados
- valor, vigência, status e responsável
- anexos e observações
- filtros por situação

### Módulo 3 - Solicitação de serviço
- criação de solicitação
- dados do cliente, contrato e serviço solicitado
- prioridade, prazo, categoria e status
- histórico de movimentação
- checklist de atendimento

### Módulo 4 - Acompanhamento operacional
- lista de tarefas por cliente/contrato
- atualização de status da solicitação
- acompanhamento de prazo
- indicadores de atraso

### Módulo 5 - Clientes
- cadastro de clientes
- contato principal
- contratos vinculados
- histórico de serviços

### Módulo 6 - Configurações básicas
- usuários
- papéis
- categorias de serviço
- status padrões
- templates de observação

---

## 5. Funcionalidades essenciais

### 5.1 Contratos
- nome do contrato
- cliente
- responsável
- data de início/fim
- valor total
- status (ativo, pendente, vencido, encerrado)
- observações
- anexos

### 5.2 Solicitações de serviço
- código da solicitação
- cliente
- contrato relacionado
- tipo de serviço
- descrição do pedido
- prioridade
- status
- data de abertura e prazo
- responsável pela execução
- histórico de comentários/atualizações

### 5.3 Dashboard
- cards com indicadores
- gráfico simples por status
- tabela de solicitações recentes
- alertas de contrato vencendo

### 5.4 Acesso e permissões
- admin: acesso total
- gestor: visualiza e aprova
- operação: acompanha e atualiza status
- cliente: visualiza apenas seus itens

---

## 6. Regras de negócio

### Contratos
- Um contrato pertence a um cliente
- Um cliente pode ter vários contratos
- Contratos ativos devem ser listados no dashboard
- Contratos vencidos devem aparecer com destaque

### Solicitações
- Toda solicitação deve estar vinculada a um cliente e, se houver, a um contrato
- Solicitações devem possuir status obrigatório
- Solicitações com prioridade alta devem aparecer primeiro
- Solicitações vencidas devem ser sinalizadas visualmente

### Usuários
- Apenas usuários autorizados podem alterar status
- Apenas gestores podem fechar ou encerrar contratos
- Eventos de alteração de status devem gerar histórico

---

## 7. Estrutura de módulos sugerida no projeto

```text
src/
  app/
    core/
      services/
      models/
      guards/
      interceptors/
      utils/
    shared/
      components/
      layouts/
      pipes/
      directives/
    features/
      dashboard/
      clientes/
      contratos/
      solicitacoes/
      acompanhamento/
      configuracoes/
      auth/
```

---

## 8. Telas mínimas do MVP

### Tela inicial - Login
- email e senha
- opção de lembrar sessão
- senha com recuperação

### Tela de dashboard
- indicadores principais
- lista de pendências
- últimos eventos

### Tela de contratos
- listagem com filtros
- botão para novo contrato
- detalhe do contrato

### Tela de solicitações
- listagem por status
- filtro por cliente, prioridade e data
- criação/edição da solicitação

### Tela de detalhe da solicitação
- descrição
- histórico
- comentários
- atualização de status

### Tela de clientes
- cadastro e perfil do cliente
- contratos e solicitações vinculadas

### Tela de configurações
- status, categorias, usuários e permissões

---

## 9. Fluxo principal de uso

### Fluxo 1 - Cadastro de contrato
1. Usuário acessa clientes
2. Seleciona ou cria cliente
3. Cria contrato com vigência e valores
4. Define responsável e status
5. Salva contrato

### Fluxo 2 - Solicitação de serviço
1. Usuário cria nova solicitação
2. Seleciona cliente e contrato
3. Define categoria, prioridade e prazo
4. Descreve a necessidade
5. Salva e encaminha para análise

### Fluxo 3 - Acompanhamento
1. Operação recebe a solicitação
2. Atualiza status conforme andamento
3. Registra observações
4. Fecha a solicitação quando concluída

---

## 10. Modelo de dados inicial

### Cliente
- id
- nome
- documento
- telefone
- email
- endereço
- status

### Contrato
- id
- clienteId
- numero
- titulo
- valor
- dataInicio
- dataFim
- status
- responsavel
- observacoes

### Solicitação
- id
- clienteId
- contratoId
- codigo
- titulo
- descricao
- categoria
- prioridade
- status
- dataAbertura
- prazo
- responsavel
- observacoes

### Usuario
- id
- nome
- email
- perfil
- status

---

## 11. Stack tecnológica

### Frontend
- Angular
- Ionic
- Angular Router
- Ionic UI Components
- SCSS

### Backend / dados
- inicialmente pode ser mockado ou simples com local storage/mock JSON
- depois evoluir para API REST com Node.js, NestJS ou backend próprio

### Persistência futura
- PostgreSQL ou MySQL
- Prisma ou ORM equivalente

### Autenticação futura
- JWT
- roles/permissões

---

## 12. Roadmap de desenvolvimento

### Fase 1 - MVP
- estrutura de projeto
- login e dashboard
- cadastro de clientes
- gestão de contratos
- criação de solicitações
- acompanhamento de status

### Fase 2 - Otimização
- filtros avançados
- busca por texto
- ordenação por data/valor/prioridade
- relatórios simples

### Fase 3 - Inteligência operacional
- alertas automáticos
- vencimentos e atrasos
- exportação de relatórios
- notificações por e-mail/WhatsApp

### Fase 4 - Expansão
- integração com CRM
- integração com ERP
- autenticação real
- painel de gestão executivo

---

## 13. Critérios de aceite do MVP

A funcionalidade será considerada concluída quando:

- o usuário consegue logar no sistema
- consegue criar e visualizar clientes
- consegue criar e visualizar contratos
- consegue criar, editar e acompanhar solicitações
- consegue alterar status da solicitação
- consegue visualizar dashboard com indicadores básicos
- a navegação é intuitiva e responsiva

---

## 14. Próximos passos imediatos

1. definir a identidade visual da Destamed Soluções
2. criar as telas principais do MVP
3. implementar a estrutura de módulos
4. desenvolver a navegação inicial
5. criar os modelos de contrato e solicitação
6. implementar dashboard e listagens
7. validar fluxos com a equipe

---

## 15. Recomendação final

Este projeto deve nascer como um cockpit funcional e enxuto, com foco em gestão operacional e rapidez de uso. O MVP deve resolver o problema central: controlar contratos e solicitações de serviço de forma clara, organizada e rastreável.

A prioridade é entregar uma base operacional confiável, e somente depois evoluir para recursos mais sofisticados.

---

## 16. Resumo executivo

O produto será um cockpit de soluções para a Destamed Soluções, centrado em:

- contratos
- clientes
- solicitações de serviço
- acompanhamento operacional
- dashboard executivo

Esse MVP permitirá organizar a operação da empresa e dar início a uma solução digital profissional, escalável e pronta para crescimento.
