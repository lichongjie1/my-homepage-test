import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const contactInfo = [
  {
    title: '电话号码',
    content: '17786296370',
    icon: <Phone className="text-red-500 w-6 h-6" />,
    description: '工作时间：周一至周五 9:00-18:00'
  },
  {
    title: '邮箱',
    content: 'lcj20011004@outlook.com',
    icon: <Mail className="text-red-500 w-6 h-6" />,
    description: '邮件通常会在24小时内回复'
  },
  {
    title: '微信号',
    content: 'lichongjie',
    icon: <MessageCircle className="text-red-500 w-6 h-6" />,
    description: '添加时请注明您的来意'
  }
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white"
          >
            联系方式
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-red-500 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
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
