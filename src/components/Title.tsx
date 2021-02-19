import { BaseProps } from './Props';
import { classnames } from 'tailwindcss-classnames';

interface TitleInput extends BaseProps {
    children: React.ReactNode;
    level?: 'h1' | 'h2' | 'h3';
}

type NativeHTMLElementProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
>;

export default function Title(props: TitleInput) {
    const { children, className, level = 'h1' } = props;

    const el = {
        h1: (props: NativeHTMLElementProps) => (
            <h1 {...props}>{props.children}</h1>
        ),
        h2: (props: NativeHTMLElementProps) => (
            <h2 {...props}>{props.children}</h2>
        ),
        h3: (props: NativeHTMLElementProps) => (
            <h3 {...props}>{props.children}</h3>
        ),
    }[level];

    const levelClass = {
        h1: classnames('text-6xl', 'font-bold'),
        h2: '',
        h3: '',
    }[level];

    const defaultClass: string = classnames('mb-5');

    const config: NativeHTMLElementProps = {
        className: `${levelClass} ${defaultClass} ${className}`,
        children: children,
    };

    return el(config);
}
