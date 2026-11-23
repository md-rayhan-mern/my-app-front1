import React, { useState } from "react";
import {
  X,
  Search,
  Send,
  ArrowLeft,
  Phone,
  Video,
  MoreHorizontal,
  CheckCheck,
} from "lucide-react";

// ডেমো চ্যাট লিস্ট (পরে আপনি আপনার API বা Socket.io ডেটা দিয়ে বদলে নিতে পারবেন)
const INITIAL_CHATS = [
  {
    id: 1,
    name: "Ariful Islam",
    avatar: "",
    online: true,
    unread: 2,
    lastSeen: "Active now",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "ভাই, প্রোডাক্টটা কি এখনো স্টকে আছে?",
        time: "9:15 PM",
      },
      {
        id: 2,
        sender: "me",
        text: "হ্যাঁ ভাই, স্টকে আছে। অর্ডার করতে পারেন।",
        time: "9:16 PM",
      },
      {
        id: 3,
        sender: "them",
        text: "ধন্যবাদ! ডেলিভারি চার্জ কত পড়বে?",
        time: "9:17 PM",
      },
    ],
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    avatar: "",
    online: true,
    unread: 0,
    lastSeen: "Active now",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello! Need help with my recent order.",
        time: "8:40 PM",
      },
      {
        id: 2,
        sender: "me",
        text: "Sure! Please share your order ID.",
        time: "8:42 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    avatar: "",
    online: false,
    unread: 0,
    lastSeen: "2h ago",
    messages: [
      {
        id: 1,
        sender: "me",
        text: "আপনার পার্সেলটি পাঠানো হয়েছে।",
        time: "Yesterday",
      },
      { id: 2, sender: "them", text: "অসংখ্য ধন্যবাদ ভাই!", time: "Yesterday" },
    ],
  },
];

const MessengerDrawer = ({ isOpen, onClose }) => {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const activeChat = chats.find((c) => c.id === selectedChatId);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    // Unread count ক্লিয়ার করা
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)),
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const msgObj = {
      id: Date.now(),
      sender: "me",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id
          ? { ...chat, messages: [...chat.messages, msgObj] }
          : chat,
      ),
    );
    setNewMessage("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ব্যাকড্রপ (বাইরে ক্লিক করলে বন্ধ হবে) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
      />

      {/* ডান পাশ থেকে আসা মেসেঞ্জার সাইড প্যানেল */}
      <aside className="fixed top-0 right-0 h-full w-full sm:w-[390px] bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col text-white animate-in slide-in-from-right duration-300">
        {/* ভিউ ১: চ্যাট লিস্ট (যখন কোনো নির্দিষ্ট চ্যাট ওপেন করা নেই) */}
        {!activeChat ? (
          <>
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Chats
                </h2>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">
                  {chats.reduce((acc, c) => acc + c.unread, 0)} New
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3.5 border-b border-slate-800/70">
              <div className="relative">
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Messenger..."
                  className="w-full bg-slate-800/90 border border-slate-700/80 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Active Users Horizontal Row */}
            <div className="px-4 py-3 border-b border-slate-800/70 flex items-center space-x-4 overflow-x-auto">
              {chats
                .filter((c) => c.online)
                .map((person) => (
                  <button
                    key={person.id}
                    onClick={() => handleSelectChat(person.id)}
                    className="flex flex-col items-center space-y-1 flex-shrink-0 group"
                  >
                    <div className="relative">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                        {person.name.charAt(0)}
                      </div>
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
                    </div>
                    <span className="text-[11px] text-slate-300 max-w-[56px] truncate">
                      {person.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => {
                  const lastMsg = chat.messages[chat.messages.length - 1];
                  return (
                    <button
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      className="w-full px-4 py-3.5 flex items-center space-x-3 hover:bg-slate-800/70 transition-colors text-left"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-base">
                          {chat.name.charAt(0)}
                        </div>
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-100 truncate">
                            {chat.name}
                          </p>
                          <span className="text-[11px] text-slate-400">
                            {lastMsg?.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <p
                            className={`text-xs truncate ${
                              chat.unread > 0
                                ? "text-white font-semibold"
                                : "text-slate-400"
                            }`}
                          >
                            {lastMsg?.sender === "me" ? "You: " : ""}
                            {lastMsg?.text}
                          </p>
                          {chat.unread > 0 && (
                            <span className="ml-2 h-5 min-w-[20px] px-1.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[11px] flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="text-center text-sm text-slate-400 py-10">
                  No conversations found
                </p>
              )}
            </div>
          </>
        ) : (
          /* ভিউ ২: নির্দিষ্ট ইউজারের সাথে চ্যাট রুম */
          <>
            {/* Chat Room Header */}
            <div className="px-3 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/95">
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => setSelectedChatId(null)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm">
                    {activeChat.name.charAt(0)}
                  </div>
                  {activeChat.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight">
                    {activeChat.name}
                  </h3>
                  <p className="text-[11px] text-emerald-400">
                    {activeChat.lastSeen}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-cyan-400">
                <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                  <Video className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/40">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "me" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm"
                        : "bg-slate-800 text-slate-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 flex items-center space-x-1">
                    <span>{msg.time}</span>
                    {msg.sender === "me" && (
                      <CheckCheck className="h-3 w-3 text-cyan-400" />
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-800 bg-slate-900 flex items-center space-x-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </aside>
    </>
  );
};

export default MessengerDrawer;
