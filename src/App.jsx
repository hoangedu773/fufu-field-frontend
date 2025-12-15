import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Clock, Star, Menu, X, User, LogIn, Phone, CreditCard, Filter, History, RefreshCw, ArrowLeft, Trash2, Plus, AlertCircle, Users, Send, MessageSquare, BarChart2, LayoutDashboard, FileText, Settings, Gift, Home, Edit, Lock } from 'lucide-react';

// --- DỮ LIỆU SÂN BÓNG TP.HCM ---
const FOOTBALL_FIELDS_DATA = [
    { id: 1, name: "CLB Bóng đá Phú Nhuận", address: "03 Hoàng Minh Giám, P.9, Phú Nhuận", phone: "028 3847 7668", district: "Phú Nhuận" },
    { id: 2, name: "Sân Bóng Chảo Lửa", address: "38 Phan Thúc Duyện, P.4, Tân Bình", phone: "0777 700 000", district: "Tân Bình" },
    { id: 3, name: "Sân Bóng Phạm Minh Giang", address: "66/17 Tổ 73 KP6, Tân Thới Nhất, Q.12", phone: "0908 388 277", district: "Quận 12" },
    { id: 4, name: "Sân Bóng Mini Phúc Yên", address: "47 Phan Huy Ích, P.15, Tân Bình", phone: "0922 169 169", district: "Tân Bình" },
    { id: 5, name: "Sân Bóng đá Tiểu Ngư", address: "780/14e Sư Vạn Hạnh, P.12, Q.10", phone: "028 3868 0433", district: "Quận 10" },
    { id: 6, name: "Sân Đá Banh Mini Thống Nhất", address: "138 Đào Duy Từ, P.6, Q.10", phone: "028 7305 3088", district: "Quận 10" },
    { id: 7, name: "Trung Tâm Bóng Đá VJSS Q10", address: "780/14E Sư Vạn Hạnh, P.12, Q.10", phone: "0907 522 512", district: "Quận 10" },
    { id: 8, name: "Sân Đá Banh Quyền Bình Thạnh", address: "343/26 Nơ Trang Long, P.13, Bình Thạnh", phone: "0907 071 775", district: "Bình Thạnh" },
    { id: 9, name: "TBG Arena", address: "407/19 Nguyễn Xí, P.13, Bình Thạnh", phone: "0909 847 730", district: "Bình Thạnh" },
    { id: 10, name: "Sân Bóng Đá Cầu Đỏ", address: "516 Phạm Văn Đồng, P.13, Bình Thạnh", phone: "0899 447 016", district: "Bình Thạnh" },
    { id: 11, name: "Sân Bóng Đá HCA", address: "324 Chu Văn An, P.12, Bình Thạnh", phone: "0908 568 777", district: "Bình Thạnh" },
    { id: 12, name: "Sân Bóng Phương Thảo (Q.7)", address: "206/6 Đào Trí, Phú Mỹ, Q.7", phone: "0908 902 290", district: "Quận 7" },
    { id: 13, name: "Sân Bóng ARENA Quận 7", address: "1135/45/60D Huỳnh Tấn Phát, Q.7", phone: "0765 456 333", district: "Quận 7" },
    { id: 14, name: "Mansion Sports Club Q.7", address: "30 Đào Trí, Phú Mỹ, Q.7", phone: "0833 986 988", district: "Quận 7" },
    { id: 15, name: "Sân Đá Banh A.T Thủ Đức", address: "35 Đường Số 4, Trường Thọ, Thủ Đức", phone: "0906 464 140", district: "Thủ Đức" },
    { id: 16, name: "Sân bóng đá Phúc Thành", address: "Hiệp Bình Chánh, Thủ Đức", phone: "0902 577 114", district: "Thủ Đức" },
    { id: 17, name: "Sân bóng đá CP Hiệp Bình", address: "32 Đường 42, Hiệp Bình Chánh, Thủ Đức", phone: "0904 485 354", district: "Thủ Đức" },
    { id: 18, name: "Sân Banh Gò Dưa", address: "Hẻm 54 Đường 36, Linh Đông, Thủ Đức", phone: "0906 553 836", district: "Thủ Đức" },
    { id: 19, name: "Sân bóng Kinh Đô", address: "110 Đường Số 4, KP6, Thủ Đức", phone: "0909 162 784", district: "Thủ Đức" }
];

// --- LOCATION AUTOCOMPLETE COMPONENT ---
const LocationAutocomplete = ({ value, onChange, onSelectField }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredFields, setFilteredFields] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (value.trim() === '') {
            setFilteredFields(FOOTBALL_FIELDS_DATA);
        } else {
            const filtered = FOOTBALL_FIELDS_DATA.filter(field =>
                field.name.toLowerCase().includes(value.toLowerCase()) ||
                field.address.toLowerCase().includes(value.toLowerCase()) ||
                field.district.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredFields(filtered);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (field) => {
        onChange(field.name);
        if (onSelectField) onSelectField(field);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
                ref={inputRef}
                type="text"
                placeholder="Tìm sân bóng..."
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />

            {/* Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto glass rounded-xl border border-white/10 shadow-2xl z-50 animate-fade-in-up"
                >
                    {filteredFields.length === 0 ? (
                        <div className="p-4 text-center text-slate-400">
                            Không tìm thấy sân bóng
                        </div>
                    ) : (
                        <>
                            <div className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider border-b border-white/5">
                                {filteredFields.length} sân bóng
                            </div>
                            {filteredFields.map((field) => (
                                <div
                                    key={field.id}
                                    onClick={() => handleSelect(field)}
                                    className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <MapPin className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-white truncate">{field.name}</h4>
                                            <p className="text-sm text-slate-400 truncate">{field.address}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">{field.district}</span>
                                                <span className="text-xs text-slate-500">{field.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

// --- LOGIC TÍNH TOÁN & KIỂM TRA ---
const calculateComplexPrice = (dateStr, startStr, endStr, fieldType) => {
    if (!startStr || !endStr || !dateStr) return 0;

    const timeToDecimal = (t) => {
        const [h, m] = t.split(':').map(Number);
        return h + m / 60;
    };

    let start = timeToDecimal(startStr);
    let end = timeToDecimal(endStr);

    if (end <= start) return 0;

    let total = 0;
    let totalHours = 0;

    const rates = [
        { start: 5, end: 11, price: 210000 },
        { start: 11, end: 14, price: 180000 },
        { start: 14, end: 18, price: 220000 },
        { start: 18, end: 24, price: 250000 }
    ];

    for (let rate of rates) {
        const overlapStart = Math.max(start, rate.start);
        const overlapEnd = Math.min(end, rate.end);
        if (overlapEnd > overlapStart) {
            const duration = overlapEnd - overlapStart;
            total += duration * rate.price;
            totalHours += duration;
        }
    }

    if (fieldType === 'Sân 7') total += totalHours * 50000;
    if (new Date(dateStr).getDate() === 14) total = total * 0.9;

    return total;
};

const checkConflict = (startStr, endStr, busySlots) => {
    if (!startStr || !endStr || !busySlots) return false;

    const toMinutes = (s) => {
        const [h, m] = s.split(':').map(Number);
        return h * 60 + m;
    };

    const newStart = toMinutes(startStr);
    const newEnd = toMinutes(endStr);

    for (let slot of busySlots) {
        const busyStart = toMinutes(slot.start);
        const busyEnd = toMinutes(slot.end);
        if (newStart < busyEnd && newEnd > busyStart) return true;
    }
    return false;
};

const checkPastTimeConflict = (bookingDateStr, startTimeStr) => {
    if (!startTimeStr) return false;

    const today = new Date().toISOString().split('T')[0];
    if (bookingDateStr !== today) return false;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [h, m] = startTimeStr.split(':').map(Number);
    const bookingStartMinutes = h * 60 + m;

    if (bookingStartMinutes <= nowMinutes) return true;
    return false;
};

// --- CÁC COMPONENT CON (Widgets) ---
const FloatingChatButton = ({ onClick, unreadCount }) => (
    <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all transform hover:scale-110 z-50 flex items-center justify-center"
    >
        <MessageSquare className="w-6 h-6" />
        {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                {unreadCount}
            </span>
        )}
    </button>
);

const ChatBox = ({ currentUser, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`https://fufu-field-backend.onrender.com/api/messages?userId=${currentUser.id}`);
            if (res.ok) setMessages(await res.json());
        } catch (e) { }
    };

    useEffect(() => {
        fetch('https://fufu-field-backend.onrender.com/api/messages/read', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser.id, isAdminViewer: false })
        });
    }, []);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        try {
            await fetch('https://fufu-field-backend.onrender.com/api/messages', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, content: input, isAdmin: false })
            });
            setInput('');
            fetchMessages();
        } catch (e) { }
    };

    return (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 z-50 animate-fade-in-up">
            <div className="bg-green-600 text-white p-3 rounded-t-xl flex justify-between items-center">
                <span className="font-bold flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> Chat với Admin</span>
                <button onClick={onClose}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {messages.length === 0 && <p className="text-center text-gray-400 text-sm mt-10">Chưa có tin nhắn nào.</p>}
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.IsAdminSender ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-2 rounded-lg text-sm shadow-sm ${m.IsAdminSender ? 'bg-white border text-gray-800' : 'bg-green-600 text-white'}`}>
                            {m.NoiDung}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t bg-white rounded-b-xl flex">
                <input
                    className="flex-1 border rounded-l-lg px-3 py-2 text-sm outline-none focus:border-green-500"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={handleSend} className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700"><Send className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

const PromotionModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white p-6 rounded-lg max-w-sm text-center animate-bounce-in" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Gift className="w-8 h-8 text-red-600" /></div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">SIÊU SALE NGÀY 14!</h2>
            <p className="text-gray-700 mb-4">Giảm giá <span className="font-bold text-red-500">10%</span> cho tất cả các khung giờ đặt sân vào ngày 14 hàng tháng.</p>
            <button onClick={onClose} className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full font-bold">Đã hiểu</button>
        </div>
    </div>
);


// --- CÁC TRANG (PAGES) ---
const Header = ({ currentView, setCurrentView, isLoggedIn, handleLogout, currentUser, onOpenChat }) => (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">

                {/* Logo */}
                <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentView('home')}>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
                        <span className="text-white font-black text-2xl">⚽</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">FuFu Field</span>
                        <span className="text-xs text-slate-400 hidden sm:block">Đặt sân bóng online</span>
                    </div>
                </div>

                {/* Quick Actions */}
                {currentUser?.phone !== 'admin' && (
                    <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                        {currentView !== 'home' && (
                            <button onClick={() => setCurrentView('home')} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition-all duration-300" title="Quay lại">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <button onClick={() => window.location.reload()} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition-all duration-300" title="Tải lại">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {currentUser?.phone === 'admin' ? (
                        <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold uppercase rounded-lg cursor-pointer hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300" onClick={() => setCurrentView('admin')}>
                            🔧 Admin Panel
                        </span>
                    ) : (
                        <>
                            <button onClick={() => setCurrentView('home')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'home' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'}`}>
                                <Home className="w-4 h-4 inline mr-2" />Trang chủ
                            </button>
                            <button onClick={() => setCurrentView('search')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'search' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'}`}>
                                <Search className="w-4 h-4 inline mr-2" />Tìm sân
                            </button>
                            <button onClick={() => setCurrentView('promotion')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentView === 'promotion' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'}`}>
                                <Gift className="w-4 h-4 inline mr-2" />Ưu đãi
                            </button>
                            <button onClick={onOpenChat} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-all duration-300">
                                <MessageSquare className="w-4 h-4 inline mr-2" />Chat
                            </button>
                        </>
                    )}
                </nav>

                {/* User Actions */}
                <div className="hidden md:flex items-center space-x-3">
                    {isLoggedIn ? (
                        <>
                            <div
                                className="flex items-center space-x-2 px-3 py-2 glass rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300"
                                onClick={() => currentUser?.phone !== 'admin' && setCurrentView('profile')}
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                    {currentUser?.name?.charAt(0) || 'U'}
                                </div>
                                <span className="text-sm font-semibold text-slate-200">{currentUser?.name || 'Bạn'}</span>
                            </div>
                            {currentUser?.phone !== 'admin' && (
                                <button onClick={() => setCurrentView('history')} className="p-2.5 text-slate-400 hover:text-emerald-400 hover:bg-white/10 rounded-xl transition-all duration-300" title="Lịch sử">
                                    <History className="w-5 h-5" />
                                </button>
                            )}
                            <button onClick={handleLogout} className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-300">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setCurrentView('login')} className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300">
                            <LogIn className="w-4 h-4" /><span>Đăng nhập</span>
                        </button>
                    )}
                </div>

            </div>
        </div>
    </header>
);


const UserProfilePage = ({ currentUser, handleLogout }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [formData, setFormData] = useState({
        id: currentUser.id,
        fullName: currentUser.name,
        email: currentUser.email || '',
        address: currentUser.address || ''
    });
    const [passData, setPassData] = useState({ oldPassword: '', newPassword: '' });

    const handleUpdateInfo = async () => {
        try {
            const res = await fetch('https://fufu-field-backend.onrender.com/api/user/update-info', {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Cập nhật thành công! Vui lòng đăng nhập lại.");
                handleLogout();
            } else alert("Lỗi cập nhật.");
        } catch (e) { alert("Lỗi Server"); }
    };

    const handleChangePassword = async () => {
        try {
            const res = await fetch('https://fufu-field-backend.onrender.com/api/user/change-password', {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentUser.id, ...passData })
            });
            const data = await res.json();
            alert(data.message);
            if (res.ok) setPassData({ oldPassword: '', newPassword: '' });
        } catch (e) { alert("Lỗi Server"); }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-green-600 px-6 py-8 text-white text-center">
                    <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-green-600 mb-3">
                        {currentUser.name.charAt(0)}
                    </div>
                    <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                    <p>{currentUser.phone}</p>
                </div>

                <div className="flex border-b">
                    <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 font-bold ${activeTab === 'info' ? 'text-green-600 border-b-2 border-green-600' : ''}`}>Thông tin cá nhân</button>
                    <button onClick={() => setActiveTab('password')} className={`flex-1 py-3 font-bold ${activeTab === 'password' ? 'text-green-600 border-b-2 border-green-600' : ''}`}>Đổi mật khẩu</button>
                </div>

                <div className="p-8">
                    {activeTab === 'info' ? (
                        <div className="space-y-4">
                            <div><label className="block text-gray-600 mb-1">Họ và tên</label><input className="w-full border p-2 rounded" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} /></div>
                            <div><label className="block text-gray-600 mb-1">Email</label><input className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                            <div><label className="block text-gray-600 mb-1">Địa chỉ</label><input className="w-full border p-2 rounded" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} /></div>
                            <button onClick={handleUpdateInfo} className="bg-blue-600 text-white px-6 py-2 rounded font-bold mt-4">Lưu thay đổi</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div><label className="block text-gray-600 mb-1">Mật khẩu cũ</label><input type="password" className="w-full border p-2 rounded" value={passData.oldPassword} onChange={e => setPassData({ ...passData, oldPassword: e.target.value })} /></div>
                            <div><label className="block text-gray-600 mb-1">Mật khẩu mới</label><input type="password" className="w-full border p-2 rounded" value={passData.newPassword} onChange={e => setPassData({ ...passData, newPassword: e.target.value })} /></div>
                            <button onClick={handleChangePassword} className="bg-red-600 text-white px-6 py-2 rounded font-bold mt-4">Đổi mật khẩu</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ setCurrentView, searchFilters, setSearchFilters, fields, loading, setSelectedField }) => (
    <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900"></div>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-emerald-400 text-sm font-medium">🔥 Đặt sân online #1 Việt Nam</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="text-white">Sân chuẩn, giá tốt</span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Chỉ cần bạn bấm</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Tìm và đặt sân bóng đá tốt nhất gần bạn chỉ với vài cú click. Nhanh chóng, tiện lợi, giá cả minh bạch.
                    </p>

                    {/* Search Form */}
                    <div className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto animate-fade-in-up border border-white/10" style={{ animationDelay: '0.3s' }}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <LocationAutocomplete
                                value={searchFilters.location}
                                onChange={(value) => setSearchFilters({ ...searchFilters, location: value })}
                            />
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="date"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                    value={searchFilters.date}
                                    onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none appearance-none cursor-pointer">
                                    <option value="">Chọn giờ</option>
                                    <option value="morning">🌅 Sáng (5h-11h)</option>
                                    <option value="noon">☀️ Trưa (11h-14h)</option>
                                    <option value="afternoon">🌤️ Chiều (14h-18h)</option>
                                    <option value="evening">🌙 Tối (18h-24h)</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setCurrentView('search')}
                                className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Search className="w-5 h-5" /> Tìm sân ngay
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">50+</div>
                            <div className="text-slate-400 text-sm">Sân bóng</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">10K+</div>
                            <div className="text-slate-400 text-sm">Lượt đặt</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">4.9⭐</div>
                            <div className="text-slate-400 text-sm">Đánh giá</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tại sao chọn <span className="text-emerald-400">FuFu Field</span>?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Chúng tôi mang đến trải nghiệm đặt sân tốt nhất với nhiều tiện ích vượt trội</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-emerald-500/30">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Search className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Tìm kiếm thông minh</h3>
                        <p className="text-slate-400">Tìm sân theo vị trí, giờ, loại sân và mức giá phù hợp với bạn</p>
                    </div>
                    <div className="group glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-emerald-500/30">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Calendar className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Đặt sân siêu nhanh</h3>
                        <p className="text-slate-400">Chọn giờ, thanh toán và nhận mã xác nhận chỉ trong vài phút</p>
                    </div>
                    <div className="group glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-emerald-500/30">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Star className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Đánh giá tin cậy</h3>
                        <p className="text-slate-400">Xem đánh giá từ cộng đồng để chọn sân tốt nhất</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Fields Section */}
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Sân bóng <span className="text-emerald-400">nổi bật</span></h2>
                        <p className="text-slate-400">Các chi nhánh FuFu Field được yêu thích nhất</p>
                    </div>
                    <button onClick={() => setCurrentView('search')} className="mt-4 md:mt-0 px-6 py-3 border border-emerald-500 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-all">
                        Xem tất cả →
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-48 bg-slate-700"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : fields.length === 0 ? (
                    <div className="text-center py-20 glass rounded-2xl">
                        <div className="text-6xl mb-4">⚽</div>
                        <p className="text-xl text-slate-400">Không tìm thấy sân bóng nào</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {fields.map((field, index) => (
                            <div
                                key={field.SanID}
                                className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10"
                                onClick={() => { setSelectedField(field); setCurrentView('detail'); }}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img src={field.HinhAnh || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=400&fit=crop'} alt={field.TenSan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=400&fit=crop'; }} />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-full">{field.LoaiSan}</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white truncate">{field.TenSan}</h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center text-slate-400 text-sm mb-3">
                                        <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                                        <span className="truncate">{field.DiaChi}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="text-white font-semibold">{field.DiemDanhGia}</span>
                                            <span className="text-slate-500 text-sm">({field.SoLuotReview})</span>
                                        </div>
                                        <div className="text-emerald-400 font-bold">180K+/h</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);


const SearchPage = ({ fields, loading, setSelectedField, setCurrentView }) => {
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    // Get unique districts from data
    const districts = ['all', ...new Set(FOOTBALL_FIELDS_DATA.map(f => f.district))];

    // Filter fields
    const filteredFields = fields.filter(field => {
        const matchDistrict = selectedDistrict === 'all' ||
            FOOTBALL_FIELDS_DATA.some(f => f.name === field.TenSan && f.district === selectedDistrict);
        const matchType = selectedType === 'all' || field.LoaiSan === selectedType;
        return matchDistrict && matchType;
    });

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Tìm sân bóng <span className="text-emerald-400">gần bạn</span>
                        </h1>
                        <p className="text-slate-400">Tìm thấy {filteredFields.length} sân bóng phù hợp</p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 mt-4 md:mt-0 glass rounded-xl p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="glass rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-lg font-semibold text-white">Bộ lọc nhanh</h2>
                    </div>

                    {/* District Pills */}
                    <div className="mb-4">
                        <p className="text-sm text-slate-400 mb-2">Khu vực</p>
                        <div className="flex flex-wrap gap-2">
                            {districts.map(district => (
                                <button
                                    key={district}
                                    onClick={() => setSelectedDistrict(district)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedDistrict === district
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                                        }`}
                                >
                                    {district === 'all' ? '🔥 Tất cả' : district}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type Pills */}
                    <div>
                        <p className="text-sm text-slate-400 mb-2">Loại sân</p>
                        <div className="flex flex-wrap gap-2">
                            {['all', 'Sân 5', 'Sân 7', 'Sân 11'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === type
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                                        }`}
                                >
                                    {type === 'all' ? '⚽ Tất cả' : type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-400">Đang tải dữ liệu...</p>
                    </div>
                ) : filteredFields.length === 0 ? (
                    <div className="text-center py-20 glass rounded-2xl">
                        <div className="text-6xl mb-4">😕</div>
                        <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy sân</h3>
                        <p className="text-slate-400 mb-4">Thử thay đổi bộ lọc để tìm sân phù hợp</p>
                        <button onClick={() => { setSelectedDistrict('all'); setSelectedType('all'); }} className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition">
                            Xóa bộ lọc
                        </button>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                        {filteredFields.map((field, index) => (
                            viewMode === 'grid' ? (
                                // Grid Card
                                <div
                                    key={field.SanID}
                                    onClick={() => { setSelectedField(field); setCurrentView('detail'); }}
                                    className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img src={field.HinhAnh} alt={field.TenSan} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                                        <div className="absolute top-3 right-3">
                                            <span className="px-2 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-full">{field.LoaiSan}</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-white mb-1 truncate">{field.TenSan}</h3>
                                        <div className="flex items-center text-slate-400 text-sm mb-2">
                                            <MapPin className="w-3 h-3 mr-1 text-emerald-400" />
                                            <span className="truncate">{field.DiaChi}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                <span className="text-white font-semibold text-sm">{field.DiemDanhGia}</span>
                                            </div>
                                            <span className="text-emerald-400 font-bold text-sm">180K+/h</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // List Card
                                <div
                                    key={field.SanID}
                                    onClick={() => { setSelectedField(field); setCurrentView('detail'); }}
                                    className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 cursor-pointer transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
                                            <img src={field.HinhAnh} alt={field.TenSan} className="w-full h-full object-cover" />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-full">{field.LoaiSan}</span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">{field.TenSan}</h3>
                                                <div className="flex items-center text-slate-400 mb-3">
                                                    <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                                                    <span>{field.DiaChi}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                        <span className="text-white font-semibold">{field.DiemDanhGia}</span>
                                                        <span className="text-slate-500 text-sm">({field.SoLuotReview} đánh giá)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-emerald-400 font-bold text-xl">Từ 180.000đ/h</div>
                                                <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const FieldDetailPage = ({ selectedField, setCurrentView, isLoggedIn, searchFilters, setSearchFilters, bookingInfo, setBookingInfo, busySlots, currentUser }) => {
    const isConflict = checkConflict(bookingInfo.startTime, bookingInfo.endTime, busySlots);
    const isPastConflict = checkPastTimeConflict(searchFilters.date, bookingInfo.startTime);

    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (selectedField) {
            fetch(`https://fufu-field-backend.onrender.com/api/reviews?sanId=${selectedField.SanID}`)
                .then(res => res.json()).then(setReviews).catch(console.error);
        }
    }, [selectedField]);

    const handleSubmitReview = async () => {
        if (!isLoggedIn) { alert("Vui lòng đăng nhập để đánh giá!"); return; }
        if (!newComment.trim()) { alert("Nhập nội dung!"); return; }
        try {
            const res = await fetch('https://fufu-field-backend.onrender.com/api/reviews', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ SanID: selectedField.SanID, NguoiDung: currentUser.name, NoiDung: newComment, SoSao: newRating })
            });
            if (res.ok) {
                alert("Cảm ơn bạn đã đánh giá!");
                setNewComment('');
                fetch(`https://fufu-field-backend.onrender.com/api/reviews?sanId=${selectedField.SanID}`).then(res => res.json()).then(setReviews);
            }
        } catch (e) { alert("Lỗi gửi đánh giá"); }
    };

    if (!selectedField) return null;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button onClick={() => setCurrentView('search')} className="mb-6 text-slate-400 hover:text-emerald-400 font-medium flex items-center gap-2 transition">
                    <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Field Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image & Info */}
                        <div className="glass rounded-2xl overflow-hidden border border-white/10">
                            <div className="relative h-72 overflow-hidden">
                                <img src={selectedField.HinhAnh} alt={selectedField.TenSan} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-3 py-1 bg-emerald-500/90 text-white text-sm font-bold rounded-full">{selectedField.LoaiSan}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h1 className="text-3xl font-bold text-white mb-3">{selectedField.TenSan}</h1>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                        <span className="text-white font-semibold">{selectedField.DiemDanhGia?.toFixed(1)}</span>
                                        <span className="text-slate-500">({selectedField.SoLuotReview} đánh giá)</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center text-slate-400">
                                        <MapPin className="w-5 h-5 mr-3 text-emerald-400" />
                                        <span>{selectedField.DiaChi}</span>
                                    </div>
                                    <div className="flex items-center text-slate-400">
                                        <Phone className="w-5 h-5 mr-3 text-emerald-400" />
                                        <span>Chủ sân: Phùng Vĩnh Phước - 0328665619</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-emerald-400" /> Tiện ích
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedField.TienIch && selectedField.TienIch.split(',').map((t, i) => (
                                    <span key={i} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 text-sm font-medium">
                                        {t.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-emerald-400" /> Đánh giá từ cầu thủ
                            </h3>
                            <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
                                {reviews.length === 0 ? (
                                    <p className="text-slate-500 text-center py-4">Chưa có đánh giá nào</p>
                                ) : reviews.map((r, i) => (
                                    <div key={i} className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-emerald-500">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-white">{r.NguoiDung}</span>
                                            <span className="text-amber-400">{'★'.repeat(r.SoSao)}{'☆'.repeat(5 - r.SoSao)}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm">{r.NoiDung}</p>
                                    </div>
                                ))}
                            </div>

                            {isLoggedIn && (
                                <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-semibold text-white mb-3">Viết đánh giá của bạn</h4>
                                    <div className="flex items-center mb-3">
                                        <span className="text-slate-400 mr-3">Chọn sao:</span>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <button key={s} onClick={() => setNewRating(s)} className={`text-2xl transition ${s <= newRating ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}>★</button>
                                        ))}
                                    </div>
                                    <textarea
                                        className="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 mb-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                                        placeholder="Nhập bình luận..."
                                        value={newComment}
                                        onChange={e => setNewComment(e.target.value)}
                                        rows="3"
                                    ></textarea>
                                    <button onClick={handleSubmitReview} className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition">
                                        Gửi đánh giá
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Busy Slots */}
                        <div className="glass rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
                            <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> Giờ bận hôm nay ({bookingInfo.fieldType})
                            </h3>
                            {busySlots.length === 0 ? (
                                <p className="text-emerald-400 text-sm flex items-center gap-2">✓ {bookingInfo.fieldType} trống cả ngày!</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {busySlots.map((slot, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                                            {slot.start} - {slot.end}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-2xl p-6 sticky top-24 border border-white/10">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-emerald-400" /> Đặt sân ngay
                            </h2>

                            {!isLoggedIn ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <User className="w-8 h-8 text-red-400" />
                                    </div>
                                    <p className="text-slate-400 mb-4">Bạn cần đăng nhập để đặt sân</p>
                                    <button onClick={() => setCurrentView('login')} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition">
                                        Đăng nhập ngay
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Field Type */}
                                    <div>
                                        <label className="text-sm font-semibold text-white mb-2 block">Loại sân</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setBookingInfo({ ...bookingInfo, fieldType: 'Sân 5' })}
                                                className={`py-3 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition ${bookingInfo.fieldType === 'Sân 5' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-600/50 text-slate-400 hover:border-slate-500'}`}
                                            >
                                                <Users className="w-4 h-4" /> Sân 5
                                            </button>
                                            <button
                                                onClick={() => setBookingInfo({ ...bookingInfo, fieldType: 'Sân 7' })}
                                                className={`py-3 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition ${bookingInfo.fieldType === 'Sân 7' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-600/50 text-slate-400 hover:border-slate-500'}`}
                                            >
                                                <Users className="w-4 h-4" /> Sân 7
                                            </button>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="text-sm font-semibold text-white mb-2 block">Ngày đá</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                                            value={searchFilters.date}
                                            onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                                        />
                                        {new Date(searchFilters.date).getDate() === 14 && (
                                            <div className="text-xs text-red-400 font-bold mt-2 flex items-center gap-1">
                                                🎉 Ngày 14 giảm 10%!
                                            </div>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm font-semibold text-white mb-2 block">Bắt đầu</label>
                                            <input type="time" className="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none" value={bookingInfo.startTime} onChange={(e) => setBookingInfo({ ...bookingInfo, startTime: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-white mb-2 block">Kết thúc</label>
                                            <input type="time" className="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none" value={bookingInfo.endTime} onChange={(e) => setBookingInfo({ ...bookingInfo, endTime: e.target.value })} />
                                        </div>
                                    </div>

                                    {/* Error Messages */}
                                    {(isConflict || isPastConflict) && (
                                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm font-medium">{isPastConflict ? 'Giờ này đã qua.' : `Giờ đã bị trùng cho ${bookingInfo.fieldType}.`}</span>
                                        </div>
                                    )}

                                    {/* Customer Info */}
                                    <div>
                                        <label className="text-sm font-semibold text-white mb-2 block">Họ và tên</label>
                                        <input type="text" placeholder="Nhập họ tên" className="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none" value={bookingInfo.name} onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-white mb-2 block">Số điện thoại</label>
                                        <input type="tel" placeholder="0xxx xxx xxx" className="w-full p-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none" value={bookingInfo.phone} onChange={(e) => setBookingInfo({ ...bookingInfo, phone: e.target.value.replace(/[^0-9]/g, '') })} />
                                    </div>

                                    {/* Price Summary */}
                                    <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">
                                        <div className="text-slate-400 text-sm mb-1">Tổng tiền ({bookingInfo.fieldType})</div>
                                        <div className="text-3xl font-bold text-emerald-400">{new Intl.NumberFormat('vi-VN').format(bookingInfo.totalPrice)}đ</div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={() => { if (!isConflict && !isPastConflict && bookingInfo.totalPrice > 0 && bookingInfo.name && bookingInfo.phone) setCurrentView('payment'); else alert("Kiểm tra lại thông tin hoặc giờ đặt!"); }}
                                        disabled={isConflict || isPastConflict}
                                        className={`w-full py-4 rounded-xl font-semibold transition text-lg ${(isConflict || isPastConflict) ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30'}`}
                                    >
                                        {isPastConflict ? 'Giờ đã qua' : isConflict ? 'Giờ này đã kín' : '🚀 Tiếp tục thanh toán'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentPage = ({ bookingInfo, setCurrentView, showQR, setShowQR, qrTimer, setQrTimer, selectedField, searchFilters, saveBooking }) => (
    <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-emerald-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Thanh toán</h1>
                <p className="text-slate-400">Xác nhận thông tin và hoàn tất đặt sân</p>
            </div>

            {/* Booking Summary Card */}
            <div className="glass rounded-2xl p-6 mb-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" /> Thông tin đặt sân
                </h2>
                <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-slate-400">Sân</span>
                        <span className="text-white font-medium">{selectedField?.TenSan}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-slate-400">Loại sân</span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">{bookingInfo.fieldType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-slate-400">Ngày đặt</span>
                        <span className="text-white">{searchFilters.date}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-slate-400">Khung giờ</span>
                        <span className="text-white">{bookingInfo.startTime} - {bookingInfo.endTime}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-slate-400">Người đặt</span>
                        <span className="text-white">{bookingInfo.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-slate-400">Số điện thoại</span>
                        <span className="text-white">{bookingInfo.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 mt-2 bg-emerald-500/10 rounded-xl px-4">
                        <span className="text-white font-semibold">Tổng tiền</span>
                        <span className="text-2xl font-bold text-emerald-400">{new Intl.NumberFormat('vi-VN').format(bookingInfo.totalPrice)}đ</span>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="glass rounded-2xl p-6 mb-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" /> Phương thức thanh toán
                </h2>
                {!showQR ? (
                    <div className="space-y-3">
                        <button
                            onClick={() => { setShowQR(true); setQrTimer(180) }}
                            className="w-full flex items-center p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition group"
                        >
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
                                <CreditCard className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="text-left flex-1">
                                <div className="font-bold text-white">Thanh toán qua QR Code</div>
                                <div className="text-sm text-slate-400">Chuyển khoản ngân hàng • Khuyên dùng</div>
                            </div>
                            <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">Hot</span>
                        </button>
                        <button
                            onClick={() => { saveBooking(); }}
                            className="w-full flex items-center p-4 rounded-xl border border-slate-600/50 bg-slate-800/30 hover:bg-slate-700/30 transition"
                        >
                            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mr-4">
                                <Home className="w-6 h-6 text-slate-400" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white">Thanh toán tại sân</div>
                                <div className="text-sm text-slate-400">Đặt cọc tiền mặt khi đến</div>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        {/* Timer */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-6">
                            <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="text-red-400 font-bold">
                                Mã hiệu lực: {Math.floor(qrTimer / 60)}:{qrTimer % 60 < 10 ? '0' + qrTimer % 60 : qrTimer % 60}
                            </span>
                        </div>

                        {/* QR Code */}
                        <div className="bg-white p-4 rounded-2xl inline-block mb-4">
                            <img
                                src="https://img.vietqr.io/image/TCB-19070002837012-qr_only.jpg?accountName=PHUNG%20VINH%20PHUOC"
                                className="w-48 h-48 object-contain"
                                alt="QR Payment"
                            />
                        </div>

                        <p className="text-white font-bold text-lg">PHUNG VINH PHUOC</p>
                        <p className="text-slate-400 mb-6">Nội dung: <span className="text-emerald-400 font-mono">{bookingInfo.phone}</span></p>

                        <button
                            onClick={() => { saveBooking(); }}
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition"
                        >
                            ✓ Đã thanh toán xong
                        </button>
                    </div>
                )}
            </div>

            {/* Back Button */}
            {!showQR && (
                <button
                    onClick={() => setCurrentView('detail')}
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại chi tiết sân
                </button>
            )}
        </div>
    </div>
);

const LoginPage = ({ authMode, setAuthMode, handleLogin, setCurrentView }) => {
    const [inputPhone, setInputPhone] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!inputEmail) { alert("Vui lòng nhập Email đã đăng ký!"); return; }
        setIsLoading(true);
        try {
            const res = await fetch('https://fufu-field-backend.onrender.com/api/auth/forgot-password', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: inputEmail })
            });
            const data = await res.json();
            alert(data.message);
            if (res.ok) setAuthMode('login');
        } catch (e) { alert("Lỗi kết nối: " + e.message); }
        setIsLoading(false);
    };

    const handleSubmit = () => {
        if (inputPhone.trim() === '' || inputPassword.trim() === '') {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        if (authMode === 'register') {
            if (inputName.trim() === '') { alert("Vui lòng nhập Họ tên!"); return; }
            handleLogin(inputPhone, inputPassword, inputName, true, inputEmail, inputAddress);
        } else {
            handleLogin(inputPhone, inputPassword);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm animate-float">
                        <span className="text-6xl">⚽</span>
                    </div>
                    <h1 className="text-4xl font-black mb-4 text-center">FuFu Field</h1>
                    <p className="text-xl text-white/80 text-center max-w-md mb-8">Đặt sân bóng online nhanh chóng, tiện lợi, giá cả minh bạch</p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <span className="text-2xl">🏟️</span>
                            <span>50+ sân bóng</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <span className="text-2xl">⭐</span>
                            <span>4.9 đánh giá</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <span className="text-2xl">🎯</span>
                            <span>10K+ lượt đặt</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚽</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">FuFu Field</h1>
                    </div>

                    {/* Form Card */}
                    <div className="glass rounded-3xl p-8 border border-white/10">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {authMode === 'login' ? 'Chào mừng trở lại!' : authMode === 'register' ? 'Tạo tài khoản mới' : 'Quên mật khẩu?'}
                            </h2>
                            <p className="text-slate-400 text-sm">
                                {authMode === 'login' ? 'Đăng nhập để tiếp tục đặt sân' : authMode === 'register' ? 'Điền thông tin để đăng ký' : 'Nhập email để khôi phục'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {authMode === 'forgot' ? (
                                <>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                            placeholder="Email đã đăng ký"
                                            value={inputEmail}
                                            onChange={(e) => setInputEmail(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={handleForgotPassword}
                                        disabled={isLoading}
                                        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? 'Đang gửi...' : 'Gửi lại mật khẩu'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {authMode === 'register' && (
                                        <>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                                    placeholder="Họ và tên *"
                                                    value={inputName}
                                                    onChange={(e) => setInputName(e.target.value)}
                                                />
                                            </div>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="email"
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                                    placeholder="Email"
                                                    value={inputEmail}
                                                    onChange={(e) => setInputEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                                    placeholder="Địa chỉ"
                                                    value={inputAddress}
                                                    onChange={(e) => setInputAddress(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                            placeholder={authMode === 'register' ? "Số điện thoại *" : "Số điện thoại / Email"}
                                            value={inputPhone}
                                            onChange={(e) => setInputPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="password"
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                            placeholder="Mật khẩu *"
                                            value={inputPassword}
                                            onChange={(e) => setInputPassword(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
                                    >
                                        {authMode === 'login' ? '🚀 Đăng nhập' : '✨ Đăng ký'}
                                    </button>
                                </>
                            )}

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900 text-slate-500">hoặc</span>
                                </div>
                            </div>

                            {/* Switch Modes */}
                            <div className="text-center space-y-3">
                                {authMode === 'login' && (
                                    <>
                                        <button
                                            onClick={() => setAuthMode('forgot')}
                                            className="text-emerald-400 text-sm hover:text-emerald-300 transition"
                                        >
                                            Quên mật khẩu?
                                        </button>
                                        <p className="text-slate-400 text-sm">
                                            Chưa có tài khoản? {' '}
                                            <button onClick={() => setAuthMode('register')} className="text-emerald-400 font-semibold hover:text-emerald-300 transition">
                                                Đăng ký ngay
                                            </button>
                                        </p>
                                    </>
                                )}
                                {authMode === 'register' && (
                                    <p className="text-slate-400 text-sm">
                                        Đã có tài khoản? {' '}
                                        <button onClick={() => setAuthMode('login')} className="text-emerald-400 font-semibold hover:text-emerald-300 transition">
                                            Đăng nhập
                                        </button>
                                    </p>
                                )}
                                {authMode === 'forgot' && (
                                    <button onClick={() => setAuthMode('login')} className="text-emerald-400 text-sm hover:text-emerald-300 transition">
                                        ← Quay lại đăng nhập
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => setCurrentView('home')}
                                className="w-full text-slate-500 text-sm hover:text-slate-300 transition flex items-center justify-center gap-1"
                            >
                                <Home className="w-4 h-4" /> Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HistoryPage = ({ setCurrentView, history, setHistory, clearHistory, currentUser }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editForm, setEditForm] = useState({ startTime: '', endTime: '' });

    // Xóa 1 booking
    const handleDeleteBooking = async (index) => {
        if (!confirm("Bạn có chắc muốn xóa lịch đặt này?")) return;
        const item = history[index];
        try {
            // Gọi API xóa từ DB nếu có bookingId
            if (item.bookingId) {
                await fetch(`https://fufu-field-backend.onrender.com/api/bookings/${item.bookingId}`, { method: 'DELETE' });
            }
        } catch (e) { console.error("Lỗi xóa từ DB:", e); }
        // Xóa khỏi local state
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem('bookingHistory_' + currentUser?.phone, JSON.stringify(newHistory));
        alert("Đã xóa lịch đặt!");
    };

    // Mở modal sửa
    const openEditModal = (index) => {
        const item = history[index];
        const [start, end] = item.gio.split(' - ');
        setEditForm({ startTime: start || '17:00', endTime: end || '18:00' });
        setEditingIndex(index);
    };

    // Lưu sửa đổi
    const handleSaveEdit = async () => {
        if (!editForm.startTime || !editForm.endTime) { alert("Nhập đủ giờ!"); return; }
        const item = history[editingIndex];
        try {
            // Gọi API update nếu có bookingId
            if (item.bookingId) {
                await fetch(`https://fufu-field-backend.onrender.com/api/bookings/${item.bookingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ startTime: editForm.startTime, endTime: editForm.endTime })
                });
            }
        } catch (e) { console.error("Lỗi update DB:", e); }
        // Update local
        const newHistory = [...history];
        newHistory[editingIndex] = {
            ...item,
            gio: `${editForm.startTime} - ${editForm.endTime}`
        };
        setHistory(newHistory);
        localStorage.setItem('bookingHistory_' + currentUser?.phone, JSON.stringify(newHistory));
        setEditingIndex(null);
        alert("Đã cập nhật giờ đặt sân!");
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Lịch sử đặt sân</h1>
                        <p className="text-slate-400">{history.length} lần đặt sân</p>
                    </div>
                    {history.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition"
                        >
                            <Trash2 className="w-4 h-4" /> Xóa tất cả
                        </button>
                    )}
                </div>

                {/* Content */}
                {history.length === 0 ? (
                    <div className="glass rounded-2xl p-16 text-center border border-white/10">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-bold text-white mb-2">Chưa có lịch sử</h3>
                        <p className="text-slate-400 mb-6">Bạn chưa đặt sân nào. Hãy đặt sân ngay!</p>
                        <button
                            onClick={() => setCurrentView('home')}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition"
                        >
                            Tìm sân ngay
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="glass rounded-2xl p-6 border border-white/5 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                                                <span className="text-2xl">⚽</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white">{item.san}</h3>
                                                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">{item.sanType || 'Sân 5'}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Calendar className="w-4 h-4 text-emerald-400" />
                                                <span>{item.ngay}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock className="w-4 h-4 text-cyan-400" />
                                                <span>{item.gio}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <User className="w-4 h-4 text-amber-400" />
                                                <span>{item.nguoiDat}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Phone className="w-4 h-4 text-rose-400" />
                                                <span>{item.sdt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <div className="text-2xl font-bold text-emerald-400 mb-2">
                                            {new Intl.NumberFormat('vi-VN').format(item.gia)}đ
                                        </div>
                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1 mb-3">
                                            ✓ Đã thanh toán
                                        </span>
                                        {/* Nút Sửa/Xóa */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(index)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition text-sm"
                                            >
                                                <Edit className="w-3 h-3" /> Sửa giờ
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBooking(index)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm"
                                            >
                                                <Trash2 className="w-3 h-3" /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => setCurrentView('home')}
                    className="mt-8 flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
                </button>
            </div>

            {/* Modal Sửa Giờ */}
            {editingIndex !== null && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setEditingIndex(null)}>
                    <div className="glass rounded-2xl p-6 w-full max-w-md border border-white/10" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Edit className="w-5 h-5 text-blue-400" /> Sửa giờ đặt sân
                        </h3>
                        <p className="text-slate-400 mb-4">Sân: {history[editingIndex]?.san}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Giờ bắt đầu</label>
                                <input
                                    type="time"
                                    value={editForm.startTime}
                                    onChange={e => setEditForm({ ...editForm, startTime: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Giờ kết thúc</label>
                                <input
                                    type="time"
                                    value={editForm.endTime}
                                    onChange={e => setEditForm({ ...editForm, endTime: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveEdit}
                                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-lg transition"
                            >
                                Lưu thay đổi
                            </button>
                            <button
                                onClick={() => setEditingIndex(null)}
                                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminPage = ({ fields, onAddField, onDeleteField, currentUser }) => {
    const [activeTab, setActiveTab] = useState('stats');
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [adminFields, setAdminFields] = useState([]); // Danh sách sân từ API
    const [fieldSearchQuery, setFieldSearchQuery] = useState(''); // Search query cho dropdown

    // State cho Thêm/Sửa Sân
    const [isEditing, setIsEditing] = useState(false);
    const [currentFieldId, setCurrentFieldId] = useState(null);
    const [fieldForm, setFieldForm] = useState({ TenSan: '', DiaChi: '', GiaTheoGio: 200000, LoaiSan: 'Sân 5', HinhAnh: '', MoTa: '', TienIch: '' });

    // State Khuyến mãi
    const [promotions, setPromotions] = useState([]);
    const [promoForm, setPromoForm] = useState({ name: '', discount: 10, startDate: '', endDate: '', fieldId: '' });

    // State Walk-in Booking (Admin đặt hộ khách)
    const [walkinForm, setWalkinForm] = useState({ customerName: '', customerPhone: '', fieldId: '', date: new Date().toISOString().split('T')[0], startTime: '17:00', endTime: '18:00', fieldType: 'Sân 5' });

    // Chat Admin
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [adminMessages, setAdminMessages] = useState([]);
    const [adminInput, setAdminInput] = useState('');

    const totalUnread = chatUsers.reduce((sum, user) => sum + (user.UnreadCount || 0), 0);

    // Lọc sân theo search query
    const filteredFields = (adminFields.length > 0 ? adminFields : fields).filter(f =>
        f.TenSan?.toLowerCase().includes(fieldSearchQuery.toLowerCase()) ||
        f.DiaChi?.toLowerCase().includes(fieldSearchQuery.toLowerCase())
    );

    // Fetch dữ liệu
    const fetchData = () => {
        fetch('https://fufu-field-backend.onrender.com/api/admin/stats').then(res => res.json()).then(setStats).catch(() => { });
        fetch('https://fufu-field-backend.onrender.com/api/admin/users').then(res => res.json()).then(setUsers).catch(() => { });
        fetch('https://fufu-field-backend.onrender.com/api/admin/reviews').then(res => res.json()).then(setReviews).catch(() => { });
        fetch('https://fufu-field-backend.onrender.com/api/sanbong').then(res => res.json()).then(setAdminFields).catch(() => { });
        fetch('https://fufu-field-backend.onrender.com/api/bookings-list').then(res => res.json()).then(data => {
            setBookings(data);
            // Tính doanh thu theo tháng từ bookings
            const revenueByMonth = {};
            data.forEach(b => {
                const month = new Date(b.NgayDat).toLocaleDateString('vi-VN', { month: 'short', year: '2-digit' });
                revenueByMonth[month] = (revenueByMonth[month] || 0) + 200000;
            });
            const last6Months = Object.entries(revenueByMonth).slice(-6).map(([month, revenue]) => ({ month, revenue }));
            setMonthlyRevenue(last6Months.length > 0 ? last6Months : [
                { month: 'T1', revenue: 2400000 }, { month: 'T2', revenue: 3200000 }, { month: 'T3', revenue: 2800000 },
                { month: 'T4', revenue: 4100000 }, { month: 'T5', revenue: 3600000 }, { month: 'T6', revenue: 4800000 }
            ]);
        }).catch(() => { });
        fetch('https://fufu-field-backend.onrender.com/api/messages').then(res => res.json()).then(setChatUsers).catch(() => { });
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetch('https://fufu-field-backend.onrender.com/api/messages').then(res => res.json()).then(setChatUsers);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (activeTab === 'chat' && selectedChatUser) {
            const interval = setInterval(async () => {
                const res = await fetch(`https://fufu-field-backend.onrender.com/api/messages?userId=${selectedChatUser.KhachHangID}`);
                if (res.ok) {
                    setAdminMessages(await res.json());
                    fetch('https://fufu-field-backend.onrender.com/api/messages/read', {
                        method: 'PUT', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: selectedChatUser.KhachHangID, isAdminViewer: true })
                    });
                }
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [activeTab, selectedChatUser]);

    const sendAdminMessage = async () => {
        if (!adminInput) return;
        await fetch('https://fufu-field-backend.onrender.com/api/messages', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: selectedChatUser.KhachHangID, content: adminInput, isAdmin: true })
        });
        setAdminInput('');
    };

    // Field CRUD
    const handleEditClick = (field) => { setIsEditing(true); setCurrentFieldId(field.SanID); setFieldForm(field); setActiveTab('fields'); };
    const resetForm = () => { setIsEditing(false); setCurrentFieldId(null); setFieldForm({ TenSan: '', DiaChi: '', GiaTheoGio: 200000, LoaiSan: 'Sân 5', HinhAnh: '', MoTa: '', TienIch: '' }); };
    const handleSaveField = async () => {
        if (!fieldForm.TenSan || !fieldForm.DiaChi) { alert("Nhập thiếu thông tin!"); return; }
        const url = isEditing ? `https://fufu-field-backend.onrender.com/api/sanbong/${currentFieldId}` : 'https://fufu-field-backend.onrender.com/api/sanbong';
        const method = isEditing ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fieldForm) });
            if (res.ok) { alert(isEditing ? "Cập nhật thành công!" : "Thêm sân thành công!"); resetForm(); window.location.reload(); }
        } catch (e) { alert("Lỗi lưu dữ liệu"); }
    };

    // Thêm khuyến mãi
    const handleAddPromotion = () => {
        if (!promoForm.name || !promoForm.startDate || !promoForm.endDate) { alert("Điền đầy đủ thông tin!"); return; }
        const newPromo = { ...promoForm, id: Date.now(), createdAt: new Date().toISOString() };
        setPromotions([...promotions, newPromo]);
        setPromoForm({ name: '', discount: 10, startDate: '', endDate: '', fieldId: '' });
        alert("Thêm khuyến mãi thành công!");
    };

    // Walk-in Booking
    const handleWalkinBooking = async () => {
        if (!walkinForm.customerName || !walkinForm.customerPhone || !walkinForm.fieldId) {
            alert("Điền đầy đủ thông tin khách!"); return;
        }
        try {
            // Tạo khách hàng nhanh (nếu chưa có)
            const bookingData = {
                fieldId: walkinForm.fieldId,
                date: walkinForm.date,
                startTime: walkinForm.startTime,
                endTime: walkinForm.endTime,
                name: walkinForm.customerName,
                phone: walkinForm.customerPhone,
                fieldType: walkinForm.fieldType,
                walkIn: true // Đánh dấu là đặt hộ
            };
            const res = await fetch('https://fufu-field-backend.onrender.com/api/bookings', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });
            if (res.ok) {
                alert(`Đặt sân thành công cho ${walkinForm.customerName}!`);
                setWalkinForm({ customerName: '', customerPhone: '', fieldId: '', date: new Date().toISOString().split('T')[0], startTime: '17:00', endTime: '18:00', fieldType: 'Sân 5' });
                fetchData();
            } else { alert("Lỗi đặt sân!"); }
        } catch (e) { alert("Lỗi kết nối: " + e.message); }
    };

    // Delete Booking (cho admin)
    const handleDeleteBooking = async (bookingId) => {
        if (!confirm("Xóa lịch đặt này?")) return;
        try {
            const res = await fetch(`https://fufu-field-backend.onrender.com/api/bookings/${bookingId}`, { method: 'DELETE' });
            if (res.ok) { alert("Đã xóa!"); fetchData(); }
        } catch (e) { alert("Lỗi xóa"); }
    };

    const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue), 1);

    const renderContent = () => {
        switch (activeTab) {
            case 'stats': return (
                <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-xl text-white">
                            <h3 className="text-emerald-100">Tổng doanh thu</h3>
                            <p className="text-3xl font-bold">{new Intl.NumberFormat('vi-VN').format(stats.TotalBookings * 200000)}đ</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white">
                            <h3 className="text-blue-100">Tổng đơn đặt</h3>
                            <p className="text-3xl font-bold">{stats.TotalBookings || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white">
                            <h3 className="text-purple-100">Thành viên</h3>
                            <p className="text-3xl font-bold">{stats.TotalUsers || 0}</p>
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-emerald-500" /> Biểu đồ doanh thu theo tháng
                        </h3>
                        <div className="flex items-end justify-between h-64 gap-4 pt-4">
                            {monthlyRevenue.map((m, i) => (
                                <div key={i} className="flex flex-col items-center flex-1">
                                    <div className="text-xs text-gray-600 mb-2">{new Intl.NumberFormat('vi-VN').format(m.revenue / 1000000)}tr</div>
                                    <div
                                        className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-teal-500"
                                        style={{ height: `${(m.revenue / maxRevenue) * 180}px` }}
                                    ></div>
                                    <div className="text-sm font-medium mt-2 text-gray-700">{m.month}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

            case 'promotions': return (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2"><Gift className="w-5 h-5 text-pink-500" /> Quản lý Khuyến mãi</h2>

                    {/* Form thêm khuyến mãi */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold mb-4">Tạo khuyến mãi mới</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input className="border p-3 rounded-lg" placeholder="Tên khuyến mãi" value={promoForm.name} onChange={e => setPromoForm({ ...promoForm, name: e.target.value })} />
                            <div className="flex items-center gap-2">
                                <input className="border p-3 rounded-lg w-20" type="number" min="1" max="100" value={promoForm.discount} onChange={e => setPromoForm({ ...promoForm, discount: e.target.value })} />
                                <span>% giảm giá</span>
                            </div>
                            <select className="border p-3 rounded-lg" value={promoForm.fieldId} onChange={e => setPromoForm({ ...promoForm, fieldId: e.target.value })}>
                                <option value="">Tất cả sân</option>
                                {fields.map(f => <option key={f.SanID} value={f.SanID}>{f.TenSan}</option>)}
                            </select>
                            <input className="border p-3 rounded-lg" type="date" value={promoForm.startDate} onChange={e => setPromoForm({ ...promoForm, startDate: e.target.value })} />
                            <input className="border p-3 rounded-lg" type="date" value={promoForm.endDate} onChange={e => setPromoForm({ ...promoForm, endDate: e.target.value })} />
                            <button onClick={handleAddPromotion} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition">
                                <Plus className="w-4 h-4 inline mr-1" /> Thêm
                            </button>
                        </div>
                    </div>

                    {/* Danh sách khuyến mãi */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">Tên</th>
                                    <th className="px-6 py-3 text-left">Giảm</th>
                                    <th className="px-6 py-3 text-left">Sân</th>
                                    <th className="px-6 py-3 text-left">Thời gian</th>
                                    <th className="px-6 py-3">Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {promotions.length === 0 ? (
                                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Chưa có khuyến mãi nào</td></tr>
                                ) : promotions.map(p => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-4 font-medium">{p.name}</td>
                                        <td className="px-6 py-4"><span className="bg-pink-100 text-pink-700 px-2 py-1 rounded font-bold">{p.discount}%</span></td>
                                        <td className="px-6 py-4">{p.fieldId ? fields.find(f => f.SanID == p.fieldId)?.TenSan : 'Tất cả'}</td>
                                        <td className="px-6 py-4 text-sm">{p.startDate} → {p.endDate}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => setPromotions(promotions.filter(x => x.id !== p.id))} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

            case 'walkin': return (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-blue-500" /> Đặt sân hộ khách (Walk-in)</h2>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-600 mb-4">Dùng khi khách hàng ghé sân bất ngờ, admin có thể đặt sân nhanh cho khách.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input className="border p-3 rounded-lg" placeholder="Tên khách hàng" value={walkinForm.customerName} onChange={e => setWalkinForm({ ...walkinForm, customerName: e.target.value })} />
                            <input className="border p-3 rounded-lg" placeholder="SĐT khách hàng" value={walkinForm.customerPhone} onChange={e => setWalkinForm({ ...walkinForm, customerPhone: e.target.value.replace(/[^0-9]/g, '') })} />
                            {/* Dropdown chọn sân với search */}
                            <div className="relative">
                                <input
                                    className="border p-3 rounded-lg w-full"
                                    placeholder="🔍 Tìm sân bóng..."
                                    value={fieldSearchQuery}
                                    onChange={e => setFieldSearchQuery(e.target.value)}
                                />
                                {fieldSearchQuery && (
                                    <div className="absolute z-20 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg max-h-48 overflow-y-auto shadow-xl">
                                        {filteredFields.length > 0 ? filteredFields.map(f => (
                                            <div
                                                key={f.SanID}
                                                onClick={() => {
                                                    setWalkinForm({ ...walkinForm, fieldId: f.SanID });
                                                    setFieldSearchQuery(f.TenSan);
                                                }}
                                                className="p-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700/50 last:border-0"
                                            >
                                                <div className="font-medium text-white">{f.TenSan}</div>
                                                <div className="text-sm text-slate-400 flex items-center gap-2">
                                                    <MapPin className="w-3 h-3" /> {f.DiaChi}
                                                </div>
                                                <div className="text-xs text-emerald-400 mt-1">
                                                    {new Intl.NumberFormat('vi-VN').format(f.GiaTheoGio || 200000)}đ/giờ • {f.LoaiSan || 'Sân 5'}
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-3 text-slate-400 text-center">Không tìm thấy sân</div>
                                        )}
                                    </div>
                                )}
                                {walkinForm.fieldId && !fieldSearchQuery && (
                                    <div className="mt-1 text-sm text-emerald-400">
                                        ✓ Đã chọn: {(adminFields.length > 0 ? adminFields : fields).find(f => f.SanID == walkinForm.fieldId)?.TenSan}
                                    </div>
                                )}
                            </div>
                            <select className="border p-3 rounded-lg" value={walkinForm.fieldType} onChange={e => setWalkinForm({ ...walkinForm, fieldType: e.target.value })}>
                                <option value="Sân 5">Sân 5</option>
                                <option value="Sân 7">Sân 7</option>
                            </select>
                            <input className="border p-3 rounded-lg" type="date" value={walkinForm.date} onChange={e => setWalkinForm({ ...walkinForm, date: e.target.value })} />
                            <div className="flex gap-2">
                                <input className="border p-3 rounded-lg flex-1" type="time" value={walkinForm.startTime} onChange={e => setWalkinForm({ ...walkinForm, startTime: e.target.value })} />
                                <input className="border p-3 rounded-lg flex-1" type="time" value={walkinForm.endTime} onChange={e => setWalkinForm({ ...walkinForm, endTime: e.target.value })} />
                            </div>
                        </div>
                        <button onClick={handleWalkinBooking} className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition">
                            ✓ Đặt sân ngay
                        </button>
                    </div>
                </div>
            );

            case 'fields': return (
                <div>
                    <h2 className="text-xl font-bold mb-4">{isEditing ? 'Chỉnh sửa sân' : 'Thêm sân mới'}</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="border p-2 rounded" placeholder="Tên sân" value={fieldForm.TenSan} onChange={e => setFieldForm({ ...fieldForm, TenSan: e.target.value })} />
                            <input className="border p-2 rounded" placeholder="Địa chỉ" value={fieldForm.DiaChi} onChange={e => setFieldForm({ ...fieldForm, DiaChi: e.target.value })} />
                            <input className="border p-2 rounded" type="number" placeholder="Giá/giờ" value={fieldForm.GiaTheoGio} onChange={e => setFieldForm({ ...fieldForm, GiaTheoGio: e.target.value })} />
                            <select className="border p-2 rounded" value={fieldForm.LoaiSan} onChange={e => setFieldForm({ ...fieldForm, LoaiSan: e.target.value })}><option>Sân 5</option><option>Sân 7</option><option>Sân 5, Sân 7</option></select>
                            <input className="border p-2 rounded" placeholder="Link hình ảnh" value={fieldForm.HinhAnh} onChange={e => setFieldForm({ ...fieldForm, HinhAnh: e.target.value })} />
                            <input className="border p-2 rounded" placeholder="Tiện ích" value={fieldForm.TienIch} onChange={e => setFieldForm({ ...fieldForm, TienIch: e.target.value })} />
                        </div>
                        <textarea className="border p-2 rounded w-full mt-4" placeholder="Mô tả..." value={fieldForm.MoTa} onChange={e => setFieldForm({ ...fieldForm, MoTa: e.target.value })} />
                        <div className="mt-4 flex space-x-2"><button onClick={handleSaveField} className="bg-green-600 text-white px-6 py-2 rounded font-bold">{isEditing ? 'Cập nhật' : 'Lưu mới'}</button>{isEditing && <button onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded">Hủy</button>}</div>
                    </div>
                    <h3 className="font-bold mb-2">Danh sách sân</h3>
                    <div className="bg-white rounded shadow overflow-hidden"><table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Tên sân</th><th className="px-6 py-3 text-left">Giá</th><th className="px-6 py-3 text-right">Thao tác</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{fields.map(f => (<tr key={f.SanID}><td className="px-6 py-4">{f.TenSan}</td><td className="px-6 py-4 text-green-600 font-bold">{new Intl.NumberFormat('vi-VN').format(f.GiaTheoGio)}đ</td><td className="px-6 py-4 text-right"><button onClick={() => handleEditClick(f)} className="text-blue-600 font-bold mr-3"><Edit className="w-4 h-4 inline" /> Sửa</button><button onClick={() => onDeleteField(f.SanID)} className="text-red-600 font-bold"><Trash2 className="w-4 h-4 inline" /> Xóa</button></td></tr>))}</tbody></table></div>
                </div>
            );

            case 'bookings': return (
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-emerald-500" /> Lịch đặt sân</h2>
                    <div className="bg-white rounded shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">Sân</th>
                                    <th className="px-6 py-3 text-left">Khách</th>
                                    <th className="px-6 py-3 text-left">Ngày/Giờ</th>
                                    <th className="px-6 py-3">TT</th>
                                    <th className="px-6 py-3">Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map(b => (
                                    <tr key={b.LichDatID}>
                                        <td className="px-6 py-4">{b.TenSan} ({b.LoaiSan})</td>
                                        <td className="px-6 py-4">{b.KhachHangName}<br /><span className="text-xs text-gray-500">{b.KhachHangPhone}</span></td>
                                        <td className="px-6 py-4">{new Date(b.NgayDat).toLocaleDateString('vi-VN')}<br />{b.GioBatDau}-{b.GioKetThuc}</td>
                                        <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 rounded text-xs">{b.TinhTrang}</span></td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => handleDeleteBooking(b.LichDatID)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

            case 'users': return (<div className="bg-white rounded shadow overflow-hidden"><table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Tên</th><th className="px-6 py-3 text-left">SĐT</th><th className="px-6 py-3 text-left">Email</th><th className="px-6 py-3 text-left">Địa chỉ</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{users.map(u => (<tr key={u.KhachHangID}><td className="px-6 py-4">{u.FullName}</td><td className="px-6 py-4">{u.Phone}</td><td className="px-6 py-4">{u.Email}</td><td className="px-6 py-4">{u.DiaChi}</td></tr>))}</tbody></table></div>);

            case 'reviews': return (<div className="space-y-4">{reviews.map(r => (<div key={r.ReviewID} className="bg-white p-4 rounded shadow border-l-4 border-yellow-400"><div className="flex justify-between"><strong>{r.NguoiDung}</strong><span className="text-yellow-500">{'★'.repeat(r.SoSao)}</span></div><p className="text-gray-600 mt-1">{r.NoiDung}</p><div className="text-xs text-gray-400 mt-2">Sân: {r.TenSan}</div></div>))}</div>);

            case 'chat': return (
                <div className="flex h-[500px] bg-white rounded shadow border">
                    <div className="w-1/3 border-r overflow-y-auto">
                        {chatUsers.map(u => (
                            <div key={u.KhachHangID} onClick={() => setSelectedChatUser(u)} className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChatUser?.KhachHangID === u.KhachHangID ? 'bg-blue-50' : ''}`}>
                                <div className="font-bold flex justify-between items-center">
                                    {u.FullName}
                                    {u.UnreadCount > 0 && (<span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">{u.UnreadCount}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-2/3 flex flex-col">
                        {selectedChatUser ? (
                            <>
                                <div className="p-3 border-b font-bold bg-gray-50">Chat với: {selectedChatUser.FullName}</div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                    {adminMessages.map((m, i) => (
                                        <div key={i} className={`flex ${m.IsAdminSender ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`p-2 rounded max-w-[70%] ${m.IsAdminSender ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{m.NoiDung}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t flex">
                                    <input className="flex-1 border rounded px-2" value={adminInput} onChange={e => setAdminInput(e.target.value)} />
                                    <button onClick={sendAdminMessage} className="ml-2 bg-blue-600 text-white px-4 rounded">Gửi</button>
                                </div>
                            </>
                        ) : <div className="flex items-center justify-center h-full text-gray-500">Chọn khách hàng để chat</div>}
                    </div>
                </div>
            );

            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 flex-shrink-0">
                {/* Logo */}
                <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <span className="text-white font-bold">⚽</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg">Admin Panel</h1>
                            <p className="text-xs text-slate-400">FuFu Field Manager</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-2">
                    {[
                        { id: 'stats', icon: BarChart2, label: 'Thống kê', color: 'from-emerald-500 to-teal-500' },
                        { id: 'promotions', icon: Gift, label: 'Khuyến mãi', color: 'from-pink-500 to-rose-500' },
                        { id: 'walkin', icon: Plus, label: 'Đặt hộ khách', color: 'from-blue-500 to-indigo-500' },
                        { id: 'fields', icon: LayoutDashboard, label: 'Quản lý Sân', color: 'from-amber-500 to-orange-500' },
                        { id: 'bookings', icon: Calendar, label: 'Lịch đặt', color: 'from-cyan-500 to-blue-500' },
                        { id: 'users', icon: Users, label: 'Khách hàng', color: 'from-violet-500 to-purple-500' },
                        { id: 'reviews', icon: Star, label: 'Đánh giá', color: 'from-yellow-500 to-amber-500' },
                        { id: 'chat', icon: MessageSquare, label: 'Tin nhắn', color: 'from-green-500 to-emerald-500' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${activeTab === item.id
                                ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${activeTab === item.id ? '' : 'group-hover:scale-110'} transition-transform`} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.id === 'chat' && totalUnread > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg shadow-red-500/50">
                                    {totalUnread}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/50 w-72">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            A
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium text-sm">Admin</p>
                            <p className="text-slate-400 text-xs">Quản trị viên</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white">
                        {activeTab === 'stats' && '📊 Tổng quan thống kê'}
                        {activeTab === 'promotions' && '🎁 Quản lý khuyến mãi'}
                        {activeTab === 'walkin' && '➕ Đặt sân hộ khách'}
                        {activeTab === 'fields' && '🏟️ Quản lý sân bóng'}
                        {activeTab === 'bookings' && '📅 Danh sách đặt sân'}
                        {activeTab === 'users' && '👥 Quản lý khách hàng'}
                        {activeTab === 'reviews' && '⭐ Đánh giá từ khách'}
                        {activeTab === 'chat' && '💬 Tin nhắn hỗ trợ'}
                    </h2>
                    <p className="text-slate-400 mt-1">Xin chào Admin! Chúc bạn ngày làm việc hiệu quả.</p>
                </div>

                {/* Content */}
                <div className="[&_h2]:text-white [&_h3]:text-white [&_.bg-white]:bg-slate-800/50 [&_.bg-white]:backdrop-blur-xl [&_.bg-white]:border [&_.bg-white]:border-slate-700/50 [&_table]:text-slate-300 [&_thead]:bg-slate-800/50 [&_th]:text-slate-400 [&_td]:text-slate-300 [&_.bg-gray-50]:bg-slate-800/30 [&_.text-gray-600]:text-slate-400 [&_.text-gray-500]:text-slate-400 [&_.text-gray-700]:text-slate-300 [&_.divide-gray-200]:divide-slate-700/50 [&_input]:bg-slate-700/50 [&_input]:border-slate-600/50 [&_input]:text-white [&_input]:placeholder-slate-400 [&_select]:bg-slate-700/50 [&_select]:border-slate-600/50 [&_select]:text-white [&_textarea]:bg-slate-700/50 [&_textarea]:border-slate-600/50 [&_textarea]:text-white">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP ---
const FootballBookingApp = () => {
    const [currentView, setCurrentView] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [history, setHistory] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [showPromo, setShowPromo] = useState(false);

    // State Notification
    const [unreadCount, setUnreadCount] = useState(0);

    const [searchFilters, setSearchFilters] = useState({ location: '', date: new Date().toISOString().split('T')[0], time: '', fieldType: '', priceRange: '', rating: '' });
    const [bookingInfo, setBookingInfo] = useState({ name: '', phone: '', startTime: '', endTime: '', fieldType: 'Sân 5', totalPrice: 0, selectedSlot: null });
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authMode, setAuthMode] = useState('login');
    const [showQR, setShowQR] = useState(false);
    const [qrTimer, setQrTimer] = useState(60);
    const [busySlots, setBusySlots] = useState([]);

    const fetchFields = async () => { try { const response = await fetch('https://fufu-field-backend.onrender.com/api/sanbong'); if (!response.ok) throw new Error('Err'); const data = await response.json(); setFields(data); setLoading(false); } catch (error) { console.error("Lỗi data:", error); setLoading(false); } };

    const fetchUnread = async () => {
        if (currentUser && currentUser.role !== 'admin') {
            try {
                const res = await fetch(`https://fufu-field-backend.onrender.com/api/messages?userId=${currentUser.id}`);
                if (res.ok) {
                    const msgs = await res.json();
                    const count = msgs.filter(m => m.IsAdminSender && !m.IsRead).length;
                    setUnreadCount(count);
                }
            } catch (e) { }
        }
    };

    useEffect(() => { const interval = setInterval(fetchUnread, 3000); return () => clearInterval(interval); }, [currentUser]);
    useEffect(() => { if (selectedField && searchFilters.date) { const fetchBusy = async () => { try { const res = await fetch(`https://fufu-field-backend.onrender.com/api/check-trung-gio?sanId=${selectedField.SanID}&ngay=${searchFilters.date}&loaiSan=${bookingInfo.fieldType}`); if (res.ok) { const data = await res.json(); setBusySlots(data); } } catch (e) { console.error(e); } }; fetchBusy(); } }, [selectedField, searchFilters.date, bookingInfo.fieldType]);
    useEffect(() => { const savedUser = localStorage.getItem('currentUser'); if (savedUser) { const user = JSON.parse(savedUser); setCurrentUser(user); setIsLoggedIn(true); if (user.phone === 'admin') setCurrentView('admin'); const savedHistory = localStorage.getItem('bookingHistory_' + user.phone); if (savedHistory) setHistory(JSON.parse(savedHistory)); } fetchFields(); }, []);

    const handleLogin = async (phone, password, name = '', isRegister = false, email = '', address = '') => {
        const endpoint = isRegister ? 'register' : 'login';
        const body = isRegister ? { phone, password, fullName: name, email, address } : { phone, password };
        try {
            const res = await fetch(`https://fufu-field-backend.onrender.com/api/auth/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            const result = await res.json();
            if (!res.ok) { alert(`Lỗi: ${result.message}`); return false; }
            if (isRegister) { alert('Đăng ký thành công! Vui lòng đăng nhập.'); setAuthMode('login'); return true; }
            const user = result.user; localStorage.setItem('currentUser', JSON.stringify(user)); setCurrentUser(user); setIsLoggedIn(true); const savedHistory = localStorage.getItem('bookingHistory_' + user.phone); if (savedHistory) setHistory(JSON.parse(savedHistory)); setCurrentView(user.role === 'admin' ? 'admin' : 'home'); return true;
        } catch (e) { alert(`Lỗi kết nối server.`); console.error(e); return false; }
    };

    // RELOAD KHI LOGOUT
    const handleLogout = () => { localStorage.removeItem('currentUser'); setIsLoggedIn(false); setCurrentUser(null); setHistory([]); setCurrentView('login'); window.location.reload(); };

    // RELOAD KHI ĐẶT SÂN THÀNH CÔNG
    const saveBooking = async () => { try { const res = await fetch('https://fufu-field-backend.onrender.com/api/dat-san', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ SanID: selectedField.SanID, NgayDat: searchFilters.date, GioBatDau: bookingInfo.startTime, GioKetThuc: bookingInfo.endTime, TenKhach: bookingInfo.name, SDT: bookingInfo.phone, LoaiSan: bookingInfo.fieldType }) }); if (!res.ok) alert("Có lỗi khi lưu vào Database."); } catch (e) { console.error("Lỗi lưu DB", e); } const newBooking = { san: selectedField.TenSan, sanType: bookingInfo.fieldType, ngay: searchFilters.date, gio: `${bookingInfo.startTime} - ${bookingInfo.endTime}`, gia: bookingInfo.totalPrice, nguoiDat: bookingInfo.name, sdt: bookingInfo.phone, timestamp: new Date().toISOString() }; const updatedHistory = [...history, newBooking]; setHistory(updatedHistory); localStorage.setItem('bookingHistory_' + currentUser.phone, JSON.stringify(updatedHistory)); alert('Thanh toán thành công! Sân đã được lưu.'); setCurrentView('home'); setShowQR(false); window.location.reload(); };

    const clearHistory = () => { if (window.confirm("Xóa lịch sử?")) { setHistory([]); localStorage.removeItem('bookingHistory_' + currentUser.phone); } };
    const handleAddField = async (newFieldData) => { try { const res = await fetch('https://fufu-field-backend.onrender.com/api/sanbong', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newFieldData) }); if (res.ok) { alert('Thêm sân thành công!'); fetchFields(); } } catch (err) { alert('Lỗi thêm sân'); } };
    const handleDeleteField = async (id) => { if (!window.confirm("Xóa sân này?")) return; try { const res = await fetch(`https://fufu-field-backend.onrender.com/api/sanbong/${id}`, { method: 'DELETE' }); if (res.ok) { alert('Đã xóa sân!'); fetchFields(); } } catch (err) { alert('Lỗi xóa sân'); } };

    useEffect(() => { let interval; if (showQR && qrTimer > 0) interval = setInterval(() => setQrTimer(prev => prev - 1), 1000); else if (qrTimer === 0) { alert("Hết thời gian!"); setShowQR(false); setQrTimer(60); } return () => clearInterval(interval); }, [showQR, qrTimer]);
    useEffect(() => { if (bookingInfo.startTime && bookingInfo.endTime) { const price = calculateComplexPrice(searchFilters.date, bookingInfo.startTime, bookingInfo.endTime, bookingInfo.fieldType); setBookingInfo(prev => ({ ...prev, totalPrice: price })); } }, [bookingInfo.startTime, bookingInfo.endTime, searchFilters.date, bookingInfo.fieldType]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-slate-100">
            {currentView !== 'login' && <Header currentView={currentView} setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} handleLogout={handleLogout} showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} currentUser={currentUser} onOpenChat={() => { if (isLoggedIn) setShowChat(true); else alert("Vui lòng đăng nhập để chat!"); }} />}
            <main>
                {currentView === 'home' && <HomePage setCurrentView={setCurrentView} searchFilters={searchFilters} setSearchFilters={setSearchFilters} fields={fields} loading={loading} setSelectedField={setSelectedField} />}
                {currentView === 'search' && <SearchPage fields={fields} loading={loading} setSelectedField={setSelectedField} setCurrentView={setCurrentView} />}
                {currentView === 'detail' && <FieldDetailPage selectedField={selectedField} setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} searchFilters={searchFilters} setSearchFilters={setSearchFilters} bookingInfo={bookingInfo} setBookingInfo={setBookingInfo} busySlots={busySlots} currentUser={currentUser} />}
                {currentView === 'payment' && <PaymentPage bookingInfo={bookingInfo} setCurrentView={setCurrentView} showQR={showQR} setShowQR={setShowQR} qrTimer={qrTimer} setQrTimer={setQrTimer} selectedField={selectedField} searchFilters={searchFilters} saveBooking={saveBooking} />}
                {currentView === 'login' && <LoginPage authMode={authMode} setAuthMode={setAuthMode} handleLogin={handleLogin} setCurrentView={setCurrentView} />}
                {currentView === 'history' && <HistoryPage setCurrentView={setCurrentView} history={history} setHistory={setHistory} clearHistory={clearHistory} currentUser={currentUser} />}
                {currentView === 'admin' && <AdminPage fields={fields} onAddField={handleAddField} onDeleteField={handleDeleteField} currentUser={currentUser} />}
                {currentView === 'promotion' && <PromotionModal onClose={() => setCurrentView('home')} />}

                {/* TRANG CÁ NHÂN */}
                {currentView === 'profile' && <UserProfilePage currentUser={currentUser} handleLogout={handleLogout} />}

            </main>
            {isLoggedIn && currentUser?.role !== 'admin' && !showChat && (<FloatingChatButton onClick={() => setShowChat(true)} unreadCount={unreadCount} />)}
            {showChat && <ChatBox currentUser={currentUser} onClose={() => setShowChat(false)} />}

            {currentView !== 'login' && (
                <footer className="mt-auto border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            {/* Brand */}
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">⚽</span>
                                    </div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">FuFu Field</span>
                                </div>
                                <p className="text-slate-400 max-w-sm">Nền tảng đặt sân bóng đá online hàng đầu Việt Nam. Nhanh chóng, tiện lợi, giá cả minh bạch.</p>
                            </div>
                            {/* Links */}
                            <div>
                                <h4 className="font-semibold text-white mb-4">Liên kết</h4>
                                <ul className="space-y-2 text-slate-400">
                                    <li><button onClick={() => setCurrentView('home')} className="hover:text-emerald-400 transition">Trang chủ</button></li>
                                    <li><button onClick={() => setCurrentView('search')} className="hover:text-emerald-400 transition">Tìm sân</button></li>
                                    <li><button onClick={() => setCurrentView('promotion')} className="hover:text-emerald-400 transition">Khuyến mãi</button></li>
                                </ul>
                            </div>
                            {/* Contact */}
                            <div>
                                <h4 className="font-semibold text-white mb-4">Liên hệ</h4>
                                <ul className="space-y-2 text-slate-400">
                                    <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" /> 0328 665 619</li>
                                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> TP. Hồ Chí Minh</li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-500 text-sm">© 2025 FuFu Field. Made with ❤️ by <span className="text-emerald-400 font-semibold">hoangedu773</span></p>
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <span>Điều khoản</span>
                                <span>•</span>
                                <span>Chính sách</span>
                                <span>•</span>
                                <span>Hỗ trợ</span>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default FootballBookingApp;