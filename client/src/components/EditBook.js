import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import book from './images/oneBook.png';

const EditBook = () => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/book/${id}`)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setAuthor(res.data.author);
            })
            .catch((err) => {
                console.log(err);
                navigate("/")
            });
    }, [id, navigate]);

    const onUpdateHandler = (e) => {
        e.preventDefault();
        const postUpdateData = {
            title,
            author,
        }
        axios.post(`/api/book/${id}/edit`, postUpdateData)
            .then((res) => {
                console.log(res.data);
                navigate(`/book/${id}`);
            }).catch((err) => {
                console.log(err);
                setErrors(err.res.data.errors);
            })
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={6} lg={8} className="text-start">
                    <h1 className="text-light my-5">BOOK STACK</h1>
                </Col>
                <Col xs={6} lg={4} className="d-flex justify-content-end">
                    <Link to={"/book/new"}>
                        <Button variant="primary" className="mx-2 my-5">ADD BOOK</Button>
                    </Link>
                    <Link to={"/books"}>
                        <Button variant="outline-light" className="my-5">HOME</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col lg={9} className="mx-auto my-2 text-start">
                <p className="lead fs-1 text-center">Edit {title}</p>
                </Col>
            </Row>
            <Row>
            <Col lg={9} className="mx-auto my-3">
            <Form className="bg-secondary rounded-3 p-3 text-light" onSubmit={onUpdateHandler}>
                <Col lg={6} className="mx-auto">
                <Form.Group className="my-2 py-2 text-start" controlId="formTitle">
                    <Form.Label className="text-light fs-4">Title</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        value={title}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </Form.Group>
                </Col>
                <Col lg={6} className="mx-auto">
                <Form.Group className="my-2 py-2 text-start" controlId="formAuthor">
                    <Form.Label className="text-light fs-4">Author</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setAuthor(e.target.value)}
                        name="author"
                        value={author}
                    />
                    {errors.author ? <span>{errors.author.message}</span> : null}
                </Form.Group>
                </Col>
                <Col lg={6} className="text-center mx-auto">
                    <Button type="submit" variant="success" className="border-2 fw-bold my-2">EDIT BOOK</Button>
                </Col>
            </Form>
            </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center my-3">
                    <img src={book} alt="book" className="fluid" />
                </Col>
            </Row>
        </Container>
    )
}

export default EditBook;