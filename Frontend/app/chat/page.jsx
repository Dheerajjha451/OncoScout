"use client"
import { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation'; 

const ChatBot = () => {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "Chat with OncoSight",
        "botConversationDescription": "I will answer questions related to brain tumor and lung cancer.",
        "botId": "5cd7908b-63d8-4a51-a18b-b148d85d8e19",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "5cd7908b-63d8-4a51-a18b-b148d85d8e19",
        "webhookId": "11637ad8-8d46-41c7-ad99-d052b3425e0f",
        "lazySocket": true,
        "themeName": "prism",
        "botName": "OncoSight",
        "frontendVersion": "v1",
        "theme": "prism",
        "themeColor": "#2563eb"
      });
    }; //add your botId, clientId, webhookId here

    return () => {
      const scriptElement = document.querySelector('script[src="https://cdn.botpress.cloud/webchat/v1/inject.js"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  const handleBackToHome = () => {
    router.push('/chatbot');
  };

  return (
    <div className="h-screen">
      <button
        className="bg-rose-800 text-white font-bold cursor-pointer px-6 py-2 rounded-md flex items-center"
        onClick={handleBackToHome}
      >
        <IoMdArrowRoundBack size={20} className="mr-2" />
        Back to Home
      </button>
    </div>
  );
};

export default ChatBot;