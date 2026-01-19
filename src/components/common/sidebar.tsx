import Link from 'next/link';
import prisma from '@/lib/prisma';
import * as LucideIcons from 'lucide-react';

export default async function Sidebar() {
  const allCategories = await prisma.category.findMany({
    include: {
      children: true,
    },
    orderBy: { name: 'asc' },
  });
  
  // Filter parent categories (those without parentId)
  const categories = allCategories.filter(cat => !cat.parentId);

  return (
    <aside className="w-80 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-border overflow-y-auto">
      <nav className="py-2 pr-3">
        <ul className="space-y-1 text-sm">
          {categories.map((category) => {
            const IconComponent = category.icon && (LucideIcons as any)[category.icon];
            return (
              <li key={category.id}>
                <Link 
                  href={`/category/${category.slug}`} 
                  className="block px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-foreground flex items-center gap-2"
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {category.name}
                </Link>
                {category.children.length > 0 && (
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    {category.children.map((child) => (
                      <li key={child.id}>
                        <Link 
                          href={`/category/${child.slug}`} 
                          className="block px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
