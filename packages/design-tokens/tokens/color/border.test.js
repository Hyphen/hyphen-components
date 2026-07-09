const borderTokens = require('./border.json');

describe('border color tokens', () => {
  test('uses the default dark border color for the secondary button default state', () => {
    const border = borderTokens.color.border;

    expect(border['button-secondary'].darkValue).toBe(
      border.default.darkValue
    );
  });
});
