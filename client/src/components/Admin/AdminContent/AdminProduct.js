import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminlistProducts } from "../../../redux/action/Admin/AdminProductsAction";
import { Col, Image, Row, Table } from "react-bootstrap";
import Loader from "../../Frontend/shared/Loader";
import Message from "../../Frontend/shared/Message";
import { AiFillEdit,AiFillDelete } from "react-icons/ai";




const AdminProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminlistProducts());
  }, [dispatch]);

  const { loading, adminProducts, error } = useSelector(
    (state) => state.adminProductList
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="mt-5 shadow">
        <Col md={12}>
            <h1>Total Product: {adminProducts.length} </h1>
        </Col>
        <Col>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th># ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Reviews</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((product,index) => (
                <tr key={product._id}>
                  <td>{index+1}</td>
                  <td><Image width="100" src={product.image}/></td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.description.slice(0,50)}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.numReviews}</td>
                  <td>{product.rating}</td>
                  <td><AiFillEdit className="text-info"/> <AiFillDelete className="text-danger"/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
         
        </Row>
      )}
    </>
  );
};

export default AdminProduct;
