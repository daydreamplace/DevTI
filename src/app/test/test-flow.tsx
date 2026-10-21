'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { axes, isAnswers, questions, STORAGE_KEY } from '@/lib/questions';

const empty = () => Array<number | null>(40).fill(null);
const labels = [
  '전혀 아니다',
  '아니다',
  '조금 아니다',
  '보통이다',
  '조금 그렇다',
  '그렇다',
  '매우 그렇다',
];

export function TestFlow() {
  const [answers, setAnswers] = useState<(number | null)[]>(empty);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [resumed, setResumed] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (isAnswers(saved)) {
        setAnswers(saved);
        const unanswered = saved.findIndex((a) => a === null);
        setIndex(unanswered < 0 ? 39 : unanswered);
        setResumed(saved.some((a) => a !== null));
      }
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      setStorageError(true);
    }
  }, [answers, ready]);

  useEffect(() => {
    if (ready) heading.current?.focus({ preventScroll: true });
  }, [index, ready]);

  const choose = useCallback(
    (value: number) => {
      setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
      setResumed(false);
    },
    [index],
  );
  const next = useCallback(() => {
    if (answers[index] === null) return;
    if (index < 39) {
      setIndex(index + 1);
      return;
    }
    const missing = answers.findIndex((a) => a === null);
    if (missing >= 0) {
      setIndex(missing);
      return;
    }
    if (storageError) {
      // Hash is never sent to a server. Keep a result available when localStorage is blocked.
      router.push(`/result/#${answers.join('')}`);
    } else router.push('/result/');
  }, [answers, index, router, storageError]);

  useEffect(() => {
    if (!ready || confirmReset) return;
    const handler = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA'
      )
        return;
      if (/^[1-7]$/.test(event.key)) {
        event.preventDefault();
        choose(Number(event.key));
      }
      if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        setIndex(index - 1);
      }
      if (event.key === 'Enter' && el.tagName !== 'BUTTON' && el.tagName !== 'A') {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [choose, index, next, ready, confirmReset]);

  function reset() {
    setAnswers(empty());
    setIndex(0);
    setResumed(false);
    setConfirmReset(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStorageError(true);
    }
  }

  if (!ready)
    return (
      <div className="result-loading" role="status">
        나만의 개발 스타일을 만날 준비 중이에요…
      </div>
    );
  const q = questions[index];
  const answered = answers.filter((a) => a !== null).length;
  return (
    <div className="test-shell">
      <div className="test-topline">
        <Link href="/" className="text-link">
          <ArrowLeft size={13} /> 나중에 이어하기
        </Link>
        <span>
          {answered} / 40 답변 완료 · {Math.round((answered / 40) * 100)}%
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="답변 진행률"
        aria-valuemin={0}
        aria-valuemax={40}
        aria-valuenow={answered}
      >
        <span style={{ width: `${(answered / 40) * 100}%` }} />
      </div>
      <div className="test-axis-nav">
        {axes.map((axis, i) => (
          <span key={axis.name} className={i === q.axis ? 'current' : ''}>
            0{i + 1} {axis.name}
          </span>
        ))}
      </div>
      {resumed && (
        <p className="notice" role="status">
          저장된 답변을 불러왔어요. 이어서 답하거나 이전 문항을 수정할 수 있어요.
        </p>
      )}
      {storageError && (
        <p className="notice" role="status">
          이 브라우저에서는 답변을 저장할 수 없어요. 창을 닫지 말고 테스트를 완료해주세요.
        </p>
      )}
      <section className="question-panel" aria-labelledby="question-title">
        <span className="question-axis">{axes[q.axis].english}</span>
        <span className="question-index">QUESTION {String(index + 1).padStart(2, '0')}</span>
        <h1 id="question-title" ref={heading} tabIndex={-1}>
          {q.text}
        </h1>
        <p className="question-hint">평소의 나와 가장 가까운 답을 골라주세요.</p>
        <div className="rating-labels" aria-hidden="true">
          <span>전혀 아니다</span>
          <span>매우 그렇다</span>
        </div>
        <div
          className="rating-group"
          role="group"
          aria-label="답변 선택, 1점 전혀 아니다부터 7점 매우 그렇다까지"
        >
          {labels.map((label, i) => (
            <button
              type="button"
              key={label}
              className={`rating ${answers[index] === i + 1 ? 'selected' : ''}`}
              aria-pressed={answers[index] === i + 1}
              aria-label={`${i + 1}점: ${label}`}
              onClick={() => choose(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
      <div className="test-controls">
        <button
          className="button button-plain"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          <ArrowLeft size={16} /> 이전 문항
        </button>
        <button className="button button-dark" disabled={answers[index] === null} onClick={next}>
          {index === 39 ? '내 결과 확인하기' : '다음 문항'}{' '}
          {index === 39 ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
      <p className="test-key-hint">
        <kbd>1–7</kbd> 숫자로 선택 <span aria-hidden="true"> · </span>
        <kbd>Enter</kbd> 다음 문항 <span aria-hidden="true"> · </span>
        <kbd>←</kbd> 이전 문항
      </p>
      <div className="test-bottom">
        <p>답변은 이 브라우저에만 저장돼요. 정답은 없으니, 편하게 골라주세요.</p>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)}>
            <RotateCcw size={10} /> 저장된 답변 지우기
          </button>
        ) : (
          <div className="reset-confirm">
            <p>저장된 40문항의 답변을 지우고 처음부터 시작할까요?</p>
            <button onClick={reset}>모두 지우고 다시 시작</button>
            <button onClick={() => setConfirmReset(false)}>취소</button>
          </div>
        )}
      </div>
    </div>
  );
}
