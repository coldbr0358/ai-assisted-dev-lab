import { spawn } from 'child_process';
const child = spawn('node', ['03-ai-clean-check/deploy.js'], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
