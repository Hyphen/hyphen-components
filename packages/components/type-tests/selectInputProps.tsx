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

const syncSelectWithDefaultOptions = (
  // @ts-expect-error defaultOptions is only supported by async selects.
  <SelectInput
    id="sync-select"
    label="Sync select"
    onChange={() => undefined}
    options={defaultOptions}
    value={null}
    defaultOptions={defaultOptions}
  />
);

void asyncSelect;
void syncSelectWithDefaultOptions;
