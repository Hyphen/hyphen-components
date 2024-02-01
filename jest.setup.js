require('@testing-library/jest-dom');
require('@testing-library/jest-dom/extend-expect');

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'log').mockImplementation();
});
