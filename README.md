# Sistema de Ordens de Serviço para Ar-Condicionado

> Projeto em evolução contínua conforme o avanço nos estudos de back-end.

Este sistema foi desenvolvido pensando em quatro ações comuns na rotina de profissionais de ar-condicionado: preventiva, corretiva, instalação e PMOC.

> O PMOC é um controle de manutenção exigido pelo Ministério da Saúde, quando a capacidade térmica de um ambiente é igual ou superior a 5 TR.

Cada tipo de serviço possui uma abordagem específica, com campos adaptados para cada situação. Na modalidade de instalação, o sistema conta com levantamento de materiais integrado, onde o usuário informa a quantidade de cada material e seus respectivos valores. A tabela `ordens` possui os campos `materiais` e `custo_total` para receber esses dados, que são enviados pelo front-end.

---

## Status do Projeto

🚧 Em desenvolvimento ativo — com foco em consolidação de boas práticas de back-end.

### Situação atual

- Estrutura MVC definida (controller, service, model)
- CRUD completo implementado
- Validação, verificação e sanitização já aplicadas na entidade **clientes**
- Regras de negócio principais já modeladas

### Próximos passos

- Aplicar o padrão de validação, verificação e sanitização nas demais entidades
- Implementar testes unitários (Jest)
- Documentação com Swagger

---

## Tecnologias

- **Node.js** — ambiente de execução JavaScript no servidor.
- **Express** — framework para criação de APIs e rotas HTTP.
- **CORS** — middleware responsável por permitir a comunicação entre o front-end e o back-end.
- **MySQL** — banco de dados relacional.
- **mysql2** — driver de conexão e execução de queries no MySQL com suporte a Promises.
- **dotenv** — gerenciamento de variáveis de ambiente.
- **nodemon** — ferramenta de desenvolvimento para reinício automático do servidor.

---

## Funcionalidades

### 🔹 Gestão completa (CRUD)

- Clientes — cadastro com CPF único e validação
- Técnicos — controle por matrícula e especialidades
- Equipamentos — vinculados a clientes com identificação por local. Dados técnicos como tipo, marca, modelo, série, capacidade BTU e tipo de gás podem ser adicionados posteriormente, pois muitas vezes são coletados pelo técnico durante a vistoria em campo.
- Tabela de preços — referência de serviços e materiais
- Ordens de serviço — fluxo completo do início à finalização

---

### 🔹 Regras de negócio implementadas

- CPF único por cliente com validação
- Controle de duplicidade em equipamentos:
  - combinação única de `cliente_id + local + identificador`
- Estados da ordem controlados por ENUM, com validação de transições na camada de service:

  Fluxo principal:
  `aberta → em_andamento → aguardando_peca → finalizada`

  Fluxo alternativo:
  `qualquer estado (exceto finalizada) → cancelada`

  Regras:
  - Transições de status são validadas no back-end
  - Não é permitido alterar ordens finalizadas ou canceladas

- Cálculo de custo total baseado nos materiais informados
- Suporte a múltiplos tipos de serviço com estrutura flexível (JSON)

---

### 🔹 Arquitetura e organização

- Separação em camadas:
  - Controller → HTTP
  - Service → regras de negócio
  - Model → acesso ao banco
  - Validação centralizada no service (independente do controller)
  - Reutilização de lógica via pasta `utils`

---

### 🔹 Tratamento de dados

- Sanitização de entradas (`trim`, optional chaining)
- Whitelisting de campos permitidos
- Tratamento de erros padronizado

---

## Segurança e Qualidade

### 🔹 Validação e consistência de dados

- Validação aplicada na camada de **service**, garantindo regras de negócio independentemente da origem da requisição
- Verificação de campos obrigatórios antes do processamento
- Validação de CPF implementada na entidade `clientes`

---

### 🔹 Sanitização de dados

- Remoção de espaços desnecessários com `.trim()`
- Uso de optional chaining (`?.`) para evitar erros com valores `null` ou `undefined`
- Padronização de dados antes da persistência

---

### 🔹 Controle de entrada (Whitelisting)

- Uso de destructuring para aceitar apenas campos permitidos
- Prevenção de inserção de dados inesperados ou maliciosos

---

### 🔹 Segurança contra vulnerabilidades

- Queries parametrizadas com `mysql2` para prevenção de SQL Injection
- Separação clara entre camadas evita acoplamento e reduz riscos

---

### 🔹 Tratamento de erros

- Centralização do tratamento de erros
- Respostas padronizadas para facilitar debug e integração com front-end

---

## Melhorias recentes

- Estruturação da aplicação em camadas (controller, service, model), separando responsabilidades
- Criação da pasta `utils` para centralizar funções reutilizáveis
- Padronização do tratamento de erros em toda a aplicação

---

- Implementação de whitelisting para controle dos campos aceitos pela API
- Sanitização de dados antes da persistência (uso de `.trim()` e padronização de entradas)

---

- Implementação de validação completa na entidade `clientes`, incluindo:
  - Verificação de campos obrigatórios
  - Sanitização
  - Validação de CPF

---

- Ajustes no schema do banco de dados para refletir melhor as regras de negócio
- Criação de chave única composta na tabela `equipamentos` (cliente_id, local, identificador)

---

## Estrutura do Projeto

```bash
sistema-ordens/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── clienteController.js
│   │   ├── equipamentoController.js
│   │   ├── tecnicoController.js
│   │   ├── precoController.js
│   │   └── ordemController.js
│   ├── services/
│   │   ├── clienteService.js
│   │   ├── equipamentoService.js
│   │   ├── tecnicoService.js
│   │   ├── precoService.js
│   │   └── ordemService.js
│   ├── models/
│   │   ├── clienteModel.js
│   │   ├── equipamentoModel.js
│   │   ├── tecnicoModel.js
│   │   ├── precoModel.js
│   │   └── ordemModel.js
│   └── utils/
│       ├── tratarErro.js
│       ├── validarCampos.js
│       └── padronizarDados.js
├── .env
├── .env.example
├── app.js
├── server.js
└── package.json
```

---

## Como Instalar e Rodar

### Pré-requisitos

- Node.js 18+
- MySQL 8+

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/TiagoTudicaki/sistema-ordens.git
cd sistema-ordens
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sistema_ordens
DB_PORT=3306
PORT=3000
```

**4. Crie o banco de dados**

Execute no MySQL:

```sql
CREATE DATABASE sistema_ordens;
USE sistema_ordens;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  telefone VARCHAR(20) NOT NULL,
  endereco VARCHAR(100) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tecnicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(500) NOT NULL,
  matricula VARCHAR(20) NOT NULL UNIQUE,
  telefone VARCHAR(20) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipamentos (
  id INT NOT NULL AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  tipo ENUM('acj','hi-wall','piso-teto','multi-split','cassete','self-contained','built-in','vrf','fan-coil','roof-top') DEFAULT NULL,
  local VARCHAR(50) NOT NULL,
  identificador VARCHAR(4) NOT NULL,
  marca VARCHAR(50) DEFAULT NULL,
  modelo VARCHAR(50) DEFAULT NULL,
  serie VARCHAR(50) DEFAULT NULL,
  capacidade_btu VARCHAR(10) DEFAULT NULL,
  tipo_gas VARCHAR(10) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_identificador_cliente_local (cliente_id, local, identificador)
);

CREATE TABLE precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) NOT NULL UNIQUE,
  descricao VARCHAR(100) NOT NULL,
  preco_uni DECIMAL(10,2) NOT NULL,
  unidade VARCHAR(20) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `ordens` (
  id int NOT NULL AUTO_INCREMENT,
  cliente_id int NOT NULL,
  equipamento_id int DEFAULT NULL,
  tecnico_id int DEFAULT NULL,
  tipo_servico enum('corretiva','instalacao','pmoc','preventiva') NOT NULL,
  status enum('aberta','em_andamento','aguardando_peca','finalizada','cancelada') DEFAULT 'aberta',
  problema text,
  diagnostico text,
  solucao text,
  detalhes json DEFAULT NULL,
  materiais json DEFAULT NULL,
  checklist json DEFAULT NULL,
  criado_em timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  finalizado_em timestamp NULL DEFAULT NULL,
  custo_total decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (id),
  KEY fk_ordens_cliente (cliente_id),
  KEY fk_ordens_equipamento (equipamento_id),
  KEY fk_ordens_tecnico (tecnico_id),
  CONSTRAINT fk_ordens_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_ordens_equipamento FOREIGN KEY (equipamento_id) REFERENCES equipamentos (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_ordens_tecnico FOREIGN KEY (tecnico_id) REFERENCES tecnicos (id) ON DELETE SET NULL ON UPDATE CASCADE
) ;
```

**5. Inicie o servidor**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

## Documentação das Rotas

### Clientes

| Método | Rota                | Descrição                |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/clientes`     | Cadastrar cliente        |
| GET    | `/api/clientes`     | Listar todos os clientes |
| GET    | `/api/clientes/:id` | Buscar cliente por ID    |
| PUT    | `/api/clientes/:id` | Atualizar cliente        |
| DELETE | `/api/clientes/:id` | Excluir cliente          |

**Exemplo de body (POST/PUT):**

```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "telefone": "14999998888",
  "endereco": "Rua das Flores, 123",
  "cidade": "Jaú"
}
```

---

### Técnicos

| Método | Rota                | Descrição                |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/tecnicos`     | Cadastrar técnico        |
| GET    | `/api/tecnicos`     | Listar todos os técnicos |
| GET    | `/api/tecnicos/:id` | Buscar técnico por ID    |
| PUT    | `/api/tecnicos/:id` | Atualizar técnico        |
| DELETE | `/api/tecnicos/:id` | Excluir técnico          |

**Exemplo de body (POST/PUT):**

```json
{
  "nome": "Carlos Souza",
  "especialidade": "Instalação e Manutenção",
  "matricula": "TEC001",
  "telefone": "14988887777"
}
```

---

### Equipamentos

| Método | Rota                    | Descrição                    |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/api/equipamentos`     | Cadastrar equipamento        |
| GET    | `/api/equipamentos`     | Listar todos os equipamentos |
| GET    | `/api/equipamentos/:id` | Buscar equipamento por ID    |
| PUT    | `/api/equipamentos/:id` | Atualizar equipamento        |
| DELETE | `/api/equipamentos/:id` | Excluir equipamento          |

**Exemplo de body (POST/PUT):**

```json
{
  "cliente_id": 1,
  "tipo": "Split",
  "local": "Sala",
  "identificador": "01",
  "marca": "Fujitsu",
  "modelo": "38XQB45C60CS",
  "serie": "3444562134",
  "capacidade_btu": "12000",
  "tipo_gas": "R22"
}
```

---

### Preços

| Método | Rota              | Descrição              |
| ------ | ----------------- | ---------------------- |
| POST   | `/api/precos`     | Cadastrar preço        |
| GET    | `/api/precos`     | Listar todos os preços |
| GET    | `/api/precos/:id` | Buscar preço por ID    |
| PUT    | `/api/precos/:id` | Atualizar preço        |
| DELETE | `/api/precos/:id` | Excluir preço          |

**Exemplo de body (POST/PUT):**

```json
{
  "codigo": "MO001",
  "descricao": "Mão de obra - Manutenção preventiva",
  "preco_uni": 150.0,
  "unidade": "hora"
}
```

---

### Ordens de Serviço

| Método | Rota              | Descrição              |
| ------ | ----------------- | ---------------------- |
| POST   | `/api/ordens`     | Abrir ordem de serviço |
| GET    | `/api/ordens`     | Listar todas as ordens |
| GET    | `/api/ordens/:id` | Buscar ordem por ID    |
| PUT    | `/api/ordens/:id` | Atualizar ordem        |
| DELETE | `/api/ordens/:id` | Excluir ordem          |

**Exemplo de body (POST):**

```json
{
  "cliente_id": 1,
  "equipamento_id": 1,
  "tecnico_id": 1,
  "tipo_servico": "corretiva",
  "problema": "Equipamento não resfria"
}
```

**Tipos de serviço disponíveis:** `corretiva` | `instalacao` | `pmoc` | `preventiva`

**Status disponíveis:** `aberta` | `em_andamento` | `aguardando_peca` | `finalizada` | `cancelada`

---

## Modelo de Dados

```text
clientes ──< equipamentos
clientes ──< ordens
tecnicos ──< ordens
equipamentos ──< ordens
precos (tabela de referência de serviços)
```

---

## Autor

Desenvolvido por **Tiago Tudiçaki** — profissional com experiência em Refrigeração e Ar-Condicionado, em transição para a área de desenvolvimento, com foco em back-end utilizando JavaScript e Node.js.
