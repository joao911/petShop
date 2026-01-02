# 🌐 Pet Shop — João Paulo Duarte

Aplicação web para **agendamento de serviços em pet shop**, permitindo que tutores reservem horários para seus pets de forma simples, rápida e intuitiva.

O projeto também serve como **estudo prático do Next.js**, explorando e comparando **App Router** e **Page Router**, além de boas práticas modernas de frontend e backend.

---

## 🚀 Tecnologias Utilizadas

* **Next.js** — Framework React completo para aplicações web modernas, com SSR, SSG e App Router.
* **TypeScript** — Tipagem estática para maior segurança, legibilidade e produtividade.
* **Prisma** — ORM moderno para comunicação com o banco de dados de forma tipada e segura.
* **shadcn/ui** — Componentes acessíveis e customizáveis, baseados em Radix UI + Tailwind CSS.
* **Tailwind CSS** — Framework CSS utilitário para estilização rápida e consistente.
* **Lucide Icons** — Biblioteca de ícones moderna e leve.
* **React Hooks** — Criação de lógica reutilizável através de hooks personalizados.
* **App Router & Page Router** — Estudo e comparação entre os dois modelos de roteamento do Next.js.

---

## 🛠️ Badges

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)
![React](https://img.shields.io/badge/React-149ECA?logo=react\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss\&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma)

---

## 📦 Instalação

Clone o repositório:

```bash
git clone git@github.com:joao911/petShop.git
```

Acesse a pasta do projeto:

```bash
cd site-blog
```

### ▶️ Com `pnpm` (recomendado)

```bash
pnpm install
pnpm dev
```

### ▶️ Com `yarn`

```bash
yarn install
yarn dev
```

### ▶️ Com `npm`

```bash
npm install
npm run dev
```

O projeto estará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e cole a variável de ambiente abaixo:

```env
# URL de conexão com o banco de dados
DATABASE_URL="postgresql://docker:docker@localhost:5432/petshop?schema=public"


# URL base da aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 📌 Observações

* `DATABASE_URL` é utilizada pelo **Prisma**
* Variáveis com prefixo `NEXT_PUBLIC_` ficam disponíveis no client-side
* Após alterar variáveis de ambiente, reinicie o servidor

---

## 🧩 Estrutura do Projeto

```text
├── app/          # Rotas utilizando o App Router (Next.js 13+)
├── pages/        # Rotas utilizando o Page Router (legado)
├── actions/      # Server Actions e chamadas ao backend usando Prisma
├── components/   # Componentes reutilizáveis (shadcn/ui)
├── hooks/        # Hooks personalizados
├── styles/       # Estilos globais
├── prisma/       # Schema e configuração do Prisma
├── public/       # Arquivos estáticos
└── README.md
```

---

## 🎨 Design (Figma)

Protótipo do projeto disponível no Figma:

🔗 [https://www.figma.com/design/UOwEv6UJ91Jk6qytC1afY9/Agendamento-de-petshop--Community-?node-id=0-1](https://www.figma.com/design/UOwEv6UJ91Jk6qytC1afY9/Agendamento-de-petshop--Community-?node-id=0-1)

---

## 📌 Funcionalidades Principais

* 📅 Agendamento de serviços por data
* 🐶 Cadastro de informações do pet e tutor
* 🕒 Navegação entre dias
* 🔗 Sincronização de data via URL
* 💅 Interface moderna e responsiva
* ⚡ Server Actions com Next.js

---

## 🗄️ Banco de Dados (Prisma)

Após configurar o `DATABASE_URL`, execute:

```bash
npx prisma generate
npx prisma migrate dev
```

---

## 🚀 Deploy

O projeto pode ser facilmente hospedado na **Vercel**:

1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Realize o deploy

---

## 👨‍💻 Autor

**João Paulo Duarte**
Desenvolvedor Frontend | React | Next.js | TypeScript

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, estudar e contribuir.
