describe('prefersReducedMotion', () => {
  afterEach(() => {
    delete (window as any).matchMedia;
    jest.resetModules();
  });

  const load = () => require('./prefersReducedMotion').prefersReducedMotion;

  test('returns false when matchMedia is not supported', () => {
    const result = load()();
    expect(result).toBe(false);
  });

  test('returns true when matchMedia matches', () => {
    (window as any).matchMedia = jest.fn().mockReturnValue({ matches: true });
    jest.resetModules();
    const result = load()();
    expect(result).toBe(true);
  });

  test('returns false when matchMedia does not match', () => {
    (window as any).matchMedia = jest.fn().mockReturnValue({ matches: false });
    jest.resetModules();
    const result = load()();
    expect(result).toBe(false);
  });
});
