export const axes = [
  {
    name: '문제 접근 방식',
    left: '탐색형',
    right: '구조형',
    codes: ['E', 'B'],
    english: 'EXPLORE / BUILD',
    description: '새로운 가능성을 탐색하나요, 탄탄한 구조부터 설계하나요?',
    color: 'mint',
  },
  {
    name: '문제 해결 방식',
    left: '실행형',
    right: '통찰형',
    codes: ['A', 'I'],
    english: 'ACTION / INSIGHT',
    description: '먼저 실행하며 배우나요, 충분히 이해한 뒤 움직이나요?',
    color: 'peach',
  },
  {
    name: '함께 일하는 방식',
    left: '협업형',
    right: '독립형',
    codes: ['C', 'S'],
    english: 'COLLABORATE / SELF-DIRECT',
    description: '함께 생각을 나누나요, 혼자 깊이 몰입하나요?',
    color: 'lavender',
  },
  {
    name: '완성에 다가가는 방식',
    left: '디테일형',
    right: '혁신형',
    codes: ['D', 'V'],
    english: 'DETAIL / VISION',
    description: '작은 완성도를 쌓아가나요, 새로운 방향을 그려내나요?',
    color: 'blue',
  },
] as const;

const groups = [
  [
    '일을 시작하기 전, 명확한 계획과 절차를 세우는 편이다.',
    '새로운 아이디어나 방법을 시도하면서 배우는 것이 즐겁다.',
    '예상치 못한 변화가 생기면 유연하게 계획을 조정할 수 있다.',
    '업무의 전체적인 구조를 먼저 설계하고 진행하는 편이다.',
    '복잡한 문제일수록 다양한 시도와 접근법을 탐색하고 싶다.',
    '규칙과 프로세스가 명확하게 정해져 있는 환경이 일하기 편하다.',
    '새로운 기술이나 도구를 접하면 직접 실험해보는 편이다.',
    '계획을 세우는 것보다 즉흥적으로 해결책을 찾는 것이 더 잘 맞는다.',
    '절차가 정돈되어 있어야 집중이 잘 된다.',
    '창의적인 발상으로 기존 방식을 개선하는 데 흥미를 느낀다.',
  ],
  [
    '문제가 생기면 먼저 행동으로 옮겨 해결을 시도한다.',
    '일을 시작하기 전 충분히 분석하고 계획을 세우는 편이다.',
    '실행하면서 배우는 과정이 가장 효율적이라고 느낀다.',
    '결정을 내리기 전에 가능한 많은 정보를 수집한다.',
    '구체적인 결과를 빠르게 내는 것이 나에게 동기부여가 된다.',
    '새로운 프로젝트에서는 전체 그림을 먼저 구상해본다.',
    '완벽한 계획보다 빠른 시도가 더 중요하다고 생각한다.',
    '문제의 근본 원인을 깊이 이해하려 노력한다.',
    '결과보다 과정 속 통찰을 얻는 것을 중시한다.',
    '생각이 정리되지 않아도 우선 시작해보는 편이다.',
  ],
  [
    '팀 회의나 아이디어 브레인스토밍을 즐긴다.',
    '혼자서 집중할 수 있는 환경에서 가장 효율적으로 일한다.',
    '동료와의 피드백 교환이 업무 품질을 높인다고 생각한다.',
    '스스로 목표를 정하고 자율적으로 일하는 편이다.',
    '협력해서 문제를 해결할 때 성취감을 느낀다.',
    '중요한 결정을 내릴 때 내 판단을 가장 신뢰한다.',
    '팀원 간 소통이 활발한 환경이 나에게 잘 맞는다.',
    '혼자 진행하는 업무를 선호한다.',
    '팀의 목표를 함께 이루는 것이 나에게 의미 있다.',
    '다른 사람의 의견보다 내 직관에 따라 일하는 경우가 많다.',
  ],
  [
    '프로젝트의 세부사항을 꼼꼼히 검토하는 편이다.',
    '새로운 아이디어를 구상하고 시도하는 것이 흥미롭다.',
    '완성도 높은 결과물을 위해 작은 실수도 바로잡으려 한다.',
    '큰 그림 속에서 방향을 먼저 잡고 세부는 나중에 정리한다.',
    '일의 정확성과 일관성을 항상 유지하려 노력한다.',
    '새로운 접근법이나 창의적인 해결책을 자주 떠올린다.',
    '문서화, 체크리스트 등을 통해 체계적으로 관리하는 편이다.',
    '새로운 가능성을 발견하거나 혁신을 시도하는 일에 끌린다.',
    '세세한 부분보다 아이디어의 흐름과 비전을 중시한다.',
    '완성도를 위해 반복 점검하고 개선하는 과정이 익숙하다.',
  ],
];

export const directions = [
  [-1, 1, 1, -1, 1, -1, 1, 1, -1, 1],
  [1, -1, 1, -1, 1, -1, 1, -1, -1, 1],
  [1, -1, 1, -1, 1, -1, 1, -1, 1, -1],
  [1, -1, 1, -1, 1, -1, 1, -1, -1, 1],
] as const;

export const questions = groups.flatMap((group, axis) =>
  group.map((text, i) => ({
    id: axis * 10 + i + 1,
    axis,
    text,
    direction: directions[axis][i],
  })),
);

export type TestResult = { code: string; scores: number[]; ties: boolean[] };

export function calculateResult(answers: readonly number[]): TestResult {
  if (answers.length !== 40 || answers.some((a) => !Number.isInteger(a) || a < 1 || a > 7)) {
    throw new Error('40개 문항에 1~7 사이의 정수로 답해주세요.');
  }
  const totals = axes.map((_, axis) =>
    questions
      .filter((q) => q.axis === axis)
      .reduce((sum, q) => sum + q.direction * (answers[q.id - 1] - 4), 0),
  );
  return {
    code: totals.map((sum, axis) => axes[axis].codes[sum >= 0 ? 0 : 1]).join(''),
    scores: totals.map((sum) => Math.round(((sum + 30) / 60) * 100)),
    ties: totals.map((sum) => sum === 0),
  };
}

export function isAnswers(value: unknown): value is (number | null)[] {
  return (
    Array.isArray(value) &&
    value.length === 40 &&
    value.every((a) => a === null || (Number.isInteger(a) && a >= 1 && a <= 7))
  );
}

export const STORAGE_KEY = 'devti:answers:v1';
