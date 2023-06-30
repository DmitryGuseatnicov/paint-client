import React, { useState } from 'react';
import cnBind from 'classnames/bind';
import { useStores } from 'hooks';
import { observer } from 'mobx-react';

import styles from './Chat.module.scss';

const cx = cnBind.bind(styles);

export const Chat = observer(() => {
    const { chat, room } = useStores();
    const [formState, setFormState] = useState({
        message: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        room.sendMessage(formState.message);
        setFormState({ message: '' });
    };

    return (
        <div className={cx('chat')}>
            <div className={cx('messages')}>
                {chat.messages.map(({ message, userName, id, author }) => (
                    <div className={cx('message', { author })} key={id}>
                        <div className={cx('user-name')}>{userName}:</div>
                        <div>{message}</div>
                    </div>
                ))}
            </div>
            <form className={cx('form')} onSubmit={handleFormSubmit}>
                <input type="text" name="message" value={formState.message} onChange={handleInputChange} />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
});
