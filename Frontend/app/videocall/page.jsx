"use client"
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar"; 

const VideoCall = () => {
    const [roomID, setRoomID] = useState('');

    return (
        <div className="w-full">
            <div className="w-1/6">
                <Navbar />
            </div>
            <div className="h-screen flex items-center flex-col justify-center">
                <h1 className="text-[32px] mb-[1rem] md:text-[35px] lg:text-[50px] text-center font-bold leading-[4rem] text-red-500">
                    Connect With Your Patient
                </h1>
                <input 
                    type="text" 
                    placeholder="Enter room ID" 
                    className="px-8 py-3 w-[50%] rounded-lg outline-none bg-gray-300" 
                    onChange={(e) => setRoomID(e.target.value)}
                />
                <Link href={`room/${roomID}`}>
                    <button className="px-8 py-2 rounded-lg bg-red-500 text-white mt-[1rem]">
                        Join
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VideoCall;
