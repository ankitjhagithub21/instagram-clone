import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        user:null,
        loading:true,
    },
    reducers:{
        setIsLoggedIn:(state,action)=>{
            state.isLoggedIn = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        }
    }
})

export const {setIsLoggedIn,setUser,setLoading} = authSlice.actions

export default authSlice.reducer