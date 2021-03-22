// @ts-nocheck
import React, { useState } from 'react'
import { useDrop } from "react-dnd";
import ModalForm from '../ModalForm';
import { Label, Input, ButtonDraggable } from '../DraggableComponent'
import uuidv4 from '../../utils/uuidv4';

const Playground = () => {
    const [show, setShow] = useState(false);
    const [elements, updateElements] = useState({});
    const handleClose = () => setShow(false);
    const [, dropTarget] = useDrop(() => ({
        accept: 'components',
        drop: (item, monitor) => {
            const delta = monitor.getSourceClientOffset()
            if (item?.uniqueId) {
                updateElements(prevElements => ({
                    ...prevElements,
                    [item?.uniqueId]:{
                        ...prevElements[item?.uniqueId],
                        x: Number(delta?.x),
                        y: Number(delta?.y)
                    }
                }))
            } else {
                setShow({
                    type: item?.type,
                    x: Number(delta?.x),
                    y: Number(delta?.y)
                })
            }
        }
    }))
    const addElement = (data: any) => {
        console.log(data, show)
        const uuid = uuidv4()
        // @ts-ignore
        updateElements({...elements, [uuid]:{...data, type: show?.type}})
        handleClose();
    }
    console.log(elements)
    return (
        <section className="playGround" ref={dropTarget}>
            {Object.entries(elements).map(([key, element]) => (
                <>
                    {element.type === 'Label' && <Label
                        data={element}
                        key={key}
                        uniqueId={key}
                    />}
                    {element.type === 'Input' && <Input
                        data={element}
                        key={key}
                        uniqueId={key}
                    />}
                    {element.type === 'Button' && <ButtonDraggable
                        data={element}
                        key={key}
                        uniqueId={key}
                    />}
                </>
            ))}
            <ModalForm data={show} handleClose={handleClose} addElement={addElement} />
        </section>
    )
}

export default Playground;