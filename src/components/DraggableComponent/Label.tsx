import React from 'react';
import { useDrag } from 'react-dnd'
import IProps, { ElementTypes, dndIdentifier } from './types'

const Label = (props: IProps) => {
    const {data, uniqueId, isSelected, onClick} = props;
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: dndIdentifier,
          item: { type: ElementTypes.Label,  uniqueId},
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