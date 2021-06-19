// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useDrop } from "react-dnd";
import ModalForm from '../ModalForm';
import { Label, Input, ButtonDraggable } from '../DraggableComponent'
import uuidv4 from '../../utils/uuidv4';
import useKeyPress from './useKeyPress';
import useUndo from './useUndo'
import { dndIdentifier, ElementTypes } from '../DraggableComponent/types'

const Playground = () => {
    const [show, setShow] = useState(false);
    const [elements, updateElements] = useState({});
    const [undoStack, updateUndoStack] = useState([]);
    const [selectedElement, setSelectedElement] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const elementsFromStorage = JSON.parse(localStorage.getItem('elements'))
        updateElements(elementsFromStorage ?? {})
    }, [])
    useEffect(() => {
        localStorage.setItem('elements', JSON.stringify(elements))
    }, [elements])
    const undoAction = () => {
        updateElements(undoStack?.[undoStack.length - 2] ?? []);
        updateUndoStack(prev => prev.slice(0, -1))
    }
    const undoStackPush = (elements) => updateUndoStack(prev => [...prev, elements])
    // Event handler to remove elements on Delete keypress
    const removeElement = () => {
        if (selectedElement) {
            const currentElements = {...elements};
            delete currentElements[selectedElement];
            updateElements({...currentElements})
            undoStackPush(currentElements);
        }
    }
    // Event handler to show modal element on enter key press
    const editElement = () => {
        if (elements.hasOwnProperty(selectedElement)) {
            setShow({
                ...elements[selectedElement],
                uniqueId: selectedElement, 
            })
        }
    }
    useKeyPress('Delete', removeElement, [elements, selectedElement]);
    useKeyPress('Backspace', removeElement, [elements, selectedElement]);
    useKeyPress('Enter', editElement, [elements, selectedElement])
    useUndo(undoAction, [undoStack])
    const [, dropTarget] = useDrop(() => ({
        accept: dndIdentifier,
        drop: (item, monitor) => {
            const delta = monitor.getSourceClientOffset()
            if (item?.uniqueId) {
                let currentElements;
                updateElements(prevElements => {
                    currentElements =  {
                        ...prevElements,
                        [item?.uniqueId]:{
                            ...prevElements[item?.uniqueId],
                            x: Number(delta?.x),
                            y: Number(delta?.y)
                        }
                    }
                    return currentElements
                })
                undoStackPush(currentElements)
            } else {
                setShow({
                    type: item?.type,
                    x: Number(delta?.x),
                    y: Number(delta?.y)
                })
            }
        }
    }))
    // 
    const addElement = (data: any) => {
        const uuid = data?.uniqueId || uuidv4();
        // @ts-ignore
        const updatedElements = {...elements, [uuid]:{...data, type: show?.type}}
        updateElements(updatedElements);
        undoStackPush(updatedElements);
        handleClose();
    }
    return (
        <section className="playGround" ref={dropTarget} onClick={() => setSelectedElement(false)}>
            {Object.entries(elements).map(([key, element]) => (
                <React.Fragment key={key}>
                    {element.type === ElementTypes.Label && <Label
                        data={element}
                        uniqueId={key}
                        isSelected={selectedElement === key}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement(key)
                        }}
                    />}
                    {element.type === ElementTypes.Input && <Input
                        data={element}
                        uniqueId={key}
                        isSelected={selectedElement === key}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement(key)
                        }}
                    />}
                    {element.type === ElementTypes.Button && <ButtonDraggable
                        data={element}
                        uniqueId={key}
                        isSelected={selectedElement === key}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement(key)
                        }}
                    />}
                </React.Fragment>
            ))}
            <ModalForm data={show} handleClose={handleClose} addElement={addElement} />
        </section>
    )
}

export default Playground;