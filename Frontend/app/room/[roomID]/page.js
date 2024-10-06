"use client"
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'; //zegocloud 

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
        const appID = 40106234;
        const serverSecret = "ef42476f9c03061e36914d0cc391a3a8";
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
                mode: ZegoUIKitPrebuilt.OneONoneCall, //For one on one Video Call
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
