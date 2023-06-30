import React, { FC, useEffect, useRef } from 'react';
import cnBind from 'classnames/bind';
import { useStores } from 'hooks';
import { observer } from 'mobx-react';
import { Brush } from 'paint-tools';

import styles from './Canvas.module.scss';

const cx = cnBind.bind(styles);

export const Canvas: FC = observer(() => {
    const { canvas, tools, room } = useStores();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        canvas.setCanvas(canvasRef.current);
        tools.setTool(new Brush(canvasRef.current, room));
    }, [canvas, room, tools]);

    return (
        <div className={cx('canvas-wrapper')}>
            <canvas className={cx('canvas')} ref={canvasRef} width={800} height={600} />
        </div>
    );
});
