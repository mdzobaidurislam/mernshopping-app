import React, { useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectRoute = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const history = useNavigate();
    
    useEffect(() => {
      if (!userInfo) {
          history('/login')
      }
    }, [userInfo,history]);

    return (
        <>
            
        </>
    );
};

export default ProtectRoute;