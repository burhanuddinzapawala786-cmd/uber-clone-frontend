import React, { useContext , useEffect } from 'react';
import { UserContextGlobal } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { CaptainContextGlobal } from './CaptainContext';
import axios from 'axios';
import { useState } from 'react';

const CaptainProtectorRoute = ({children}) => {
const navigate = useNavigate();
const token = localStorage.getItem('token');
const [isLoading, setisLoading] = useState(true);
const {captaindata , setcaptaindata} = useContext(CaptainContextGlobal)
useEffect(() => {

        if(!token){
      return navigate('/captainLogin')
        }

        axios.post(
    `${import.meta.env.VITE_BASE_URL}captain/profile`,
    {}, // request body
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
).then((res) => {
            if(res.status==200){
                setcaptaindata(res.data.captain)
                setisLoading(false)
            }
        }).catch((err) => {
            console.log("erro is token" , err)
            return navigate('/captainLogin')
        })
        }, [token])

        if(isLoading){
            return (
                <>
                <div>Loading...</div>
                </>
            )
        }
        
        return (
            <>
            {children}
            </>
        )
 }

export default CaptainProtectorRoute;