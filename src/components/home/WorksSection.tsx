import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Bot, Video } from 'lucide-react';

const worksInfo = [
  {
    title: 'AI应用',
    content: '智能工具开发',
    icon: <Cpu className="text-red-500 w-6 h-6" />,
    description: '开发基于AI的智能应用工具，提升工作效率和用户体验。'
  },
  {
    title: 'AI智能体定制',
    content: '个性化AI助手',
    icon: <Bot className="text-red-500 w-6 h-6" />,
    description: '根据不同场景定制专属AI智能体，提供个性化服务。'
  },
  {
    title: 'AI视频内容创作',
    content: '短视频制作',
    icon: <Video className="text-red-500 w-6 h-6" />,
    description: '利用AI技术创作高质量短视频内容，探索内容创新。'
  }
];

export function WorksSection() {
  return (
    <section id="works" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white"
          >
            我的作品
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-red-500 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {worksInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="h-full bg-black/40 backdrop-blur-sm border-white/20 hover:border-red-500/40 transition-all duration-300">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-red-500 mb-2">
                    {item.content}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
