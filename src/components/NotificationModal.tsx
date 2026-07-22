import { useNotificationStore } from '../store/useNotificationStore';

export default function NotificationModal({ isOpen }: { isOpen: boolean; onClose: () => void }) {
  const { notifications, markAsRead, clearAll } = useNotificationStore();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-[#D9D7D0] shadow-2xl border border-slate-300/60 rounded-2xl p-4 z-[100] text-left">
      <div className="flex justify-between items-center pb-3 border-b border-slate-400/30">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notifications</h2>
        {notifications.length > 0 && (
          <button onClick={clearAll} className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer">
            Clear All
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-400/20 mt-2">
        {notifications.length === 0 ? (
          <p className="text-sm text-slate-600 py-6 text-center font-medium">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => markAsRead(n.id)}
              className={`py-3 px-2 cursor-pointer transition-colors rounded-lg hover:bg-[#E6E4DC] ${!n.read ? 'bg-slate-400/20' : ''}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold text-xs text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-500">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-700 mt-1">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}