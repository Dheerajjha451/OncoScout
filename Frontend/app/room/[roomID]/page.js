"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function App() {
    const router = useRouter();
    const roomID = getUrlParams().get('roomID') || randomID(5);

    const myMeeting = async (element) => {
        const appID = 1166740627;
        const serverSecret = "48b85e3201bc531bd737be1b580a9ed7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, 
            },
        });
    };

    const handleBackToVideoCall = () => {
        router.push('/videocall');
    };

    return (
        <div>
            <div
                className="myCallContainer"
                ref={myMeeting}
                style={{ width: '100vw', height: '100vh' }}
            ></div>
            <button
                className="bg-rose-800 text-white font-bold cursor-pointer px-6 py-2 rounded-md flex items-center"
                onClick={handleBackToVideoCall}
            >
                <IoMdArrowRoundBack size={20} className="mr-2" />
                Back to Home
            </button>
        </div>
    );
}
