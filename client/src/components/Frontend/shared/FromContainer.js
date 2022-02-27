import React from 'react';
import {Container, Row,Col} from 'react-bootstrap';

const FromContainer = ({children}) => {
    return (
        <>
            <Container>
                <Row className="justify-content-center">
            <Col md={6}>
                {children}
            </Col>
                </Row>
            </Container>
        </>
    );
};

export default FromContainer;