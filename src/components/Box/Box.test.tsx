import {
  CssDisplayValue,
  CssFlexDirectionValue,
  CssOverflowValue,
  ResponsiveProp,
} from '../../types';
import { Box } from './Box';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  BACKGROUND_COLOR_OPTIONS,
  BORDER_COLOR_OPTIONS,
  BORDER_SIZE_OPTIONS,
  BOX_SHADOW_OPTIONS,
  FONT_COLOR_OPTIONS,
  FONT_SIZE_OPTIONS,
  SPACING_OPTIONS,
} from '../../lib';

describe('Box', () => {
  const renderBox = (props = {}) => render(<Box {...props}>Test Box</Box>);

  describe('aria attributes', () => {
    test('aria-label is applied if set', () => {
      const { getByLabelText } = renderBox({ 'aria-label': 'test label' });
      expect(getByLabelText('test label')).toBeDefined();
    });
  });

  test('renders with default display value of flex', () => {
    const { getByText } = renderBox();
    expect(getByText('Test Box')).toHaveClass('display-flex');
  });

  describe('Invalid props', () => {
    test('handles invalid direction value gracefully', () => {
      const { getByText } = renderBox({ direction: 'invalid' });
      expect(getByText('Test Box')).not.toHaveClass('direction-invalid');
    });

    // test('handles invalid padding value gracefully', () => {
    //   const { getByText } = renderBox({ padding: 'invalid' });
    //   expect(getByText('Test Box')).not.toHaveClass('p-invalid');
    // });

    // test('handles invalid margin value gracefully', () => {
    //   const { getByText } = renderBox({ margin: 'invalid' });
    //   expect(getByText('Test Box')).not.toHaveClass('m-invalid');
    // });
  });

  test('renders with proper hover classes', () => {
    const { getByText } = renderBox({ hover: { background: 'primary' } });
    expect(getByText('Test Box')).toHaveClass('hover:background-color-primary');
  });

  test('renders with proper focus classes', () => {
    const { getByText } = renderBox({ focus: { borderColor: 'primary' } });
    expect(getByText('Test Box')).toHaveClass('focus:border-color-primary');
  });

  test('renders with proper cursor class', () => {
    const { getByText } = renderBox({ cursor: 'pointer' });
    expect(getByText('Test Box')).toHaveClass('cursor-pointer');
  });

  test('renders with proper border radius class', () => {
    const { getByText } = renderBox({ radius: 'md' });
    expect(getByText('Test Box')).toHaveClass('br-md');
  });

  test('renders with proper box shadow class', () => {
    const { getByText } = renderBox({ shadow: 'lg' });
    expect(getByText('Test Box')).toHaveClass('shadow-lg');
  });

  const testTokenClasses = (
    propName: string,
    options: any[],
    classNamePrefix: string
  ) => {
    options.forEach((option, i) => {
      const { queryAllByText } = renderBox({ [propName]: option, key: i });
      expect(queryAllByText('Test Box')[i].classList).toContain(
        `${classNamePrefix}-${option}`
      );
    });
  };

  test('background color token classes are applied', () => {
    testTokenClasses(
      'background',
      BACKGROUND_COLOR_OPTIONS,
      'background-color'
    );
  });

  test('font size token classes are applied', () => {
    testTokenClasses('fontSize', FONT_SIZE_OPTIONS, 'font-size');
  });

  test('text color token classes are applied', () => {
    testTokenClasses('color', FONT_COLOR_OPTIONS, 'font-color');
  });

  test('border color token classes are applied', () => {
    testTokenClasses('borderColor', BORDER_COLOR_OPTIONS, 'border-color');
  });

  test('overflow option classes are applied', () => {
    const overflowOptions: CssOverflowValue[] = [
      'visible',
      'hidden',
      'clip',
      'scroll',
      'auto',
      'inherit',
      'initial',
      'unset',
    ];
    testTokenClasses('overflow', overflowOptions, 'overflow');
  });

  const testChildGapClasses = (
    direction: CssFlexDirectionValue | ResponsiveProp<CssFlexDirectionValue>,
    marginClass: string
  ) => {
    SPACING_OPTIONS.forEach((value, optionIndex) => {
      const { container } = render(
        <Box childGap={value} key={optionIndex} direction={direction}>
          <Box className="foo" key={`child1${optionIndex}`}>
            child 1
          </Box>
          <Box className="foo" key={`child2${optionIndex}`}>
            child 2
          </Box>
        </Box>
      );

      const { children } = container.children[0];
      Array.from(children).forEach((child, childIndex) => {
        expect(child.classList).toContain('foo');
        if (childIndex < children.length - 1) {
          expect(child.classList).toContain(`${marginClass}-${value}`);
        }
      });
    });
  };

  test('childGap margin classes are applied for column layout', () => {
    testChildGapClasses('column', 'm-bottom');
  });

  test('childGap margin classes are applied for row layout', () => {
    testChildGapClasses('row', 'm-right');
  });

  describe('Event Handlers', () => {
    test('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      const { getByText } = renderBox({ onClick: handleClick });
      getByText('Test Box').click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('calls onMouseEnter handler when hovered', () => {
      const handleMouseEnter = jest.fn();
      const { getByText } = renderBox({ onMouseEnter: handleMouseEnter });
      fireEvent.mouseEnter(getByText('Test Box'));
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    test('calls onMouseLeave handler when mouse leaves', () => {
      const handleMouseLeave = jest.fn();
      const { getByText } = renderBox({ onMouseLeave: handleMouseLeave });
      fireEvent.mouseLeave(getByText('Test Box'));
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    test('calls onFocus handler when focused', () => {
      const handleFocus = jest.fn();
      const { getByText } = renderBox({ onFocus: handleFocus });
      fireEvent.focus(getByText('Test Box'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    test('calls onBlur handler when focus is lost', () => {
      const handleBlur = jest.fn();
      const { getByText } = renderBox({ onBlur: handleBlur });
      fireEvent.blur(getByText('Test Box'));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Display', () => {
    test('box renders with default display value of flex', () => {
      const { getByText } = renderBox();
      expect(getByText('Test Box')).toHaveClass('display-flex');
    });

    test('box renders with display class matching prop', () => {
      const displayValues: CssDisplayValue[] = [
        'flex',
        'inline-flex',
        'block',
        'inline-block',
        'inline',
        'inherit',
        'grid',
        'contents',
      ];
      testTokenClasses('display', displayValues, 'display');
    });
  });

  describe('Position', () => {
    const positions = [
      'relative',
      'absolute',
      'fixed',
      'sticky',
      'static',
      'revert',
      'inherit',
      'initial',
      'unset',
    ];

    positions.forEach((p) => {
      test(`renders with class for position ${p}`, () => {
        const { getByText } = renderBox({ position: p });
        expect(getByText('Test Box')).toHaveClass(`position-${p}`);
      });
    });
  });

  describe('wrap', () => {
    test('box renders with wrap class if wrap is true', () => {
      const { getByText } = renderBox({ wrap: true });
      expect(getByText('Test Box')).toHaveClass('flex-wrap');
    });

    test('box renders with nowrap class if wrap is false', () => {
      const { getByText } = renderBox({ wrap: false });
      expect(getByText('Test Box')).toHaveClass('flex-nowrap');
    });

    test('box will not add wrap class if display is not flex', () => {
      const { getByText } = renderBox({ display: 'block', wrap: true });
      expect(getByText('Test Box')).not.toHaveClass('flex-wrap');
    });
  });

  describe('Responsive styles and Classes', () => {
    const responsiveProps = {
      width: 'w',
      height: 'h',
      maxWidth: 'mw',
      maxHeight: 'mh',
      padding: 'p',
      margin: 'm',
      fontSize: 'font-size',
      position: 'position',
      zIndex: 'z-index',
      radius: 'br',
      shadow: 'shadow',
    };

    Object.entries(responsiveProps).forEach(([prop, classNamePrefix]) => {
      test(`box renders with the correct responsive ${prop} classes based on props`, () => {
        const responsiveValues = {
          base: 'sm',
          tablet: 'md',
          desktop: 'lg',
          hd: 'xl',
        };
        const { getByText } = renderBox({ [prop]: responsiveValues });
        const box = getByText('Test Box');
        expect(box).toHaveClass(
          `${classNamePrefix}-sm`,
          `${classNamePrefix}-md-tablet`,
          `${classNamePrefix}-lg-desktop`,
          `${classNamePrefix}-xl-hd`
        );
      });
    });

    test('box renders children with the correct gap classes for its children', () => {
      const direction: ResponsiveProp<CssFlexDirectionValue> = {
        base: 'column',
        tablet: 'column',
        desktop: 'row',
        hd: 'row',
      };
      const childGap: ResponsiveProp<
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | '0'
        | '2xs'
        | 'xs'
        | '2xl'
        | '3xl'
        | '4xl'
        | '5xl'
        | 'auto'
      > = {
        base: 'sm',
        tablet: 'md',
        desktop: 'lg',
        hd: 'xl',
      };
      const { getByText } = render(
        <Box direction={direction} childGap={childGap}>
          <div>one</div>
          <div>two</div>
        </Box>
      );
      const childBox = getByText('one');
      expect(childBox).toHaveClass(
        'm-bottom-sm',
        'm-right-0',
        'm-bottom-md-tablet',
        'm-right-0-tablet',
        'm-right-lg-desktop',
        'm-bottom-0-desktop',
        'm-right-xl-hd',
        'm-bottom-0-hd'
      );
    });
  });

  describe('Focus States', () => {
    const testFocusClasses = (
      propName: string,
      options: any[],
      classNamePrefix: string
    ) => {
      options.forEach((option, i) => {
        const { queryAllByText } = render(
          <Box focus={{ [propName]: option }} key={i}>
            Test Box
          </Box>
        );
        expect(queryAllByText('Test Box')[i].classList).toContain(
          `focus:${classNamePrefix}-${option}`
        );
      });
    };

    test('Background Focus -- box rendered with proper background focus classes', () => {
      testFocusClasses(
        'background',
        BACKGROUND_COLOR_OPTIONS,
        'background-color'
      );
    });

    test('Border Color Focus -- box rendered with proper border color focus classes', () => {
      testFocusClasses('borderColor', BORDER_COLOR_OPTIONS, 'border-color');
    });

    test('Border Width Focus -- box rendered with proper border width focus classes', () => {
      testFocusClasses('borderWidth', BORDER_SIZE_OPTIONS, 'border-width');
    });

    test('Font Color Focus -- box rendered with proper font color focus classes', () => {
      testFocusClasses('color', FONT_COLOR_OPTIONS, 'font-color');
    });

    test('Shadow Focus -- box rendered with proper shadow focus classes', () => {
      testFocusClasses('shadow', BOX_SHADOW_OPTIONS, 'shadow');
    });
  });

  describe('Cursor', () => {
    test('Renders with proper cursor utility class when prop is passed', () => {
      const { queryAllByText } = renderBox({ cursor: 'pointer' });
      expect(queryAllByText('Test Box')[0].classList).toContain(
        'cursor-pointer'
      );
    });
  });

  test('padding classes are applied', () => {
    testTokenClasses('padding', SPACING_OPTIONS, 'p');
  });

  test('margin classes are applied', () => {
    testTokenClasses('margin', SPACING_OPTIONS, 'm');
  });
});
