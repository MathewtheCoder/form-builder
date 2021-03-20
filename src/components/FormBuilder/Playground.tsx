import React from 'react'
import { useDrop } from "react-dnd";


const Playground = () => {
    const [, dropTarget] = useDrop(() => ({
        accept: 'components',
        drop: (item, monitor) => {
            console.log(item, monitor)
            const delta = monitor.getSourceClientOffset()

            console.log({delta})
        }
    }))
    return <section className="playGround" ref={dropTarget}/>
}

export default Playground;