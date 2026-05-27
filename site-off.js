import 'dotenv/config';
import {
  S3Client,
  DeleteBucketWebsiteCommand,
  DeleteBucketPolicyCommand,
} from '@aws-sdk/client-s3';

const BUCKET = process.env.AWS_BUCKET_NAME || 'ai-clean-check-2026';
const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function off() {
  console.log('\n⏹  사이트 비활성화 중...');
  await s3.send(new DeleteBucketPolicyCommand({ Bucket: BUCKET }));
  await s3.send(new DeleteBucketWebsiteCommand({ Bucket: BUCKET }));
  console.log('✅ 사이트 비공개 처리 완료 (파일은 S3에 보존)');
  console.log('   다시 켜려면: node deploy.js\n');
}

off().catch(err => console.error('❌', err.message));
