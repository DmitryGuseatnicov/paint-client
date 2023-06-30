import React from 'react';
import cnBind from 'classnames/bind';
import { useStores } from 'hooks';
import { observer } from 'mobx-react';

import styles from './UsersList.module.scss';

const cx = cnBind.bind(styles);

export const UsersList = observer(() => {
    const { room } = useStores();

    return (
        <div className={cx('users-list')}>
            <div>Гости:</div>
            {room.roomUsers.map((userName) => (
                <div key={Math.random()}>{userName}</div>
            ))}
        </div>
    );
});
