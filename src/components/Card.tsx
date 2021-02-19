import { BaseProps } from './Props';

interface CardInput extends BaseProps {
    children: React.ReactNode;
}

export default function Card(props: CardInput) {
    const { children, className } = props;

    return <div className={'shadow-md p-10 ' + className}>{children}</div>;
}
