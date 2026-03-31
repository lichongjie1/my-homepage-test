import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Heart, Zap } from 'lucide-react';

const personalInfo = [
  {
    title: '目前在做',
    content: '想用 AI 做一些抖音内容',
    icon: <Sparkles className="text-red-500 w-6 h-6" />,
    description: '专注于将前沿 AI 技术与短视频内容深度结合，探索内容创作的新边界。'
  },
  {
    title: '兴趣方向',
    content: 'AI 应用、健身',
    icon: <Heart className="text-red-500 w-6 h-6" />,
    description: '在技术研究之余，也注重身心平衡，追求高效的训练与健康的生活方式。'
  },
  {
    title: '个人特点',
    content: '喜欢把复杂的问题简单化',
    icon: <Zap className="text-red-500 w-6 h-6" />,
    description: '擅长从纷繁的信息中提取核心，以最通俗易懂的方式传达复杂的逻辑。'
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white"
          >
            关于我
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-red-500 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personalInfo.map((item, index) => (
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
