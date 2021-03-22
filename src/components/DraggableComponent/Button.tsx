import React from 'react'
import {Button} from 'react-bootstrap'
import { useDrag } from 'react-dnd'
const ButtonDraggable = (props: {data: any, uniqueId: string}) => {
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
    return <Button
        type="button"
        ref={dragRef}
        style={{
            position: 'absolute',
            top: data.y, 
            left: data.x,
            fontSize: data.fontSize,
            fontWeight: data.fontWeight,
            opacity
        }}>
        {data.text}
    </Button>
}

export default ButtonDraggable;
