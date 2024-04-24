"use client"
import { GiBrain } from "react-icons/gi";
import { GrArticle } from "react-icons/gr";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';
import { TbMessageChatbot } from "react-icons/tb";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('userToken');
      redirect("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 h-full bg-light-background text-black overflow-y-auto w-64 flex flex-col justify-between">
      <div className="py-4 px-6">
        <div className="flex items-center mb-8">
          <FaUser className="text-2xl mr-2" />
          <h2 className="text-xl font-bold mx-2">{session?.user?.name}</h2>
        </div>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard">
              <button className="flex items-center hover:text-red-500">
                <GiBrain className="mr-2 text-3xl" />
                Brain Tumor
              </button>
            </Link>
          </li>
          <li>
            <Link href="/articles">
              <button className="flex items-center hover:text-red-500 ">
                <GrArticle  className="mr-3 text-2xl" />
                Article
              </button>
            </Link>
          </li>
          <li>
            <Link href="/videocall">
              <button className="flex items-center hover:text-red-500">
                <MdVideoCall className="mr-2 text-3xl" />
                VideoCall
              </button>
            </Link>
          </li>
          <li>
            <Link href="/chatbot">
              <button className="flex items-center hover:text-red-500">
                <TbMessageChatbot className="mr-2 text-3xl" />
                Chatbot
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="py-4 px-6 border-t border-stone-900">
        <button className="flex items-center hover:text-red-500" onClick={handleLogout}>
          <LiaSignOutAltSolid className="mr-2 text-2xl" />
          Logout
        </button>
      </div>
    </nav>
  );
}
