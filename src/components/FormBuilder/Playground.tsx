// @ts-nocheck
import React, { useState } from 'react'
import { useDrop } from "react-dnd";
import ModalForm from '../ModalForm';
import { Label, Input, ButtonDraggable } from '../DraggableComponent'
import uuidv4 from '../../utils/uuidv4';
import useKeyPress from './useKeyPress';

const Playground = () => {
    const [show, setShow] = useState(false);
    const [elements, updateElements] = useState({});
    const [selectedElement, setSelectedElement] = useState(false);
    const removeElement = () => {
        if (selectedElement) {
            const currentElements = {...elements};
            delete currentElements[selectedElement];
            updateElements({...currentElements})
        }
    }

    useKeyPress('Delete', removeElement, [elements, selectedElement]);
    useKeyPress('Backspace', removeElement, [elements, selectedElement]);

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
        <section className="playGround" ref={dropTarget} onClick={() => setSelectedElement(false)}>
            {Object.entries(elements).map(([key, element]) => (
                <>
                    {element.type === 'Label' && <Label
                        data={element}
                        key={key}
                        uniqueId={key}
                        isSelected={selectedElement === key}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement(key)
                        }}
                    />}
                    {element.type === 'Input' && <Input
                        data={element}
                        key={key}
                        uniqueId={key}
                        isSelected={selectedElement === key}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement(key)
                        }}
                    />}
                    {element.type === 'Button' && <ButtonDraggable
                        data={element}
                        key={key}
                        uniqueId={key}
                        isSelected={selectedElement === key}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement(key)
                        }}
                    />}
                </>
            ))}
            <ModalForm data={show} handleClose={handleClose} addElement={addElement} />
        </section>
    )
}

export default Playground;