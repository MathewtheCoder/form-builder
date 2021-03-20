import React from 'react'
import dragIcon from '../../assets/grip-vertical.png';

const DraggableComponent = (props: {type: string}) => {
    const {type} = props
    return (
        <div className="dragComponents">
            <img src={dragIcon} alt="DragIcon" />
            <p>{type}</p>
        </div>
    )
}

export default DraggableComponent;
