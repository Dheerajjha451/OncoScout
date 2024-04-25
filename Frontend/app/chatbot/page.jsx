"use client"
import Link from "next/link";
import Navbar from "../../components/Navbar"; 

const Chatbot = () => {

    return (
        <div className="w-full">
            <div className="w-1/6">
                <Navbar />
            </div>
            <div className="h-screen flex items-center flex-col justify-center">
                <h1 className="text-[32px] mb-[1rem] md:text-[35px] lg:text-[50px] text-center font-bold leading-[4rem] text-red-500">
                    Connect With Your Patient
                </h1>
               
                <Link href='/chat'>
                    <button className="px-8 py-2 rounded-lg bg-red-500 text-white mt-[1rem]">
                    Ask question with your chatbot assistant.
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Chatbot;
