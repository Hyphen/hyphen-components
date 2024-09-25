import React from "react";
import {FC} from "react";
import classNames from "classnames";
import styles from "./RangeInput.module.scss";

export interface InputRangeProps {
	/**
	 * The input's id attribute.
	 */
	id: string;
	/**
	 * The value of the range.
	 */
	value: number;
	/**
	 * The maximum value of the range.
	 */
	max: number;
	/**
	 * Callback function to call on change event.
	 */
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Custom class to be added to standard input classes.
	 */
	className?: string;
	/**
	 * If the input should be disabled and not focusable.
	 */
	isDisabled?: boolean;
}

export const RangeInput: FC<InputRangeProps> = ({
  value = 0,
  max = 0,
	id,
	onChange,
	className,
	isDisabled=false,
	...restProps
}) => {
	const currentProgress = value > 0 ? (value / max) * 100 : 0;

	return (
		<input
			{...restProps}
			id={id}
			type="range"
			min="0"
			value={value}
			max={max}
			className={classNames(styles.slider, className, {
				[styles.disabled]: isDisabled,
			})}
			onChange={onChange}
			disabled={isDisabled}
			style={{
				background: `linear-gradient(to right, var(--color-base-grey-400) ${currentProgress}%, var(--color-base-grey-700) ${currentProgress}%)`,
			}}
		/>
	);
}
