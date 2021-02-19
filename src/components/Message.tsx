import Notification from 'rc-notification';
import { NotificationInstance } from 'rc-notification/lib/Notification';
import { classnames } from 'tailwindcss-classnames';

let notification: NotificationInstance | null = null;
Notification.newInstance({}, (n) => (notification = n));

interface MessageInput {
    message: string;
    color?: string;
    backgroundColor?: string;
}

function showMessage(props: MessageInput) {
    if (notification)
        notification.notice({
            duration: 1.5,
            style: {
                transform: 'translate(-50%)',
                backgroundColor: props.backgroundColor,
                color: props.color,
                padding: '0.5em',
            },
            className: classnames('shadow'),
            content: <span>{props.message}</span>,
            onClose() {
                console.log('simple close');
            },
        });
    else console.error(notification);
    return;
}

const Message = {
    success: (message: string) =>
        showMessage({
            message,
            color: 'green',
            backgroundColor: 'white',
        }),
    fail: (message: string) =>
        showMessage({
            message,
            color: 'white',
            backgroundColor: 'red',
        }),
};

export default Message;
