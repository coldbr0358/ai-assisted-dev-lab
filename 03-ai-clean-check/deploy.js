import 'dotenv/config';
import {
  S3Client,
  CreateBucketCommand,
  PutPublicAccessBlockCommand,
  PutBucketWebsiteCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── 설정 ──────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const BUCKET  = process.env.AWS_BUCKET_NAME || 'ai-clean-check-2026';
const REGION  = 'ap-northeast-2';
const FILE    = join(__dirname, 'ai_clean_check.html'); // 스크립트 위치 기준 경로

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function bucketExists() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: BUCKET }));
    return true;
  } catch {
    return false;
  }
}

async function deploy() {
  console.log(`\n🚀 AI Clean Check → S3 배포 시작`);
  console.log(`   버킷: ${BUCKET}  |  리전: ${REGION}\n`);

  // 1. 버킷 생성 (이미 있으면 건너뜀)
  if (await bucketExists()) {
    console.log('✅ 버킷 이미 존재 — 생성 건너뜀');
  } else {
    await s3.send(new CreateBucketCommand({
      Bucket: BUCKET,
      CreateBucketConfiguration: { LocationConstraint: REGION },
    }));
    console.log('✅ 버킷 생성 완료');
  }

  // 2. 퍼블릭 액세스 차단 해제
  await s3.send(new PutPublicAccessBlockCommand({
    Bucket: BUCKET,
    PublicAccessBlockConfiguration: {
      BlockPublicAcls:       false,
      IgnorePublicAcls:      false,
      BlockPublicPolicy:     false,
      RestrictPublicBuckets: false,
    },
  }));
  console.log('✅ 퍼블릭 액세스 차단 해제');

  // 3. 정적 웹 호스팅 활성화
  await s3.send(new PutBucketWebsiteCommand({
    Bucket: BUCKET,
    WebsiteConfiguration: {
      IndexDocument: { Suffix: 'ai_clean_check.html' },
      ErrorDocument:  { Key:    'ai_clean_check.html' },
    },
  }));
  console.log('✅ 정적 웹 호스팅 활성화');

  // 4. 퍼블릭 읽기 정책 (GetObject만 허용 — 쓰기 권한 없음)
  await s3.send(new PutBucketPolicyCommand({
    Bucket: BUCKET,
    Policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [{
        Sid:       'PublicReadGetObject',
        Effect:    'Allow',
        Principal: '*',
        Action:    's3:GetObject',
        Resource:  `arn:aws:s3:::${BUCKET}/*`,
      }],
    }),
  }));
  console.log('✅ 퍼블릭 읽기 정책 적용');

  // 5. HTML 파일 업로드
  const body = readFileSync(FILE);
  await s3.send(new PutObjectCommand({
    Bucket:      BUCKET,
    Key:         'ai_clean_check.html',
    Body:        body,
    ContentType: 'text/html; charset=utf-8',
  }));
  console.log('✅ ai_clean_check.html 업로드 완료');

  // 결과
  const url = `http://${BUCKET}.s3-website.${REGION}.amazonaws.com`;
  await waitForSite(url);
  console.log(`\n🎉 배포 완료!`);
  console.log(`   접속 URL: ${url}\n`);
}

async function waitForSite(url, maxWaitMs = 30000) {
  const start = Date.now();
  process.stdout.write('⏳ 사이트 활성화 대기 중');
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(url);
      if (res.ok) { process.stdout.write(' ✅\n'); return; }
    } catch {}
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, 2000));
  }
  process.stdout.write(' (30초 초과 — URL 직접 확인 필요)\n');
}

deploy().catch(err => {
  console.error('\n❌ 오류:', err.message);
  if (err.message.includes('credentials')) {
    console.error('   → .env 파일에 AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY를 확인하세요.');
  }
  if (err.Code === 'BucketAlreadyExists') {
    console.error('   → 버킷 이름이 이미 사용 중입니다. .env의 AWS_BUCKET_NAME을 변경하세요.');
  }
  process.exit(1);
});
