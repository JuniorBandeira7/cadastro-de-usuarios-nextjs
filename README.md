
# Cadastro de Usuário com Next.js e MongoDB

Este é um projeto de cadastro de usuário construído com Next.js, MongoDB, e Docker Compose, incluindo autenticação JWT e integração com o Tailwind CSS.

## Dependências

### Dependências de Produção

- **bcryptjs**: Usado para hash e verificação de senhas do usuário, ajudando na segurança dos dados armazenados.
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT, usada para autenticação.
- **mongoose**: ODM para MongoDB, facilita a modelagem de dados, manipulação e integração com o MongoDB.
- **next**: Framework React para renderização de páginas do lado do servidor (SSR) e construção de aplicações full-stack.
- **react** e **react-dom**: Biblioteca base para criação de componentes de interface e renderização do DOM.

### Dependências de Desenvolvimento

- **@types/bcryptjs**: Tipagens para uso de bcryptjs com TypeScript.
- **@types/jsonwebtoken**: Tipagens para JWT, facilitando a manipulação de tokens com segurança em TypeScript.
- **@types/node**: Tipos essenciais para trabalhar com Node.js.
- **@types/react** e **@types/react-dom**: Tipagens para React, úteis para desenvolvimento com TypeScript.
- **postcss**: Processador CSS usado com Tailwind CSS.
- **tailwindcss**: Framework CSS utilitário para estilização rápida e personalizada.
- **typescript**: Superset de JavaScript, que adiciona tipos estáticos ao código para maior robustez e facilidade de manutenção.

## Pré-requisitos

- Docker

## Instalação e Configuração

### Clonar o repositório

```bash
git clone <https://github.com/JuniorBandeira7/cadastro-de-usuarios-nextjs.git>
cd <caminho_da_pasta_do_projeto>
```

### Configuração do Ambiente
 **Docker Compose**: O projeto utiliza `docker-compose.yml` para configurar os contêineres do Next.js e MongoDB. Certifique-se de que a URI do MongoDB no arquivo de configuração aponta para `mongodb://mongo-db:27017/cadastro_usuarios`.

### Executar o Projeto

Para construir e rodar o projeto usando Docker Compose, use o comando:

```bash
docker-compose up --build
```

Isso irá iniciar os contêineres Next.js e MongoDB. O Next.js estará acessível em `http://localhost:3000`.


## Principais Funcionalidades

- **Autenticação com JWT**: Login e validação de token.
- **Cadastro e Atualização de Usuário**: Operações CRUD usando MongoDB e Mongoose.
- **Estilização com Tailwind CSS**: Design responsivo e rápido.
- **Proteção de Rotas**: Middleware para validar tokens em rotas protegidas.


