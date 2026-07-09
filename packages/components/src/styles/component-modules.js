// This file is used by webpack to gather all component CSS module styles
// into a single dist/css/index.css file.
const ctx = require.context('../components', true, /\.module\.scss$/);
ctx.keys().forEach(ctx);
