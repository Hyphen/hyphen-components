import React from 'react';
import {
  SelectInput,
  SelectInputOptions,
} from '../src/components/SelectInput/SelectInput';

const defaultOptions: SelectInputOptions = [
  { value: 'initial', label: 'Initial option' },
];

const asyncSelect = (
  <SelectInput
    id="async-select"
    isAsync
    label="Async select"
    onChange={() => undefined}
    options={async () => defaultOptions}
    value={null}
    defaultOptions={defaultOptions}
  />
);

void asyncSelect;
