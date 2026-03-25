/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Cpu, Lightbulb, Rocket, MessageCircle, X, ChevronRight,
  Menu, Mail, QrCode, ChevronDown, User, Star, Briefcase, Folder, Sparkles, ArrowUpRight,
  MapPin, Palette, Video
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

const BreathingTag = ({ text, delay, className }: { text: string, delay: number, className?: string }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay }}
    className={`absolute z-20 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-white flex items-center gap-1.5 whitespace-nowrap ${className}`}
  >
    <div className="w-1.5 h-1.5 rounded-full bg-rust/80" />
    <span className="font-bold text-[10px] text-ink/80">{text}</span>
  </motion.div>
);

const SkillCard = ({ title, dataDesc, icon: Icon }: { title: string, dataDesc: React.ReactNode, icon: any }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 hover:shadow-xl transition-all flex flex-col relative overflow-hidden h-full group">
    
    <div className="absolute -bottom-6 -right-6 text-rust opacity-[0.04] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-500">
      <Icon size={140} strokeWidth={1.5} />
    </div>
    
    <div className="mb-4 text-rust flex items-center justify-between opacity-90 relative z-10">
      <Icon size={24} strokeWidth={2} />
      <div className="w-8 h-1 bg-rust/10 rounded-full" />
    </div>
    <h3 className="font-black text-base text-rust tracking-tight relative z-10 mb-3">{title}</h3>
    <div className="text-xs text-ink/60 leading-relaxed font-medium relative z-10">
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

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => (
  <AnimatePresence>
    {project && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }} className="relative w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-white">
          <div className="h-48 md:h-64 relative w-full flex-shrink-0 bg-ink">
            <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md transition-colors"><X size={20} /></button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/90 text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 mb-3 inline-block flex items-center gap-1.5 w-fit">
                <project.icon size={12} /> {project.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{project.title}</h3>
            </div>
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

// --- 修改点3：项目卡片优化（保持图片展示空间，压缩下方文字区域高度，纯文字链接） ---
const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <motion.div 
    onClick={onClick} 
    whileHover={{ y: -8 }} 
    className="relative rounded-[1.5rem] flex flex-col cursor-pointer shadow-sm border border-ink/5 hover:shadow-xl transition-all bg-white overflow-hidden h-[260px] group"
  >
    {/* 图片区域 (140px，保持足够展示面) */}
    <div className="relative h-[140px] w-full flex-shrink-0 overflow-hidden bg-ink/5">
      <img 
        src={project.bgImage} 
        alt={project.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
      
      <div className="absolute top-3 left-4">
        <span className="text-white text-[9px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-sm">
          <project.icon size={10} className="text-rust/80" /> {project.tag}
        </span>
      </div>
    </div>
    
    {/* 文字区域极度压缩留白，去掉背景/边框的按钮，改为文字链接 */}
    <div className="p-4 pt-3 flex flex-col flex-1 z-10 bg-white">
      <h3 className="text-base font-bold mb-1.5 tracking-tight text-ink leading-tight">{project.title}</h3>
      <p className="text-[11px] text-ink/50 leading-relaxed font-medium line-clamp-2 mb-2">{project.desc}</p>
      
      <div className="mt-auto">
        <motion.span 
          whileHover={{ x: 5 }} 
          className="text-rust font-bold text-[11px] tracking-widest flex items-center gap-1"
        >
          了解详情 &rarr;
        </motion.span>
      </div>
    </div>
  </motion.div>
);

const AILabCard = ({ title, tag, desc, bgColor, mockup }: { title: string; tag: string; desc: string; bgColor: string; mockup: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5 }} className={`${bgColor} rounded-[2rem] p-6 flex flex-col min-h-[180px] relative group border border-ink/5 shadow-sm hover:shadow-md transition-all mt-8 md:mt-10`}>
    <div className="absolute -top-10 -right-2 w-28 h-36 md:w-32 md:h-40 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 z-20 drop-shadow-xl pointer-events-none">
      {mockup}
    </div>
    <div className="z-10 relative max-w-[65%]">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/50 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 mb-3 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 tracking-tight text-ink leading-tight">{title}</h3>
      <p className="text-[10px] text-ink/60 leading-relaxed font-medium line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const VideoMockup = ({ src, fallbackImg, rotateClass = "rotate-3" }: { src: string, fallbackImg: string, rotateClass?: string }) => (
  <div className={`w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-[4px] border-white/90 bg-white ${rotateClass} transition-transform duration-500`}>
    <video 
      src={src}
      poster={fallbackImg}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
  </div>
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
      title: "饿了么下沉市场外卖配送提效", tag: "系统调优", 
      bgImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop", icon: MapPin,
      desc: "主导饿了么下沉市场智能调度系统覆盖率从30%提升至98%，提升平台整体配送效率和履约质量。",
      detail: "该项目为公司战略级项目，作为业务方主导，产研和算法团队紧密配合，通过系统赋能与宣讲培训，帮助全国 1800 个城市代理商实现降本增效。"
    },
    {
      title: "一条艺术电商平台", tag: "电商运营", 
      bgImage: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800&auto=format&fit=crop", icon: Palette,
      desc: "从0-1搭建艺术品电商平台，构建从艺术家到艺术作品的完整知识体系，降低消费者线上购买门槛。",
      detail: "负责艺术电商平台产品运营，运营艺术品线上展厅、直播、拍卖、线上销售板块的产品规划与内容生态建设；同艺术品BD、内容编辑团队共同搭建从艺术家到艺术作品的完整基础知识体系，降低艺术品消费者线上购买门槛。"
    },
    {
      title: "携程直播青训营", tag: "校企合作", 
      bgImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop", icon: Video,
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
        
        {/* --- 修改点1 & 2：人物缩小展示，主播标签遮挡右下角身体 --- */}
        {/* 全局 margin-bottom 从 24 统一缩减到了 12 */}
        <section id="about" className="relative min-h-[75vh] flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden mb-12">
          
          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
            
            <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <BreathingTag text="创新业务先锋 🚀" delay={0.2} className="top-[10%] left-[8%] md:left-[15%]" />
              <BreathingTag text="复旦MBAer 🎓" delay={1.5} className="top-[5%] right-[5%] md:right-[15%]" />
              
              {/* 主播标签移至右下角，层级抬高以遮挡人物身体 */}
              <BreathingTag text="做过主播，累计带货500万+ 💰" delay={0.8} className="bottom-[15%] right-[0%] md:right-[10%] z-30" />
              
              <BreathingTag text="10年运营经验 💼" delay={2.1} className="top-[35%] right-[2%] md:right-[5%]" />
              <BreathingTag text="0-1项目建设者 🧱" delay={0.5} className="bottom-[25%] left-[8%] md:left-[15%]" />
              <BreathingTag text="AI应用体验官 ✨" delay={1.2} className="bottom-[5%] left-[10%] md:left-[20%]" />
              <BreathingTag text="校企合作直播培训讲师 🏫" delay={2.5} className="top-[0%] left-[30%] md:left-[45%]" />
            </div>

            {/* 人物形象进一步缩小 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-40 md:w-48 aspect-[3/4] z-10 mb-4"
            >
              <img 
                src="/touxiang-1.png" 
                alt="Jodie Zhu" 
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] pointer-events-none" 
              />
              
              <h1 className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200%] text-center text-5xl md:text-6xl font-black text-rust tracking-tighter drop-shadow-md z-30 pointer-events-none">
                JODIE ZHU
              </h1>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rust/10 rounded-full blur-[60px] pointer-events-none z-0" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mt-6 px-4 max-w-2xl">
            <p className="text-xs md:text-sm font-bold text-ink/80 tracking-widest uppercase mb-3">
              复合型运营专家 / AI应用体验官
            </p>
            <p className="text-xs text-ink/60 font-medium leading-relaxed mb-6">
              9年互联网运营和产品经验，1年创业项目经验。深耕互联网行业多年，擅长从 0 到 1 搭建业务体系与合作伙伴赋能。持续研究AI与业务场景深度融合的解决方案，探索AI Agent、自动化工作流及内容生成的商业化机会。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:zwy0025@gmail.com" className="flex items-center justify-center gap-2 bg-white border border-ink/10 text-ink px-8 py-3.5 rounded-full font-bold text-xs tracking-widest hover:border-rust hover:text-rust transition-colors w-full sm:w-48 shadow-sm">
                <Mail size={16} /> 发送邮件
              </a>
              <button onClick={() => setIsWeChatOpen(true)} className="flex items-center justify-center gap-2 bg-ink text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-widest hover:bg-rust transition-colors w-full sm:w-48 shadow-xl">
                <QrCode size={16} /> 添加微信
              </button>
            </div>
          </div>
        </section>

        {/* 模块间距均修改为 mb-12 */}
        <section id="skills" className="mb-12">
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

        <section id="experience" className="mb-12">
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

        <section id="projects" className="mb-12">
          <SectionHeader zh="项目经历" en="Project Experience" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((p, idx) => (
              <ProjectCard key={idx} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
        
        <section id="ai-lab" className="mb-12">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8">
            <AILabCard 
              tag="AI Agent" title="起号助手agent" bgColor="bg-[#F3F4F6]"
              desc="基于大语言模型开发的自媒体助手，能够自动生成账号定位与内容规划。" 
              mockup={<VideoMockup src="/video-agent.mp4" fallbackImg="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=400&auto=format&fit=crop" rotateClass="-rotate-3" />} 
            />
            <AILabCard 
              tag="AI Product" title="AI陪伴玩具" bgColor="bg-[#EEF2FF]"
              desc="结合多模态交互技术，为婴幼儿提供情感陪伴与早教互动，解决陪伴缺失问题。" 
              mockup={<VideoMockup src="/video-toy.mp4" fallbackImg="https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?q=80&w=400&auto=format&fit=crop" rotateClass="rotate-2" />} 
            />
            <AILabCard 
              tag="Live Stream" title="AI虚拟形象直播" bgColor="bg-[#FEF2F2]"
              desc="重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低企业直播成本。" 
              mockup={<VideoMockup src="/video-live.mp4" fallbackImg="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=400&auto=format&fit=crop" rotateClass="rotate-3" />} 
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
