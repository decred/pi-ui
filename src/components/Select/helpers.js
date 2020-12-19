export { default as SelectControls } from "./components/SelectControls/SelectControls.jsx";
export { default as SelectOptions } from "./components/SelectOptions/SelectOptions.jsx";
export { default as SelectInput } from "./components/SelectInput/SelectInput.jsx";

export const blankValue = { value: "", label: "" };

export const defaultValueKeyGetter = ({ value }) => value;
export const defaultLabelKeyGetter = ({ label }) => label;

export const defaultPromptTextCreator = (input) => `Add ${input}`;

export const matchOption = (optionModifier, value) => (option) =>
  optionModifier(option)
    .toLowerCase()
    .includes(value.toLowerCase());

export const findExact = (options, labelModifier, valueModifier, value) =>
  options.findIndex(
    (option) =>
      valueModifier(option) === valueModifier(value) &&
      labelModifier(option) === labelModifier(value)
  );
