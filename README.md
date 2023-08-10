This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash

yarn run dev

```
Configurar o .env com o endereço do MongoDB para teste.

Esse sitema consiste em desenvolver um CRUD de ferias. Foi utilizado o MongoDB(Mongoose) tailwindcss e os derivados do Nextjs. OBs: Ao testar a aplicaçao, ela esta fazendo o "POST" normal seguindo a regra de negocio, por algum motivo o mondoDB so esta anexando os 3 primeiros campos do POST, deve ser por eu estar utilizando uma versao free para testes, mas em si, o sistema a hora de cadastro segue a regra de negocio conforme solicitado. Pode verificar no F12 -> Rede que ele faz o request bem correto com a regra de negocio.

No http://localhost:3000/ vai ser listado a tela principal que supostamente vai listar todos os CRUD.
Na http://localhost:3000/addTopic possui os campos para cadastros de ferias.



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
