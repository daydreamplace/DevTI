import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name),
      ),
    )
  ).flat();
}
const root = path.resolve('out');
const files = (await walk(root)).filter(
  (f) => f.endsWith('/index.html') && !/\/(_not-found|404)\//.test(f),
);
const titles = new Set();
const descriptions = new Set();
const base = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://devti-your-type.you8inpark.chatgpt.site'
).replace(/\/$/, '');
let indexable = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert(title && !titles.has(title), `${file}: missing or duplicate title`);
  titles.add(title);
  assert(
    description && !descriptions.has(description),
    `${file}: missing or duplicate description`,
  );
  descriptions.add(description);
  assert(html.includes('lang="ko"'), `${file}: document language`);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  assert(canonical?.startsWith(base), `${file}: canonical origin`);
  if (/\/(test|result)\/index.html$/.test(file)) {
    assert(/<meta name="robots" content="[^"]*noindex/.test(html), `${file}: private flow noindex`);
  } else {
    indexable++;
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: exactly one static H1`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))
    JSON.parse(match[1]);
  for (const match of html.matchAll(/<a\b[^>]*href="(\/[^"#]*)/g)) {
    const url = new URL(match[1], base);
    await access(path.join(root, decodeURIComponent(url.pathname)));
  }
}
assert.equal(indexable, 21, '21 indexable pages');
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<url>/g) || []).length, 21, '21 sitemap URLs');
for (const file of ['og.png', 'llms.txt', 'robots.txt', '404.html'])
  await access(path.join(root, file));
console.log(
  `PASS: ${indexable} indexable HTML pages, unique metadata, canonical, H1, JSON-LD, internal links, sitemap, result/test noindex, social image.`,
);
