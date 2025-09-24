

## 개요
이 저장소는 Playwright + TypeScript 기반 E2E 테스트를 위한 샘플 프로젝트입니다. POM(Page Object Model) 구조를 권장하며, 로컬 또는 외부 사이트 대상 테스트 모두 지원합니다.

---

## 전제 조건
- Node.js (LTS 권장)
- npm (node와 함께 설치)
- Git
- PowerShell (Windows에서 권장)

---

## 설치 및 초기 설정 (PowerShell)
1. 프로젝트 루트에서 패키지 초기화 및 Playwright 설치:
```powershell
npm init -y
npm install -D @playwright/test typescript ts-node @types/node
npx playwright install
```

2. 사내 프록시/인증서 문제 발생 시 (임시 해결):
```powershell
# 현재 세션에서 SSL 검증 무시 (보안상 권장하지 않음)
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npx playwright install

# npm 전역 설정 (영구, 보안 저하)
npm config set strict-ssl false
```

---

## TypeScript 설정 (필요 시)
프로젝트 루트에 `tsconfig.json` 생성:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "types": ["node", "playwright"]
  },
  "include": [
    "tests/**/*.ts",
    "playwright.config.ts",
    "src/**/*.ts",
    "pages/**/*.ts"
  ]
}
```
주의: `include`에 지정한 경로에 실제 `.ts` 파일이 있어야 경고가 사라집니다.

---

## Playwright 설정 (TypeScript)
`playwright.config.ts` 예시:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: {
    headless: false,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});
```
- 외부 사이트(예: jobkorea) 테스트 시 `webServer`는 제거하세요.

---

## 권장 프로젝트 구조 (POM)
- pages/
  - BasePage.ts
  - HomePage.ts
- tests/
  - example.spec.ts
- playwright.config.ts
- tsconfig.json
- package.json
- .gitignore

예: `pages/BasePage.ts`, `pages/HomePage.ts`에 공통 동작을 두고 테스트에서 인스턴스화하여 사용합니다.

---

## 예제 테스트 (이미 존재)
`tests/example.spec.ts`는 Playwright 규칙(`*.spec.ts` 또는 `*.test.ts`)을 따릅니다.
테스트 목록 확인:
```powershell
npx playwright test --list
```
테스트 실행:
```powershell
npx playwright test
# 특정 파일만
npx playwright test tests/example.spec.ts
```

---

## 유용한 npm 스크립트 (package.json에 추가 권장)
```json
// ...existing code...
"scripts": {
  "test": "playwright test",
  "test:debug": "pwsh -NoExit -Command \"npx playwright test --debug\""
}
```

---

## Git 첫 설정 (한 번만)
PowerShell에서:
```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main

# 확인
git config --list --show-origin
```

변경 커밋 예시:
```powershell
git add -A
git commit -m "chore: add Playwright TS setup and example test"
git switch -c feature/add-playwright
git push -u origin feature/add-playwright
```

---

## 자주 발생하는 문제 및 해결
- "No tests found": 테스트 파일명이 규칙(`.spec.ts`/`.test.ts`)인지, `playwright.config.ts`의 `testDir`가 올바른지 확인.
- "Failed to load tsconfig": `tsconfig.json`이 비어있거나 JSON 형식 오류. 올바른 JSON으로 채움.
- "self-signed certificate in certificate chain": 프록시/사내 인증서 문제. NODE_TLS_REJECT_UNAUTHORIZED 또는 npm strict-ssl 설정(임시) 또는 네트워크 관리자에 문의.
- webServer 관련 오류: config에 `webServer`가 남아 있고 `npm run start` 같은 스크립트가 없으면 실패. 외부 사이트 테스트면 webServer를 제거.

---

## 다음 권장 작업
1. POM 페이지 클래스(`pages/`) 추가 및 테스트 리팩터링.
2. CI용 설정(환경 변수, headless true, 브라우저 설치) 추가.
3. 커스텀 fixtures로 공통 셋업 자동화.

---
