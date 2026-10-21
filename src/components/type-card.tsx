import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DevType } from '@/lib/types';
import { axes } from '@/lib/questions';

export function TypeCard({ type }: { type: DevType }) {
  return (
    <Link className="type-card" href={`/types/${type.code.toLowerCase()}/`}>
      <div className="type-card-top">
        <span className="type-letters" aria-label={type.code}>
          {[...type.code].map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </span>
        <ArrowUpRight size={17} />
      </div>
      <div className="type-card-copy">
        <h3>{type.name}</h3>
        <p>{type.tagline}</p>
      </div>
      <div className="card-axis-labels">
        {axes.map((axis, i) => (
          <span key={axis.name}>{type.code[i] === axis.codes[0] ? axis.left : axis.right}</span>
        ))}
      </div>
    </Link>
  );
}
