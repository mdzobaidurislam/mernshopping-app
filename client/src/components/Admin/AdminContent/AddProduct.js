import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AdminAddProduct } from "../../../redux/action/Admin/AdminProductsAction";
import Message from "../../Frontend/shared/Message";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const dispatch = useDispatch();
  const { error,success, addProduct } = useSelector(
    (state) => state.adminAddProduct
  );
  const addProductHandler = (e) => {
    e.preventDefault();

    dispatch(
      AdminAddProduct({
        name,
        brand,
        category,
        description,
        price,
        image,
        countInStock,
      })
    );
  
      setName("")
      setBrand("")
      setCategory("")
      setPrice("")
      setImage("")
      setDescription("")
      setCountInStock("")
    


  };
  
 
  console.log(addProduct);
  return (
    <>
      <Row className=" mt-5 pb-5 shadow">
        <Col md={12}>
          <h1>Add Product</h1>
        </Col>
        <Col md={12}> 
        {
          success ? <Message variant="success">{addProduct.product}</Message> : error ? <Message variant="danger">{error}</Message> : ""
        }  
        </Col>
        <Col md={12}>
          <Form onSubmit={addProductHandler}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="countInStock">
                  <Form.Label>countInStock</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter countInStock"
                    onChange={(e) => setCountInStock(e.target.value)}
                    value={countInStock}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter url"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Button type="submit" variant="primary" className="mt-3">
                  Add product
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddProduct;
