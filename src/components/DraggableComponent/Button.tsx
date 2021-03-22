import React from 'react'
import {Button} from 'react-bootstrap'
import { useDrag } from 'react-dnd'
import IProps from './types'

const ButtonDraggable = (props: IProps) => {
    const {data, uniqueId, isSelected, onClick} = props;
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: 'components',
          item: { type: 'Input',  uniqueId},
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            // outlineClass: monitor.isDragging() ? 'elementOutline' : ''
          })
        }),
        []
    )
    return <Button
        type="button"
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
        }}>
        {data.text}
    </Button>
}

export default ButtonDraggable;
