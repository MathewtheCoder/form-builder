import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ModalFormProps {
  data: any;
  handleClose: () => void;
}
const ModalForm = (props: ModalFormProps) => {
    const { data, handleClose } = props;
    const [form, setForm] = useState({
        text: '',
        x: '',
        y: '',
        fontSize: '12',
        fontWeight: '400',
    })
    useEffect(() => {
        if (data) {
            setForm(prevForm => ({
                ...prevForm,
                x: data.x,
                y: data.y,
            }))
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
            <Modal.Title>Modal title</Modal.Title>
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
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalForm;