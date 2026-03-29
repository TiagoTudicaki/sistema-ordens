# Sistema de Ordem de serviço - Ar condicionado

Foi elaborado esse sistema pensando em 4 ações comuns na rotina de quem trabalha com ar condicionado: preventiva, corretiva, instalação e pmoc.

Cada tipo de serviço possui uma abordagem especifica, com campos adaptados para cada situação. Na modalidade de instalação, o sistema conta com levantamento de materiais integrado.

# Tecnologias

- **Node.js** - ambiente de execução javascript no servidor
- **Express** - framework para criação de API's e rotas HTTP
- **cors** - middleware responsável de possibilitar comunicação entre front e back
- **MySQL** - banco de dados relacional
- **mysql2** - driver de conexão e execução de queries no MYSQL com suporte a promises
- **dotenv** - gerenciamento de variáveis de ambiente
- **nodemon** - ferramenta de desenvolvimento para reinício automático de servidor

## Estrutura do Projeto

```
sistema-ordens/
├── src/
│   ├── config/
│   │   └── database.js        # Conexão com o banco de dados
│   ├── controllers/           # Recebe requisições e envia respostas
│   │   ├── clienteController.js
│   │   ├── equipamentoController.js
│   │   ├── tecnicoController.js
│   │   ├── precoController.js
│   │   └── ordemController.js
│   ├── services/              # Regras de negócio e validações
│   │   ├── clienteService.js
│   │   ├── equipamentoService.js
│   │   ├── tecnicoService.js
│   │   ├── precoService.js
│   │   └── ordemService.js
│   ├── models/                # Consultas ao banco de dados
│   │   ├── clienteModel.js
│   │   ├── equipamentoModel.js
│   │   ├── tecnicoModel.js
│   │   ├── precoModel.js
│   │   └── ordemModel.js
│   └── routes/                # Definição das rotas
│       ├── clienteRoute.js
│       ├── equipamentoRoute.js
│       ├── tecnicoRoute.js
│       ├── precoRoute.js
│       └── ordemRoute.js
├── .env                       # Variáveis de ambiente (não versionado)
├── .env.example               # Exemplo de configuração
├── app.js
├── server.js
└── package.json
```

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

Execute o script SQL abaixo no MySQL Workbench ou via terminal:

```sql
CREATE DATABASE sistema_ordens;
USE sistema_ordens;

CREATE TABLE clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(100) NOT NULL,
  cpf       VARCHAR(11) NOT NULL UNIQUE,
  telefone  VARCHAR(20) NOT NULL,
  endereco  VARCHAR(100) NOT NULL,
  cidade    VARCHAR(50) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tecnicos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL,
  especialidade VARCHAR(500) NOT NULL,
  matricula     VARCHAR(20) NOT NULL UNIQUE,
  telefone      VARCHAR(20) NOT NULL,
  criado_em     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipamentos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  tipo       VARCHAR(50) NOT NULL,
  marca      VARCHAR(50),
  modelo     VARCHAR(50),
  serie      VARCHAR(50),
  tipo_gas   VARCHAR(20) NOT NULL,
  criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE precos (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  codigo    VARCHAR(50) NOT NULL UNIQUE,
  descricao VARCHAR(100) NOT NULL,
  preco_uni DECIMAL(10,2) NOT NULL,
  unidade   VARCHAR(20) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ordens (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id     INT NOT NULL,
  equipamento_id INT NOT NULL,
  tecnico_id     INT NULL,
  tipo_servico   ENUM('corretiva','instalacao','pmoc','preventiva') NOT NULL,
  status         ENUM('aberta','em_andamento','aguardando_peca','finalizada','cancelada') DEFAULT 'aberta',
  problema       TEXT,
  diagnostico    TEXT,
  solucao        TEXT,
  detalhes       JSON,
  materiais      JSON,
  checklist      JSON,
  custo_total    DECIMAL(10,2) DEFAULT 0.00,
  criado_em      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finalizado_em  TIMESTAMP NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id),
  FOREIGN KEY (tecnico_id) REFERENCES tecnicos(id)
);
```

**5. Inicie o servidor**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

---

## Documentação das Rotas

### Clientes

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/clientes` | Cadastrar cliente |
| GET | `/api/clientes` | Listar todos os clientes |
| GET | `/api/clientes/:id` | Buscar cliente por ID |
| PUT | `/api/clientes/:id` | Atualizar cliente |
| DELETE | `/api/clientes/:id` | Excluir cliente |

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

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/tecnicos` | Cadastrar técnico |
| GET | `/api/tecnicos` | Listar todos os técnicos |
| GET | `/api/tecnicos/:id` | Buscar técnico por ID |
| PUT | `/api/tecnicos/:id` | Atualizar técnico |
| DELETE | `/api/tecnicos/:id` | Excluir técnico |

**Exemplo de body (POST/PUT):**
```json
{
  "nome": "Carlos Souza",
  "matricula": "TEC001",
  "especialidade": "Instalação e Manutenção",
  "telefone": "14988887777"
}
```

---

### Equipamentos

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/equipamentos` | Cadastrar equipamento |
| GET | `/api/equipamentos` | Listar todos os equipamentos |
| GET | `/api/equipamentos/:id` | Buscar equipamento por ID |
| PUT | `/api/equipamentos/:id` | Atualizar equipamento |
| DELETE | `/api/equipamentos/:id` | Excluir equipamento |

**Exemplo de body (POST/PUT):**
```json
{
  "cliente_id": 1,
  "tipo": "Split",
  "marca": "Fujitsu",
  "modelo": "38XQB45C60CS",
  "serie": "3444562134",
  "tipo_gas": "R22"
}
```

---

### Preços

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/precos` | Cadastrar preço |
| GET | `/api/precos` | Listar todos os preços |
| GET | `/api/precos/:id` | Buscar preço por ID |
| PUT | `/api/precos/:id` | Atualizar preço |
| DELETE | `/api/precos/:id` | Excluir preço |

**Exemplo de body (POST/PUT):**
```json
{
  "codigo": "MO001",
  "descricao": "Mão de obra - Manutenção preventiva",
  "preco_uni": 150.00,
  "unidade": "hora"
}
```

---

### Ordens de Serviço

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/ordens` | Abrir ordem de serviço |
| GET | `/api/ordens` | Listar todas as ordens |
| GET | `/api/ordens/:id` | Buscar ordem por ID |
| PUT | `/api/ordens/:id` | Atualizar ordem |
| DELETE | `/api/ordens/:id` | Excluir ordem |

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

```
clientes ──< equipamentos
clientes ──< ordens
tecnicos ──< ordens
equipamentos ──< ordens
precos (tabela de referência de serviços)
```

---

## Autor

Desenvolvido por **Tiago Tudiçaki** — Técnico em Refrigeração, estudando programação e buscando uma vaga de desenvolvedor júnior focado em back-end com JavaScript e Node.js.