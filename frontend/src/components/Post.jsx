import React from 'react'
import { LuDot, LuSend } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { GoBookmark, GoComment, GoHeart } from 'react-icons/go';
const Post = () => {
    return (
        <div className='flex flex-col gap-3 p-3'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className='w-12 rounded-full' />
                    <h2 className='flex items-center'>Ankit Jha
                        <LuDot />
                        <span>2h</span>
                    </h2>
                </div>
                <BsThreeDots />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio nihil reprehenderit soluta nesciunt, illo totam voluptatum sunt.</p>
            <div>
                <img src="https://images.unsplash.com/photo-1723662887372-b6f42b6ccd50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full' />
            </div>

            <div className='flex items-center justify-between text-2xl'>
                <div className='flex items-center justify-between gap-2'>
                    <GoHeart />
                    <GoComment />
                    <LuSend />
                </div>
                <GoBookmark />

            </div>

        </div>
    )
}

export default Post
