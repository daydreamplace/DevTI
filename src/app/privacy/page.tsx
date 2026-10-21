import Link from 'next/link';
import { pageMetadata, updatedAt } from '@/lib/site';
export const metadata = pageMetadata(
  '개인정보 및 답변 저장 안내',
  'DevTI는 회원가입 없이 이용할 수 있습니다. 답변의 브라우저 로컬 저장, 삭제 방법과 결과 공유 범위를 안내합니다.',
  '/privacy/',
);
export default function PrivacyPage() {
  return (
    <main id="main" className="container reading">
      <div className="page-intro">
        <span className="eyebrow">YOUR ANSWERS STAY WITH YOU</span>
        <h1>답변은, 당신의 브라우저에.</h1>
        <p>필요한 만큼만 저장하고, 저장하는 내용을 분명하게 안내합니다.</p>
      </div>
      <article>
        <h2>테스트 답변</h2>
        <p>
          DevTI는 이름, 이메일, 연락처를 입력받지 않습니다. 40문항의 답변은 이 브라우저의
          localStorage에 ‘devti:answers:v1’이라는 키로 저장합니다. 답변과 개인별 점수는 DevTI 서버로
          전송하지 않으며 이 브라우저에서 계산합니다.
        </p>
        <p>
          로컬 저장소를 사용할 수 없는 경우 테스트를 완료하는 순간 URL의 프래그먼트(#)로 결과 화면에
          답변을 전달하고 즉시 주소에서 지웁니다. 프래그먼트는 HTTP 요청에 포함되지 않습니다. 이
          경우 새로고침하거나 창을 닫으면 결과를 복구하지 못할 수 있습니다.
        </p>
      </article>
      <article>
        <h2>저장 기간과 삭제</h2>
        <p>
          저장된 답변은 사용자가 삭제하거나 브라우저의 사이트 데이터를 지울 때까지 유지됩니다. 공용
          기기를 사용한 뒤에는 <Link href="/test/">테스트 화면</Link> 하단의 ‘저장된 답변 지우기’를
          눌러 삭제해주세요. 브라우저 설정에서 이 사이트의 저장 데이터를 삭제할 수도 있습니다.
        </p>
      </article>
      <article>
        <h2>결과 공유와 저장</h2>
        <p>
          공유 버튼은 결과 유형의 공개 해설 주소만 전달합니다. 개인 답변이나 축별 점수는 공유 링크에
          포함하지 않습니다. PDF 저장은 브라우저의 인쇄 기능을 사용하며, 저장한 파일에는 화면에
          표시된 개인 결과가 포함될 수 있습니다.
        </p>
      </article>
      <article>
        <h2>웹사이트 접속과 외부 서비스</h2>
        <p>
          DevTI 앱에는 광고, 분석 도구, 마케팅 쿠키를 넣지 않았습니다. 웹사이트를 제공하는 호스팅
          서비스는 운영과 보안을 위해 IP 주소, 접속 시간 같은 기본 요청 정보를 처리할 수 있습니다.
          GitHub 등 외부 링크를 열면 해당 서비스의 개인정보 정책이 적용됩니다.
        </p>
      </article>
      <time dateTime={updatedAt}>업데이트 {updatedAt}</time>
    </main>
  );
}
