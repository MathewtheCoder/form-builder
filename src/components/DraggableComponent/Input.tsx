import React from 'react'
import { useDrag } from 'react-dnd'
import IProps from './types'

const Input = (props: IProps) => {
    const {data, uniqueId, isSelected, onClick} = props;
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: 'components',
          item: { type: 'Input',  uniqueId},
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
        }),
        []
    )
    return (
        <input
            type="text"
            placeholder={data.text}
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
        />
    )
}

export default Input;
