/* eslint-disable */

/**
 * This code silences the warnings about the forwardRef update inside a test. TODO: improve tests and get rid of the warnings
 */
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (
      !args[0].includes(
        "Warning: An update to %s inside a test was not wrapped in act"
      )
    ) {
      consoleError(...args);
    }
  });
});
