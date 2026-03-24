/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Cpu, Lightbulb, Rocket, MessageCircle, X, ChevronRight,
  Menu, Mail, QrCode, ChevronDown, User, Star, Briefcase, Folder, Sparkles, ArrowUpRight,
  MapPin, Palette, Video, Bot
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
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center border border-rust/20">
          <button onClick={onClose} className="absolute top-6 right-6 text-ink/40 hover:text-rust transition-colors"><X size={24} /></button>
          <h3 className="text-2xl font-black mb-6 tracking-tighter text-ink">扫码添加微信</h3>
          <div className="aspect-square bg-[#F8F9FB] p-2 rounded-2xl mb-6 shadow-inner border border-ink/5">
            <img src="/erweima-5.jpg" alt="WeChat QR Code" className="w-full h-full object-contain rounded-xl" />
          </div>
          <p className="text-sm text-ink/60 font-medium">请使用微信扫描上方二维码</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const NavItem = ({ zh, en, href, icon: Icon }: { zh: string; en: string; href: string; icon: any }) => (
  <motion.a href={href} whileHover={{ y: -2 }} className="flex flex-col items-center group px-3 py-1">
    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-ink/80 group-hover:text-rust transition-colors mb-1.5 tracking-wide">
      <Icon size={12} strokeWidth={2.5} />
      <span>{zh}</span>
    </div>
    <span className="text-[9px] uppercase tracking-[0.2em] text-ink/30 group-hover:text-rust/50 transition-colors leading-none font-bold">{en}</span>
  </motion.a>
);

// 忽大忽小的呼吸标签
const BreathingTag = ({ text, delay }: { text: string, delay: number }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay }}
    className="absolute z-20 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-white flex items-center gap-1.5 whitespace-nowrap"
  >
    <div className="w-1.5 h-1.5 rounded-full bg-rust/80" />
    <span className="font-bold text-[10px] text-ink/80">{text}</span>
  </motion.div>
);

const SkillCard = ({ title, dataDesc, icon: Icon }: { title: string, dataDesc: React.ReactNode, icon: any }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 hover:shadow-xl transition-all flex flex-col">
    <div className="mb-4 text-rust flex items-center justify-between opacity-90">
      <Icon size={24} strokeWidth={2} />
      <div className="w-8 h-1 bg-rust/10 rounded-full" />
    </div>
    <h3 className="font-bold text-sm mb-3 text-ink tracking-tight">{title}</h3>
    <div className="text-xs text-ink/60 leading-relaxed font-medium">
      {dataDesc}
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

// 弹窗组件
const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => (
  <AnimatePresence>
    {project && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }} className={`relative w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-white`}>
          
          <div className={`${project.bgColor} p-8 relative overflow-hidden flex-shrink-0`}>
            <button onClick={onClose} className="absolute top-4 right-4 text-ink/40 hover:text-ink bg-white/50 p-2 rounded-full backdrop-blur-md transition-colors"><X size={20} /></button>
            <div className="relative z-10 mt-6">
              <span className="text-ink/80 text-[10px] font-black uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-white/50 mb-3 inline-block">{project.tag}</span>
              <h3 className="text-2xl md:text-3xl font-black text-ink tracking-tight">{project.title}</h3>
            </div>
            <project.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-black/[0.03] rotate-12 pointer-events-none" />
          </div>

          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="mb-6">
              <h4 className="text-xs font-bold text-rust uppercase tracking-widest mb-2 flex items-center gap-2"><Star size={14}/> 项目简介</h4>
              <p className="text-sm text-ink/70 leading-relaxed font-medium">{project.desc}</p>
            </div>
            <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-ink/5 shadow-sm">
              <h4 className="text-xs font-bold text-rust uppercase tracking-widest mb-3 flex items-center gap-2"><Briefcase size={14}/> 职责与成果</h4>
              <p className="text-sm text-ink/80 leading-relaxed">{project.detail}</p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// 纯色纯净版项目卡片
const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <motion.div onClick={onClick} whileHover={{ y: -8 }} className={`relative h-64 rounded-[2rem] p-8 flex flex-col justify-between cursor-pointer shadow-sm border border-ink/5 hover:shadow-xl transition-all ${project.bgColor} overflow-hidden`}>
    <project.icon className="absolute -bottom-10 -right-10 w-48 h-48 text-black/[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
    <div className="relative z-10">
      <div className="mb-4">
        <span className="text-ink/80 text-[10px] font-black uppercase tracking-[0.1em] bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/50 shadow-sm">
          {project.tag}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 tracking-tight text-ink leading-tight">{project.title}</h3>
      <p className="text-xs text-ink/60 leading-relaxed font-medium line-clamp-3">{project.desc}</p>
    </div>
    
    <div className="mt-4 relative z-10 self-start">
      <motion.div whileHover={{ x: 3 }} className="flex items-center gap-2 bg-white/80 text-ink px-4 py-2 rounded-full text-[10px] font-bold tracking-widest shadow-sm">
        <span>查看详情</span>
        <ArrowUpRight size={14} className="opacity-80" />
      </motion.div>
    </div>
  </motion.div>
);

// 缩小版的 AI Lab 卡片
const AILabCard = ({ title, tag, desc, mockup }: { title: string; tag: string; desc: string; mockup: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] p-6 flex flex-col h-[280px] md:h-[260px] relative overflow-hidden group border border-ink/5 shadow-sm hover:shadow-xl transition-all">
    <div className="z-10 relative">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/60 bg-ink/5 px-2.5 py-1 rounded-full border border-ink/10 mb-4 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 tracking-tight text-ink leading-tight">{title}</h3>
      <p className="text-[10px] text-ink/60 leading-relaxed font-medium line-clamp-2 max-w-[90%]">{desc}</p>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-[55%] flex items-end justify-center pointer-events-none">
      {mockup}
    </div>
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
      title: "饿了么下沉市场外卖配送提效", tag: "系统推广", 
      bgColor: "bg-[#e8f5e9]", icon: MapPin,
      desc: "主导饿了么下沉市场智能调度系统覆盖率从30%提升至98%，提升平台整体配送效率和履约质量。",
      detail: "该项目为公司战略级项目，作为业务方主导，产研和算法团队紧密配合，通过系统赋能与宣讲培训，帮助全国 1800 个城市代理商实现降本增效。"
    },
    {
      title: "一条艺术电商平台", tag: "电商运营", 
      bgColor: "bg-[#ede7f6]", icon: Palette,
      desc: "从0-1搭建艺术品电商平台，构建从艺术家到艺术作品的完整知识体系，降低消费者线上购买门槛。",
      detail: "负责艺术电商平台产品运营，运营艺术品线上展厅、直播、拍卖、线上销售板块的产品规划与内容生态建设；同艺术品BD、内容编辑团队共同搭建从艺术家到艺术作品的完整基础知识体系，降低艺术品消费者线上购买门槛。"
    },
    {
      title: "携程直播青训营", tag: "校企合作", 
      bgColor: "bg-[#e3f2fd]", icon: Video,
      desc: "通过搭建视频号直播矩阵，6个月实现项目收入从0到4000万的突破，累计孵化200+学员，获集团Superhero称号。",
      detail: "负责该项目前期的孵化与规模建设，主导校企合作方案、商务拓展、学员培训、运营策略等全链路落地。具备单场百万直播GMV操盘及个人直播带货能力。"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-rust selection:text-white overflow-x-hidden bg-[#F8F9FB]">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rust origin-left z-[1000]" style={{ scaleX }} />
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#F8F9FB]/90 backdrop-blur-md border-b border-ink/5 py-2' : 'py-6'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display font-black text-2xl tracking-tighter">
            wenying<span className="text-rust">.website</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-2">
            <NavItem zh="关于我" en="About Me" href="#about" icon={User} />
            <NavItem zh="核心技能" en="Core Skills" href="#skills" icon={Star} />
            <NavItem zh="工作经历" en="Experience" href="#experience" icon={Briefcase} />
            <NavItem zh="项目经历" en="Projects" href="#projects" icon={Folder} />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" icon={Sparkles} />
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

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
        
        {/* 1. About Me (完全还原 PRD 左右布局) */}
        <section id="about" className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-12 overflow-hidden mb-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* 左侧：缩小的头像与呼吸标签 */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] md:h-[450px]">
              
              <BreathingTag text="复旦MBA 🎓" delay={0.5} />
              <BreathingTag text="业务先锋 🚀" delay={1.2} />
              <BreathingTag text="10年运营经验 💼" delay={2} />
              <BreathingTag text="AI应用探索者 ✨" delay={0} />
              
              {/* 头像容器 - 白色相框质感，即使是带格子的jpg放进去也不会突兀 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-48 md:w-56 aspect-[3/4] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white overflow-hidden z-10"
              >
                <img 
                  src="/touxiang-1.png" 
                  alt="Jodie Zhu" 
                  className="w-full h-full object-cover bg-[#f0f0f0]" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'; }}
                />
              </motion.div>

              {/* 装饰性背景光晕 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rust/10 rounded-full blur-[60px] pointer-events-none" />
            </div>

            {/* 右侧：文字介绍与按钮 */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
              <h1 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-[1.1] mb-4">
                Hi, I'm Jodie<br/>朱闻樱
              </h1>
              <p className="text-sm font-bold text-rust tracking-wider uppercase mb-6">
                复旦MBA / 复合型运营专家 / AI应用体验官
              </p>
              <p className="text-sm text-ink/60 font-medium leading-relaxed max-w-lg mb-10">
                9年互联网运营和产品经验，1年创业项目经验。深耕互联网行业多年，擅长从 0 到 1 搭建业务体系与合作伙伴赋能。持续研究AI与业务场景深度融合的解决方案，探索AI Agent、自动化工作流及内容生成的商业化机会。
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="mailto:zwy0025@gmail.com" className="flex items-center justify-center gap-2 bg-white border border-ink/10 text-ink px-8 py-3.5 rounded-full font-bold text-xs tracking-widest hover:border-rust hover:text-rust transition-colors w-full sm:w-48 shadow-sm">
                  <Mail size={16} /> 发送邮件
                </a>
                <button onClick={() => setIsWeChatOpen(true)} className="flex items-center justify-center gap-2 bg-ink text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-widest hover:bg-rust transition-colors w-full sm:w-48 shadow-xl">
                  <QrCode size={16} /> 添加微信
                </button>
              </div>
            </div>

          </div>
        </section>

        <section id="skills" className="mb-24">
          <SectionHeader zh="核心技能" en="Core Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2">
            <SkillCard 
              title="业务破局与增长运营" 
              icon={TrendingUp} 
              dataDesc={<>3年内推动携程直播平台规模1000万增至<strong className="text-rust font-black text-sm mx-0.5">10亿+</strong>，6个月内推动视频号矩阵直播<strong className="text-rust font-black text-sm mx-0.5">0-4000万</strong>。</>}
            />
            <SkillCard 
              title="ToB/C产品运营" 
              icon={Cpu} 
              dataDesc={<>中后台产品运营及推广培训经验，<strong className="text-ink font-bold">长期与算法、产研、设计、销售、业务团队协同经验</strong>。</>}
            />
            <SkillCard 
              title="商业思考与用户洞察" 
              icon={Lightbulb} 
              dataDesc={<><strong className="text-ink font-bold">多次0-1创新项目落地经验</strong>，服务过下沉市场用户与高净值用户群体。</>}
            />
            <SkillCard 
              title="AI 应用与创新赋能" 
              icon={Rocket} 
              dataDesc={<>深度参与 AIGC 产品工具设计，基于业务痛点<strong className="text-ink font-bold">独立创建主播陪练Agent</strong>。</>}
            />
          </div>
        </section>

        <section id="experience" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <SectionHeader zh="工作经历" en="Work Experience" />
              <div className="relative">
                <TimelineItem date="2025.10 - 至今" title="创业项目" company="Koma Bistro / 予童科技" desc="BP撰写与融资 / 线上培训课程体系搭建与AI产品孵化" details={{content: ["深度参与 AIGC 产品架构设计与市场增长策略","重构品牌商业模型，对接优质资本资源","负责核心团队融资洽谈与合作伙伴关系维护"], projects: ["予童科技：AIGC 赋能内容生产流程优化","Koma Bistro：品牌商业模型重构与融资 BP"], results: ["内容产出提效 300%","成功对接多家优质资本资源","完成 3 万字深度商业计划书"]}} />
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

        {/* 项目经历：严格无图，纯色淡雅底 + Icon 点缀 */}
        <section id="projects" className="mb-24">
          <SectionHeader zh="项目经历" en="Project Experience" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((p, idx) => (
              <ProjectCard key={idx} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
        
        {/* AI Lab：高度压缩，全部使用高级网图代替假透明图 */}
        <section id="ai-lab" className="mb-24">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 卡片 1：起号助手 (毛玻璃特效) */}
            <AILabCard 
              tag="AI Agent" title="起号助手agent" 
              desc="基于大语言模型开发的自媒体助手，能够自动生成账号定位与内容规划。" 
              mockup={
                <div className="relative w-full h-[180px] rounded-t-3xl overflow-hidden mt-auto mx-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] group-hover:translate-y-2 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Agent" />
                  <div className="absolute inset-4 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex flex-col justify-center">
                    <div className="bg-rust text-white text-[10px] font-bold px-3 py-1.5 rounded-full self-start mb-2 shadow-sm">AI 助手已就绪</div>
                    <p className="text-xs font-bold text-ink/80 leading-tight">请选择您的人设定位：<br/>a.专家 b.干货 c.搞笑</p>
                  </div>
                </div>
              } 
            />

            {/* 卡片 2：陪伴玩具 (可爱网图) */}
            <AILabCard 
              tag="AI Product" title="AI陪伴玩具" 
              desc="结合多模态交互技术，为婴幼儿提供情感陪伴与早教互动，解决陪伴缺失问题。" 
              mockup={
                <div className="w-[90%] h-[160px] mt-auto rounded-t-3xl overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="AI Toy" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-ink/80">交互模式开启</div>
                </div>
              } 
            />

            {/* 卡片 3：虚拟形象 (3D科技网图) */}
            <AILabCard 
              tag="Live Stream" title="AI虚拟形象直播" 
              desc="重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低企业直播成本。" 
              mockup={
                <div className="w-[85%] h-[180px] mt-auto rounded-t-[2.5rem] border-4 border-white overflow-hidden relative shadow-xl group-hover:rotate-2 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Virtual Anchor" />
                  <div className="absolute top-3 left-3 bg-rust px-2 py-0.5 rounded text-[9px] font-black text-white tracking-widest shadow-sm">LIVE</div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div className="space-y-1.5"><div className="w-16 h-1.5 bg-white/50 rounded-full" /><div className="w-20 h-1.5 bg-white/50 rounded-full" /></div>
                  </div>
                </div>
              } 
            />

          </div>
        </section>

        <footer className="pt-16 pb-12 border-t border-ink/10 flex flex-col items-center">
          <motion.button whileHover={{ y: -5 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mb-12 flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:border-rust transition-colors">
              <ArrowUpRight className="rotate-[-135deg] text-ink/40 group-hover:text-rust transition-colors" size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 group-hover:text-rust transition-colors">Back to Top</span>
          </motion.button>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl font-black mb-2 tracking-tighter">朱闻樱 / JODIEZHU</h2>
              <p className="text-ink/40 font-mono text-[10px] uppercase tracking-[0.2em]">Open for New Opportunities & Collaborations © 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:zwy0025@gmail.com" className="flex items-center gap-2 bg-white border border-ink/10 px-6 py-2.5 rounded-full text-[11px] font-bold text-ink hover:border-rust hover:text-rust transition-colors shadow-sm">
                <Mail size={14} /> 邮件联系
              </a>
              <button onClick={() => setIsWeChatOpen(true)} className="flex items-center gap-2 bg-ink text-white px-6 py-2.5 rounded-full font-bold text-[11px] hover:bg-rust transition-colors shadow-md">
                <QrCode size={14} /> 添加微信
              </button>
            </div>
          </div>
        </footer>

      </main>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsFaqOpen(!isFaqOpen)} className="w-14 h-14 bg-rust/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(179,58,45,0.4)] relative group border border-white/20 p-1">
          <div className="w-full h-full rounded-full relative z-10 overflow-hidden border border-white/50 bg-white">
            {isFaqOpen ? <div className="w-full h-full bg-rust/20 flex items-center justify-center"><X size={18} /></div> : (
              <>
                <img src="/fenshen-4.jpg" className="w-full h-full object-cover scale-[1.3] translate-y-3" alt="Avatar" />
                <motion.div animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-white" />
              </>
            )}
          </div>
        </motion.button>
        <FAQDialog isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      </div>

      <WeChatModal isOpen={isWeChatOpen} onClose={() => setIsWeChatOpen(false)} />
    </div>
  );
}
