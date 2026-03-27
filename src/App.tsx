import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Cpu, Lightbulb, Rocket, MessageCircle, X, ChevronRight,
  Menu, Mail, QrCode, ChevronDown, User, Star, Briefcase, Folder, Sparkles, ArrowUpRight,
  MapPin, Palette, Video, GraduationCap 
} from 'lucide-react';

// --- 通用 UI 组件 ---

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

// 定义统一的按钮样式组件
const CompactButton = ({ children, onClick, href, icon: Icon, variant = "secondary" }: any) => {
  const baseClass = "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs tracking-widest transition-all shadow-sm w-full sm:w-48";
  const variants: any = {
    primary: "bg-ink text-white hover:bg-rust shadow-xl",
    secondary: "bg-white border border-ink/10 text-ink hover:border-rust hover:text-rust",
  };
  
  const content = (
    <>
      {Icon && <Icon size={16} />}
      {children}
    </>
  );

  if (href) {
    return <a href={href} className={`${baseClass} ${variants[variant]}`}>{content}</a>;
  }
  return <button onClick={onClick} className={`${baseClass} ${variants[variant]}`}>{content}</button>;
};

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div className="bg-white p-5 rounded-2xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-ink/20 rounded-full" /> 工作内容</h5>
                  <ul className="space-y-2.5">{details.content?.map((item: string, i: number) => (<li key={i} className="text-xs text-ink/70 leading-relaxed relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-ink/20 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust/[0.03] p-5 rounded-2xl border border-rust/10 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust/60 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rust/40 rounded-full" /> 核心项目</h5>
                  <ul className="space-y-2.5">{details.projects?.map((item: string, i: number) => (<li key={i} className="text-xs text-rust/80 leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-rust/40 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust p-5 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" /> 突出成果</h5>
                  <ul className="space-y-2.5">{details.results?.map((item: string, i: number) => (<li key={i} className="text-xs text-white leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-white/50 rounded-full" /><span dangerouslySetInnerHTML={{ __html: item.replace(/(\d+[%+万亿]*)/g, '<strong class="text-white font-black text-xs bg-white/20 px-1 rounded mx-0.5">$1</strong>') }} /></li>))}</ul>
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
          <div className="h-48 md:h-64 relative w-full flex-shrink-0 bg-ink">
            <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover opacity-80 object-top" />
            <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/20 p-2 rounded-full backdrop-blur-md"><X size={20} /></button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/90 text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                {project.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white">{project.title}</h3>
            </div>
          </div>
          <div className="p-8 overflow-y-auto">
            <h4 className="text-xs font-bold text-rust uppercase mb-4 flex items-center gap-2"><Star size={14}/> 项目简介</h4>
            <p className="text-sm text-ink/70 leading-relaxed font-medium mb-8">{project.desc}</p>
            <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xs font-bold text-rust uppercase mb-3 flex items-center gap-2"><Briefcase size={14}/> 职责与成果</h4>
              <p className="text-sm text-ink/80 leading-relaxed">{project.detail}</p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => (
  <motion.div onClick={onClick} whileHover={{ y: -8 }} className="relative rounded-[1.5rem] flex flex-col cursor-pointer shadow-sm border border-ink/5 hover:shadow-xl transition-all bg-white overflow-hidden h-[260px] group">
    <div className="relative h-[140px] w-full flex-shrink-0 overflow-hidden bg-ink/5">
      <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top" />
      <div className="absolute top-3 left-4">
        <span className="text-white text-[9px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-sm">
           {project.tag}
        </span>
      </div>
    </div>
    <div className="p-4 pt-3 flex flex-col flex-1 z-10 bg-white">
      <h3 className="text-base font-bold mb-1.5 text-ink leading-tight">{project.title}</h3>
      <p className="text-xs text-ink/50 leading-relaxed font-medium line-clamp-2">{project.desc}</p>
      <div className="mt-auto">
        <span className="text-rust font-bold text-[11px] tracking-widest flex items-center gap-1">了解详情 &rarr;</span>
      </div>
    </div>
  </motion.div>
);

const AILabCard = ({ title, tag, desc, bgColor, mockup }: { title: string; tag: string; desc: string; bgColor: string; mockup: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5 }} className={`${bgColor} rounded-[2rem] p-6 flex flex-col min-h-[180px] relative group border border-ink/5 shadow-sm hover:shadow-md transition-all mt-8 md:mt-10`}>
    <div className="absolute -top-10 -right-2 w-28 h-36 md:w-32 md:h-40 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 z-20 drop-shadow-xl pointer-events-none">{mockup}</div>
    <div className="z-10 relative max-w-[65%]">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/50 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 mb-3 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 text-ink leading-tight">{title}</h3>
      <p className="text-xs text-ink/60 leading-relaxed font-medium line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const VideoMockup = ({ src, fallbackImg, rotateClass = "rotate-3" }: { src: string, fallbackImg?: string, rotateClass?: string }) => {
  const isGif = src?.toLowerCase().endsWith('.gif');
  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-[4px] border-white/90 bg-white ${rotateClass} transition-transform duration-500`}>
      {isGif ? <img src={src} alt="demo" className="w-full h-full object-cover" /> : <video src={src} poster={fallbackImg} autoPlay loop muted playsInline className="w-full h-full object-cover" />}
    </div>
  );
};

// --- 保底静态数据 (包含完整粗体和逻辑文案) ---
const FULL_FALLBACK = {
  skills: [
    { title: "平台增长运营经验", desc: <>3年内推动携程直播平台规模1000万增至<strong className="text-rust font-black mx-0.5">10亿+</strong>，6个月内推动视频号矩阵直播<strong className="text-rust font-black mx-0.5">0-4000万</strong>。</> },
    { title: "中后台产品运营", desc: <>复杂系统推广培训经验，<strong className="text-ink font-bold">长期与算法、产研、设计、销售、业务团队合作</strong>，擅长跨部门协同与商务谈判。</> },
    { title: "业务赋能与项目落地", desc: <><strong className="text-ink font-bold">多次0-1项目落地经验</strong>，具备0-1阶段项目建设→业务体系搭建→规模化增长的全链路操盘能力。</> },
    { title: "复合背景与商业思维", desc: <>服务过多家互联网企业，参与初创运营，能够围绕平台流量、供给与用户特征，<strong className="text-ink font-bold">输出营销策略和解决方案</strong>。</> }
  ],
  timeline: [
    { type: 'Work', date: "2025.10 - 至今", title: "餐厅合伙人 / 企业顾问", company: "予童科技等", desc: "主导BP撰写与融资对接，负责婴幼儿家庭AI服务产品孵化与培训体系搭建。" },
    { type: 'Work', date: "2021.07 - 2025.07", title: "运营经理", company: "Ctrip 携程", desc: "从0-1搭建商家直播生态体系，3年推动平台直播GMV从1000万增至10亿+。", details: { content: ["从 0 到 1 搭建商家直播生态体系","制定直播间运营标准与流量分发策略"], projects: ["携程直播青训营","携程 AI 虚拟人直播"], results: ["3 年推动 GMV 从 1000 万增至 10 亿+","转化率提升 70%+"] } },
    { type: 'Work', date: "2020.05 - 2021.07", title: "产品运营", company: "Yitiao 一条", desc: "0-1艺术电商平台搭建，优化用户注册转化节点，将小程序注册率提升至80%。" },
    { type: 'Education', date: "2024.09 - 2027.03", title: "工商管理(MBA)", company: "复旦大学(在读)", desc: "专注于商业领导力与创新管理，参与Esade University交换项目。" }
  ],
  projects: [
    { title: "一条艺术电商平台", tag: "电商运营", bgImage: "/yitiao.JPG", desc: "从0-1搭建艺术品电商平台，构建从艺术家到艺术作品的完整知识体系。", detail: "负责电商平台产品运营与内容生态建设；有效降低了艺术品消费者的线上决策成本。" },
    { title: "携程直播青训营", tag: "业务孵化", bgImage: "/qingxunying.jpg", desc: "搭建视频号直播矩阵，6个月实现收入0到4000万突破，获集团Superhero称号。", detail: "主导校企合作方案。具备单场百万直播GMV操盘能力。" },
    { title: "饿了么下沉市场调优", tag: "系统调优", bgImage: "/taobaoshangou.jpg", desc: "主导下沉市场智能调度系统覆盖率从30%提升至98%，提升平台整体效率。", detail: "作为业务方主导，与产研、算法团队紧密配合，实现下沉 markets 精细化调度。" }
  ],
  aiLab: [
    { title: "自媒体起号助手", tag: "AI Agent", desc: "基于大语言模型开发的AI Agent，帮助新手完成账号诊断与内容规划。", bgColor: "bg-[#F3F4F6]", media: "https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" },
    { title: "婴幼儿AI服务产品", tag: "AI Product", desc: "结合多模态交互技术，为婴幼儿提供情感陪伴与早教互动场景，探索AI硬件落地。", bgColor: "bg-[#EEF2FF]", media: "/aitoy.gif" },
    { title: "AI虚拟形象直播", tag: "Live Stream", desc: "重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低企业直播成本。", bgColor: "bg-[#FEF2F2]", media: "/xiaozhang.gif" }
  ]
};

const skillIcons = [TrendingUp, Cpu, Lightbulb, Rocket];

export default function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isWeChatOpen, setIsWeChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const [data, setData] = useState(FULL_FALLBACK);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // --- Notion 数据获取逻辑 ---
    fetch('/api/notion')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          // 容错处理：确保 Notion 返回的数据是完整的，如果不是，则保留保底数据的详细部分
          setData({
            skills: resData.data.skills?.length > 0 ? resData.data.skills : FULL_FALLBACK.skills,
            timeline: resData.data.timeline?.length > 0 ? resData.data.timeline : FULL_FALLBACK.timeline,
            projects: resData.data.projects?.length > 0 ? resData.data.projects : FULL_FALLBACK.projects,
            aiLab: resData.data.aiLab?.length > 0 ? resData.data.aiLab : FULL_FALLBACK.aiLab,
          });
        }
      })
      .catch(() => console.log("加载 Notion 数据失败，使用保底内容..."));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#F8F9FB] selection:bg-rust selection:text-white overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rust origin-left z-[1000]" style={{ scaleX }} />
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'py-8'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="font-black text-2xl tracking-tighter">wenying<span className="text-rust">.website</span></div>
          <div className="hidden md:flex gap-8 items-center">
            <NavItem zh="核心技能" en="Skills" href="#skills" icon={Star} />
            <NavItem zh="个人经历" en="Experience" href="#experience" icon={Briefcase} />
            <NavItem zh="项目经历" en="Projects" href="#projects" icon={Folder} />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" icon={Sparkles} />
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden"><Menu size={24} /></button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-40 pb-20">
        
        {/* --- 视觉升级版 About Section (参考截图实现排版和标签复原) --- */}
        <section id="about" className="relative flex flex-col items-center justify-center text-center mb-40">
          
          {/* 形象照容器：复原原本的 w-40md:w-48 大小，名字移出且不盖在身上 */}
          <div className="relative w-40 md:w-48 aspect-[3/4] mb-12">
            <img src="/touxiang-1.png" className="w-full h-full object-contain drop-shadow-2xl" />
            
            {/* 标签复原 (参考 image_c7daa4.jpg 的数量和内容) */}
            <BreathingTag text="创新业务先锋 🚀" delay={0.2} className="-top-10 left-[-30%] md:left-[-60%]" />
            <BreathingTag text="校企合作直播培训讲师 🏫" delay={1.5} className="top-[10%] right-[-15%] md:right-[-40%]" />
            <BreathingTag text="做过主播，累计带货500万+ 💰" delay={0.8} className="top-[35%] right-[-10%] md:right-[-35%]" />
            <BreathingTag text="10年运营经验 💼" delay={2.1} className="top-[60%] right-[-15%] md:right-[-40%]" />
            <BreathingTag text="0-1项目建设者 🧱" delay={0.5} className="bottom-20 left-[-20%] md:left-[-50%]" />
            <BreathingTag text="AI应用体验官 ✨" delay={1.2} className="-bottom-8 left-[10%] md:left-[20%]" />
          </div>

          {/* 名字：original size 且不盖在身上，居中排列 */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-rust mb-6 tracking-tighteruppercase"
          >
            ZHU WENYING
          </motion.h1>

          {/* 描述文案：已去掉标签那行 */}
          <p className="max-w-2xl text-[14px] text-ink/70 font-medium leading-relaxed mb-10">
            9年互联网运营和产品经验、1年创业项目经验。深耕互联网行业多年，擅长从 0 到 1 搭建业务体系与合作伙伴赋能。持续研究AI与业务场景深度融合的解决方案，探索AI Agent、自动化工作流及人机协同的商业化机会。
          </p>

          {/* 顶部按钮：使用统一的 CompactButton 组件，保持大小、样式一致 */}
          <div className="flex justify-center gap-4">
            <CompactButton href="mailto:zwy0025@gmail.com" icon={Mail} variant="secondary">发送邮件</ CompactButton>
            <CompactButton onClick={() => setIsWeChatOpen(true)} icon={QrCode} variant="primary">添加微信</CompactButton>
          </div>
        </section>

        {/* --- 核心技能 --- */}
        <section id="skills" className="mb-24">
          <SectionHeader zh="核心技能" en="Core Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skills.map((s, idx) => (
              <SkillCard key={idx} title={s.title} dataDesc={s.desc} icon={skillIcons[idx%4]} />
            ))}
          </div>
        </section>

        {/* --- 个人经历 (保留带详情和动画的精致排版) --- */}
        <section id="experience" className="mb-24">
          <SectionHeader zh="个人经历" en="Experience" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h3 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-10 flex items-center gap-2">工作经历</h3>
              {data.timeline.filter(i => i.type === 'Work').map((item, idx) => (
                <TimelineItem key={idx} {...item} />
              ))}
            </div>
            <div>
              <h3 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-10 flex items-center gap-2">教育经历</h3>
              {data.timeline.filter(i => i.type === 'Education').map((item, idx) => (
                <TimelineItem key={idx} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* --- 项目经历 --- */}
        <section id="projects" className="mb-24">
          <SectionHeader zh="项目经历" en="Projects" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.projects.map((p, idx) => (
              <ProjectCard key={idx} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
        </section>

        {/* --- AI 实验室 --- */}
        <section id="ai-lab" className="mb-24">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.aiLab.map((item, idx) => (
              <AILabCard key={idx} {...item} mockup={<VideoMockup src={item.media} rotateClass={idx%2===0?"rotate-2":"-rotate-2"} />} />
            ))}
          </div>
        </section>

        {/* --- 页脚 (按钮统一样式) --- */}
        <footer className="pt-20 pb-12 border-t border-ink/10 flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">Jodie Zhu</h2>
              <p className="text-ink/30 text-[10px] uppercase tracking-[0.3em]">Building Business with AI © 2026</p>
            </div>
            {/* 底部按钮：使用统一的 CompactButton 组件，保持大小、样式一致 */}
            <div className="flex gap-4">
              <CompactButton onClick={() => setIsWeChatOpen(true)} icon={QrCode} variant="primary">添加微信</CompactButton>
              <CompactButton href="mailto:zwy0025@gmail.com" icon={Mail} variant="secondary">邮件联系</CompactButton>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
        <div onClick={() => setIsFaqOpen(!isFaqOpen)} className="w-16 h-16 bg-rust rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white overflow-hidden hover:scale-105 transition-transform cursor-pointer">
          <img src="/fenshen-4.jpg" className="w-full h-full object-cover" />
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <WeChatModal isOpen={isWeChatOpen} onClose={() => setIsWeChatOpen(false)} />
    </div>
  );
}
