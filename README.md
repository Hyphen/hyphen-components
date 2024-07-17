<p align="center">
  <a href="https://hyphen.ai" rel="noopener" target="_blank"><img width="150" src="public/images/logo.png" alt="Hyphen logo"></a></p>
</p>

<h1 align="center" style="border-bottom: none;">Hyphen Component Library</h1>
<h3 align="center">

  A [React](https://reactjs.org/) component library to power all Hyphen UI

</h3>

## Quick Start

### 1. Install

`npm install @hyphen/hyphen-components`

### 2. Import Global CSS

```jsx
import '@hyphen/hyphen-components/dist/css/utilities.css'; // Utility classes -- REQUIRED
import '@hyphen/hyphen-components/dist/css/variables.css'; // CSS Variables -- REQUIRED
import '@hyphen/hyphen-components/dist/css/index.css'; // Component CSS -- REQUIRED
import '@hyphen/hyphen-components/dist/css/fonts.css'; // Included Font files -- OPTIONAL BUT ENCOURAGED
```

We recommend importing our global reset in order to maintain a consistent
look of all components across applications.

```jsx
import '@hyphen/hyphen-components/dist/css/reset.css' // A Basic CSS Reset -- OPTIONAL BUT ENCOURAGED.
```

### 3. Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@hyphen/hyphen-components';

function App() {
  return <Box>Hello World</Box>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Documentation

[SEE FULL DOCS HERE](https://ux.hyphen.ai)

## Contributing

Issues and PRs welcome! See [HERE](./CONTRIBUTING.md) for our Contribution Guide.

## Raising an Issue

When raising an issue:

* Make sure the issue hasn't been raised yet.
* Tag issue accordingly using your best judgement. Do NOT create new tags. If you feel a new one is needed, raise it in your issue.
* If your issue is a bug, include **screenshots** or animated GIFs in your issue whenever needed (if issue is visual in nature).
* If your issue is a bug, include steps to reproduce, or link to reproducible issue, e.g.: Code Sandbox or similar. Please also provide any additional details including device, OS, browser, browser version etc.

[Issues can be raised here](https://github.com/hyphen/hyphen-components/issues).

## License

This project is licensed under the terms of the
[MIT license](./LICENSE).
