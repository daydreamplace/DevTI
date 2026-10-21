import assert from 'node:assert/strict';
import { test } from 'node:test';
import { axes, calculateResult, isAnswers, questions } from '../src/lib/questions';
import { devTypes, getType } from '../src/lib/types';

test('40 stable question identifiers, ten per axis', () => {
  assert.equal(questions.length, 40);
  assert.equal(new Set(questions.map((q) => q.id)).size, 40);
  axes.forEach((_, i) => assert.equal(questions.filter((q) => q.axis === i).length, 10));
});

test('all 16 combinations are reachable through correctly oriented answers', () => {
  assert.equal(devTypes.length, 16);
  assert.equal(new Set(devTypes.map((t) => t.code)).size, 16);
  for (const type of devTypes) {
    const answers = questions.map((q) => {
      const wantLeft = type.code[q.axis] === axes[q.axis].codes[0];
      return (q.direction === 1) === wantLeft ? 7 : 1;
    });
    const result = calculateResult(answers);
    assert.equal(result.code, type.code);
    assert.deepEqual(
      result.scores,
      [...type.code].map((c, i) => (c === axes[i].codes[0] ? 100 : 0)),
    );
    assert.deepEqual(result.ties, [false, false, false, false]);
  }
});

test('neutral responses produce transparent balanced scores', () => {
  assert.deepEqual(calculateResult(Array(40).fill(4)), {
    code: 'EACD',
    scores: [50, 50, 50, 50],
    ties: [true, true, true, true],
  });
});

test('reverse worded responses move the score in the intended direction', () => {
  const answers = Array<number>(40).fill(4);
  answers[0] = 7; // structure, not exploration
  assert.equal(calculateResult(answers).code[0], 'B');
  assert.equal(calculateResult(answers).scores[0], 45);
  answers[0] = 4;
  answers[1] = 7;
  assert.equal(calculateResult(answers).code[0], 'E');
  assert.equal(calculateResult(answers).scores[0], 55);
});

test('invalid, incomplete and out of range answers cannot generate a result', () => {
  for (const answers of [
    [],
    Array(39).fill(4),
    Array(41).fill(4),
    Array(40).fill(0),
    Array(40).fill(8),
    Array(40).fill(2.5),
    Array(40).fill(NaN),
  ]) {
    assert.throws(() => calculateResult(answers));
  }
});

test('saved answer validation accepts only the versioned schema', () => {
  assert.ok(isAnswers(Array(40).fill(null)));
  assert.ok(isAnswers(Array(40).fill(7)));
  assert.equal(isAnswers(Array(40).fill('7')), false);
  assert.equal(isAnswers({ length: 40 }), false);
  assert.equal(isAnswers(Array(40).fill(8)), false);
  assert.equal(isAnswers(Array(39).fill(null)), false);
});

test('reversing all answers mirrors each axis score', () => {
  const answers = questions.map((q) => (q.id % 7) + 1);
  const first = calculateResult(answers);
  const mirrored = calculateResult(answers.map((a) => 8 - a));
  first.scores.forEach((score, i) => assert.equal(score + mirrored.scores[i], 100));
});

test('type lookups tolerate lowercase but reject unknown codes', () => {
  assert.equal(getType('eacd')?.code, 'EACD');
  assert.equal(getType('invalid'), undefined);
});
