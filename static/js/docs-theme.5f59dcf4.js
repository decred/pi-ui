(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{"./src/docs/theme.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return m}));var o=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),r=(t("./node_modules/react/index.js"),t("./node_modules/@mdx-js/react/dist/esm.js")),a={};function m(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object.assign({},a,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"theming"},"Theming"),Object(r.b)("h2",{id:"create-a-custom-theme"},"Create a custom theme"),Object(r.b)("p",null,"The recommended way to create a custom theme is to create a file named ",Object(r.b)("inlineCode",{parentName:"p"},"theme.js"),", you can add your custom values and override existing ones."),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),'// theme.js\n\nexport default {\n  "color-primary": "red",\n  "btn-color": "var(--color-primary)",\n};\n')),Object(r.b)("h2",{id:"use-your-theme-in-your-application"},"Use your theme in your application"),Object(r.b)("p",null,"Pi-ui exposes a ",Object(r.b)("inlineCode",{parentName:"p"},"ThemeProvider")," that accepts a ",Object(r.b)("inlineCode",{parentName:"p"},"themes")," object, ",Object(r.b)("inlineCode",{parentName:"p"},"defaultThemeName")," as string and ",Object(r.b)("inlineCode",{parentName:"p"},"fonts")," array."),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),'import React from "react";\nimport { render } from "react-dom";\nimport {\n  ThemeProvider,\n  defaultLightTheme,\n  DEFAULT_LIGHT_THEME_NAME,\n} from "pi-ui";\n\nimport customTheme from "./theme";\nimport SourceSansProLight from "../assets/fonts/source-sans-pro/SourceSansPro-Light.ttf";\nimport SourceSansProRegular from "../assets/fonts/source-sans-pro/SourceSansPro-Regular.ttf";\nimport SourceSansProSemiBold from "../assets/fonts/source-sans-pro/SourceSansPro-SemiBold.ttf";\n\nconst fonts = [\n  {\n    "font-family": "Source Sans Pro",\n    src: `url(${SourceSansProLight}) format("truetype")`,\n    "font-weight": defaultLightTheme["font-weight-light"], // 300\n    "font-style": "normal",\n    "font-display": "swap",\n  },\n  {\n    "font-family": "Source Sans Pro",\n    src: `url(${SourceSansProRegular}) format("truetype")`,\n    "font-weight": defaultLightTheme["font-weight-regular"], // 400\n    "font-style": "normal",\n    "font-display": "swap",\n  },\n  {\n    "font-family": "Source Sans Pro",\n    src: `url(${SourceSansProSemiBold}) format("truetype")`,\n    "font-weight": defaultLightTheme["font-weight-semi-bold"], // 600\n    "font-style": "normal",\n    "font-display": "swap",\n  },\n];\n\nconst App = () => {\n  return (\n    <ThemeProvider\n      themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme, customTheme }}\n      defaultThemeName="customTheme"\n      fonts={fonts}>\n      {children}\n    </ThemeProvider>\n  );\n};\n\nrender(<App />, document.getElementById("root"));\n')),Object(r.b)("h2",{id:"default-theme"},"Default theme"),Object(r.b)("p",null,"There are two default themes, ",Object(r.b)("inlineCode",{parentName:"p"},"defaultLightTheme")," and ",Object(r.b)("inlineCode",{parentName:"p"},"defaultDarkTheme"),". They are both exported from pi-ui."),Object(r.b)("p",null,"It's recommended to use ",Object(r.b)("inlineCode",{parentName:"p"},"DEFAULT_LIGHT_THEME_NAME")," and ",Object(r.b)("inlineCode",{parentName:"p"},"DEFAULT_DARK_THEME_NAME")," default theme names, as they are used\ninternally in some components to use dark default styling variables or the light ones."),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),'import {\n  defaultLightTheme,\n  defaultDarkTheme,\n  DEFAULT_LIGHT_THEME_NAME,\n  DEFAULT_DARK_THEME_NAME,\n} from "pi-ui";\n')),Object(r.b)("h2",{id:"usetheme-hook-in-deep-children"},"UseTheme hook in deep children"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"useTheme")," exposes three properties ",Object(r.b)("inlineCode",{parentName:"p"},"theme"),", ",Object(r.b)("inlineCode",{parentName:"p"},"themeName"),", ",Object(r.b)("inlineCode",{parentName:"p"},"setThemeName")," which can be used in deep children."),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),'import React from "react";\nimport {\n  useTheme,\n  Button,\n  getThemeProperty,\n  DEFAULT_LIGHT_THEME_NAME,\n  DEFAULT_DARK_THEME_NAME,\n} from "pi-ui";\n\nconst DeepChild = () => {\n  const { themeName, setThemeName, theme } = useTheme();\n\n  const colorGreen = getThemeProperty(theme, "color-green"); // get theme property\n\n  const handleToggleTheme = () => {\n    if (themeName === DEFAULT_LIGHT_THEME_NAME) {\n      setThemeName(DEFAULT_LIGHT_THEME_NAME);\n    } else {\n      setThemeName(DEFAULT_LIGHT_THEME_NAME);\n    }\n  };\n\n  return <Button onClick={handleToggleTheme}>Toggle theme</Button>;\n};\n')))}m&&m===Object(m)&&Object.isExtensible(m)&&Object.defineProperty(m,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/docs/theme.mdx"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-theme.bc9b4c743439ce591cbf.js.map