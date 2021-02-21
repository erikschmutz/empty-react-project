import { ReactNode } from 'react';
import Card from './Card';

interface ModalInput {
    children: ReactNode;
    onClose?: () => void;
    visible: boolean;
}

function Modal(props: ModalInput) {
    const { visible, children } = props;

    if (!visible) return <></>;
    return (
        <div className="w-screen h-screen bg-black fixed left-0 top-0 z-50 bg-opacity-70">
            <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform z-50">
                {children}
            </Card>
        </div>
    );
}

export default Modal;
