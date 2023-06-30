import React, { useState } from 'react';
import cnBind from 'classnames/bind';
import { useStores } from 'hooks';
import { Brush, Rect } from 'paint-tools';

import { HistoryAction, ToolName } from './Toolbar.types';

import styles from './Toolbar.module.scss';

const cx = cnBind.bind(styles);

export const Toolbar = () => {
    const { tools, canvas, room } = useStores();

    const [toolName, setToolName] = useState<ToolName>('brush');

    const handleToolButtonClick = (tool: ToolName) => () => {
        if (tool === 'brush') {
            setToolName('brush');
            tools.setTool(new Brush(canvas.canvas, room));
        }

        if (tool === 'rect') {
            setToolName('rect');
            tools.setTool(new Rect(canvas.canvas, room));
        }
    };

    const handleActionButtonClick = (type: HistoryAction) => () => {
        if (type === 'back') {
            room.sendFigure({ action: 'undo' });
        }

        if (type === 'forward') {
            room.sendFigure({ action: 'redo' });
        }
    };

    return (
        <div className={cx('toolbar')}>
            <div className={cx('tools')}>
                <button
                    className={cx('button', { active: toolName === 'brush' })}
                    type="button"
                    onClick={handleToolButtonClick('brush')}
                >
                    brush
                </button>
                <button
                    className={cx('button', { active: toolName === 'rect' })}
                    type="button"
                    onClick={handleToolButtonClick('rect')}
                >
                    rect
                </button>
            </div>
            <div className={cx('actions')}>
                <button className={cx('button')} type="button" onClick={handleActionButtonClick('back')}>
                    назад
                </button>
                <button className={cx('button')} type="button" onClick={handleActionButtonClick('forward')}>
                    вперед
                </button>
            </div>
        </div>
    );
};
