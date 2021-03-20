import React, { useState } from 'react'
import { useDrop } from "react-dnd";
import ModalForm from '../ModalForm';

const Playground = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [, dropTarget] = useDrop(() => ({
        accept: 'components',
        drop: (item, monitor) => {
            const delta = monitor.getSourceClientOffset()
            // console.log({delta})
            // @ts-ignore
            setShow({type: item?.type, x: Number(delta?.x), y: Number(delta?.y)})
        }
    }))
    return (
        <section className="playGround" ref={dropTarget}>
            <ModalForm data={show} handleClose={handleClose} />
        </section>
    )
}

export default Playground;