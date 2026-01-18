import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-border overflow-y-auto">
      <nav className="py-2">
        <div className="mb-8">
          <h2 className="text-xs px-3 py-2 font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </h2>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/" 
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/posts" 
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                All Posts
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xs px-3 py-2 font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Categories
          </h2>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/category/tech" 
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Tech
              </Link>
            </li>
            <li>
              <Link 
                href="/category/tutorials" 
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link 
                href="/category/guides" 
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Guides
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
