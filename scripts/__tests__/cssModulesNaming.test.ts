import path from 'path';

const { generateScopedName } = require('../cssModulesNaming.cjs');

describe('generateScopedName', () => {
  it('returns a stable scoped class name', () => {
    const resourcePath = path.join(
      process.cwd(),
      'src/components/Button/Button.module.scss'
    );
    const first = generateScopedName('button', resourcePath);
    const second = generateScopedName('button', resourcePath);

    expect(first).toBe(second);
    expect(first.startsWith('button__')).toBe(true);
    expect(first.split('__')[1]).toHaveLength(5);
  });

  it('returns different names for different local names', () => {
    const resourcePath = path.join(
      process.cwd(),
      'src/components/Button/Button.module.scss'
    );
    const buttonName = generateScopedName('button', resourcePath);
    const iconName = generateScopedName('icon', resourcePath);

    expect(buttonName).not.toBe(iconName);
  });
});
