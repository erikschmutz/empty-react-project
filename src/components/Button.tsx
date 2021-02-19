import { OnClickProps } from './Props';
import { classnames } from 'tailwindcss-classnames';

type ButtonSize = 'lg' | 'md' | 'sm';
type ButtonType = 'primary' | 'ghost' | 'secondary';
type OnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ButtonInput extends OnClickProps<OnClickEvent> {
    size?: ButtonSize;
    type?: ButtonType;
    children: string;
}

export default function Button(props: ButtonInput) {
    const {
        children,
        size = 'md',
        onClick,
        type = 'primary',
        className,
    } = props;

    const typeClass: string = {
        primary: classnames('bg-blue-900', 'hover:bg-blue-500', 'text-white'),
        secondary: classnames('hover:shadow', 'text-black', 'border'),
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

    return (
        <button
            onClick={onClick}
            className={`${typeClass} ${sizeClass} ${defaultClass} ${className} `}
        >
            {children}
        </button>
    );
}
