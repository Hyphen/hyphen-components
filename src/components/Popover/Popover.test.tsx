import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverPortal,
} from './Popover';

// Helper to render a controlled Popover
type ControlledPopoverProps = {
  isOpen?: boolean;
  onClickOutside?: (event: Event) => void;
  placement?: string;
  withPortal?: boolean;
  portalTarget?: HTMLElement;
  children: React.ReactNode;
  contentProps?: Record<string, any>;
  [key: string]: any;
};

function ControlledPopover({
  isOpen = true,
  onClickOutside,
  placement = 'right',
  withPortal = false,
  portalTarget,
  children,
  contentProps = {},
  ...rest
}: ControlledPopoverProps) {
  return (
    <Popover open={isOpen} {...rest}>
      <PopoverTrigger asChild>
        <button>trigger</button>
      </PopoverTrigger>
      {withPortal ? (
        <PopoverPortal container={portalTarget}>
          <PopoverContent
            side={
              placement.split('-')[0] as 'right' | 'top' | 'bottom' | 'left'
            }
            align={
              (placement.split('-')[1] as
                | 'center'
                | 'end'
                | 'start'
                | undefined) || 'center'
            }
            {...contentProps}
            onInteractOutside={onClickOutside}
          >
            {children}
          </PopoverContent>
        </PopoverPortal>
      ) : (
        <PopoverContent
          side={placement.split('-')[0] as 'right' | 'top' | 'bottom' | 'left'}
          align={
            (placement.split('-')[1] as
              | 'center'
              | 'end'
              | 'start'
              | undefined) || 'center'
          }
          {...contentProps}
          onInteractOutside={onClickOutside}
        >
          {children}
        </PopoverContent>
      )}
    </Popover>
  );
}

describe('Popover', () => {
  describe('Default', () => {
    it('Renders a popover with default props', async () => {
      render(
        <ControlledPopover>
          <span>hello</span>
        </ControlledPopover>
      );
      const popoverContent = screen.getByText('hello');
      const trigger = screen.getByText('trigger');
      expect(popoverContent).toBeInTheDocument();
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('type', 'button');
      // Radix PopoverContent does not have role="dialog" by default
      expect(popoverContent.parentElement).toHaveClass('PopoverContent');
    });
  });

  describe('Placement', () => {
    const positions = [
      'top-center',
      'bottom-center',
      'right-center',
      'left-center',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'right-start',
      'right-end',
      'left-start',
      'left-end',
    ];
    positions.forEach((position) => {
      it(`Places the popover correctly in position: ${position} when prop is passed`, async () => {
        render(
          <ControlledPopover placement={position}>
            <span>hello</span>
          </ControlledPopover>
        );
        const popoverContent = screen.getByText('hello').parentElement;
        // Radix sets data-side and data-align
        const [side, align] = position.split('-');
        await waitFor(() => {
          expect(popoverContent).toHaveAttribute('data-side', side);
          if (align) {
            expect(popoverContent).toHaveAttribute('data-align', align);
          }
        });
      });
    });
  });

  describe('Portal', () => {
    it('Renders the Popover in the body if withPortal is true.', async () => {
      render(
        <ControlledPopover withPortal portalTarget={document.body}>
          <button type="button" id="inside-button">
            hello
          </button>
        </ControlledPopover>
      );
      await waitFor(() => {
        // Should be in the body
        expect(
          document.body.querySelector('#inside-button')
        ).toBeInTheDocument();
      });
    });
  });
});
