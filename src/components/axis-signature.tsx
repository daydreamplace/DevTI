import { axes } from '@/lib/questions';

export function AxisSignature({ code, ties }: { code: string; ties?: boolean[] }) {
  return (
    <dl className="axis-signature">
      {axes.map((axis, i) => (
        <div key={axis.name}>
          <dt>{axis.name}</dt>
          <dd>
            <strong>{ties?.[i] ? '—' : code[i]}</strong>
            <span>{ties?.[i] ? '균형' : code[i] === axis.codes[0] ? axis.left : axis.right}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
