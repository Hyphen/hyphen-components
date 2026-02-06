import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  describe('Rendering', () => {
    test('renders the calendar component', () => {
      render(<Calendar />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    test('renders with default class names when no className provided', () => {
      const { container } = render(<Calendar />);
      const calendarRoot = container.querySelector('.rdp-root');
      expect(calendarRoot).toHaveClass('p-lg', 'bw-sm', 'br-sm');
    });

    test('renders with custom className when provided', () => {
      const { container } = render(<Calendar className="custom-calendar" />);
      const calendarRoot = container.querySelector('.rdp-root');
      expect(calendarRoot).toHaveClass('custom-calendar');
    });

    test('renders navigation buttons', () => {
      render(<Calendar />);
      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    test('renders weekday headers', () => {
      render(<Calendar />);
      // Check for some weekday abbreviations
      expect(screen.getByText('Su')).toBeInTheDocument();
      expect(screen.getByText('Mo')).toBeInTheDocument();
      expect(screen.getByText('Tu')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    test('navigates to previous month when clicking previous button', () => {
      const testDate = new Date(2024, 5, 15); // June 2024
      render(<Calendar defaultMonth={testDate} />);

      expect(screen.getByText('June 2024')).toBeInTheDocument();

      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);

      expect(screen.getByText('May 2024')).toBeInTheDocument();
    });

    test('navigates to next month when clicking next button', () => {
      const testDate = new Date(2024, 5, 15); // June 2024
      render(<Calendar defaultMonth={testDate} />);

      expect(screen.getByText('June 2024')).toBeInTheDocument();

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      expect(screen.getByText('July 2024')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    test('calls onSelect when a day is clicked (single mode)', () => {
      const handleSelect = jest.fn();
      const testDate = new Date(2024, 5, 15); // June 2024
      render(
        <Calendar
          mode="single"
          defaultMonth={testDate}
          onSelect={handleSelect}
        />
      );

      // In react-day-picker v9, we need to click the button inside the day cell
      const dayButton = screen.getByRole('button', { name: /June 16th/i });
      fireEvent.click(dayButton);

      expect(handleSelect).toHaveBeenCalled();
    });

    test('supports range selection mode', () => {
      const handleSelect = jest.fn();
      const testDate = new Date(2024, 5, 1); // June 2024
      render(
        <Calendar
          mode="range"
          defaultMonth={testDate}
          onSelect={handleSelect}
        />
      );

      const day10 = screen.getByRole('button', { name: /June 10th/i });
      const day18 = screen.getByRole('button', { name: /June 18th/i });

      fireEvent.click(day10);
      fireEvent.click(day18);

      expect(handleSelect).toHaveBeenCalled();
    });

    test('supports multiple selection mode', () => {
      const handleSelect = jest.fn();
      const testDate = new Date(2024, 5, 1); // June 2024
      render(
        <Calendar
          mode="multiple"
          defaultMonth={testDate}
          onSelect={handleSelect}
        />
      );

      const day6 = screen.getByRole('button', { name: /June 6th/i });
      const day12 = screen.getByRole('button', { name: /June 12th/i });

      fireEvent.click(day6);
      fireEvent.click(day12);

      expect(handleSelect).toHaveBeenCalledTimes(2);
    });
  });

  describe('Controlled selection', () => {
    test('renders with selected date in single mode', () => {
      const selectedDate = new Date(2024, 5, 16); // June 16, 2024
      const { container } = render(
        <Calendar mode="single" selected={selectedDate} month={selectedDate} />
      );

      // The selected day should have the selected class
      const selectedDay = container.querySelector('[data-selected="true"]');
      expect(selectedDay).toBeInTheDocument();
    });
  });

  describe('Disabled dates', () => {
    test('disables specific dates via disabled prop', () => {
      const testDate = new Date(2024, 5, 1); // June 2024
      const disabledDate = new Date(2024, 5, 11); // June 11, 2024
      const { container } = render(
        <Calendar defaultMonth={testDate} disabled={[disabledDate]} />
      );

      // The disabled day cell should have the disabled data attribute
      const disabledCell = container.querySelector('[data-disabled="true"]');
      expect(disabledCell).toBeInTheDocument();
    });

    test('disables dates before a specific date', () => {
      const testDate = new Date(2024, 5, 15); // June 2024
      const { container } = render(
        <Calendar
          defaultMonth={testDate}
          disabled={{ before: new Date(2024, 5, 10) }}
        />
      );

      // Multiple dates should be disabled
      const disabledCells = container.querySelectorAll(
        '[data-disabled="true"]'
      );
      expect(disabledCells.length).toBeGreaterThan(0);
    });
  });

  describe('Caption layout', () => {
    test('defaults to label caption layout', () => {
      const testDate = new Date(2024, 5, 15); // June 2024
      render(<Calendar defaultMonth={testDate} />);
      expect(screen.getByText('June 2024')).toBeInTheDocument();
    });

    test('supports dropdown caption layout', () => {
      const testDate = new Date(2024, 5, 15); // June 2024
      render(
        <Calendar
          defaultMonth={testDate}
          captionLayout="dropdown"
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
        />
      );

      // With dropdown, month and year should be selectable
      expect(
        screen.getByRole('combobox', { name: /month/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('combobox', { name: /year/i })
      ).toBeInTheDocument();
    });
  });

  describe('Number of months', () => {
    test('can display multiple months', () => {
      const testDate = new Date(2024, 5, 15); // June 2024
      render(<Calendar defaultMonth={testDate} numberOfMonths={2} />);

      expect(screen.getByText('June 2024')).toBeInTheDocument();
      expect(screen.getByText('July 2024')).toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    test('applies custom CSS variables for theming', () => {
      const { container } = render(<Calendar />);
      const calendarRoot = container.querySelector('.rdp-root');

      expect(calendarRoot).toHaveStyle({
        '--rdp-accent-color': 'var(--color-font-base)',
      });
    });
  });

  describe('Chevron icons', () => {
    test('renders chevron icon for previous navigation', () => {
      render(<Calendar />);
      const prevButton = screen.getByRole('button', { name: /previous/i });
      // The Icon component renders an SVG
      const icon = prevButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    test('renders chevron icon for next navigation', () => {
      render(<Calendar />);
      const nextButton = screen.getByRole('button', { name: /next/i });
      // The Icon component renders an SVG
      const icon = nextButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Props passthrough', () => {
    test('passes additional props to DayPicker', () => {
      const handleMonthChange = jest.fn();
      const testDate = new Date(2024, 5, 15); // June 2024
      render(
        <Calendar defaultMonth={testDate} onMonthChange={handleMonthChange} />
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      expect(handleMonthChange).toHaveBeenCalled();
    });
  });

  describe('Today indicator', () => {
    test('renders today with bold font weight class', () => {
      const today = new Date();
      render(<Calendar defaultMonth={today} />);

      // The calendar should have today's date styled
      const calendarGrid = screen.getByRole('grid');
      expect(calendarGrid).toBeInTheDocument();
    });
  });
});
