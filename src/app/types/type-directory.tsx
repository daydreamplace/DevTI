'use client';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { devTypes } from '@/lib/types';
import { axes } from '@/lib/questions';
import { TypeCard } from '@/components/type-card';

// Pair complementary combinations so the list does not group by its first letter.
const displayTypes = devTypes
  .slice(0, 8)
  .flatMap((type) => [
    type,
    devTypes.find((other) => [...other.code].every((letter, i) => letter !== type.code[i]))!,
  ]);

export function TypeDirectory() {
  const [filters, setFilters] = useState<string[]>(['', '', '', '']);
  const types = displayTypes.filter((type) =>
    filters.every((filter, i) => !filter || type.code[i] === filter),
  );
  return (
    <>
      <div className="directory-filters">
        <div className="filter-heading">
          <p>관심 있는 성향을 조합해보세요.</p>
          <button
            className="reset-filters"
            disabled={filters.every((f) => !f)}
            onClick={() => setFilters(['', '', '', ''])}
          >
            <RotateCcw size={12} /> 초기화
          </button>
        </div>
        <div className="filter-axes">
          {axes.map((axis, i) => (
            <fieldset key={axis.name}>
              <legend>{axis.name}</legend>
              <div>
                {axis.codes.map((code, j) => (
                  <button
                    key={code}
                    className={`filter-button ${filters[i] === code ? 'active' : ''}`}
                    aria-pressed={filters[i] === code}
                    onClick={() =>
                      setFilters((prev) =>
                        prev.map((filter, index) =>
                          index === i ? (filter === code ? '' : code) : filter,
                        ),
                      )
                    }
                  >
                    {j === 0 ? axis.left : axis.right} <span>{code}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <p className="filter-note">
          네 가지 축은 동등한 기준입니다. 선택한 조건을 모두 만족하는 조합을 보여드려요.
        </p>
      </div>
      <div className="directory-result-heading">
        <span>개발 스타일</span>
        <span className="type-count" role="status">
          {types.length}가지 조합
        </span>
      </div>
      <div className="directory-grid">
        {types.map((type) => (
          <TypeCard key={type.code} type={type} />
        ))}
      </div>
    </>
  );
}
