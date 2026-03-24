/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-paper p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center border border-rust/20"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-rust transition-colors">
            <X size={24} />
          </button>
          <h3 className="text-2xl font-black mb-6 tracking-tighter">扫码添加微信</h3>
          <div className="aspect-square bg-white p-4 rounded-2xl mb-6 shadow-inner border border-ink/5">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=JodieZhu_WeChat" 
              alt="WeChat QR Code" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-ink/60 font-medium">请使用微信扫描上方二维码</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const NavItem = ({ zh, en, href }: { zh: string; en: string; href: string }) => (
  <motion.a
    href={href}
    whileHover={{ y: -2 }}
    className="flex flex-col items-center group px-4 py-1"
  >
    <div className="w-full flex justify-between text-[9px] font-medium group-hover:text-rust transition-colors leading-none mb-1.5">
      {zh.split('').map((char, i) => <span key={i}>{char}</span>)}
    </div>
    <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-rust/60 transition-colors leading-none font-bold">{en}</span>
  </motion.a>
);

const FloatingLabel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className="bg-ink/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rust/30 shadow-lg"
  >
    <span className="text-rust font-bold text-xs tracking-widest">{children}</span>
  </motion.div>
);

const BreathingTag = ({ children }: { children: string }) => (
  <motion.span
    animate={{ 
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      textShadow: [
        "0 0 0px rgba(179, 58, 45, 0)",
        "0 0 10px rgba(179, 58, 45, 0.5)",
        "0 0 0px rgba(179, 58, 45, 0)"
      ]
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="inline-block text-rust font-black mx-1 cursor-default"
  >
    {children}
  </motion.span>
);

const CharacterPop = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split('\n').map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <div className="basis-full h-0" />}
          {line.trim().split('').map((char, i) => (
            <motion.span
              key={`${lineIdx}-${i}`}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 100, 
                delay: (lineIdx * 20 + i) * 0.02 
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const TimelineItem = ({ 
  date, 
  title, 
  company, 
  desc, 
  details 
}: { 
  date: string; 
  title: string; 
  company: string; 
  desc: string;
  details?: {
    content: string[];
    projects: string[];
    results: string[];
  }
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 last:mb-0 group"
    >
      <div className="text-ink font-bold text-sm mb-1">{date}</div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h4 className="text-sm font-bold tracking-tight">
          {title} <span className="text-ink/20 mx-1">—</span> <span className="text-rust">{company}</span>
        </h4>
        {details && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[9px] font-bold bg-rust/5 text-rust px-4 py-1.5 rounded-full border border-rust/20 hover:bg-rust hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            了解经历 {isExpanded ? <ChevronDown size={10} className="rotate-180 transition-transform" /> : <ChevronDown size={10} className="transition-transform" />}
          </button>
        )}
      </div>
      <p className="text-xs text-ink/50 leading-relaxed max-w-xl">{desc}</p>
      
      {details && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-6 bg-white rounded-3xl border border-ink/5 shadow-sm">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rust rounded-full" /> 工作内容
                  </h5>
                  <ul className="space-y-2">
                    {details.content.map((item, i) => (
                      <li key={i} className="text-xs text-ink/70 leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rust rounded-full" /> 核心项目
                  </h5>
                  <ul className="space-y-2">
                    {details.projects.map((item, i) => (
                      <li key={i} className="text-xs text-ink/70 leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rust rounded-full" /> 突出成果
                  </h5>
                  <ul className="space-y-2">
                    {details.results.map((item, i) => (
                      <li key={i} className="text-xs text-ink/70 leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

const ProjectCard = ({ title, tag, desc }: { title: string; tag: string; desc: string }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative bg-white p-8 rounded-[2rem] border border-ink/5 shadow-sm transition-all h-full flex flex-col justify-between overflow-hidden"
  >
    <div className="absolute -right-8 -top-8 w-24 h-24 bg-rust/5 rounded-full blur-2xl group-hover:bg-rust/10 transition-all" />
    <div className="relative z-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-rust rounded-full" />
        <span className="text-rust text-[10px] font-black uppercase tracking-[0.2em]">
          {tag}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-rust transition-colors leading-tight">{title}</h3>
      <p className="text-xs text-ink/50 leading-relaxed font-medium">{desc}</p>
    </div>
    <div className="mt-8 flex items-center text-rust font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform relative z-10">
      View Project <ArrowUpRight className="ml-1.5 w-3 h-3" />
    </div>
  </motion.div>
);

const VentureCard = ({ 
  title, 
  tag, 
  subtitle, 
  desc, 
  mockup,
  isAvatar,
  onClick,
  hideFooter
}: { 
  title: string; 
  tag: string; 
  subtitle?: string; 
  desc: string; 
  mockup?: React.ReactNode;
  isAvatar?: boolean;
  onClick?: () => void;
  hideFooter?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] border border-ink/5 flex flex-col overflow-hidden h-full transition-all group shadow-sm hover:shadow-xl"
    >
      <div className="aspect-[4/3] bg-[#F8F9FB] relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(#B33A2D15_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {mockup}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-rust px-2 py-0.5 bg-rust/5 rounded-full border border-rust/10">{tag}</span>
        </div>
        <h3 className="text-sm font-bold mb-1 tracking-tight flex items-baseline gap-2">
          {title}
          {subtitle && <span className="text-[10px] font-medium text-ink/30">{subtitle}</span>}
        </h3>
        <p className="text-[11px] text-ink/50 leading-relaxed mb-4 line-clamp-2">{desc}</p>
        
        {!hideFooter && (
          <div className="mt-auto pt-4 border-t border-ink/5">
            <button 
              onClick={onClick}
              className="flex items-center text-rust font-bold text-[9px] uppercase tracking-widest group cursor-pointer hover:opacity-70 transition-opacity"
            >
              {isAvatar ? "提问分身" : "了解详情"} <ArrowUpRight className="ml-1 w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// 重构为动态打字机效果的 ChatMockup
const ChatMockup = () => {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const fullChat = [
    { role: 'ai', text: "你好！我是起号助手。你想做什么赛道？" },
    { role: 'user', text: "我想做 AI 摄影账号，有什么建议？" },
    { role: 'ai', text: "建议从'提示词拆解'切入。需要生成内容规划吗？" },
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
    <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-ink/5 overflow-hidden flex flex-col text-[10px]">
      <div className="bg-ink/5 px-3 py-2 border-b border-ink/5 font-bold text-ink/40 flex justify-between">
        <span>AI LAB TERMINAL</span>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-rust/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-ink/10" />
        </div>
      </div>
      <div className="p-3 space-y-3 flex-1 overflow-hidden">
        <AnimatePresence>
          {messages.map((m, idx) => (
            <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: m.role === 'ai' ? -10 : 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className={`flex ${m.role === 'ai' ? '' : 'justify-end'}`}
            >
              <div className={`p-2 rounded-xl max-w-[85%] leading-snug ${m.role === 'ai' ? 'bg-ink/5 text-ink/60' : 'bg-rust/10 text-rust font-bold'}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NomiMockup = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center scale-95">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rust rounded-full blur-3xl" />
    </div>
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-28 h-28 bg-ink rounded-full flex items-center justify-center shadow-2xl border-[5px] border-white"
    >
      {/* Nomi Face Mockup */}
      <div className="w-20 h-20 rounded-full bg-rust/10 flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="flex gap-5">
            <motion.div 
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1] }}
              className="w-2.5 h-5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
            />
            <motion.div 
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1] }}
              className="w-2.5 h-5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
            />
          </div>
          <motion.div 
            animate={{ scaleX: [1, 1.2, 1], height: [5, 10, 5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="w-10 h-2 bg-white rounded-full mt-5 mx-auto opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
          />
        </div>
      </div>
      {/* Voice waves */}
      <div className="absolute -bottom-5 flex gap-1">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <motion.div
            key={i}
            animate={{ height: [5, 15, 5] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            className="w-1 bg-rust rounded-full opacity-70"
          />
        ))}
      </div>
    </motion.div>
    <div className="mt-10 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full border border-ink/5 shadow-sm">
      <span className="text-[10px] font-bold text-ink/70 tracking-tight">“宝贝，今天想听什么故事？”</span>
    </div>
  </div>
);

const LiveMockup = () => (
  <div className="w-36 h-60 bg-ink rounded-[2.2rem] border-[4px] border-ink/90 shadow-2xl overflow-hidden relative flex flex-col scale-90 group-hover:rotate-1 transition-transform">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-ink rounded-b-xl z-20" />
    <div className="flex-1 relative bg-ink/20">
      <img 
        src="https://picsum.photos/seed/live-stream-v2/400/800" 
        className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700"
        alt="Live Stream"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
      
      {/* Live UI Overlay */}
      <div className="absolute top-7 left-4 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden">
          <img src="https://picsum.photos/seed/avatar/100/100" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="bg-rust px-1.5 py-0.5 rounded text-[7px] font-black text-white tracking-widest">LIVE</div>
      </div>
      
      <div className="absolute bottom-5 left-4 right-4 space-y-2.5">
        <div className="flex gap-2.5 items-center">
          <div className="w-5 h-5 rounded-full bg-white/40" />
          <div className="h-2 w-20 bg-white/20 rounded-full" />
        </div>
        <div className="flex gap-2.5 items-center">
          <div className="w-5 h-5 rounded-full bg-white/40" />
          <div className="h-2 w-24 bg-white/20 rounded-full" />
        </div>
        <div className="pt-2 flex justify-between items-center">
          <div className="w-24 h-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20" />
          <div className="w-7 h-7 rounded-full bg-rust/90 flex items-center justify-center shadow-lg shadow-rust/30">
            <ArrowUpRight size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CompetencyBlock = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass aspect-square flex flex-col items-center justify-center p-6 relative group overflow-hidden cursor-default border-ink/5 transition-all"
  >
    <div className="absolute inset-0 bg-rust/0 group-hover:bg-rust/5 transition-colors" />
    <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-rust/5 rounded-full blur-xl group-hover:bg-rust/20 transition-all" />
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="mb-3 text-rust relative z-10"
    >
      <Icon size={32} strokeWidth={1.5} />
    </motion.div>
    <span className="text-center font-display font-bold text-[10px] uppercase tracking-widest group-hover:text-rust transition-colors px-2 relative z-10">
      {title}
    </span>
  </motion.div>
);

const FAQDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  
  const faqs = [
    { q: "离职原因？", a: "寻求更广阔的 AI 应用落地场景，将 9 年运营经验与 AIGC 技术深度结合，创造指数级增长。" },
    { q: "期望薪资？", a: "基于行业标准与岗位价值，期待一份能体现专业深度与创业精神的薪资方案，具体可面议。" },
    { q: "为何选你？", a: "我既有大厂 10 亿规模的操盘视野，又有 0-1 创业的实战韧性。我是懂业务的 AI 实践者，能直接为业务结果负责。" }
  ];

  useEffect(() => {
    if (selectedQ !== null) {
      setTypingText("");
      let i = 0;
      const fullText = faqs[selectedQ].a;
      const interval = setInterval(() => {
        setTypingText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [selectedQ]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 w-80 md:w-96 bg-white border border-rust/20 shadow-2xl z-50 overflow-hidden rounded-2xl"
        >
          <div className="bg-rust p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <h4 className="font-display font-bold uppercase tracking-widest text-[10px]">AI Digital Twin Active</h4>
            </div>
            <button onClick={onClose} className="hover:rotate-90 transition-transform">
              <X size={18} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-ink/5 pb-4 last:border-0">
                <button 
                  onClick={() => setSelectedQ(selectedQ === i ? null : i)}
                  className="w-full text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-sm group-hover:text-rust transition-colors">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedQ === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {selectedQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-ink/60 mt-3 leading-relaxed overflow-hidden min-h-[3em]"
                    >
                      {typingText}
                      <motion.span 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1 h-3 bg-rust ml-1 translate-y-0.5"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isWeChatOpen, setIsWeChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-rust selection:text-white overflow-x-hidden bg-paper">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-rust origin-left z-[1000]"
        style={{ scaleX }}
      />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-paper/80 backdrop-blur-md border-b border-ink/5 py-2' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display font-black text-2xl tracking-tighter"
          >
            JODIE<span className="text-rust">ZHU</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-1">
            <NavItem zh="关于我" en="About Me" href="#about" />
            <NavItem zh="核心能力" en="Core Skills" href="#skills" />
            <NavItem zh="工作经历" en="Experience" href="#experience" />
            <NavItem zh="项目经历" en="Projects" href="#projects" />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" />
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-ink hover:text-rust transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-paper border-b border-ink/5 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {[
                  { zh: "关于我", en: "About Me", href: "#about" },
                  { zh: "核心能力", en: "Core Skills", href: "#skills" },
                  { zh: "工作经历", en: "Experience", href: "#experience" },
                  { zh: "项目经历", en: "Projects", href: "#projects" },
                  { zh: "AI 实验室", en: "AI Lab", href: "#ai-lab" }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm font-bold group-hover:text-rust transition-colors">{item.zh}</span>
                    <span className="text-[10px] uppercase tracking-widest text-ink/30 group-hover:text-rust/60 transition-colors">{item.en}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: parallaxY }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        <div className="absolute top-[15%] right-[-10%] w-[40vw] h-[40vw] bg-rust/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[30vw] h-[30vw] bg-ink/5 rotate-45 blur-[80px]" />
      </motion.div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* 1. About Me (The Identity) */}
        <section id="about" className="relative min-h-screen pt-20 pb-40 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative">
            
            {/* Left Top: Red Text & Breathing Tags */}
            <div className="md:col-span-7 pt-12 md:sticky md:top-32">
              <div className="mb-8">
                <CharacterPop 
                  text="Hi, I'm Jodie
                  朱闻樱" 
                  className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-ink mb-6"
                />
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <BreathingTag>#创新业务先锋</BreathingTag>
                  <BreathingTag>#0-1项目建设者</BreathingTag>
                  <BreathingTag>#AI应用资深体验官</BreathingTag>
                </div>

                <div className="space-y-4 max-w-xl">
                  <p className="text-sm font-bold text-ink/80">
                    复合型运营进化者
                  </p>
                  <p className="text-xs text-ink/60 leading-relaxed">
                    9年互联网运营和产品经验，1年创业项目经验。深耕互联网行业多年，擅长从 0 到 1 搭建业务体系与合作伙伴赋能。目前专注于AI与业务场景的深度融合研究，探索 AI Agent、自动化工作流及内容生成的商业化落地解决方案。
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 pt-4">
                    <a 
                      href="mailto:zwy0025@gmail.com"
                      className="flex items-center gap-2 text-xs font-bold text-rust hover:underline"
                    >
                      <Mail size={14} /> zwy0025@gmail.com
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsWeChatOpen(true)}
                      className="flex items-center justify-center gap-2 bg-ink text-white px-4 py-2 rounded-full font-bold text-[10px] tracking-widest shadow-lg hover:bg-rust transition-all"
                    >
                      <QrCode size={14} /> 添加微信
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Top: Large Vertical Block with Photo */}
            <div className="md:col-span-5 flex justify-end relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[140px] aspect-[3/4] bg-rust overflow-hidden shadow-2xl"
              >
                {/* 已经将图片路径替换为你根目录下的 /me.jpg */}
                <img 
                  src="/me.jpg" 
                  alt="Jodie Zhu" 
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 grayscale hover:grayscale-0"
                />
                {/* Decorative overlay */}
                <div className="absolute inset-0 border-[12px] border-rust/20 pointer-events-none" />
              </motion.div>
            </div>

            {/* Subtitle: Positioned below */}
            <div className="md:col-span-12 mt-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-rust font-bold text-xs md:text-sm uppercase tracking-widest"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-rust rounded-full" />
                  1993.9
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-rust rounded-full" />
                  10年工作经验
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-rust rounded-full" />
                  复旦大学 MBA
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Core Competency (The Competency) */}
        <section id="skills" className="mb-40">
          <SectionHeader zh="核心技能" en="Core Skills" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CompetencyBlock title="业务破局与增长运营" icon={TrendingUp} />
            <CompetencyBlock title="ToB/C产品运营经验" icon={Cpu} />
            <CompetencyBlock title="商业思考与用户洞察" icon={Lightbulb} />
            <CompetencyBlock title="AI应用与创新" icon={Rocket} />
          </div>
        </section>

        {/* 3. Experience & Education (The Timeline) */}
        <section id="experience" className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Experience Column */}
            <div>
              <SectionHeader zh="工作经历" en="Work Experience" />
              <div className="space-y-4">
                <TimelineItem 
                  date="2025.10 - 至今"
                  title="创业项目"
                  company="Koma Bistro / 予童科技"
                  desc="BP撰写与融资 / 线上培训课程体系搭建与AI产品孵化"
                  details={{
                    content: [
                      "深度参与 AIGC 产品架构设计与市场增长策略",
                      "重构品牌商业模型，对接优质资本资源",
                      "负责核心团队融资洽谈与合作伙伴关系维护"
                    ],
                    projects: [
                      "予童科技：AIGC 赋能内容生产流程优化",
                      "Koma Bistro：品牌商业模型重构与融资 BP"
                    ],
                    results: [
                      "内容产出提效 300%",
                      "成功对接多家优质资本资源",
                      "完成 3 万字深度商业计划书"
                    ]
                  }}
                />
                <TimelineItem 
                  date="2021.07 - 2025.07"
                  title="运营经理"
                  company="Ctrip 携程"
                  desc="0-1搭建商家直播生态体系，3年推动GMV从1000万增至10亿+。"
                  details={{
                    content: [
                      "从 0 到 1 搭建商家直播生态体系",
                      "制定直播间运营标准与流量分发策略",
                      "负责直播业务的整体增长与商业化变现"
                    ],
                    projects: [
                      "携程直播青训营：孵化 0 基础团队",
                      "携程 AI 直播：真人+AI 24小时客服直播间"
                    ],
                    results: [
                      "3 年推动 GMV 从 1000 万增至 10 亿+",
                      "直播间转化率提升 70%+",
                      "孵化团队 1 个月直播 GMV 破百万"
                    ]
                  }}
                />
                <TimelineItem 
                  date="2020.05 - 2021.07"
                  title="产品运营"
                  company="Yitiao 一条"
                  desc="0-1艺术电商平台搭建。优化用户注册转化节点，将小程序注册率提升至80%。"
                  details={{
                    content: [
                      "负责艺术电商平台的产品运营与用户增长",
                      "优化用户注册与交易转化路径",
                      "打通拍卖+直播的闭环交易链路"
                    ],
                    projects: [
                      "一条艺术品电商平台：小程序注册转化优化",
                      "拍卖+直播交易链路整合"
                    ],
                    results: [
                      "小程序注册率从 30% 提升至 80%",
                      "成功上线艺术品拍卖直播功能",
                      "显著提升高客单价商品转化效率"
                    ]
                  }}
                />
                <TimelineItem 
                  date="2016.09 - 2020.04"
                  title="产品运营"
                  company="Ele.me 饿了么"
                  desc="主导下沉市场智能调度系统覆盖率从30%提升至98%。"
                  details={{
                    content: [
                      "负责下沉市场物流调度系统的产品运营",
                      "协调全国 1800 个城市代理商的系统落地",
                      "通过数据分析优化配送效率与成本控制"
                    ],
                    projects: [
                      "下沉市场智能调度系统覆盖提升项目",
                      "代理商降本增效专项行动"
                    ],
                    results: [
                      "系统覆盖率从 30% 提升至 98%",
                      "帮助全国代理商显著降低运营成本",
                      "配送效率提升 25% 以上"
                    ]
                  }}
                />
              </div>
            </div>

            {/* Education Column */}
            <div>
              <SectionHeader zh="教育背景" en="Education Background" />
              <div className="space-y-4">
                <TimelineItem 
                  date="2024.09 - 2027.03"
                  title="工商管理(MBA)"
                  company="复旦大学（硕士）"
                  desc="专注于商业领导力与创新管理。参与 Esade University 交换项目：Leading Innovation。"
                />
                <TimelineItem 
                  date="2012.09 - 2016.07"
                  title="工业设计"
                  company="嘉兴大学(本科)"
                  desc="2016级优秀毕业生。培养了深厚的用户体验设计基础与产品思维。"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Projects (The Ventures) */}
        <section id="projects" className="mb-40">
          <SectionHeader zh="项目经历" en="Project Experience" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="下沉市场外卖配送提效"
              tag="智能系统覆盖与调优"
              desc="主导饿了么下沉市场智能调度系统覆盖率从30%提升至98%，对结算法团队优化算法，帮助全国1800个城市代理商实现降本增效（配送时长缩短4分钟，骑手背单能力提升2 单/人）。。"
            />
            <ProjectCard 
              title="一条艺术电商平台"
              tag="电商运营"
              desc="0-1搭建艺术品电商平台，运营艺术品线上展厅、直播、拍卖、线上销售板块的产品规划与内容生态建设；同艺术品BD、内容编辑团队共同搭建从艺术家到艺术作品的完整基础知识体系，降低艺术品消费者线上购买门槛。"
            />
            <ProjectCard 
              title="携程直播青训营"
              tag="校企合作"
              desc="负责“携程直播青训营”校企合作项目的孵化与落地，从0-1搭建青训营校企合作体系，主导项目合作方案、项目策略、商务拓展、学员培训等全链路落地。"
            />
          </div>
        </section>
        
        {/* 5. AI Lab (Core Achievements & Experiments) */}
        <section id="ai-lab" className="mb-40">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VentureCard 
              tag="AI Agent"
              title="自媒体起号助手"
              subtitle="（开发中）"
              mockup={<ChatMockup />}
              desc="基于大语言模型开发的自媒体助手，能够根据用户输入自动生成差异化的账号定位与内容规划。"
              hideFooter={true}
            />
            <VentureCard 
              tag="AI Product"
              title="婴幼儿家庭 AI 陪伴产品"
              subtitle="（IP孵化中）"
              mockup={<NomiMockup />}
              desc="结合多模态交互技术，为婴幼儿提供情感陪伴与早教互动，解决家庭育儿中的陪伴缺失问题。"
              hideFooter={true}
            />
            <VentureCard 
              tag="AI live Streaming"
              title="携程 AI 虚拟形象直播"
              subtitle="（2024）"
              mockup={<LiveMockup />}
              desc="利用 AI 技术重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低直播成本。"
              hideFooter={true}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 pt-20 pb-12 border-t border-ink/10 flex flex-col items-center">
          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mb-12 flex flex-col items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:border-rust transition-colors">
              <ArrowUpRight className="rotate-[-135deg] text-ink/40 group-hover:text-rust transition-colors" size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 group-hover:text-rust transition-colors">Back to Top</span>
          </motion.button>

          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <h2 className="text-4xl mb-4 tracking-tighter">JodieZhu / 朱闻樱</h2>
              <p className="text-ink/60 text-sm leading-relaxed mb-8">
                致力于将 AI 技术 with 商业逻辑深度融合，重构增长范式。
              </p>
              <p className="text-ink/30 font-mono text-[10px] uppercase tracking-[0.3em]">Neo-Pictorialism Portfolio © 2026</p>
            </div>
            <div className="grid grid-cols-2 gap-x-20 gap-y-4">
              <motion.a whileHover={{ x: 5, color: "#B33A2D" }} href="#" className="font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">LinkedIn <ArrowUpRight size={10}/></motion.a>
              <motion.a whileHover={{ x: 5, color: "#B33A2D" }} href="#" className="font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">WeChat <ArrowUpRight size={10}/></motion.a>
              <motion.a whileHover={{ x: 5, color: "#B33A2D" }} href="#" className="font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">Email <ArrowUpRight size={10}/></motion.a>
              <motion.a whileHover={{ x: 5, color: "#B33A2D" }} href="#" className="font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">GitHub <ArrowUpRight size={10}/></motion.a>
            </div>
          </div>
        </footer>

      </main>

      {/* AI Assistant FAQ (Digital Twin) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFaqOpen(!isFaqOpen)}
          className="h-14 px-6 bg-rust/80 backdrop-blur-md rounded-full flex items-center gap-3 text-white shadow-2xl relative group border border-white/20"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-rust rounded-full opacity-20"
          />
          <span className="text-[11px] font-bold tracking-widest uppercase relative z-10">提问分身</span>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center relative z-10">
            {isFaqOpen ? <X size={16} /> : <MessageCircle size={16} />}
          </div>
        </motion.button>
        
        <FAQDialog isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      </div>

      {/* WeChat Modal */}
      <WeChatModal isOpen={isWeChatOpen} onClose={() => setIsWeChatOpen(false)} />
    </div>
  );
}
