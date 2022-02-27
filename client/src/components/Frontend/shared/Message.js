import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({variant,children}) => {
    return (
        <>
             <Alert className="mt-5"  variant={variant}>{children} </Alert>
        </>
    );
};

export default Message;