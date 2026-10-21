'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { axes } from '@/lib/questions';
import { getType } from '@/lib/types';
import { AxisSignature } from '@/components/axis-signature';

export function StyleExplorer() {
  const [scores, setScores] = useState([68, 35, 60, 30]);
  const code = axes.map((axis, i) => axis.codes[scores[i] >= 50 ? 0 : 1]).join('');
  const type = getType(code)!;

  return (
    <section className="style-explorer" aria-label="네 가지 성향 조합 미리보기">
      <div className="explorer-top">
        <span>
          <SlidersHorizontal size={15} /> 성향 조합 미리보기
        </span>
        <span className="demo-label">INTERACTIVE</span>
      </div>
      <AxisSignature code={code} />
      <div className="explorer-sliders">
        {axes.map((axis, i) => (
          <div className="explorer-axis" key={axis.name}>
            <div className="explorer-axis-label">
              <label htmlFor={`explore-axis-${i}`}>
                {axis.left} <span>{axis.codes[0]}</span>
              </label>
              <span>
                {axis.right} <span>{axis.codes[1]}</span>
              </span>
            </div>
            <input
              id={`explore-axis-${i}`}
              type="range"
              min="0"
              max="100"
              value={100 - scores[i]}
              aria-label={`${axis.name}: ${axis.left}에서 ${axis.right}까지`}
              onChange={(e) =>
                setScores((prev) =>
                  prev.map((score, index) => (index === i ? 100 - Number(e.target.value) : score)),
                )
              }
            />
          </div>
        ))}
      </div>
      <div className="explorer-result">
        <div>
          <span>지금 조합은</span>
          <strong>{type.name}</strong>
        </div>
        <Link href={`/types/${code.toLowerCase()}/`} aria-label={`${code} ${type.name} 해설 보기`}>
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <p className="explorer-note">
        슬라이더를 움직여 조합을 살펴보세요. 실제 검사 결과가 아닌 예시입니다.
      </p>
    </section>
  );
}
