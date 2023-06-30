import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cnBind from 'classnames/bind';
import { useStores } from 'hooks';
import { observer } from 'mobx-react';

import { Canvas } from 'components';
import { Chat } from 'components/Chat';
import { LoginForm } from 'components/LoginForm';
import { Toolbar } from 'components/Toolbar';
import { ToolSettings } from 'components/ToolSettings';
import { UsersList } from 'components/UsersList';

import styles from './Paint.module.scss';

const cx = cnBind.bind(styles);

export const Paint = observer(() => {
    const { roomId } = useParams();
    const { room } = useStores();

    const handleFormSubmit = useCallback(
        (name: string) => {
            if (roomId) {
                room.connectToRoom({ roomId, name });
            }
        },
        [room, roomId],
    );

    return (
        <div className={cx('page')}>
            {room.userName ? (
                <div>
                    <Toolbar />
                    <ToolSettings />
                    <div className={cx('content')}>
                        <Chat />
                        <Canvas />
                        <UsersList />
                    </div>
                </div>
            ) : (
                <LoginForm onSubmit={handleFormSubmit} />
            )}
        </div>
    );
});
