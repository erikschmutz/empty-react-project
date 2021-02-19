import { classnames } from 'tailwindcss-classnames';
import { BaseProps } from './Props';

type TypographySize = 'lg' | 'md' | 'sm';
type TypographyType = 'error' | 'default';

interface TypographyInput extends BaseProps {
    size?: TypographySize;
    type?: TypographyType;
    children: React.ReactNode;
}

export default function Typography(props: TypographyInput) {
    const { children, size = 'md', type = 'default', className } = props;

    const sizeClass: string = {
        md: '',
        lg: '',
        sm: '',
    }[size];

    const typeClass: string = {
        error: classnames('text-red-500'),
        default: '',
    }[type];

    const defaultClasses: string = classnames('text-base');

    return (
        <p
            className={`${typeClass} ${sizeClass} ${defaultClasses} ${className}`}
        >
            {children}
        </p>
    );
}
