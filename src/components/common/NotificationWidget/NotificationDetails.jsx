import React from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  ShoppingBag,
  MessageSquare,
  Tag,
} from "lucide-react";

const NotificationDetails = ({ notification, onBack, onClose }) => {
  const navigate = useNavigate();

  if (!notification) return null;

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-cyan-400" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-emerald-400" />;
      default:
        return <Tag className="h-5 w-5 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center space-x-2.5 bg-slate-900/95">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Back to notifications"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h3 className="text-sm font-bold text-white">Notification Details</h3>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex-shrink-0">
            {getIcon(notification.type)}
          </div>
          <div>
            <h4 className="text-base font-bold text-white leading-snug">
              {notification.title}
            </h4>
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>{notification.time}</span>
            </div>
          </div>
        </div>

        {/* Full Details Text */}
        <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
          {notification.fullDetails || notification.description}
        </div>

        {/* Optional Action Link */}
        {notification.link && (
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(notification.link);
            }}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-semibold transition-all"
          >
            <span>View Related Page</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between px-4">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          ← Back to list
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDetails;
