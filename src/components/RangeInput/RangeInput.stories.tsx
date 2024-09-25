import React, {useState} from 'react';
import type { Meta } from '@storybook/react';
import {RangeInput} from "./RangeInput";

const meta: Meta<typeof RangeInput> = {
	title: 'Components/RangeInput',
	component: RangeInput,
	parameters: {
		controls: { hideNoControlsWarning: true },
	},
};

export default meta;

export const Default = () => {
	const [value, setValue] = useState(50);

	return (
		<>
		<RangeInput
			id="range"
			value={value}
			max={100}
			onChange={(event) => setValue(+event.target.value)}
		/>
			<p>Value: {value}</p>
		</>
	);
};

export const Disabled = () => {
	const [value, setValue] = useState(50);

	return (
		<RangeInput
			id="range-disabled"
			value={value}
			max={100}
			onChange={(event) => setValue(+event.target.value)}
			isDisabled={true}
		/>
	);
};
