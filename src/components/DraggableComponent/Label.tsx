import React from 'react';

const Label = (props: {data: any}) => {
    const {data} = props;
    return <label style={{position: 'absolute', top: data.y, left: data.x, fontSize: data.fontSize, fontWeight: data.fontWeight}}>{data.text}</label>
}
export default Label;