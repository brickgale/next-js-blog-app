This is a [Next.js](https://nextjs.org) project using mongodb wrapped into docker container.

## Getting Started

First, run the development server:

> If First time running
```bash
docker-compose up --build
```

> Else
```bash
docker-compose up -d
```

Run this command to access shell:
```bash
docker exec -it next-js-blog-app sh
```

To run Prisma Studio:

```bash
docker exec -it next-js-blog-app npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
