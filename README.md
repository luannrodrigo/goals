# Goals Project

## Descrição
O projeto **Goals** é uma aplicação web para gerenciar metas e registrar sensações térmicas associadas a elas. Ele é composto por duas partes principais:

1. **Frontend**: Desenvolvido com Vue.js, fornece uma interface amigável para os usuários interagirem com o sistema.
2. **Backend**: Construído com NestJS, gerencia a lógica de negócios e a comunicação com o banco de dados.

## Funcionalidades
- Registro de metas com título e descrição.
- Registro de sensações térmicas associadas às metas.
- Visualização de metas registradas.

## Requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker (para o banco de dados)

## Como subir o projeto

### 1. Subir o banco de dados
O projeto utiliza o banco de dados PostgreSQL. Para facilitar, um contêiner Docker pode ser usado:

1. Certifique-se de que o Docker está instalado e em execução.
2. Crie e inicie o contêiner do PostgreSQL:

```bash
docker run --name goals-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=goals -p 5432:5432 -d postgres
```

3. Verifique se o contêiner está em execução:

```bash
docker ps
```

### 2. Configurar o backend

1. Navegue até o diretório do backend:

```bash
cd goals-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados no arquivo `.env` (crie o arquivo se necessário):

```
DATABASE_URL=postgresql://admin:admin@localhost:5432/goals
```

4. Execute as migrações do Prisma para configurar o esquema do banco de dados:

```bash
npx prisma migrate dev
```

5. Inicie o servidor backend:

```bash
npm run start:dev
```

### 3. Configurar o frontend

1. Navegue até o diretório do frontend:

```bash
cd goals
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação no navegador em [http://localhost:5173](http://localhost:5173).

## Estrutura do Projeto

### Frontend
- Local: `goals/`
- Framework: Vue.js

### Backend
- Local: `goals-api/`
- Framework: NestJS

### Banco de Dados
- Banco: PostgreSQL
- Gerenciador de esquemas: Prisma

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto está licenciado sob a licença MIT.
