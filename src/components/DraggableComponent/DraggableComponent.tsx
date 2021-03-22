import React from 'react'
import { useDrag } from 'react-dnd'
import dragIcon from '../../assets/grip-vertical.png';
import {dndIdentifier} from './types';

const DraggableComponent = (props: {type: string}) => {
    const {type} = props
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: dndIdentifier,
          item: { type },
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
        }),
        []
      )
    return (
        <div className="dragComponents" ref={dragRef} style={{ opacity }}>
            <img src={dragIcon} alt="DragIcon" />
            <p>{type}</p>
        </div>
    )
}

export default DraggableComponent;
