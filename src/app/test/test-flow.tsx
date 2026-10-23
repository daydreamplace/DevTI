'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, RotateCcw } from 'lucide-react';
import { axes, isAnswers, questions, STORAGE_KEY } from '@/lib/questions';

const empty = () => Array<number | null>(40).fill(null);
const axisSteps = ['접근 방식', '해결 방식', '협업 방식', '완성 지향'];
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
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [advancing, setAdvancing] = useState(false);
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
    if (!ready) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  }, [index, ready]);

  const cancelAdvance = useCallback(() => {
    if (advanceTimer.current !== null) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setAdvancing(false);
  }, []);

  useEffect(
    () => () => {
      if (advanceTimer.current !== null) clearTimeout(advanceTimer.current);
    },
    [],
  );

  const advance = useCallback(
    (currentIndex: number, currentAnswers: (number | null)[]) => {
      if (currentAnswers[currentIndex] === null) return;
      if (currentIndex < questions.length - 1) {
        setIndex(currentIndex + 1);
        return;
      }
      const missing = currentAnswers.findIndex((answer) => answer === null);
      if (missing >= 0) {
        setIndex(missing);
        return;
      }
      // Persist this exact answer set before navigating, including the final answer.
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentAnswers));
        router.push('/result/');
      } catch {
        setStorageError(true);
        // Fragments stay in the browser and are cleared by the result screen.
        router.push(`/result/#${currentAnswers.join('')}`);
      }
    },
    [router],
  );

  const choose = useCallback(
    (value: number) => {
      cancelAdvance();
      const updated = answers.map((answer, i) => (i === index ? value : answer));
      setAnswers(updated);
      setResumed(false);
      setAdvancing(true);
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        setAdvancing(false);
        advance(index, updated);
      }, 300);
    },
    [answers, index, advance, cancelAdvance],
  );

  const next = useCallback(() => {
    cancelAdvance();
    advance(index, answers);
  }, [answers, index, advance, cancelAdvance]);

  const previous = useCallback(() => {
    cancelAdvance();
    setIndex((current) => Math.max(0, current - 1));
  }, [cancelAdvance]);

  useEffect(() => {
    if (!ready || confirmReset) return;
    const handler = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (el.tagName === 'INPUT' && (el as HTMLInputElement).type !== 'radio') ||
        el.tagName === 'TEXTAREA'
      )
        return;
      if (event.repeat && (/^[1-7]$/.test(event.key) || event.key === 'Enter')) return;
      if (/^[1-7]$/.test(event.key)) {
        event.preventDefault();
        choose(Number(event.key));
      }
      if (event.key === 'ArrowLeft' && index > 0 && !el.closest('.rating-group')) {
        event.preventDefault();
        previous();
      }
      if (event.key === 'Enter' && el.tagName !== 'BUTTON' && el.tagName !== 'A') {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [choose, index, next, previous, ready, confirmReset]);

  function reset() {
    cancelAdvance();
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
        <Link href="/" className="text-link" onClick={cancelAdvance}>
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
      <ol className="test-axis-steps" aria-label="네 가지 성향의 응답 진행 단계">
        {axes.map((axis, i) => {
          const complete = answers.slice(i * 10, (i + 1) * 10).every((a) => a !== null);
          return (
            <li
              key={axis.name}
              className={i === q.axis ? 'current' : ''}
              aria-current={i === q.axis ? 'step' : undefined}
            >
              <span className="step-indicator" aria-hidden="true">
                {complete ? <Check size={11} /> : i + 1}
              </span>
              <span>{axisSteps[i]}</span>
            </li>
          );
        })}
      </ol>
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
      <div className="question-card">
        <section className="question-panel" aria-labelledby="question-title">
          <div className="question-meta">
            <span className="question-axis">{axes[q.axis].name}</span>
            <span className="question-index">
              {String(index + 1).padStart(2, '0')} <span>/ 40</span>
            </span>
          </div>
          <h1 id="question-title" ref={heading} tabIndex={-1}>
            {q.text}
          </h1>
          <p className="question-hint">답변을 선택하면 자동으로 다음 문항으로 넘어가요.</p>
          <div className="rating-labels" aria-hidden="true">
            <span>전혀 아니다</span>
            <span>매우 그렇다</span>
          </div>
          <div
            className="rating-group"
            role="radiogroup"
            aria-label="문항 답변, 1점 전혀 아니다부터 7점 매우 그렇다까지"
          >
            {labels.map((label, i) => (
              <label key={label} className={`rating ${answers[index] === i + 1 ? 'selected' : ''}`}>
                <input
                  className="sr-only"
                  type="radio"
                  name={`question-${q.id}`}
                  value={i + 1}
                  checked={answers[index] === i + 1}
                  aria-label={`${i + 1}점: ${label}`}
                  onChange={() => choose(i + 1)}
                  onClick={() => {
                    // Selecting the saved value again should also advance.
                    if (answers[index] === i + 1) choose(i + 1);
                  }}
                />
                <span aria-hidden="true">{i + 1}</span>
              </label>
            ))}
          </div>
          <p
            className={`selection-feedback ${answers[index] !== null ? 'has-selection' : ''}`}
            role="status"
          >
            {answers[index] === null ? (
              '이전 문항으로 돌아가 답변을 수정할 수 있어요.'
            ) : (
              <>
                <Check size={13} />
                {answers[index]}점 · {labels[answers[index]! - 1]}
                {advancing &&
                  (index === questions.length - 1
                    ? ' · 결과를 확인할게요.'
                    : ' · 다음 문항으로 이동해요.')}
              </>
            )}
          </p>
        </section>
        <div className="test-controls">
          <button className="button button-outline" disabled={index === 0} onClick={previous}>
            <ArrowLeft size={16} /> 이전
          </button>
        </div>
      </div>
      <p className="test-key-hint">
        <kbd>1–7</kbd> 선택 후 자동 이동 <span aria-hidden="true"> · </span>
        <kbd>Enter</kbd> 다음 문항
      </p>
      <div className="test-bottom">
        <p>
          {storageError
            ? '지금은 답변을 저장할 수 없어요. 창을 닫기 전에 테스트를 완료해주세요.'
            : '답변은 이 브라우저에만 저장돼요. 정답은 없으니, 편하게 골라주세요.'}
        </p>
        {!confirmReset ? (
          <button
            onClick={() => {
              cancelAdvance();
              setConfirmReset(true);
            }}
          >
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
