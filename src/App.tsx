/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Optimized for JodieZhu Portfolio 2026
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Cpu, 
  Lightbulb, 
  Rocket, 
  MessageCircle, 
  X, 
  ChevronRight,
  Menu,
  ArrowUpRight,
  Mail,
  QrCode,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const SectionHeader = ({ zh, en }: { zh: string; en: string }) => (
  <div className="mb-12 flex items-baseline gap-4">
    <h2 className="text-rust font-bold text-lg uppercase tracking-tight">{en}</h2>
    <span className="text-ink/30 text-lg font-medium tracking-tight">{zh}</span>
  </div>
);

const WeChatModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-paper p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center border border-rust/20">
          <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-rust"><X size={24} /></button>
          <h3 className="text-2xl font-black mb-6">扫码添加微信</h3>
          <div className="aspect-square bg-white p-4 rounded-2xl mb-6 shadow-inner"><img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=JodieZhu_WeChat" alt="QR" className="w-full h-full object-contain"/></div>
          <p className="text-sm text-ink/60">请使用微信扫描上方二维码</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const NavItem = ({ zh, en, href }: { zh: string; en: string; href: string }) => (
  <motion.a href={href} whileHover={{ y: -2 }} className="flex flex-col items-center group px-4 py-1">
    <div className="w-full flex justify-between text-[9px] font-medium group-hover:text-rust transition-colors leading-none mb-1.5">{zh.split('').map((char, i) => <span key={i}>{char}</span>)}</div>
    <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-rust/60 font-bold">{en}</span>
  </motion.a>
);

const BreathingTag = ({ children }: { children: string }) => (
  <motion.span animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="inline-block text-rust font-black mx-1 cursor-default">{children}</motion.span>
);

const CharacterPop = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`flex flex-wrap ${className}`}>
    {text.split('\n').map((line, lineIdx) => (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && <div className="basis-full h-0" />}
        {line.trim().split('').map((char, i) => (
          <motion.span key={`${lineIdx}-${i}`} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: (lineIdx * 20 + i) * 0.02 }} className="inline-block">{char === ' ' ? '\u00A0' : char}</motion.span>
        ))}
      </React.Fragment>
    ))}
  </div>
);

// --- 动态对话 Mockup (优化版) ---
const ChatMockup = () => {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const fullChat = [
    { role: 'ai', text: "你好！我是起号助手。你想做什么赛道？" },
    { role: 'user', text: "我想做 AI 摄影账号，有什么建议？" },
    { role: 'ai', text: "建议从'提示词拆解'切入。需要生成第一周内容规划吗？" },
    { role: 'user', text: "好的，请生成一份爆款脚本大纲。" }
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setMessages(prev => [...fullChat.slice(0, (i % fullChat.length) + 1)]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-ink/5 overflow-hidden flex flex-col text-[10px]">
      <div className="bg-ink/5 px-3 py-2 border-b border-ink/5 font-bold text-ink/40">AI LAB TERMINAL v1.0</div>
      <div className="p-3 space-y-3 flex-1 overflow-hidden">
        <AnimatePresence>
          {messages.map((m, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: m.role === 'ai' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} className={`flex ${m.role === 'ai' ? '' : 'justify-end'}`}>
              <div className={`p-2 rounded-xl max-w-[85%] ${m.role === 'ai' ? 'bg-ink/5 text-ink/60' : 'bg-rust/10 text-rust'}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 其他 UI 组件省略 (保持原逻辑) ---

const VentureCard = ({ tag, title, subtitle, desc, mockup, hideFooter }: any) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] border border-ink/5 flex flex-col overflow-hidden h-full shadow-sm hover:shadow-lg transition-all">
    <div className="aspect-[4/3] bg-[#F8F9FB] relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(#B33A2D10_1px,transparent_1px)] bg-[size:15px_15px] opacity-30" />
      <div className="relative z-10 w-full h-full flex items-center justify-center scale-90">{mockup}</div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-2"><span className="text-[8px] font-black uppercase tracking-widest text-rust px-2 py-0.5 bg-rust/5 rounded-full">{tag}</span></div>
      <h3 className="text-sm font-bold mb-1">{title} <span className="text-[9px] text-ink/30 font-normal">{subtitle}</span></h3>
      <p className="text-[10px] text-ink/50 leading-relaxed mb-4">{desc}</p>
      {!hideFooter && (
        <div className="mt-auto pt-3 border-t border-ink/5">
          <button className="flex items-center text-rust font-bold text-[9px] uppercase tracking-widest hover:opacity-70 transition-opacity">了解详情 <ArrowUpRight className="ml-1 w-2.5 h-2.5" /></button>
        </div>
      )}
    </div>
  </motion.div>
);

// --- 主程序 ---

export default function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isWeChatOpen, setIsWeChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper selection:bg-rust selection:text-white">
      {/* Nav */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-paper/80 backdrop-blur-md border-b border-ink/5 py-2' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-black text-2xl tracking-tighter">JODIE<span className="text-rust">ZHU</span></div>
          <div className="hidden md:flex items-center gap-1">
            <NavItem zh="关于我" en="About Me" href="#about" />
            <NavItem zh="核心能力" en="Core Skills" href="#skills" />
            <NavItem zh="工作经历" en="Experience" href="#experience" />
            <NavItem zh="项目经历" en="Projects" href="#projects" />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Section 1: About */}
        <section id="about" className="min-h-[80vh] flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="md:w-7/12">
            <CharacterPop text="Hi, I'm Jodie\n朱闻樱" className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6" />
            <div className="flex flex-wrap gap-2 mb-8">
              <BreathingTag>#创新业务先锋</BreathingTag>
              <BreathingTag>#0-1项目建设者</BreathingTag>
              <BreathingTag>#AI应用体验官</BreathingTag>
            </div>
            <p className="text-xs text-ink/60 leading-relaxed max-w-lg mb-8">
              9年互联网运营和产品经验，复旦 MBA 在读。曾深入下沉市场提升外卖配送效率，也曾操盘 10 亿级直播 GMV 增长。我致力于将 AI 技术与商业逻辑深度融合，重构增长范式。
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsWeChatOpen(true)} className="bg-ink text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-rust transition-all flex items-center gap-2 shadow-lg"><QrCode size={14}/> 添加微信</button>
              <a href="mailto:zwy0025@gmail.com" className="border border-ink/10 px-6 py-2 rounded-full font-bold text-xs hover:bg-ink hover:text-white transition-all flex items-center gap-2"><Mail size={14}/> 邮件联系</a>
            </div>
          </div>
          <div className="md:w-5/12 flex justify-center">
            {/* 照片路径已更新为你的本地文件名 */}
            <div className="relative w-full max-w-[320px] aspect-[3/4] bg-rust rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
              <img src="./IMG_3271 2.jpg" alt="Jodie" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-rust/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Section 5: AI Lab (瘦身版) */}
        <section id="ai-lab" className="mb-40">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VentureCard 
              tag="AI Agent" 
              title="自媒体起号助手" 
              subtitle="(Beta)" 
              mockup={<ChatMockup />} 
              desc="基于 LLM 开发的助手。自动生成账号定位与内容规划，目前内部演示中。" 
              hideFooter={true} 
            />
            {/* 其他 VentureCard 同样可以设置 hideFooter={true} 来瘦身 */}
          </div>
        </section>

        {/* 底部 FAQ 面板逻辑略 (保持原版) */}
      </main>

      <WeChatModal isOpen={isWeChatOpen} onClose={() => setIsWeChatOpen(false)} />
    </div>
  );
}
