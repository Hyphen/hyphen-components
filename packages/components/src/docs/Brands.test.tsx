import { render, screen } from '@testing-library/react';
import HyphenLogoHorizontalRgbPositive from '@hyphen/hyphen-design-tokens/build/assets/images/react/HyphenLogoHorizontalRgbPositive';
import React from 'react';

test('the generated Hyphen logo has a distinct component name and renders as an SVG', () => {
  expect(HyphenLogoHorizontalRgbPositive.name).toBe(
    'HyphenLogoHorizontalRgbPositive'
  );

  render(<HyphenLogoHorizontalRgbPositive aria-label="Hyphen logo" />);

  expect(screen.getByLabelText('Hyphen logo')).toBeInstanceOf(SVGSVGElement);
});
