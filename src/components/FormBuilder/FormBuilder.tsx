import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DraggableComponent from '../DraggableComponent';
import Playground from './Playground';

const FormBuilder = (): JSX.Element => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main>
                <Playground />
                <section className="toolBox">
                    <h1>Blocks</h1>
                    <DraggableComponent type="Label" />
                    <DraggableComponent type="Input" />
                    <DraggableComponent type="Button" />
                </section>
            </main>
        </DndProvider>
    )
}

export default FormBuilder;
