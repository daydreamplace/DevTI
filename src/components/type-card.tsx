import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Illustration } from './illustration';
import { DevType } from '@/lib/types';
export function TypeCard({ type }: { type: DevType }) {
  return (
    <Link className={`type-card ${type.color}`} href={`/types/${type.code.toLowerCase()}/`}>
      <div className="type-card-top">
        <span>{type.code}</span>
        <ArrowUpRight size={18} />
      </div>
      <Illustration kind={type.art} />
      <div className="type-card-copy">
        <span className="eyebrow">{type.english}</span>
        <h3>{type.name}</h3>
        <p>{type.tagline}</p>
      </div>
    </Link>
  );
}
