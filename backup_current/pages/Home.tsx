import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ContactSection } from '@/components/home/ContactSection';
import { WorksSection } from '@/components/home/WorksSection';
import { ChatSection } from '@/components/home/ChatSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30 scroll-smooth">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ContactSection />
        <WorksSection />
        <ChatSection />
      </main>
      <footer className="py-12 border-t border-white/20 bg-black/50 px-6 text-center text-white/70 text-sm">
        <p>© 2026 Jesse 的数字主页 | 用 AI 赋能内容创作</p>
      </footer>
    </div>
  );
}
