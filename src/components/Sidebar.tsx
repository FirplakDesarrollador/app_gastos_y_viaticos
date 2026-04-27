'use client'

import { signOut } from '@/app/auth/actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Viajes', href: '/viajes', icon: '✈️' },
    { name: 'Refrigerios', href: '/refrigerios', icon: '🥪' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="title-gradient">Firplak</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`nav-link ${pathname === item.href ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <form action={signOut}>
          <button type="submit" className="btn-logout">
            <span>🚪</span>
            Cerrar Sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
