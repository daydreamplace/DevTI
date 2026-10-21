# 검색과 AI 검색 대응

## 구현된 항목

- 홈, 유형 목록, 16유형 상세, 소개, 방법론, 개인정보 안내를 사전 렌더링한 정적 HTML로 제공
- 고유 title/description, canonical, 한국어 문서 언어, 실제 기준 URL
- Open Graph와 Twitter large image, 1200×630 공유 이미지
- WebSite, WebApplication, Article, BreadcrumbList JSON-LD를 가시 본문에 맞게 제공
- 과장된 평점, 후기, 참여자 수, 적성·성과에 관한 근거 없는 주장 없음
- 사이트맵에는 공개 설명 페이지 21개만 포함. 테스트와 개인 결과는 noindex
- 일반 검색 크롤러와 OAI-SearchBot을 robots.txt에서 허용
- 짧은 정의, 40문항 원문, 계산 공식, 역채점, 동점 처리, 측정 한계를 HTML 본문에 공개
- 유형 상세와 관련 유형, 소개·가이드·테스트를 실제 링크로 연결
- 모바일 레이아웃, 의미 있는 제목 구조, 키보드 조작, reduced-motion, 로컬 글꼴
- llms.txt는 문서 탐색을 위한 보조 파일로 제공. 특별한 GEO 규격이나 순위 보장으로 취급하지 않음

## 운영 도메인 확정 후

1. `.env.local` 또는 빌드 환경에 `NEXT_PUBLIC_SITE_URL=https://운영도메인` 설정 후 다시 빌드.
2. 로그인/접근 제한 없는 공개 HTTPS URL로 운영. 현재 Sites의 초기 배포는 소유자 전용이므로 이 상태에서는 외부 크롤러가 본문을 색인할 수 없음.
3. 기존 Replit 운영 URL과 도메인 관리 권한을 확인한 뒤 기존 공개 경로를 해당 신규 경로로 301 리디렉션. 기존 검색 자산을 버리지 않도록 실제 URL 목록부터 조사.
4. Google Search Console, 네이버 서치어드바이저 소유권 확인과 sitemap.xml 제출. 확인 코드는 계정에서 발급한 값만 사용.
5. canonical과 사이트맵이 최종 도메인 한 곳을 가리키는지 확인. URL 검사에서 HTML 본문, 응답 코드, robots, 렌더링을 점검.
6. 실제 호스팅에서 존재하지 않는 경로가 404를 반환하는지 확인. SPA fallback으로 200을 반환하면 수정.
7. PageSpeed Insights의 실제 배포 측정과 Search Console의 현장 Core Web Vitals로 성능을 추적.
8. 검색 노출·클릭, 유형별 유입, AI 인용을 관찰하고 내용 변경 시 실제 업데이트 날짜 갱신. 측정 도구를 추가하면 개인정보 안내도 수정.

GEO의 핵심은 접근 가능한 근거와 독창적인 유용한 설명입니다. 특정 AI 답변에 인용되거나 검색 상위에 노출된다는 보장은 하지 않습니다. FAQ 내용은 방문자에게 유용한 본문으로 제공하고 검색 리치 결과를 약속하지 않습니다.

## 공식 참고 자료

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google: Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [OpenAI: Crawler overview](https://developers.openai.com/api/docs/bots)

작성 기준: 2026-10-21. 위 운영 작업 중 계정 소유권 확인, 도메인 이동, 공개 접근 변경은 별도 운영 설정이며 로컬 코드만으로 완료되지 않습니다.
