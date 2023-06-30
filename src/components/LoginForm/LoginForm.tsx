/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import cnBind from 'classnames/bind';

import styles from './LoginForm.module.scss';

const cx = cnBind.bind(styles);

interface Props {
    onSubmit: (name: string) => void;
}

export const LoginForm = ({ onSubmit }: Props) => {
    const [formState, setFormState] = useState({ name: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formState.name);
    };

    return (
        <form className={cx('form')} onSubmit={handleSubmit}>
            <label>
                <span>Name:</span>
                <input type="text" name="name" onChange={handleInputChange} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};
