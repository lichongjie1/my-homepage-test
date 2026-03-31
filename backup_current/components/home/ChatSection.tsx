import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

const KNOWLEDGE_BASE = {
  identity: "我是一名内容策划，专门研究如何将 AI 应用到抖音等内容平台上。",
  currentWork: "我最近正在搭建自己的个人主页和作品集，同时也尝试用 AI 工具产出更有创意的抖音视频。",
  skills: "我的核心能力在于内容表达、AI 应用场景探索以及知识体系的整理。",
  contact: "你可以通过抖音直接私信我，或者关注我正在建设的作品集，在那里我会分享更多联系方式。",
  works: "目前主要在抖音进行内容实验和 AI 应用案例分享，更多体系化的作品正在整理中，敬请期待！"
};

const getResponse = (input: string): string => {
  const query = input.toLowerCase();

  if (query.includes('你谁') || query.includes('身份') || query.includes('职业')) {
    return KNOWLEDGE_BASE.identity;
  }
  if (query.includes('做什么') || query.includes('目前') || query.includes('最近')) {
    return KNOWLEDGE_BASE.currentWork;
  }
  if (query.includes('擅长') || query.includes('方向') || query.includes('能力') || query.includes('特长')) {
    return KNOWLEDGE_BASE.skills;
  }
  if (query.includes('联系') || query.includes('找到') || query.includes('沟通')) {
    return KNOWLEDGE_BASE.contact;
  }
  if (query.includes('作品') || query.includes('案例') || query.includes('视频')) {
    return KNOWLEDGE_BASE.works;
  }

  return "这个问题超出了我目前的知识范围，欢迎直接联系 Jesse 了解更多。";
};

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'bot',
      content: '你好！我是 Jesse 的数字分身。你可以问我关于他的职业、最近在做什么或者怎么联系他。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot reply delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: getResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section id="chat" className="py-24 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight text-white"
          >
            和 Jesse 的数字分身聊聊
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            className="h-1 bg-red-500 rounded-full mb-6"
          />
          <p className="text-white/70 text-center max-w-lg">
            通过 AI 数字人技术，你可以快速了解我的背景、技能和最近的动态。
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
          {/* Chat Messages */}
          <ScrollArea ref={scrollRef} className="flex-1 p-6">
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "flex items-start gap-3",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                      msg.role === 'user' ? "bg-red-500 text-white" : "bg-white/10 text-white"
                    )}>
                      {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed",
                      msg.role === 'user'
                        ? "bg-red-500 text-white rounded-tr-none"
                        : "bg-white/10 backdrop-blur-sm text-white rounded-tl-none border border-white/10"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 bg-black/20 border-t border-white/10">
            <div className={cn(
              "flex gap-2 relative transition-transform duration-100",
              errorShake && "translate-x-1 animate-in shake-horizontal"
            )}>
              <Input
                placeholder="问问我：你现在在做什么？"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-black/50 border-white/20 focus-visible:ring-red-500 h-12 rounded-xl text-white placeholder:text-white/50"
              />
              <Button
                onClick={handleSend}
                disabled={isTyping}
                className="h-12 w-12 rounded-xl p-0 bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
