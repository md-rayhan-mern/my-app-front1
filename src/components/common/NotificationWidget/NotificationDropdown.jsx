import React, { useState } from "react";
import {
  CheckCheck,
  ShoppingBag,
  MessageSquare,
  Tag,
  BellOff,
} from "lucide-react";
import NotificationDetails from "./NotificationDetails.jsx";

const NotificationDropdown = ({
  isOpen,
  notifications,
  onMarkAsRead,
  onMarkAllRead,
  onClose,
}) => {
  const [selectedNotif, setSelectedNotif] = useState(null);
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Icon according to notification type
  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-4 w-4 text-cyan-400" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-emerald-400" />;
      default:
        return <Tag className="h-4 w-4 text-amber-400" />;
    }
  };
  const handleSelectNotification = (item) => {
    if (!item.read) {
      onMarkAsRead(item.id);
    }
    setSelectedNotif({ ...item, read: true });
  };

  const handleCloseAll = () => {
    setSelectedNotif(null);
    onClose();
  };

  return (
    <div className="absolute -right-11 sm:right-0 mt-2.5 w-80 sm:w-96 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl shadow-black/70 z-50 overflow-hidden text-white">
      {selectedNotif ? (
        /* ১. আলাদা NotificationDetails কম্পোনেন্ট */
        <NotificationDetails
          notification={selectedNotif}
          onBack={() => setSelectedNotif(null)}
          onClose={handleCloseAll}
        />
      ) : (
        /* ২. নোটিফিকেশনের তালিকা (List View) */
        <>
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/95">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-rose-500/20 text-rose-400">
                  {unreadCount > 99 ? "99+" : unreadCount} New
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectNotification(item)}
                  className={`w-full px-4 py-3 flex items-start space-x-3 text-left transition-colors hover:bg-slate-800/70 ${
                    !item.read ? "bg-slate-800/35" : ""
                  }`}
                >
                  {/* Icon Badge */}
                  <div className="mt-0.5 p-2 rounded-full bg-slate-800 border border-slate-700 flex-shrink-0">
                    {getIcon(item.type)}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs sm:text-sm leading-snug ${
                        !item.read
                          ? "text-white font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="text-[11px] text-cyan-400/80 mt-1 block">
                      {item.time}
                    </span>
                  </div>

                  {/* Unread Blue Dot */}
                  {!item.read && (
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400 flex-shrink-0"></span>
                  )}
                </button>
              ))
            ) : (
              <div className="py-10 flex flex-col items-center justify-center text-slate-400">
                <BellOff className="h-8 w-8 mb-2 text-slate-600" />
                <p className="text-sm">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-slate-800 bg-slate-900/95 text-center">
            <button
              type="button"
              onClick={handleCloseAll}
              className="text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Close notifications
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
