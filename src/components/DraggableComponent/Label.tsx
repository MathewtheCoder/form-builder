import React from 'react';
import { useDrag } from 'react-dnd'
import IProps from './types'

const Label = (props: IProps) => {
    const {data, uniqueId, isSelected, onClick} = props;
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: 'components',
          item: { type: 'Label',  uniqueId},
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
        }),
        []
    )
    return (
        <label
            ref={dragRef}
            className={isSelected ? 'elementOutline' : ''}
            onClick={onClick}
            style={{
                position: 'absolute',
                top: data.y,
                left: data.x,
                fontSize: data.fontSize,
                fontWeight: data.fontWeight,
                opacity
            }}
        >
            {data.text}
        </label>
    )
}
export default Label;