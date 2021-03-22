import React from 'react'

const Input = ({data}: {data: any}) => {
    return (
        <input
            type="text"
            value={data.text}
            style={{
                position: 'absolute',
                top: data.y,
                left: data.x,
                fontSize: data.fontSize,
                fontWeight: data.fontWeight
            }}
        />
    )
}

export default Input;
