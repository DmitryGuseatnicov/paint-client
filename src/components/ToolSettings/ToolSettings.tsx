/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cnBind from 'classnames/bind';
import { useStores } from 'hooks';

import { SettingType } from './ToolSettings.types';

import styles from './ToolSettings.module.scss';

const cx = cnBind.bind(styles);

export const ToolSettings = () => {
    const { tools } = useStores();

    const handleInputChange = (settingsType: SettingType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (settingsType) {
            case 'line-width':
                tools.setLineWidth(Number(event.target.value));
                break;
            case 'stroke-color':
                tools.setStrokeColor(event.target.value);
                break;
            case 'fill-color':
                tools.setFillColor(event.target.value);
                break;
            default:
                return;
        }
        tools.setLineWidth(Number(event.target.value));
    };

    return (
        <div className={cx('tool-settings')}>
            <label className={cx('tool')}>
                <span>line width</span>
                <input min={1} defaultValue={1} type="number" onChange={handleInputChange('line-width')} />
            </label>
            <label className={cx('tool')}>
                <span>color</span>
                <input type="color" onChange={handleInputChange('stroke-color')} />
            </label>
            <label className={cx('tool')}>
                <span>fill</span>
                <input type="color" onChange={handleInputChange('fill-color')} />
            </label>
        </div>
    );
};
