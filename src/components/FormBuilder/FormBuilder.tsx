import React from 'react'
import DraggableComponent from '../DraggableComponent';
const FormBuilder = (): JSX.Element => {
    return (
        <main>
            <section className="playGround">
            </section>
            <section className="toolBox">
                <h1>Blocks</h1>
                <DraggableComponent type="Label" />
                <DraggableComponent type="Input" />
                <DraggableComponent type="Button" />
            </section>
        </main>
    )
}

export default FormBuilder;
