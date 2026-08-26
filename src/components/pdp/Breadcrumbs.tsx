import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  productName: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  productName,
}) => {
  return (
    <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-2 text-xs font-semibold text-[#8C7568] flex items-center gap-1.5">
      <a href="/" className="hover:text-[#381E15] transition-colors">
        Home
      </a>
      <ChevronRight className="w-3.5 h-3.5 text-[#B8A296]" />
      <span className="hover:text-[#381E15] cursor-pointer transition-colors">
        {category}
      </span>
      <ChevronRight className="w-3.5 h-3.5 text-[#B8A296]" />
      <span className="text-[#381E15] font-bold">{productName}</span>
    </nav>
  );
};
