# 🛟 Elo - Registro de Pessoas Desaparecidas

## 1 - Apresentação da Ideia

Este projeto foi desenvolvido como solução para o desafio de mitigar os impactos causados por enchentes e desastres naturais. Ao analisar o cenário de evacuações de emergência, identifiquei que a separação de famílias e a perda de contacto são problemas críticos que agravam o caos. A falta de uma fonte de dados centralizada e fiável motivou a criação desta plataforma, focada em organizar a informação e agilizar o reencontro de pessoas.

## 2 - Problema Escolhido

Durante inundações, a infraestrutura de comunicação torna-se instável e a informação espalha-se de forma fragmentada em redes sociais e grupos de mensagens.

- **Dificuldade enfrentada:** Dados desencontrados, duplicados ou desatualizados sobre o paradeiro de sobreviventes e desaparecidos.
- **Pessoas impactadas:** Familiares em busca de entes queridos e equipas de voluntários/Defesa Civil que operam em abrigos.
- **Relevância:** Centralizar estes dados reduz o tempo de resposta das equipas de apoio e alivia o desgaste emocional das famílias, permitindo uma gestão logística mais eficiente dos resgatados.

## 3 - Solução Proposta

O **Elo** é um sistema de registro e consulta de pessoas afetadas por desastres, projetado para funcionar com rapidez e simplicidade.

- **Funcionamento Geral:** A plataforma permite que cidadãos registrem pessoas desaparecidas (com descrição e local onde foram vistas pela última vez) e que voluntários em abrigos registrem pessoas acolhidas.
- **Resolução do Problema:** O sistema atua como um facilitador, cruzando os dados de quem é procurado com os dados de quem deu entrada nos pontos de apoio.
- **Diferencial:** Foco em usabilidade e facilidade (essencial em cenários de crise), interface intuitiva com feedback visual por cores.

## 4 - Estrutura do Sistema

O projeto foi estruturado seguindo as melhores práticas de desenvolvimento para garantir manutenção e segurança:

### **Front-end (React)**

- Interface limpa com formulários de cadastro rápido e um dashboard para voluntários.
- Consumo da API de forma assíncrona para garantir fluidez.

### **Back-end (Node.js + Express)**

- **Arquitetura:** Organizado em camadas (**Controllers, Services e Repositories**) para uma separação clara de responsabilidades.
- **Segurança:** Implementação de autenticação para voluntários utilizando **JWT (JSON Web Tokens)** e proteção de dados sensíveis com **bcrypt**.
- **Funcionalidades:** Endpoints para CRUD de pessoas, gestão de abrigos e lógica de procura aproximada.

### **Banco de Dados (SQLite + Prisma)**

- **SQLite:** Escolhido pela sua portabilidade e rapidez de implementação em protótipos de utilidade pública.
- **Modelagem:** Estruturado com tabelas de `Users` (voluntários), `Persons` (registos de desaparecidos/encontrados) e `Locations` (pontos de acolhimento).

## 💻 Como rodar o projeto localmente

Para rodar este projeto na sua máquina, você precisará do [Node.js](https://nodejs.org/) instalado.

### 1. Configurando o Back-end (API)

Clone o repositorio backend, disponivel em [Elo](https://github.com/matos17igor/Elo).
Navegue até a pasta backend e instale as dependências:

```bash
cd backend
npm install
```

Crie um arquivo chamado .env na raiz da pasta backend e adicione as seguintes variáveis:

```bash
PORT=3000
SEGREDO_DO_JWT=sua_chave_secreta_aqui
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em http://localhost:3000.

### 1. Configurando o Front-end

Clone o repositorio frontend, disponivel em [Elo-frontend](https://github.com/matos17igor/Elo-frontend).
Em um novo terminal, navegue até a pasta do frontend e instale as dependências:

```bash
cd frontend
npm install
```

Inicie a aplicação React:

```bash
npm run dev
```

O site estará acessível no seu navegador, geralmente em http://localhost:5173.

## ☁️ Arquitetura de Deploy

Este projeto está hospedado gratuitamente na nuvem utilizando os seguintes serviços:

Front-end: Hospedado na Vercel.

Back-end: Hospedado no Render.

### ⚠️ Atenção: Comportamento do Banco de Dados (Render Free Tier).
Como este é um projeto acadêmico hospedado no plano gratuito do Render e utiliza o SQLite (um banco de dados baseado em arquivo local database.db), há uma limitação de infraestrutura importante a ser observada:

Amnésia de Servidor (Disco Efêmero): O Render desliga a instância do servidor após 15 minutos sem receber requisições HTTP para economizar recursos.

Reset de Dados: Toda vez que o servidor "acorda" (reinicia), a máquina virtual é recriada do zero. Isso significa que todos os dados salvos no SQLite serão apagados, retornando o banco ao seu estado inicial e vazio.

🔑 Como testar o sistema em Produção (Criando um Usuário)
Devido ao reset de dados explicado acima, ao acessar o sistema na Vercel após um período de inatividade do servidor, as contas de voluntários não existirão mais.

Para testar o painel administrativo, é necessário criar um novo usuário via API antes de fazer o login na interface.

Passo a passo utilizando Postman ou Insomnia:

Faça uma requisição POST para a rota pública de criação de usuários da sua API no Render.

URL: https://elo-ikq9.onrender.com/users

Envie o seguinte JSON no corpo (Body) da requisição:

```bash
{
  "nome": "Voluntário Teste",
  "email": "teste@elo.com",
  "senha": "123"
}
```

Após receber a mensagem de sucesso (201 Created), acesse a URL do Front-end na Vercel e faça o login com as credenciais cadastradas. O sistema criará o Token JWT e liberará o acesso completo ao Dashboard.
