'use client';
import { useState } from 'react';
import { devTypes } from '@/lib/types';
import { TypeCard } from '@/components/type-card';
const filters = [
  { label: '전체 유형', code: '' },
  { label: '탐색형 E', code: 'E' },
  { label: '구조형 B', code: 'B' },
];
export function TypeDirectory() {
  const [filter, setFilter] = useState('');
  const types = devTypes.filter((t) => !filter || t.code[0] === filter);
  return (
    <>
      <div className="type-filter" role="group" aria-label="유형 필터">
        {filters.map((f) => (
          <button
            key={f.label}
            className={`filter-button ${filter === f.code ? 'active' : ''}`}
            aria-pressed={filter === f.code}
            onClick={() => setFilter(f.code)}
          >
            {f.label}
          </button>
        ))}
        <span className="type-count" aria-live="polite">
          {types.length}가지 유형
        </span>
      </div>
      <div className="directory-grid">
        {types.map((t) => (
          <TypeCard key={t.code} type={t} />
        ))}
      </div>
    </>
  );
}
