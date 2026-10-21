'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Share2, Download, RotateCcw } from 'lucide-react';
import { axes, calculateResult, isAnswers, STORAGE_KEY, TestResult } from '@/lib/questions';
import { getType } from '@/lib/types';
import { AxisSignature } from '@/components/axis-signature';

export function ResultView() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => {
    try {
      const fragment = location.hash.slice(1);
      let saved: unknown;
      if (/^[1-7]{40}$/.test(fragment)) {
        saved = fragment.split('').map(Number);
        history.replaceState(null, '', location.pathname);
      } else saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (isAnswers(saved) && saved.every((a) => a !== null))
        setResult(calculateResult(saved as number[]));
    } catch {
      /* Incomplete or invalid saved answers show the start link below. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  if (!ready)
    return (
      <p className="result-loading" role="status">
        당신만의 개발 스타일을 정리하고 있어요…
      </p>
    );
  if (!result)
    return (
      <div className="not-found">
        <span className="eyebrow">YOUR STORY STARTS HERE</span>
        <h1>아직 완성된 결과가 없어요.</h1>
        <p>40개 질문에 답하면 나의 개발 스타일을 만나볼 수 있어요.</p>
        <Link href="/test/" className="button button-coral">
          테스트 시작 / 이어하기 <ArrowRight size={16} />
        </Link>
      </div>
    );
  const type = getType(result.code)!;
  async function share() {
    const url = `${location.origin}/types/${type.code.toLowerCase()}/`;
    const data = {
      title: `나의 DevTI는 ${type.code}, ${type.name}`,
      text: `${type.tagline} 나의 개발 스타일을 만나보세요.`,
      url,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(url);
        setToast('유형 링크를 복사했어요. 개인 답변과 점수는 공유되지 않아요.');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setToast(`공유 링크: ${url}`);
    }
  }
  return (
    <>
      <div className="result-intro">
        <span className="eyebrow">YOUR WORK STYLE</span>
        <h1>네 가지 성향으로 읽는 나의 개발 스타일.</h1>
      </div>
      <section className="result-type">
        <div>
          <span className="eyebrow">네 가지 성향의 조합</span>
          <h2>{type.name}</h2>
          <p>{type.tagline}</p>
        </div>
        <AxisSignature code={type.code} ties={result.ties} />
      </section>
      <section className="score-panel">
        <h2>나의 네 가지 성향</h2>
        {axes.map((axis, i) => (
          <div className="score-row" key={axis.name}>
            <div className="score-label">
              <span className={result.scores[i] > 50 ? 'strong' : ''}>
                {axis.left} {result.scores[i]}%
              </span>
              <span className={result.scores[i] < 50 ? 'strong' : ''}>
                {100 - result.scores[i]}% {axis.right}
              </span>
            </div>
            <div className="score-bar">
              <span style={{ width: `${result.scores[i]}%` }} />
            </div>
            <p className="score-caption">
              {axis.name}
              {result.ties[i]
                ? ' · 두 성향이 같은 점수예요. 유형 코드는 왼쪽 성향을 기준으로 표시해요.'
                : ''}
            </p>
          </div>
        ))}
      </section>
      <div className="detail-grid">
        <section className="detail-panel">
          <h2>내가 자연스럽게 잘하는 것</h2>
          <ul>
            {type.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section className="detail-panel">
          <h2>다음 성장의 작은 힌트</h2>
          <p>{type.growth}</p>
        </section>
      </div>
      <section className="detail-panel">
        <h2>다음 프로젝트로 해본다면?</h2>
        <p>{type.project}</p>
      </section>
      <div className="result-actions">
        <button onClick={share} className="button button-dark">
          <Share2 size={15} /> 결과 유형 공유
        </button>
        <button onClick={() => window.print()} className="button button-outline">
          <Download size={15} /> 인쇄 / PDF 저장
        </button>
        <Link href="/test/" className="button button-outline">
          <RotateCcw size={15} /> 답변 수정
        </Link>
      </div>
      <p className="result-limit">
        이 비율은 문항 응답을 환산한 선호 점수이며 능력·적성의 확률이나 다른 사람과 비교한 백분위가
        아닙니다. DevTI는 자기이해를 돕는 콘텐츠로, 심리검사나 직업 적합성 평가가 아닙니다.
      </p>
      <div className="result-actions">
        <Link className="text-link" href={`/types/${type.code.toLowerCase()}/`}>
          {type.code} 해설 자세히 보기 <ArrowRight size={15} />
        </Link>
        <Link className="text-link" href="/methodology/">
          점수는 어떻게 계산되나요? <ArrowRight size={15} />
        </Link>
      </div>
      {toast && (
        <p className="toast" role="status">
          {toast}
        </p>
      )}
    </>
  );
}
