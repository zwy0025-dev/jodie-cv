import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Cpu, Lightbulb, Rocket, MessageCircle, X, ChevronRight,
  Menu, Mail, QrCode, ChevronDown, User, Star, Briefcase, Folder, Sparkles, ArrowUpRight,
  MapPin, Palette, Video, GraduationCap 
} from 'lucide-react';

// --- 基础 UI 组件 ---
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
      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-[#F8F9FB] border-[2.5px] border-rust shadow-[0_0_0_4px_rgba(179,58,45,0.1)] group-hover:scale-125 group-hover:bg-rust transition-all duration-300 z-10" />
      <div className="text-rust font-bold text-[11px] tracking-widest mb-1.5 uppercase">{date}</div>
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <h4 className="text-base font-black tracking-tight text-ink">
          {title} <span className="text-ink/20 mx-1 font-normal">—</span> <span className="text-rust/80">{company}</span>
        </h4>
        {details && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-[10px] font-bold bg-rust/5 text-rust px-4 py-1.5 rounded-full border border-rust/20 hover:bg-rust hover:text-white transition-colors flex items-center gap-1.5 z-10 relative cursor-pointer">
            了解经历 {isExpanded ? <ChevronDown size={12} className="rotate-180 transition-transform" /> : <ChevronDown size={12} className="transition-transform" />}
          </button>
        )}
      </div>
      <p className="text-xs text-ink/60 leading-relaxed max-w-xl font-medium">{desc}</p>
      {details && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '1.5rem' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-ink/5">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-4">工作内容</h5>
                  <ul className="space-y-2.5">{details.content?.map((item: string, i: number) => (<li key={i} className="text-xs text-ink/70 relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-ink/20 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust/[0.03] p-5 rounded-2xl border border-rust/10">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust/60 mb-4">核心项目</h5>
                  <ul className="space-y-2.5">{details.projects?.map((item: string, i: number) => (<li key={i} className="text-xs text-rust/80 relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-rust/40 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust p-5 rounded-2xl shadow-lg">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-4">突出成果</h5>
                  <ul className="space-y-2.5">{details.results?.map((item: string, i: number) => (<li key={i} className="text-xs text-white relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-white/50 rounded-full" />{item}</li>))}</ul>
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-white">
          <div className="h-48 md:h-64 relative w-full bg-ink">
            <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover opacity-80" />
            <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/20 p-2 rounded-full"><X size={20} /></button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/90 text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                {project.tag}
              </span>
              <h3 className="text-2xl font-black text-white">{project.title}</h3>
            </div>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto">
            <p className="text-sm text-ink/70 leading-relaxed font-medium mb-4">{project.desc}</p>
            <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-ink/5">
              <h4 className="text-xs font-bold text-rust uppercase tracking-widest mb-3">职责与成果</h4>
              <p className="text-sm text-ink/80 leading-relaxed">{project.detail}</p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <motion.div onClick={onClick} whileHover={{ y: -8 }} className="relative rounded-[1.5rem] flex flex-col cursor-pointer shadow-sm border border-ink/5 bg-white overflow-hidden h-[260px] group">
    <div className="relative h-[140px] w-full overflow-hidden bg-ink/5">
      <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-3 left-4">
        <span className="text-white text-[9px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-sm">
          {project.tag}
        </span>
      </div>
    </div>
    <div className="p-4 pt-3 flex flex-col flex-1 bg-white">
      <h3 className="text-base font-bold mb-1.5 text-ink leading-tight">{project.title}</h3>
      <p className="text-xs text-ink/50 leading-relaxed font-medium line-clamp-2">{project.desc}</p>
      <div className="mt-auto">
        <span className="text-rust font-bold text-[11px] tracking-widest flex items-center gap-1">了解详情 &rarr;</span>
      </div>
    </div>
  </motion.div>
);

const AILabCard = ({ title, tag, desc, bgColor, mockup }: { title: string; tag: string; desc: string; bgColor: string; mockup: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5 }} className={`${bgColor} rounded-[2rem] p-6 flex flex-col min-h-[180px] relative group border border-ink/5 mt-8 md:mt-10`}>
    <div className="absolute -top-10 -right-2 w-28 h-36 z-20 pointer-events-none">{mockup}</div>
    <div className="z-10 relative max-w-[65%]">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/50 bg-white/60 px-2.5 py-1 rounded-full border border-white/60 mb-3 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 text-ink leading-tight">{title}</h3>
      <p className="text-xs text-ink/60 leading-relaxed font-medium line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const VideoMockup = ({ src, rotateClass = "rotate-3" }: { src: string, rotateClass?: string }) => {
  const isGif = src?.toLowerCase().endsWith('.gif');
  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-lg border-[4px] border-white/90 bg-white ${rotateClass}`}>
      {isGif ? <img src={src} alt="demo" className="w-full h-full object-cover" /> : <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />}
    </div>
  );
};

// --- FAQ 组件 (补全定义，解决白屏报错) ---
const FAQDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white p-6 rounded-3xl shadow-2xl border border-rust/10 w-72 mb-4">
        <h4 className="text-sm font-bold text-rust mb-3">常见问题 FAQ</h4>
        <div className="space-y-3 text-xs text-ink/70">
          <p><strong>Q: 合作方式？</strong><br/>A: 支持顾问咨询、项目陪跑或全案外包。</p>
          <p><strong>Q: 擅长领域？</strong><br/>A: 直播生态、AI Agent 搭建、0-1 业务增长。</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- 保底静态数据 ---
const FALLBACK_DATA = {
  skills: [
    { title: "平台增长运营经验", desc: <>3年内推动携程直播平台规模1000万增至<strong className="text-rust font-black mx-0.5">10亿+</strong>。</> },
    { title: "中后台产品运营", desc: <>复杂系统推广培训经验，<strong className="text-ink font-bold">擅长跨部门协同与商务谈判</strong>。</> },
    { title: "业务赋能与项目落地", desc: <><strong className="text-ink font-bold">多次0-1项目落地经验</strong>，具备全链路操盘能力。</> },
    { title: "复合背景与商业思维", desc: <>能够围绕流量与用户特征，<strong className="text-ink font-bold">输出内容营销策略</strong>。</> }
  ],
  timeline: [
    { type: 'Work', date: "2021.07 - 2025.07", title: "运营经理", company: "Ctrip 携程", desc: "从0-1搭建商家直播生态体系，3年推动平台直播GMV从1000万增至10亿+。" },
    { type: 'Education', date: "2024.09 - 2027.03", title: "工商管理(MBA)", company: "复旦大学（硕士）", desc: "专注于商业领导力与创新管理。" }
  ],
  projects: [
    { title: "一条艺术电商平台", tag: "电商运营", bgImage: "/yitiao.JPG", desc: "从0-1搭建艺术品电商平台。", detail: "负责产品运营与内容生态建设。" }
  ],
  aiLab: [
    { title: "自媒体起号助手", tag: "AI Agent", desc: "基于大模型开发的起号助手。", bgColor: "bg-[#F3F4F6]", media: "https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" }
  ]
};

export default function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isWeChatOpen, setIsWeChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const [data, setData] = useState(FALLBACK_DATA);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // 数据同步逻辑
    fetch('/api/notion')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setData({
            skills: resData.data.skills?.length > 0 ? resData.data.skills : FALLBACK_DATA.skills,
            timeline: resData.data.timeline?.length > 0 ? resData.data.timeline : FALLBACK_DATA.timeline,
            projects: resData.data.projects?.length > 0 ? resData.data.projects : FALLBACK_DATA.projects,
            aiLab: resData.data.aiLab?.length > 0 ? resData.data.aiLab : FALLBACK_DATA.aiLab,
          });
        }
      })
      .catch(() => console.log("使用保底数据"));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#F8F9FB] selection:bg-rust selection:text-white overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rust origin-left z-[1000]" style={{ scaleX }} />
      
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm' : 'py-6'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="font-black text-2xl">wenying<span className="text-rust">.website</span></div>
          <div className="hidden md:flex gap-6">
            <NavItem zh="核心技能" en="Skills" href="#skills" icon={Star} />
            <NavItem zh="个人经历" en="Experience" href="#experience" icon={Briefcase} />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" icon={Sparkles} />
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden"><Menu size={24} /></button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <section id="about" className="text-center mb-24">
          <div className="relative w-40 h-48 mx-auto mb-8">
            <img src="/touxiang-1.png" className="w-full h-full object-contain drop-shadow-xl" />
            <BreathingTag text="10年运营经验 💼" delay={0} className="-top-4 -left-12" />
            <BreathingTag text="AI应用先锋 ✨" delay={1} className="bottom-0 -right-12" />
          </div>
          <h1 className="text-5xl font-black text-rust mb-6 tracking-tighter">ZHU WENYING</h1>
          <p className="max-w-2xl mx-auto text-xs text-ink/60 font-medium leading-relaxed">
            上海 / 复旦大学MBA / 复合型运营专家。深耕互联网行业9年，擅长从0-1搭建业务体系。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setIsWeChatOpen(true)} className="bg-ink text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-widest shadow-xl">微信联系</button>
          </div>
        </section>

        <section id="skills" className="mb-20">
          <SectionHeader zh="核心技能" en="Core Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((s, idx) => (
              <SkillCard key={idx} title={s.title} dataDesc={s.desc} icon={TrendingUp} />
            ))}
          </div>
        </section>

        <section id="experience" className="mb-20">
          <SectionHeader zh="个人经历" en="Experience" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xs font-bold text-ink/40 uppercase mb-8">工作经历</h3>
              {data.timeline.filter(i => i.type === 'Work').map((item, idx) => (
                <TimelineItem key={idx} {...item} />
              ))}
            </div>
            <div>
              <h3 className="text-xs font-bold text-ink/40 uppercase mb-8">教育经历</h3>
              {data.timeline.filter(i => i.type === 'Education').map((item, idx) => (
                <TimelineItem key={idx} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mb-20">
          <SectionHeader zh="项目经历" en="Projects" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects.map((p, idx) => (
              <ProjectCard key={idx} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
        </section>

        <section id="ai-lab" className="mb-20">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.aiLab.map((item, idx) => (
              <AILabCard key={idx} {...item} mockup={<VideoMockup src={item.media} />} />
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        <FAQDialog isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
        <button onClick={() => setIsFaqOpen(!isFaqOpen)} className="w-14 h-14 bg-rust rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white overflow-hidden">
          <img src="/fenshen-4.jpg" className="w-full h-full object-cover" />
        </button>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <WeChatModal isOpen={isWeChatOpen} onClose={() => setIsWeChatOpen(false)} />
    </div>
  );
}
