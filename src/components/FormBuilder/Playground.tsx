// @ts-nocheck
import React, { useState } from 'react'
import { useDrop } from "react-dnd";
import ModalForm from '../ModalForm';
import { Label, Input, ButtonDraggable } from '../DraggableComponent'

const Playground = () => {
    const [show, setShow] = useState(false);
    const [elements, updateElements] = useState([]);
    const handleClose = () => setShow(false);
    const [, dropTarget] = useDrop(() => ({
        accept: 'components',
        drop: (item, monitor) => {
            const delta = monitor.getSourceClientOffset()
            setShow({type: item?.type, x: Number(delta?.x), y: Number(delta?.y)})
        }
    }))
    const addElement = (data: any) => {
        console.log(data, show)
        // @ts-ignore
        updateElements([...elements, {...data, type: show?.type}])
        handleClose();
    }

    return (
        <section className="playGround" ref={dropTarget}>
            {elements.map(element => (
                <>
                    {element.type === 'Label' && <Label data={element} />}
                    {element.type === 'Input' && <Input data={element} />}
                    {element.type === 'Button' && <ButtonDraggable data={element} />}
                </>
            ))}
            <ModalForm data={show} handleClose={handleClose} addElement={addElement} />
        </section>
    )
}

export default Playground;