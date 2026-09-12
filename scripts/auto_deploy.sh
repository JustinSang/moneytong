#!/usr/bin/env bash
# 머니통 자동 커밋 및 배포(Push) 스크립트
# 사용법: ./scripts/auto_deploy.sh "커밋 메시지"
# 이 스크립트는 변경된 모든 코드를 스테이징하고, 커밋한 뒤, GitHub으로 Push합니다.
# GitHub에 Push되면 Cloudflare Pages가 자동으로 빌드 및 배포를 진행합니다.

set -e

# 1. 원격 저장소 설정 확인
if ! git remote -v | grep -q 'origin'; then
  echo "❌ 오류: GitHub 원격 저장소(origin)가 설정되지 않았습니다."
  echo "👉 다음 명령어로 저장소를 먼저 연결해 주세요:"
  echo "git remote add origin https://github.com/유저명/moneytong.git"
  echo "git branch -M main"
  echo "git push -u origin main"
  exit 1
fi

# 2. 커밋 메시지 처리
COMMIT_MSG="$1"
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="Auto deploy: $(date +'%Y-%m-%d %H:%M:%S')"
fi

echo "🚀 배포 파이프라인 시작..."

# 3. 코드 커밋
echo "📦 1. 변경된 파일 스테이징 및 커밋"
git add .
git commit -m "$COMMIT_MSG" || echo "변경된 파일이 없거나 커밋에 실패했습니다 (계속 진행합니다)."

# 4. GitHub으로 Push (Cloudflare 자동 빌드 트리거)
echo "☁️ 2. GitHub으로 코드 전송 (Cloudflare 배포 트리거)"
git push origin main

echo "✅ 완료! Cloudflare Pages에서 자동으로 빌드와 배포가 시작됩니다."
