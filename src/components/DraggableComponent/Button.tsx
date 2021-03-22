import React from 'react'
import {Button} from 'react-bootstrap'
const ButtonDraggable = ({data}: {data: any}) => {
    return <Button type="button" style={{position: 'absolute', top: data.y, left: data.x, fontSize: data.fontSize, fontWeight: data.fontWeight}}>
        {data.text}
    </Button>
}

export default ButtonDraggable;
