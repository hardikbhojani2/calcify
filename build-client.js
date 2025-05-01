import { execSync } from 'child_process';

console.log('Building client application...');
try {
  // Build only the client side portion with Vite
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Error building client:', error);
  process.exit(1);
}