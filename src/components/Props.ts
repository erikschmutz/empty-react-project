export interface BaseProps {
    className?: string;
}

export interface OnClickProps<E> extends BaseProps {
    onClick?: (event: E) => void;
}

export interface OnChangeProps<E> extends BaseProps {
    onChange?: (event: E) => void;
}
