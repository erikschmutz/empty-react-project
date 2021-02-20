import { OnClickProps } from './Props';
import { classnames } from 'tailwindcss-classnames';

type ButtonSize = 'lg' | 'md' | 'sm';
type ButtonType = 'primary' | 'ghost' | 'secondary';
type OnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ButtonInput extends OnClickProps<OnClickEvent> {
    size?: ButtonSize;
    type?: ButtonType;
    disable?: boolean;
    children: string;
}

export default function Button(props: ButtonInput) {
    const {
        children,
        size = 'md',
        onClick,
        type = 'primary',
        className,
        disable,
    } = props;

    const typeClass: string = {
        primary: classnames('bg-blue-900', 'hover:bg-blue-500', 'text-white'),
        secondary: classnames(
            'hover:shadow',
            'text-black',
            'border',
            'bg-white',
        ),
        ghost: '',
    }[type];

    const sizeClass: string = {
        md: '',
        lg: '',
        sm: '',
    }[size];

    const defaultClass: string = classnames(
        'outline-none',
        'focus:outline-none',
        'rounded-full',
        'p-2',
        'pl-5',
        'pr-5',
        'transition-all',
        'ml-1',
        'mr-1',
    );

    const disabled = disable ? classnames('text-opacity-40') : '';

    return (
        <button
            onClick={!disable ? onClick : undefined}
            className={`${defaultClass} ${typeClass} ${sizeClass} ${disabled} ${className}`}
        >
            {children}
        </button>
    );
}
