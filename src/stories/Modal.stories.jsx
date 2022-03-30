import React from "react";
import { Modal, P } from "..";
import "./page.css";

const ModalObj = {
  title: "Design System/Components/Modal",
  component: Modal,
};

export default ModalObj;

const Template = ({ children, ...args }) => <Modal {...args}>{children}</Modal>;

export const Basic = Template.bind({});
Basic.args = {
  children: "Test Modal",
  show: true,
  onClose: () => console.log("close clicked"),
};

export const NoClose = Template.bind({});
NoClose.args = {
  children: "Test Modal",
  show: true,
  disableClose: true,
  onClose: () => console.log("close clicked"), // won't show
};

export const Big = Template.bind({});
Big.args = {
  children: (
    <>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
        veniam distinctio illum, nesciunt dolorum tempore minus voluptate omnis
        facilis illo earum inventore quibusdam iste dolores id unde neque ipsum
        rerum?
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae
        perspiciatis, natus dolorum adipisci repellendus debitis temporibus fuga
        dicta dolorem veniam doloribus maxime nostrum? Dolores ullam at
        voluptate saepe ipsa!
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, eligendi!
        Cum vero non saepe eius ratione quam ea laudantium dolor autem, illo
        aliquam commodi sequi iure at totam fugit dolores.
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
        veniam distinctio illum, nesciunt dolorum tempore minus voluptate omnis
        facilis illo earum inventore quibusdam iste dolores id unde neque ipsum
        rerum?
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae
        perspiciatis, natus dolorum adipisci repellendus debitis temporibus fuga
        dicta dolorem veniam doloribus maxime nostrum? Dolores ullam at
        voluptate saepe ipsa!
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, eligendi!
        Cum vero non saepe eius ratione quam ea laudantium dolor autem, illo
        aliquam commodi sequi iure at totam fugit dolores.
      </P>
    </>
  ),
  show: true,
  onClose: () => console.log("close clicked"),
};
