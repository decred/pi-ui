(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{"./src/docs/toggle.mdx":function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return i}));var n=s("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),a=s("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),l=s("./node_modules/react/index.js"),o=s("./node_modules/@mdx-js/react/dist/esm.js"),d=s("./node_modules/docz/dist/index.esm.js"),g=s("./src/index.js"),r=s("./src/css/base.css"),b=s.n(r),c={};function i(e){var t=e.components,s=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object.assign({},c,s,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"toggle-switch"},"Toggle Switch"),Object(o.b)("h2",{id:"properties"},"Properties"),Object(o.b)(d.d,{of:g.Q,mdxType:"Props"}),Object(o.b)("h2",{id:"usage"},"Usage"),Object(o.b)(d.c,{__position:1,__code:"() => {\n  const initialLabel = 'Toggle me!'\n  const [label, setLabel] = useState(initialLabel)\n  const [toggled, setToggled] = useState(false)\n  const onToggleHandler = () => {\n    if (label === initialLabel) {\n      setLabel(\"I'm on!\")\n      setToggled(true)\n    } else {\n      setLabel(initialLabel)\n      setToggled(false)\n    }\n  }\n  return (\n    <Fragment>\n      <div className={styles.toggleWrapperExample}>\n        <Toggle onToggle={onToggleHandler} toggled={toggled} />\n        <div className={styles.toggleLabelExample}>{label}</div>\n      </div>\n    </Fragment>\n  )\n}",__scope:{props:this?this.props:s,useState:l.useState,Fragment:l.Fragment,Playground:d.c,Props:d.d,Toggle:g.Q,styles:b.a},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=Object(l.useState)("Toggle me!"),t=Object(n.a)(e,2),s=t[0],a=t[1],d=Object(l.useState)(!1),r=Object(n.a)(d,2),c=r[0],i=r[1];return Object(o.b)(l.Fragment,{mdxType:"Fragment"},Object(o.b)("div",{className:b.a.toggleWrapperExample},Object(o.b)(g.Q,{onToggle:function(){"Toggle me!"===s?(a("I'm on!"),i(!0)):(a("Toggle me!"),i(!1))},toggled:c,mdxType:"Toggle"}),Object(o.b)("div",{className:b.a.toggleLabelExample},s)))})),Object(o.b)("h3",{id:"disabled"},"Disabled"),Object(o.b)(d.c,{__position:2,__code:"() => {\n  return (\n    <Fragment>\n      <div className={styles.toggleWrapperExample}>\n        <Toggle toggled={false} disabled />\n        <div className={styles.toggleLabelExample}>I'm disabled!</div>\n      </div>\n    </Fragment>\n  )\n}",__scope:{props:this?this.props:s,useState:l.useState,Fragment:l.Fragment,Playground:d.c,Props:d.d,Toggle:g.Q,styles:b.a},__codesandbox:"undefined",mdxType:"Playground"},(function(){return Object(o.b)(l.Fragment,{mdxType:"Fragment"},Object(o.b)("div",{className:b.a.toggleWrapperExample},Object(o.b)(g.Q,{toggled:!1,disabled:!0,mdxType:"Toggle"}),Object(o.b)("div",{className:b.a.toggleLabelExample},"I'm disabled!")))})))}i&&i===Object(i)&&Object.isExtensible(i)&&Object.defineProperty(i,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/docs/toggle.mdx"}}),i.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-toggle.877a38c62235768685a0.js.map