import React, { useContext , useEffect } from 'react';
import { UserContextGlobal } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { CaptainContextGlobal } from './CaptainContext';

const UserProtectorRoute = ({children}) => {
const navigate = useNavigate();
const token = localStorage.getItem('token');
const [isLoading, setisLoading] = useState(true);

const {userdata, setUserdata} = useContext(UserContextGlobal);


useEffect(() => {

        if(!token){
      return navigate('/userLogin')
        }

        axios.post(
    `${import.meta.env.VITE_BASE_URL}profile/user`,
    {}, // request body
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
).then((res) => {
            if(res.status==200){
                setUserdata(res.data.user)
                setisLoading(false)
            }
        }).catch((err) => {
            console.log("erro is token" , err)
            return navigate('/userLogin')
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

export default UserProtectorRoute;