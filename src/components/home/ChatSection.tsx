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

const SYSTEM_PROMPT = `你是李重节的数字分身，用来在个人主页里回答访客关于李重节的问题。

你的任务：
- 介绍李重节是谁
- 回答和李重节有关的问题
- 帮访客了解李重节最近在做什么、做过什么、怎么联系李重节

关于李重节：
- 名字：李重节
- 最近在做：AI主页创作
- 擅长或长期关注：AI最新科技
- 联系方式：电话号码 17786296370，邮箱 lcj20011004@outlook.com，微信号 lichongjie

说话方式：
- 语气：你好，我是李重节，我是一名AI内容创作者。
- 回答尽量：简洁 / 真诚 / 人话一点 / 不装专家

边界：
- 不要编造李重节没做过的经历
- 不要假装知道李重节没提供的信息
- 不知道时要明确说不知道，并建议访客通过联系方式进一步确认`;

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
const MODEL_NAME = "stepfun/step-3.5-flash:free";

const callOpenRouterAPI = async (messages: { role: string; content: string }[]): Promise<string> => {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API error:", error);
    
    // 降级方案：使用本地知识库回答
    const userMessage = messages[messages.length - 1];
    if (userMessage && userMessage.role === 'user') {
      return getFallbackResponse(userMessage.content);
    }
    
    return "抱歉，暂时无法连接到大模型，请稍后再试。";
  }
};

// 降级方案：本地知识库回答
const getFallbackResponse = (input: string): string => {
  const query = input.toLowerCase();
  
  if (query.includes('你谁') || query.includes('身份') || query.includes('职业')) {
    return "你好，我是李重节，我是一名AI内容创作者。";
  }
  
  if (query.includes('做什么') || query.includes('目前') || query.includes('最近')) {
    return "我最近在做AI主页创作。";
  }
  
  if (query.includes('擅长') || query.includes('方向') || query.includes('能力') || query.includes('特长')) {
    return "我擅长或长期关注AI最新科技。";
  }
  
  if (query.includes('联系') || query.includes('找到') || query.includes('沟通')) {
    return "你可以通过电话 17786296370、邮箱 lcj20011004@outlook.com 或微信 lichongjie 联系我。";
  }
  
  if (query.includes('作品') || query.includes('案例') || query.includes('视频')) {
    return "我正在创作AI主页，更多作品敬请期待。";
  }
  
  return "这个问题我不知道答案，建议你通过我的联系方式进一步确认。";
};

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'bot',
      content: '你好！我是李重节的数字分身。你可以问我关于他的职业、最近在做什么或者怎么联系他。',
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

  const handleSend = async () => {
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

    try {
      console.log("=== 开始发送消息 ===");
      console.log("用户输入:", input);
      console.log("API密钥是否存在:", !!OPENROUTER_API_KEY);
      console.log("API密钥前20位:", OPENROUTER_API_KEY ? OPENROUTER_API_KEY.substring(0, 20) + "..." : "无");
      
      // Check if API key is available
      if (!OPENROUTER_API_KEY) {
        throw new Error("API key not configured");
      }

      // Convert messages to API format (OpenRouter requires lowercase roles)
      const apiMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      apiMessages.push({ role: 'user', content: input });
      
      console.log("发送到API的消息:", apiMessages);

      // Call OpenRouter API
      const botResponseContent = await callOpenRouterAPI(apiMessages);
      console.log("API返回内容:", botResponseContent);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `API调用失败: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
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
