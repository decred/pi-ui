# pi-ui

[![Build Status](https://github.com/decred/pi-ui/workflows/Build%20and%20Test/badge.svg)](https://github.com/decred/pi-ui/actions)

> Politeia UI library
> [documentation](https://decred.github.io/pi-ui/)

[![NPM](https://img.shields.io/npm/v/pi-ui.svg)](https://www.npmjs.com/package/pi-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

Make sure you have [nodejs](https://nodejs.org/en/) 8+ and [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/) installed.

#### yarn

```bash
yarn add pi-ui
```

#### npm

```bash
npm install --save pi-ui
```

## Usage

In the index file of your app make sure to import the styles for the lib:

- `index.js`:

```jsx
import "pi-ui/dist/index.css";
```

- `Component.js`:

```jsx
import React, { Component } from "react";

import { Button } from "pi-ui";

class Example extends Component {
  render() {
    return <Button />;
  }
}
```

### Breakpoints

Pi-ui's custom breakpoints make use of the [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) plugin. In order to use the breakpoints you have to add the plugin to your environment. For this, see the [postcss install page](https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/INSTALL.md#webpack).

In your `postcss.config.js`, you will have to `importFrom` pi-ui's `export.css` file. If you are developing with a linked pi-ui, import from your local pi-ui. Example:

```
const { resolveOwn } = require("../../utils");

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        // When developing with a linked `pi-ui`
        // Point the importFrom to the path of the linked package in your env
        importFrom: resolveOwn("../../../../pi-ui/dist/exports.css")
      }
    ]
  ]
};
```

If you are developing with a npm/yarn installed pi-ui package, import from your `node-modules`. Example:

```
module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        // When developing with an installed `pi-ui`
        // Point the importFrom to the path of the package in your node_modules
        importFrom: "./node_modules/pi-ui/dist/exports.css"
      }
    ]
  ]
};
```
## Developing

- Clone this repository
- Install all deps by running:
  `yarn`
- If you're developing only on pi-ui, serving the live documentation should be enough:
  `yarn storybook`

- If you want to see your changes reflected in a project consuming pi-ui, you can use yarn link:
  - Go to the pi-ui directory on your machine and run:
    `yarn link`
  - Go to the project using pi-ui and run:
    `yarn link pi-ui`

**Troubleshooting:**
If you find some kind of incompatibility between react versions, link the react package from the main repository into pi-ui:

- Go to the main repository which is using the pi-ui lib, access the react folder inside its node_modules:
  - `cd /some/project/node_modules/react && yarn link`
  - `cd /pi-ui && yarn link react`
