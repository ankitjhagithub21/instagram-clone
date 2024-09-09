import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn, setLoading, setUser } from '../redux/slices/authSlice'

const useFetchAuthUser = () => {
    const dispatch = useDispatch()
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/user`
    useEffect(() => {
        const getUserFromServer = async() =>{
            try{
                dispatch(setLoading(true))
                const res = await fetch(url,{
                    credentials:'include'
                })
                const data =await res.json()
                if(data.success){
                    dispatch(setUser(data.user))
                    dispatch(setIsLoggedIn(true))
                }else{
                    dispatch(setUser(null))
                    dispatch(setIsLoggedIn(false))
                }

            }catch(error){
                console.log(error)
            }finally{
               dispatch(setLoading(false))
            }

        }
        getUserFromServer()
    }, [])
}

export default useFetchAuthUser
