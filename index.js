import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: 'Node.js에서 Claude API 연결 테스트 중입니다. 한 문장으로 답해 주세요.',
        },
      ],
    });

    console.log(message.content[0].text);
  } catch (error) {
    console.error('오류 발생:', error.message);
  }
}

main();