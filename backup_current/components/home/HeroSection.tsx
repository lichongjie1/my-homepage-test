import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function HeroSection() {
  const avatarUrl = "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_4f32e9cf-ec82-4530-a346-4e74b9f7c921.jpg";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-black">
      {/* 纯黑色背景 - 抖音风格 */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 font-['Microsoft YaHei'] text-white"
        >
          Jesse
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl font-['Microsoft YaHei'] text-white max-w-2xl leading-relaxed mb-16"
        >
          专注于AI产品开发的抖音内容策划师
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Button
            size="lg"
            className="rounded-full px-12 py-3 bg-red-500 hover:bg-red-600 text-white font-['Microsoft YaHei'] text-lg font-bold"
            asChild
          >
            <a href="#chat">与我的分身聊聊</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-12 py-3 border-white/40 text-white hover:bg-white/10 font-['Microsoft YaHei'] text-lg font-bold"
            asChild
          >
            <a href="#about">了解更多</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="relative mt-12 group"
        >
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-2 border-white/30 bg-black/80 relative z-10">
            <AvatarImage src={avatarUrl} alt="Jesse" className="object-cover" />
            <AvatarFallback className="text-4xl bg-white/20 text-white">J</AvatarFallback>
          </Avatar>
        </motion.div>
      </motion.div>

      {/* Floating scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
