"use client";

import { useState, useEffect } from "react";
import ChatList from "./ChatList"; // your chat list component

const ChatListWrapper = ({ token }) => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const res = await fetch("https://quickchat.fly.dev/api/my-chats/", {
        cache: "no-store",
        headers: {
          Authorization: `Token ${token.value}`, // ✅ Add token here
        },
      });

      if (res.ok) {
        const data = await res.json();
        setChats(data);
      } else {
        console.error("❌ Failed to fetch chats:", res.status);
      }
    } catch (err) {
      console.error("❌ Error fetching chats:", err);
    }
  };

 
    
    fetchChats(); // Initial fetch

 
 
 

  return <ChatList chats={chats} />;
};

export default ChatListWrapper;
