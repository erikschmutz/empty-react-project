import { BaseProps } from './Props';
import { classnames } from 'tailwindcss-classnames';

export default function Divider(props: BaseProps) {
    const { className } = props;

    const defaultClass: string = classnames('bg-gray-400', 'mb-5', 'mt-5');

    return <hr className={`${defaultClass} ${className}`} />;
}
