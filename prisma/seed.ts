import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
      password: 'password123', // In production, hash this!
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: 'password123', // In production, hash this!
    },
  });

  // Create posts
  await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      description: 'Learn how to build modern web applications with Next.js',
      content: 'Next.js is a powerful React framework for building modern web applications. It provides features like server-side rendering, static site generation, and API routes out of the box.',
      published: true,
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Introduction to Prisma',
      slug: 'introduction-to-prisma',
      description: 'Discover the power of Prisma ORM for database management',
      content: 'Prisma is a next-generation ORM that makes database access easy with an auto-generated query builder, type safety, and migrations.',
      published: true,
      authorId: user2.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Building Scalable APIs',
      slug: 'building-scalable-apis',
      description: 'Best practices for creating scalable REST APIs',
      content: 'Learn the best practices for building scalable and maintainable REST APIs using modern tools and frameworks.',
      published: true,
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Draft: Upcoming Features',
      slug: 'upcoming-features',
      description: 'A preview of exciting new features coming soon',
      content: 'This is a draft post about upcoming features that we are working on. Stay tuned for more updates!',
      published: false,
      authorId: user2.id,
    },
  });

  console.log('Seeding finished. Created 2 users and 4 posts.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
