import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, X, Send, Bot, Leaf, Loader2 } from 'lucide-react';

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ lý AI OCOP được tích hợp trí tuệ nhân tạo Gemini. Hãy hỏi tôi về bất kỳ sản phẩm, chính sách hỗ trợ kinh phí hay quy trình đăng ký OCOP nhé!',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        throw new Error('API server returned error');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.reply || 'Cảm ơn quý vị đã gửi câu hỏi. Bộ phận hỗ trợ OCOP sẽ phản hồi chi tiết.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback in case backend route fails
      const fallbackMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: 'Chính sách hỗ trợ theo Nghị quyết 18/2023/NQ-HĐND: thưởng 50 triệu/sản phẩm 3 sao, 80 triệu/sản phẩm 4 sao, hỗ trợ 100% bao bì tối đa 30 triệu đồng. Quý vị vui lòng tham khảo thêm tại mục "Văn Bản Pháp Lý".',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-[9998]">
      {/* Floating Launcher Button */}
      <button
        onClick={onToggle}
        className="w-13 h-13 sm:w-14 sm:h-14 p-3 bg-gradient-to-br from-green-600 to-emerald-800 text-white rounded-full shadow-2xl flex items-center justify-center text-xl sm:text-2xl hover:scale-105 transition-transform duration-300 relative group cursor-pointer"
        aria-label="Mở Trợ lý AI OCOP"
      >
        <Sparkles className="w-6 h-6 text-yellow-300" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-base">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm leading-tight">
                  Trợ Lý AI OCOP (Gemini)
                </h4>
                <span className="text-[10px] text-green-200 flex items-center mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block mr-1"></span>{' '}
                  Đã kích hoạt AI Studio
                </span>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-white hover:text-gray-200 text-base cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Box */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs leading-relaxed bg-gray-50 chat-scroll">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start space-x-2 ${
                  m.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 bg-green-700 text-white rounded-lg flex items-center justify-center shrink-0 text-[10px]">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-2xl shadow-xs max-w-[85%] whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-green-700 text-white rounded-br-xs'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-green-200' : 'text-gray-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-green-700 text-white rounded-lg flex items-center justify-center shrink-0 text-[10px]">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white text-gray-500 border border-gray-100 p-2.5 rounded-2xl rounded-bl-xs shadow-xs max-w-[85%] italic text-[11px] flex items-center">
                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin text-green-700" />
                  Gemini AI đang phân tích dữ liệu...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-gray-100 flex overflow-x-auto space-x-1.5 text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSend('Tam Đảo có sản phẩm OCOP 5 sao nào?')}
              className="px-2.5 py-1 bg-green-50 text-green-800 hover:bg-green-100 rounded-lg transition cursor-pointer"
            >
              5 sao Tam Đảo?
            </button>
            <button
              onClick={() => handleSend('Mức tiền thưởng cho OCOP 3 sao, 4 sao?')}
              className="px-2.5 py-1 bg-green-50 text-green-800 hover:bg-green-100 rounded-lg transition cursor-pointer"
            >
              Mức thưởng OCOP?
            </button>
            <button
              onClick={() => handleSend('Làm sao để đăng ký OCOP?')}
              className="px-2.5 py-1 bg-green-50 text-green-800 hover:bg-green-100 rounded-lg transition cursor-pointer"
            >
              Cách đăng ký?
            </button>
          </div>

          {/* Chat Input */}
          <div className="p-2.5 bg-white border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Hỏi AI về sản phẩm, chính sách..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputText.trim()}
              className="w-8 h-8 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white rounded-xl flex items-center justify-center text-xs transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
