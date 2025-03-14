This is a [Next.js](https://nextjs.org) project using mongodb wrapped into docker container.

## Getting Started

First, run the development server:

```bash
docker-compose up --build
# or
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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
