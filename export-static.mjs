import { cp, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

// Lovable needs its own client/server output for previews. External npm builds
// ship only static files, without any Worker or runtime server.
if (process.env.LOVABLE_SANDBOX === '1' || process.env.SANDBOX_ID) {
  console.log('Lovable preview output preserved. External builds export static files to dist.');
} else {
  const source = resolve('.output/public');
  const html = await readFile(resolve(source, 'index.html'), 'utf8');
  if (!html.includes('Perfect Skin')) throw new Error('The salon homepage was not prerendered.');
  const entries = await readdir(source);
  if (entries.some(name => /worker|wrangler/i.test(name))) throw new Error('Unexpected runtime files in static output.');
  await rm(resolve('dist'), { recursive: true, force: true });
  await mkdir(resolve('dist'), { recursive: true });
  await cp(source, resolve('dist'), { recursive: true });
  await rm(resolve('dist/.lovable'), { recursive: true, force: true });
  console.log('Static website exported to dist. No database or runtime server required.');
}