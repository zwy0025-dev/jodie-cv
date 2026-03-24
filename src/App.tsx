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
  Mail,
  QrCode,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

// --- 通用组件 ---

const SectionHeader = ({ zh, en }: { zh: string; en: string }) => (
  <div className="mb-8 flex items-baseline gap-4">
    <h2 className="text-rust font-bold text-lg uppercase tracking-tight">{en}</h2>
    <span className="text-ink/30 text-lg font-medium tracking-tight">{zh}</span>
  </div>
);

const WeChatModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-paper p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center border border-rust/20">
          <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-rust transition-colors"><X size={24} /></button>
          <h3 className="text-2xl font-black mb-6 tracking-tighter text-ink">扫码添加微信</h3>
          <div className="aspect-square bg-white p-4 rounded-2xl mb-6 shadow-inner border border-ink/5 overflow-hidden">
            <img src="/erweima-5.jpg" alt="WeChat QR Code" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm text-ink/60 font-medium">请使用微信扫描上方二维码</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const NavItem = ({ zh, en, href }: { zh: string; en: string; href: string }) => (
  <motion.a href={href} whileHover={{ y: -2 }} className="flex flex-col items-center group px-4 py-1">
    <div className="w-full flex justify-between text-[9px] font-medium group-hover:text-rust transition-colors leading-none mb-1.5">
      {zh.split('').map((char, i) => <span key={i}>{char}</span>)}
    </div>
    <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-rust/60 transition-colors leading-none font-bold">{en}</span>
  </motion.a>
);

const CharacterPop = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {text.split('\n').map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <div className="basis-full h-0" />}
          {line.trim().split('').map((char, i) => (
            <motion.span
              key={`${lineIdx}-${i}`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 15, stiffness: 100, delay: (lineIdx * 20 + i) * 0.02 }}
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

// --- 重构的呼吸 Tag 组件 ---
const BreathingTag = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    animate={{ 
      scale: [1, 1.15, 1],
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
    className="bg-white px-4 py-1.5 rounded-full border border-ink/5 shadow-sm inline-flex items-center gap-1.5 select-none"
  >
    <div className="w-1.5 h-1.5 rounded-full bg-rust" />
    <span className="text-xs font-bold text-ink tracking-tight whitespace-nowrap">{text}</span>
  </motion.div>
);

const SkillCard = ({ title, dataDesc, icon: Icon }: { title: string, dataDesc: React.ReactNode, icon: any }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 hover:shadow-xl transition-all flex flex-col justify-between">
    <div>
      <div className="mb-4 text-rust flex items-center justify-between opacity-90">
        <Icon size={24} strokeWidth={2} />
        <div className="w-8 h-1 bg-rust/10 rounded-full" />
      </div>
      <h3 className="font-bold text-sm mb-3 text-ink tracking-tight">{title}</h3>
      <div className="text-[11px] text-ink/60 leading-relaxed font-medium">
        {dataDesc}
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ date, title, company, desc, details }: { date: string; title: string; company: string; desc: string; details?: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 mb-12 group last:mb-0">
      <div className="absolute left-[5px] top-2 bottom-[-3rem] w-px bg-rust/20 group-last:bg-transparent transition-colors duration-500 group-hover:bg-rust/50" />
      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-paper border-[2.5px] border-rust shadow-[0_0_0_4px_rgba(179,58,45,0.1)] group-hover:scale-125 group-hover:bg-rust transition-all duration-300 z-10" />
      <div className="text-rust font-bold text-[11px] tracking-widest mb-1.5 uppercase">{date}</div>
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <h4 className="text-base font-black tracking-tight text-ink">
          {title} <span className="text-ink/20 mx-1 font-normal">—</span> <span className="text-rust/80">{company}</span>
        </h4>
        {details && (
          <motion.button animate={{ boxShadow: ["0px 0px 0px 0px rgba(179,58,45,0)", "0px 0px 0px 6px rgba(179,58,45,0.15)", "0px 0px 0px 0px rgba(179,58,45,0)"] }} transition={{ duration: 2, repeat: Infinity }} onClick={() => setIsExpanded(!isExpanded)} className="text-[10px] font-bold bg-rust/5 text-rust px-4 py-1.5 rounded-full border border-rust/20 hover:bg-rust hover:text-white transition-colors flex items-center gap-1.5 z-10 relative cursor-pointer">
            了解经历 {isExpanded ? <ChevronDown size={12} className="rotate-180 transition-transform" /> : <ChevronDown size={12} className="transition-transform" />}
          </motion.button>
        )}
      </div>
      <p className="text-xs text-ink/60 leading-relaxed max-w-xl font-medium">{desc}</p>
      {details && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '1.5rem' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-ink/20 rounded-full" /> 工作内容</h5>
                  <ul className="space-y-2.5">{details.content.map((item: string, i: number) => (<li key={i} className="text-[11px] text-ink/70 leading-relaxed relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-ink/20 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust/[0.03] p-5 rounded-2xl border border-rust/10 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust/60 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rust/40 rounded-full" /> 核心项目</h5>
                  <ul className="space-y-2.5">{details.projects.map((item: string, i: number) => (<li key={i} className="text-[11px] text-rust/80 leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-rust/40 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust p-5 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" /> 突出成果</h5>
                  <ul className="space-y-2.5">{details.results.map((item: string, i: number) => (<li key={i} className="text-[11px] text-white leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-white/50 rounded-full" /><span dangerouslySetInnerHTML={{ __html: item.replace(/(\d+[%+万亿]*)/g, '<strong class="text-white font-black text-xs bg-white/20 px-1 rounded mx-0.5">$1</strong>') }} /></li>))}</ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

// --- 重构：纯色背景的项目卡片 + 引导 Tag ---
const ProjectCard = ({ title, tag, desc, bgColor, onClick }: { title: string; tag: string; desc: string; bgColor: string; onClick: () => void }) => (
  <motion.div onClick={onClick} whileHover={{ y: -8 }} className={`relative h-64 rounded-[2rem] p-8 flex flex-col justify-between cursor-pointer shadow-sm border border-ink/5 hover:shadow-xl transition-all ${bgColor}`}>
    <div>
      <div className="mb-4">
        <span className="text-ink text-[10px] font-black uppercase tracking-[0.1em] bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/80 shadow-inner">
          {tag}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2 tracking-tight text-ink leading-tight">{title}</h3>
      <p className="text-xs text-ink/70 leading-relaxed font-medium line-clamp-3">{desc}</p>
    </div>
    
    {/* 引导点击 Tag */}
    <div className="mt-4 self-start">
      <motion.div
        whileHover={{ x: 3 }}
        className="flex items-center gap-2 bg-ink text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
      >
        <span>了解经历 Experience</span>
        <ArrowUpRight size={14} className="opacity-80" />
      </motion.div>
    </div>
  </motion.div>
);

// --- 重构：紧凑 AI Lab 卡片 (PC 端缩小高度) ---
const AILabCard = ({ title, tag, desc, bgColor, mockup }: { title: string; tag: string; desc: string; bgColor: string; mockup: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5 }} className={`${bgColor} rounded-[2rem] p-6 flex flex-col h-[280px] md:h-[220px] relative overflow-hidden group border border-ink/5 shadow-sm hover:shadow-md transition-all`}>
    <div className="z-10 relative">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/50 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 mb-4 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 tracking-tight text-ink leading-tight">{title}</h3>
      <p className="text-[10px] text-ink/60 leading-relaxed font-medium max-w-[80%]">{desc}</p>
    </div>
    {/* 缩小且融合的 Mockup，移除非必要元素 */}
    <div className="absolute -bottom-8 -right-8 origin-bottom-right scale-[0.4] opacity-80 group-hover:scale-[0.45] group-hover:-translate-y-2 transition-all duration-500 pointer-events-none">
      {mockup}
    </div>
  </motion.div>
);

// --- 精简化的 Mockups 结构 ---
const ChatMockup = () => (
  <div className="w-64 h-80 bg-white rounded-t-3xl shadow-xl border border-ink/10 flex flex-col overflow-hidden">
    <div className="bg-ink/5 px-4 py-2 border-b border-ink/5 flex gap-1.5"><div className="w-2 h-2 rounded-full bg-rust/40" /><div className="w-2 h-2 rounded-full bg-ink/10" /></div>
    <div className="p-4 space-y-3 flex-1 text-[9px] font-medium text-ink/70">
      <div className="bg-ink/5 p-2 rounded-xl rounded-tl-none">你想做什么赛道？</div>
      <div className="bg-rust/10 text-rust p-2 rounded-xl rounded-tr-none ml-auto">做 AI 摄影账号</div>
      <div className="bg-ink/5 p-2 rounded-xl rounded-tl-none">建议从提示词拆解切入。</div>
    </div>
  </div>
);

const NomiMockup = () => (
  <div className="w-64 h-64 bg-ink rounded-full flex flex-col items-center justify-center shadow-xl border-[6px] border-white relative">
    <div className="w-32 h-32 rounded-full bg-rust/10 flex items-center justify-center">
      <div className="flex gap-6"><div className="w-4 h-8 bg-white rounded-full shadow-lg" /><div className="w-4 h-8 bg-white rounded-full shadow-lg" /></div>
    </div>
  </div>
);

const LiveMockup = () => (
  <div className="w-56 h-80 bg-ink rounded-[2rem] border-[4px] border-ink/90 shadow-xl overflow-hidden relative">
    <div className="absolute top-4 left-3 bg-rust px-1.5 py-0.5 rounded text-[8px] font-black text-white tracking-widest">LIVE</div>
    <div className="absolute bottom-10 left-3 right-3 space-y-3">
      <div className="h-3 w-32 bg-white/30 rounded-full" />
      <div className="h-3 w-40 bg-white/30 rounded-full" />
    </div>
  </div>
);

// FAQ 对话框组件保持原样
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
      setTypingText(""); let i = 0; const fullText = faqs[selectedQ].a;
      const interval = setInterval(() => { setTypingText(fullText.slice(0, i + 1)); i++; if (i >= fullText.length) clearInterval(interval); }, 30);
      return () => clearInterval(interval);
    }
  }, [selectedQ]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 w-80 md:w-96 bg-white border border-rust/20 shadow-2xl z-50 overflow-hidden rounded-2xl">
          <div className="bg-rust p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full animate-pulse" /><h4 className="font-display font-bold uppercase tracking-widest text-[10px]">AI Digital Twin Active</h4></div>
            <button onClick={onClose} className="hover:rotate-90 transition-transform"><X size={18} /></button>
          </div>
          <div className="p-6 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-ink/5 pb-4 last:border-0">
                <button onClick={() => setSelectedQ(selectedQ === i ? null : i)} className="w-full text-left flex justify-between items-center group">
                  <span className="font-bold text-sm group-hover:text-rust transition-colors">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedQ === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {selectedQ === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-xs text-ink/60 mt-3 leading-relaxed overflow-hidden min-h-[3em]">
                      {typingText}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-1 h-3 bg-rust ml-1 translate-y-0.5" />
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
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const projectsData = [
    {
      title: "饿了么下沉市场外卖配送提效", tag: "智能系统调优", bgColor: "bg-[#e0f7fa]", // 淡青色
      desc: "主导饿了么下沉市场智能调度系统覆盖率从30%提升至98%，提升平台整体配送效率和履约质量。",
      detail: "该项目为公司战略级项目，作为业务方主导，产研和算法团队紧密配合，通过系统赋能与宣讲培训，帮助全国 1800 个城市代理商实现降本增效。"
    },
    {
      title: "一条艺术电商平台", tag: "电商运营", bgColor: "bg-[#f3e5f5]", // 淡紫色
      desc: "从0-1搭建艺术品电商平台，构建从艺术家到艺术作品的完整知识体系，降低消费者线上购买门槛。",
      detail: "负责艺术电商平台产品运营，运营艺术品线上展厅、直播、拍卖、线上销售板块的产品规划与内容生态建设；同艺术品BD、内容编辑团队共同搭建从艺术家到艺术作品的完整基础知识体系，降低艺术品消费者线上购买门槛。"
    },
    {
      title: "携程直播青训营", tag: "校企合作", bgColor: "bg-[#fff3e0]", // 淡桃色
      desc: "通过搭建视频号直播矩阵，6个月实现项目收入从0到4000万的突破，累计孵化200+学员，获集团Superhero称号。",
      detail: "负责该项目前期的孵化与规模建设，主导校企合作方案、商务拓展、学员培训、运营策略等全链路落地。具备单场百万直播GMV操盘及个人直播带货能力。"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-rust selection:text-white overflow-x-hidden bg-paper">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rust origin-left z-[1000]" style={{ scaleX }} />
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-paper/80 backdrop-blur-md border-b border-ink/5 py-2' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display font-black text-2xl tracking-tighter">
            JODIE<span className="text-rust">ZHU</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-1">
            <NavItem zh="关于我" en="About Me" href="#about" />
            <NavItem zh="核心技能" en="Core Skills" href="#skills" />
            <NavItem zh="工作经历" en="Experience" href="#experience" />
            <NavItem zh="项目经历" en="Projects" href="#projects" />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" />
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-ink hover:text-rust transition-colors">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <motion.div style={{ y: parallaxY }} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[15%] right-[-10%] w-[40vw] h-[40vw] bg-rust/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[30vw] h-[30vw] bg-ink/5 rotate-45 blur-[80px]" />
      </motion.div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        
        {/* 1. About Me - 重构，一屏展示，按钮下移 */}
        <section id="about" className="relative pt-12 pb-16 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full flex flex-col md:flex-row items-center gap-12 relative">
            
            {/* 标签环绕（增加 breathing 特效） */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
              <div className="absolute top-[5%] left-[10%]"><BreathingTag text="业务先锋 🚀" delay={0} /></div>
              <div className="absolute top-[25%] left-[2%]"><BreathingTag text="复旦MBA 🎓" delay={1} /></div>
              <div className="absolute bottom-[20%] left-[8%]"><BreathingTag text="艺术摄影主理人 📸" delay={2} /></div>
              <div className="absolute top-[5%] right-[10%]"><BreathingTag text="10亿直播操盘 💰" delay={0.5} /></div>
              <div className="absolute top-[25%] right-[2%]"><BreathingTag text="0-1项目建设者 💪" delay={1.5} /></div>
              <div className="absolute bottom-[20%] right-[8%]"><BreathingTag text="AI创新探索者 ✨" delay={2.5} /></div>
            </div>

            {/* 左侧形象照 - 缩小尺寸 */}
            <div className="relative z-10 flex justify-center md:flex-1 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl max-w-[280px] md:max-w-[320px] max-h-[60vh] border-[10px] border-white z-20"
              >
                <img src="/image_1026c8.jpg" alt="Jodie Zhu" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* 右侧文字 - 收紧布局 */}
            <div className="md:flex-1 order-1 md:order- order-2 relative z-10 space-y-4 text-center md:text-left">
              <CharacterPop text="Hi, I'm Jodie\n朱闻樱" className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-ink mb-1 justify-center md:justify-start" />
              <p className="text-sm font-bold text-rust tracking-wider opacity-90 uppercase">复旦MBA / 复合型运营专家 / AI应用探索者</p>
              
              <div className="max-w-xl mx-auto md:mx-0 pt-2 pb-4 space-y-3">
                <p className="text-xs text-ink/60 leading-relaxed font-medium">9年互联网运营和产品经历，1年创业项目经历。深耕互联网行业多年，擅长从0到1搭建业务体系与合作伙伴赋能。目前专注于AI与业务场景的深度融合研究，探索AI Agent、自动化工作流及内容生成的商业化落地解决方案。</p>
              </div>

              {/* 按钮移至下方， PC端靠左 */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <motion.a href="mailto:jodie0025@example.com" whileHover={{ y: -2 }} className="flex items-center gap-2 bg-white border border-ink/10 px-6 py-2.5 rounded-full text-xs font-bold text-ink hover:border-rust hover:text-rust transition-colors shadow-sm">
                  <Mail size={14} /> jodie0025@example.com
                </motion.a>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsWeChatOpen(true)} className="flex items-center justify-center gap-2 bg-ink text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest shadow-lg hover:bg-rust transition-all">
                  <QrCode size={14} /> Jodie0025_WeChat
                </motion.button>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Skills - 更名 */}
        <section id="skills" className="mb-24">
          <SectionHeader zh="核心技能" en="Core Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2">
            <SkillCard 
              title="业务破局与增长运营" 
              icon={TrendingUp} 
              dataDesc={<>3年内推动携程直播平台规模1000万增至<strong className="text-rust font-black text-sm mx-0.5">10亿+</strong>。优化小程序注册转化节点，注册率飙升至<strong className="text-rust font-black text-sm mx-0.5">80%</strong>。</>}
            />
            <SkillCard 
              title="ToB/C产品与复杂系统运营" 
              icon={Cpu} 
              dataDesc={<>主导饿了么下沉市场智能调度系统，覆盖率提升至<strong className="text-rust font-black text-sm mx-0.5">98%</strong>。协同全国1800城代理商，配送时长缩短<strong className="text-rust font-black text-sm mx-0.5">4分钟</strong>。</>}
            />
            <SkillCard 
              title="商业思考与0-1建设" 
              icon={Lightbulb} 
              dataDesc={<>从0到1搭建艺术品电商及商家直播生态。重构创业品牌商业模型，完成<strong className="text-rust font-black text-sm mx-0.5">3万字</strong>深度商业计划书并对接资本。</>}
            />
            <SkillCard 
              title="AI 应用与创新赋能" 
              icon={Rocket} 
              dataDesc={<>深度参与 AIGC 产品工具设计，赋能内容产出提效<strong className="text-rust font-black text-sm mx-0.5">300%</strong>。打造真人+AI 24小时直播间，降低<strong className="text-rust font-black text-sm mx-0.5">80%</strong>人力成本。</>}
            />
          </div>
        </section>

        {/* 3. Work Experience 模块保持原样 */}
        <section id="experience" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <SectionHeader zh="工作经历" en="Work Experience" />
              <div className="relative">
                <TimelineItem date="2025.10 - 至今" title="创业项目主理人 / AI创新产品顾问" company="Koma Bistro / 予童科技" desc="BP撰写与融资 / 线上培训课程体系搭建与AI产品孵化" details={{content: ["深度参与 AIGC 产品架构设计与市场增长策略","重构品牌商业模型，对接优质资本资源","负责核心团队融资洽谈与合作伙伴关系维护"], projects: ["予童科技：AIGC 赋能内容生产流程优化","Koma Bistro：品牌商业模型重构与融资 BP"], results: ["内容产出提效 300%","成功对接多家优质资本资源","完成 3 万字深度商业计划书"]}} />
                <TimelineItem date="2021.07 - 2025.07" title="运营经理" company="Ctrip 携程" desc="0-1搭建商家直播生态体系，3年推动GMV从1000万增至10亿+。" details={{content: ["从 0 到 1 搭建商家直播生态体系","制定直播间运营标准与流量分发策略","负责直播业务的整体增长与商业化变现"], projects: ["携程直播青训营：孵化 0 基础团队","携程 AI 直播：真人+AI 24小时客服直播间"], results: ["3 年推动 GMV 从 1000 万增至 10 亿+","直播间转化率提升 70%+","孵化团队 1 个月直播 GMV 破百万"]}} />
                <TimelineItem date="2020.05 - 2021.07" title="产品运营" company="Yitiao 一条" desc="0-1艺术电商平台搭建。优化用户注册转化节点，将小程序注册率提升至80%。" details={{content: ["负责艺术电商平台的产品运营与用户增长","优化用户注册与交易转化路径","打通拍卖+直播的闭环交易链路"], projects: ["一条艺术品电商平台：小程序注册转化优化","拍卖+直播交易链路整合"], results: ["小程序注册率从 30% 提升至 80%","成功上线艺术品拍卖直播功能","显著提升高客单价商品转化效率"]}} />
                <TimelineItem date="2016.09 - 2020.04" title="产品运营" company="Ele.me 饿了么" desc="主导下沉市场智能调度系统覆盖率从30%提升至98%。" details={{content: ["负责下沉市场物流调度系统的产品运营","协调全国 1800 个城市代理商的系统落地","通过数据分析优化配送效率与成本控制"], projects: ["下沉市场智能调度系统覆盖提升项目","代理商降本增效专项行动"], results: ["系统覆盖率从 30% 提升至 98%","帮助全国代理商显著降低运营成本","配送效率提升 25% 以上"]}} />
              </div>
            </div>
            <div>
              <SectionHeader zh="教育背景" en="Education Background" />
              <div className="relative">
                <TimelineItem date="2024.09 - 2027.03" title="工商管理(MBA)" company="复旦大学（硕士）" desc="专注于商业领导力与创新管理。参与 Esade University 交换项目：Leading Innovation。" />
                <TimelineItem date="2012.09 - 2016.07" title="工业设计" company="嘉兴大学(本科)" desc="2016级优秀毕业生。培养了深厚的用户体验设计基础与产品思维。" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Projects - 重构，淡色底 + 引导 Tag */}
        <section id="projects" className="mb-24">
          <SectionHeader zh="项目经历" en="Project Experience" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} {...project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
          {/* 项目详情弹窗组件保持原样，省略 */}
        </section>
        
        {/* 5. AI Lab - 重构，紧凑排版 + Cohesive 视觉 */}
        <section id="ai-lab" className="mb-24">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AILabCard tag="AI Agent" title="自媒体起号助手" desc="基于大语言模型开发的自媒体助手，能够自动生成账号定位与内容规划。" bgColor="bg-[#F3F4F6]" mockup={<ChatMockup />} />
            <AILabCard tag="AI Product" title="家庭 AI 陪伴玩具" desc="多模态交互技术，为婴幼儿提供情感陪伴与早教互动，解决陪伴缺失问题。" bgColor="bg-[#EEF2FF]" mockup={<NomiMockup />} />
            <AILabCard tag="Live Stream" title="AI 虚拟形象直播" desc="重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低直播成本。" bgColor="bg-[#FEF2F2]" mockup={<LiveMockup />} />
          </div>
        </section>

        {/* 底部 Footer 信息重构 */}
        <footer className="pt-16 pb-12 border-t border-ink/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <NavItem zh="LinkedIn" en="" href="#" />
            <NavItem zh="GitHub" en="" href="#" />
            <NavItem zh="Portfolios" en="" href="#" />
          </div>
          <div className="space-y-1">
            <p className="font-display font-black text-xl tracking-tighter">朱闻樱 / JODIEZHU</p>
            <p className="text-ink/60 font-mono text-[10px] uppercase tracking-[0.2em]">Open for New Opportunities & Collaborations © 2026</p>
          </div>
        </footer>

      </main>

      {/* 提问分身悬浮按钮保持原样，省略 */}

      <WeChatModal isOpen={isWeChatOpen} onClose={() => setIsWeChatOpen(false)} />
    </div>
  );
}
