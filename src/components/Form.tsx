import { ReactNode } from 'react';
import { OnChangeProps } from './Props';

type OnChangeEvent = React.ChangeEvent<HTMLFormElement>;
interface FormInput extends OnChangeProps<OnChangeEvent> {
    children: ReactNode;
    onSubmit?: (e: any) => {};
}

function Form(props: FormInput) {
    const { children, onSubmit, onChange } = props;

    return (
        <form onChange={onChange} onSubmit={onSubmit}>
            {children}
        </form>
    );
}

export default Form;
