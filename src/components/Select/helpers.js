export const blankValue = { value: "", label: "" };

export const defaultValueKeyGetter = ({ value }) => value;
export const defaultLabelKeyGetter = ({ label }) => label;

export const defaultPromptTextCreator = (input) => `Add ${input}`;

export const matchOption = (options, optionModifier, value) =>
  options.filter((option) =>
    optionModifier(option)
      .toLowerCase()
      .includes(value.toLowerCase())
  );

export const uniqueOptionsByModifier = (options, optionModifier) =>
  options.filter(
    (value, index, array) =>
      array.findIndex(
        (temp) => optionModifier(temp) === optionModifier(value)
      ) === index
  );

export const findExact = (options, labelModifier, valueModifier, value) =>
  options.findIndex(
    (option) =>
      valueModifier(option) === valueModifier(value) &&
      labelModifier(option) === labelModifier(value)
  );
