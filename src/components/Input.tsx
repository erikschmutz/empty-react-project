import { classnames } from 'tailwindcss-classnames';
import { OnChangeProps } from './Props';
import React from 'react';

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
interface TextFieldInput extends OnChangeProps<OnChangeEvent> {
    placeholder?: string;
    defaultValue?: string;
    size?: 'lg' | 'md';
    password?: boolean;
    name?: string;
}

export default React.forwardRef<HTMLInputElement, TextFieldInput>(
    function TextField(props: TextFieldInput, ref) {
        const {
            className,
            password,
            placeholder,
            onChange,
            size = 'md',
            defaultValue,
            name,
        } = props;

        const defaultClass: string = classnames(
            'focus:outline-none',
            'border',
            'p-1',
            'rounded',
            'w-full',
            'mt-2',
            'mb-2',
        );

        const sizeClass: string = {
            md: '',
            lg: '',
        }[size];

        return (
            <input
                name={name}
                ref={ref}
                placeholder={placeholder}
                type={password ? 'password' : undefined}
                className={`${sizeClass} ${defaultClass} ${className}`}
                defaultValue={defaultValue}
                onChange={onChange}
            />
        );
    },
);
