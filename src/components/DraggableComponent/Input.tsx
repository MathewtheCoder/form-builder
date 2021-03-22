import React from 'react'
import { useDrag } from 'react-dnd'

const Input = (props: {data: any, uniqueId: string}) => {
    const {data, uniqueId} = props;
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
