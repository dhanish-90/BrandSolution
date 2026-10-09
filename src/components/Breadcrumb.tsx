import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 py-3" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-slate-900 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1.5 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-slate-900 truncate" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-slate-900 transition-colors truncate"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
