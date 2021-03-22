import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ModalFormProps {
  data: any;
  handleClose: () => void;
  addElement: (data: any) => void;
}
const ModalForm = (props: ModalFormProps) => {
    const { data, handleClose, addElement } = props;
    const initialState = {
        text: '',
        x: '',
        y: '',
        fontSize: '12',
        fontWeight: '400',
    }
    const [form, setForm] = useState(initialState)
    useEffect(() => {
        if (data) {
            setForm({
                ...initialState,
                ...data
            })
        }
    }, [data])
    const setField = (field: string, value: string) => {
        setForm({
          ...form,
          [field]: value
        })
      }
    return (
        <Modal
            show={Boolean(data)}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Edit {data.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formText">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter text"
                            value={form.text}
                            onChange={ e => setField('text', e.target.value) }
                        />
                    </Form.Group>
                    <Form.Group controlId="formX">
                        <Form.Label>X</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter X"
                          value={form.x}
                          onChange={ e => setField('x', e.target.value) }
                        />
                    </Form.Group>
                    <Form.Group controlId="formY">
                        <Form.Label>Y</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Y"
                            value={form.y}
                            onChange={ e => setField('x', e.target.value) }
                        />
                    </Form.Group>
                    <Form.Group controlId="formFontSize">
                        <Form.Label>Font Size</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter font size."
                            value={form.fontSize}
                            onChange={ e => setField('fontSize', e.target.value) }
                        />
                    </Form.Group>
                    <Form.Group controlId="formFontWeight">
                        <Form.Label>Font Weight</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter font weight."
                            value={form.fontWeight}
                            onChange={ e => setField('fontWeight', e.target.value) }
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => addElement(form)}>
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalForm;