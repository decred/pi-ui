(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"./src/docs/modal.mdx":function(e,o,t){"use strict";t.r(o),t.d(o,"default",(function(){return r}));var n=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),i=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),a=t("./node_modules/react/index.js"),s=t("./node_modules/@mdx-js/react/dist/esm.js"),l=t("./node_modules/docz/dist/index.esm.js"),d=t("./src/index.js"),u={};function r(e){var o=e.components,t=Object(i.a)(e,["components"]);return Object(s.b)("wrapper",Object.assign({},u,t,{components:o,mdxType:"MDXLayout"}),Object(s.b)("h1",{id:"modal"},"Modal"),Object(s.b)("h2",{id:"properties"},"Properties"),Object(s.b)(l.d,{of:d.y,mdxType:"Props"}),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("h3",{id:"simple-modal"},"Simple Modal"),Object(s.b)(l.c,{__position:1,__code:"() => {\n  const [showModal, setShowModal] = useState(false)\n  const openModal = () => setShowModal(true)\n  const closeModal = () => setShowModal(false)\n  return (\n    <Fragment>\n      <Button onClick={openModal}>Open Modal</Button>\n      <Modal show={showModal} onClose={closeModal}>\n        Simple Modal\n      </Modal>\n    </Fragment>\n  )\n}",__scope:{props:this?this.props:t,useState:a.useState,Fragment:a.Fragment,Playground:l.c,Props:l.d,Modal:d.x,Button:d.c,P:d.A,ModalWrapper:d.y},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=Object(a.useState)(!1),o=Object(n.a)(e,2),t=o[0],i=o[1];return Object(s.b)(a.Fragment,{mdxType:"Fragment"},Object(s.b)(d.c,{onClick:function(){return i(!0)},mdxType:"Button"},"Open Modal"),Object(s.b)(d.x,{show:t,onClose:function(){return i(!1)},mdxType:"Modal"},"Simple Modal"))})),Object(s.b)("h3",{id:"modal-with-title"},"Modal with title"),Object(s.b)(l.c,{__position:2,__code:'() => {\n  const [showModal, setShowModal] = useState(false)\n  const openModal = () => setShowModal(true)\n  const closeModal = () => setShowModal(false)\n  return (\n    <Fragment>\n      <Button onClick={openModal}>Open Modal</Button>\n      <Modal\n        title="Title"\n        iconType="mail"\n        show={showModal}\n        onClose={closeModal}\n      >\n        Content!\n      </Modal>\n    </Fragment>\n  )\n}',__scope:{props:this?this.props:t,useState:a.useState,Fragment:a.Fragment,Playground:l.c,Props:l.d,Modal:d.x,Button:d.c,P:d.A,ModalWrapper:d.y},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=Object(a.useState)(!1),o=Object(n.a)(e,2),t=o[0],i=o[1];return Object(s.b)(a.Fragment,{mdxType:"Fragment"},Object(s.b)(d.c,{onClick:function(){return i(!0)},mdxType:"Button"},"Open Modal"),Object(s.b)(d.x,{title:"Title",iconType:"mail",show:t,onClose:function(){return i(!1)},mdxType:"Modal"},"Content!"))})),Object(s.b)("h3",{id:"unclosable-modal"},"Unclosable Modal"),Object(s.b)(l.c,{__position:3,__code:'() => {\n  const [showModal, setShowModal] = useState(false)\n  const openModal = () => setShowModal(true)\n  const closeModal = () => setShowModal(false)\n  return (\n    <Fragment>\n      <Button onClick={openModal}>Open Modal</Button>\n      <Modal\n        title="Title"\n        iconType="mail"\n        show={showModal}\n        disableClose="true"\n        onClose={closeModal}\n      >\n        <P>Content!</P>\n        <br />\n        <Button onClick={closeModal}>close me!</Button>\n      </Modal>\n    </Fragment>\n  )\n}',__scope:{props:this?this.props:t,useState:a.useState,Fragment:a.Fragment,Playground:l.c,Props:l.d,Modal:d.x,Button:d.c,P:d.A,ModalWrapper:d.y},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=Object(a.useState)(!1),o=Object(n.a)(e,2),t=o[0],i=o[1],l=function(){return i(!1)};return Object(s.b)(a.Fragment,{mdxType:"Fragment"},Object(s.b)(d.c,{onClick:function(){return i(!0)},mdxType:"Button"},"Open Modal"),Object(s.b)(d.x,{title:"Title",iconType:"mail",show:t,disableClose:"true",onClose:l,mdxType:"Modal"},Object(s.b)(d.A,{mdxType:"P"},"Content!"),Object(s.b)("br",null),Object(s.b)(d.c,{onClick:l,mdxType:"Button"},"close me!")))})),Object(s.b)("h3",{id:"modal-with-huge-contet"},"Modal with huge contet"),Object(s.b)(l.c,{__position:4,__code:'() => {\n  const [showModal, setShowModal] = useState(false)\n  const openModal = () => setShowModal(true)\n  const closeModal = () => setShowModal(false)\n  return (\n    <Fragment>\n      <Button onClick={openModal}>Open Modal</Button>\n      <Modal title="Title" show={showModal} onClose={closeModal}>\n        <P>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,\n          veniam distinctio illum, nesciunt dolorum tempore minus voluptate\n          omnis facilis illo earum inventore quibusdam iste dolores id unde\n          neque ipsum rerum?\n        </P>\n        <P>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae\n          perspiciatis, natus dolorum adipisci repellendus debitis temporibus\n          fuga dicta dolorem veniam doloribus maxime nostrum? Dolores ullam at\n          voluptate saepe ipsa!\n        </P>\n        <P>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,\n          eligendi! Cum vero non saepe eius ratione quam ea laudantium dolor\n          autem, illo aliquam commodi sequi iure at totam fugit dolores.\n        </P>\n        <P>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,\n          veniam distinctio illum, nesciunt dolorum tempore minus voluptate\n          omnis facilis illo earum inventore quibusdam iste dolores id unde\n          neque ipsum rerum?\n        </P>\n        <P>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae\n          perspiciatis, natus dolorum adipisci repellendus debitis temporibus\n          fuga dicta dolorem veniam doloribus maxime nostrum? Dolores ullam at\n          voluptate saepe ipsa!\n        </P>\n        <P>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,\n          eligendi! Cum vero non saepe eius ratione quam ea laudantium dolor\n          autem, illo aliquam commodi sequi iure at totam fugit dolores.\n        </P>\n      </Modal>\n    </Fragment>\n  )\n}',__scope:{props:this?this.props:t,useState:a.useState,Fragment:a.Fragment,Playground:l.c,Props:l.d,Modal:d.x,Button:d.c,P:d.A,ModalWrapper:d.y},__codesandbox:"undefined",mdxType:"Playground"},(function(){var e=Object(a.useState)(!1),o=Object(n.a)(e,2),t=o[0],i=o[1];return Object(s.b)(a.Fragment,{mdxType:"Fragment"},Object(s.b)(d.c,{onClick:function(){return i(!0)},mdxType:"Button"},"Open Modal"),Object(s.b)(d.x,{title:"Title",show:t,onClose:function(){return i(!1)},mdxType:"Modal"},Object(s.b)(d.A,{mdxType:"P"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, veniam distinctio illum, nesciunt dolorum tempore minus voluptate omnis facilis illo earum inventore quibusdam iste dolores id unde neque ipsum rerum?"),Object(s.b)(d.A,{mdxType:"P"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae perspiciatis, natus dolorum adipisci repellendus debitis temporibus fuga dicta dolorem veniam doloribus maxime nostrum? Dolores ullam at voluptate saepe ipsa!"),Object(s.b)(d.A,{mdxType:"P"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, eligendi! Cum vero non saepe eius ratione quam ea laudantium dolor autem, illo aliquam commodi sequi iure at totam fugit dolores."),Object(s.b)(d.A,{mdxType:"P"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, veniam distinctio illum, nesciunt dolorum tempore minus voluptate omnis facilis illo earum inventore quibusdam iste dolores id unde neque ipsum rerum?"),Object(s.b)(d.A,{mdxType:"P"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae perspiciatis, natus dolorum adipisci repellendus debitis temporibus fuga dicta dolorem veniam doloribus maxime nostrum? Dolores ullam at voluptate saepe ipsa!"),Object(s.b)(d.A,{mdxType:"P"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, eligendi! Cum vero non saepe eius ratione quam ea laudantium dolor autem, illo aliquam commodi sequi iure at totam fugit dolores.")))})))}r&&r===Object(r)&&Object.isExtensible(r)&&Object.defineProperty(r,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/docs/modal.mdx"}}),r.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-modal.bc9b4c743439ce591cbf.js.map