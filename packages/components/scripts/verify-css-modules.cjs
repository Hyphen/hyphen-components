const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const dist = path.join(__dirname, '../dist');
const scopedNames = (file) => new Set(
  readFileSync(path.join(dist, file), 'utf8').match(
    /(?<![\w-])[\w-]+__[A-Za-z0-9]{5}(?![\w-])/g
  )
);

const cssNames = scopedNames('css/index.css');
const bundles = [
  'hyphen-components.cjs.development.js',
  'hyphen-components.cjs.production.min.js',
  'hyphen-components.esm.js',
];

for (const bundle of bundles) {
  const names = scopedNames(bundle);
  assert(names.size > 0, `${bundle} has no CSS module class names`);

  const missing = [...names].filter((name) => !cssNames.has(name));
  assert.deepEqual(missing, [], `${bundle} has class names missing from webpack CSS`);
  console.log(`${bundle}: ${names.size} class names match webpack CSS`);
}
