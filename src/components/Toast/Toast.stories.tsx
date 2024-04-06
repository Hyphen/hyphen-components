import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { ToastContainer, ToastPosition, toast } from './';
import { Button } from '../Button/Button';
import { Table } from '../Table/Table';
import { Box } from '../Box/Box';

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [
    (Story, { args, viewMode }) => (
      <>
        {viewMode === 'story' && <ToastContainer />}
        <Story args={{ ...args }} />
      </>
    ),
  ],
};

export default meta;

export const ContentGuidelines = () =>
  (() => {
    const handleClick = () => toast('Proposal saved', { duration: 5000 });
    return <Button onClick={handleClick}>Show toast</Button>;
  })();

export const Column = () =>
  (() => {
    const codePreviewStyle = {
      padding: '3px 5px',
      borderRadius: '3px',
      border: '1px solid #EEEEEE',
      color: 'rgba(51,51,51,0.9)',
      backgroundColor: '#F8F8F8',
    };
    const toastInterfaceRows = [
      {
        name: 'id',
        type: 'string',
        description:
          'Unique id of toast. This is autogenerated if not included, but can be included to update an existing toast.',
      },
      {
        name: 'duration',
        type: 'number',
        description:
          'Duration (in milliseconds) that toast remains on screen before auto-dismissing.',
      },
      {
        name: 'ariaProps',
        type: "{ role: 'status' | 'alert', 'aria-live': 'assertive' | 'off' | 'polite' }",
        description: 'Accessibility props to be passed down to toast.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Custom class.',
      },
      {
        name: 'style',
        type: 'CSS.StyleObject',
        description: 'Custom styles',
      },
      {
        name: 'position',
        type: "  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';",
        description:
          'Toast position (overrides global container toast position)',
      },
      {
        name: 'canDismiss',
        type: 'boolean',
        description:
          'Whether toast includes the close/dismiss icon allowing user to close it (defaults to true)',
      },
      {
        name: 'isCompact',
        type: 'boolean',
        description: 'Whether to render a compact toast (smaller padding)',
      },
    ];
    const columnConfig = [
      { heading: 'Name', dataKey: 'name' },
      {
        heading: 'Type',
        dataKey: 'type',
        render: (cell: any) => <code style={codePreviewStyle}>{cell}</code>,
      },
      { heading: 'Description', dataKey: 'description' },
    ];
    return (
      <Table rowKey="name" columns={columnConfig} rows={toastInterfaceRows} />
    );
  })();

export const Position = () =>
  (() => {
    const handleClick = (position: ToastPosition) =>
      toast('Hey there', { position });
    return (
      <Box gap="md" direction="row">
        <Button onClick={() => handleClick('top-right')}>top right</Button>
        <Button onClick={() => handleClick('top-center')}>top center</Button>
        <Button onClick={() => handleClick('top-left')}>top left</Button>
        <Button onClick={() => handleClick('bottom-right')}>
          bottom right
        </Button>
        <Button onClick={() => handleClick('bottom-center')}>
          bottom center
        </Button>
        <Button onClick={() => handleClick('bottom-left')}>bottom left</Button>
      </Box>
    );
  })();

export const Duration = () =>
  (() => {
    const handleClick = () => {
      toast(`toast will close in 6 seconds`, { duration: 6000 });
    };
    return (
      <Box gap="md" direction="row">
        <Button onClick={handleClick}>Open toast with custom duration</Button>
      </Box>
    );
  })();

export const Dismissible = () =>
  (() => {
    const handleClick = () => {
      toast(`This toast can't be dismissed`, {
        duration: 5000,
        canDismiss: false,
      });
    };
    return (
      <Box gap="md" direction="row">
        <Button onClick={handleClick}>Open non-dismissible toast</Button>
      </Box>
    );
  })();

export const ProgrammaticDismiss = () => {
  const [toastId, setToastId] = useState('');
  const handleClick = () => {
    if (!toastId) {
      const newToastId = toast(`Dismiss programmatically`, {
        duration: 30000,
        canDismiss: false,
      });
      setToastId(newToastId);
    }
  };
  const handleDismiss = () => {
    if (toastId) {
      toast.dismiss(toastId);
      setToastId('');
    }
  };
  return (
    <>
      <Box gap="md" direction="row">
        <Button onClick={handleClick} isDisabled={!!toastId}>
          Show Toast
        </Button>
        <Button
          variant="tertiary"
          isDisabled={!toastId}
          onClick={handleDismiss}
        >
          Dismiss toast
        </Button>
      </Box>
    </>
  );
};

export const Compact = () =>
  (() => {
    const handleClick = () => {
      toast('This is compact', { isCompact: true });
    };
    return (
      <Box gap="md" direction="row">
        <Button onClick={handleClick}>Open compact toast</Button>
      </Box>
    );
  })();

export const BasicTypes = () =>
  (() => {
    const handleClick = (type: 'blank' | 'error' | 'success' | 'loading') => {
      if (type === 'success') {
        toast.success('Proposal saved');
      } else if (type === 'error') {
        toast.error('Unable to save');
      } else if (type === 'loading') {
        toast.loading('Loading...', { canDismiss: false });
      } else {
        toast('Toast without icon');
      }
    };
    return (
      <>
        <Box fontSize="lg" fontWeight="bold" margin="0 0 md 0">
          Basic Types
        </Box>
        <Box gap="md" direction="row">
          <Button onClick={() => handleClick('blank')} variant="secondary">
            Default
          </Button>
          <Button onClick={() => handleClick('error')} variant="secondary">
            Error
          </Button>
          <Button onClick={() => handleClick('success')} variant="secondary">
            Success
          </Button>
          <Button onClick={() => handleClick('loading')} variant="secondary">
            Loading
          </Button>
        </Box>
      </>
    );
  })();

export const AdvancedTypes = () =>
  (() => {
    const handleClick = (type: 'async' | 'async-data') => {
      if (type.includes('async')) {
        const promise = new Promise((resolve, reject) => {
          const randomNum = Math.floor(Math.random() * 2);
          setTimeout(() => {
            if (randomNum % 2 === 0) {
              resolve(', data loaded');
            } else {
              reject(', bad request');
            }
          }, 2000);
        });
        toast.async(promise, {
          loading: 'loading',
          success: (data) => `Success${type.includes('data') ? data : ''}`,
          error: (err) => `Error${type.includes('data') ? err : ''}`,
        });
      }
    };
    return (
      <>
        <Box fontSize="lg" fontWeight="bold" margin="0 0 md 0">
          Advanced Types
        </Box>
        <Box display="block" childGap="md">
          <Box display="block" childGap="sm">
            <p>
              With an async toast, you can pass the three states of an async op
              (loading, success, error) to a corresponding toast state. By
              passing the promise itself to the toast component, will will
              handle displaying different toast variations based on the state of
              the passed promise.
            </p>
            <Button onClick={() => handleClick('async')} variant="primary">
              async
            </Button>
          </Box>
          <Box display="block" childGap="sm">
            <p>
              If you need to include data or an error returned from the promise
              you can pass a function to the toasts in question, see code
              example.
            </p>
            <Button onClick={() => handleClick('async-data')} variant="primary">
              async (including promise data)
            </Button>
          </Box>
        </Box>
      </>
    );
  })();
