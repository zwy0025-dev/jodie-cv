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

// --- 手机端垂直时间轴组件 ---
const TimelineItem = ({ date, title, company, desc, details }: { date: string; title: string; company: string; desc: string; details?: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 mb-12 group last:mb-0">
      <div className="absolute left-[5px] top-2 bottom-[-3rem] w-px bg-rust/20 group-last:bg-transparent transition-colors duration-500 group-hover:bg-rust/50" />
      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-[#F8F9FB] border-[2.5px] border-rust shadow-[0_0_0_4px_rgba(179,58,45,0.1)] group-hover:scale-125 group-hover:bg-rust transition-all duration-300 z-10" />
      <div className="text-rust font-bold text-[12px] tracking-widest mb-1.5 uppercase">{date}</div>
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <h4 className="text-base font-black tracking-tight text-ink">
          {title} <span className="text-ink/20 mx-1 font-normal">—</span> <span className="text-rust/80">{company}</span>
        </h4>
        {details && details.content && (
          <motion.button animate={{ boxShadow: ["0px 0px 0px 0px rgba(179,58,45,0)", "0px 0px 0px 6px rgba(179,58,45,0.15)", "0px 0px 0px 0px rgba(179,58,45,0)"] }} transition={{ duration: 2, repeat: Infinity }} onClick={() => setIsExpanded(!isExpanded)} className="text-[10px] font-bold bg-rust/5 text-rust px-4 py-1.5 rounded-full border border-rust/20 hover:bg-rust hover:text-white transition-colors flex items-center gap-1.5 z-10 relative cursor-pointer">
            了解经历 {isExpanded ? <ChevronDown size={12} className="rotate-180 transition-transform" /> : <ChevronDown size={12} className="transition-transform" />}
          </motion.button>
        )}
      </div>
      <p className="text-xs text-ink/60 leading-relaxed max-w-xl font-medium">{desc}</p>
      {details && details.content && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '1.5rem' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div className="bg-white p-5 rounded-2xl border border-ink/5 shadow-sm">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-ink/20 rounded-full" /> 工作内容</h5>
                  <ul className="space-y-2.5">{details.content.map((item: string, i: number) => (<li key={i} className="text-xs text-ink/70 leading-relaxed relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-ink/20 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust/[0.03] p-5 rounded-2xl border border-rust/10 shadow-sm">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-rust/60 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rust/40 rounded-full" /> 核心项目</h5>
                  <ul className="space-y-2.5">{details.projects?.map((item: string, i: number) => (<li key={i} className="text-xs text-rust/80 leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-rust/40 rounded-full" />{item}</li>))}</ul>
                </div>
                <div className="bg-rust p-5 rounded-2xl shadow-lg">
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

// --- 电脑端专用的手绘风交互曲线组件 ---
const ExperienceCurve = ({ items }: { items: any[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(items.length - 1); 

  // 计算平滑的指数级上升贝塞尔曲线
  const P0 = { x: 0, y: 90 };
  const P1 = { x: 70, y: 85 };
  const P2 = { x: 100, y: 10 };

  const getBezierPoint = (t: number) => {
    const x = Math.pow(1 - t, 2) * P0.x + 2 * (1 - t) * t * P1.x + Math.pow(t, 2) * P2.x;
    const y = Math.pow(1 - t, 2) * P0.y + 2 * (1 - t) * t * P1.y + Math.pow(t, 2) * P2.y;
    return { x, y };
  };

  const n = Math.max(1, items.length - 1);
  const points = items.map((_, i) => getBezierPoint(i / n));

  return (
    <div className="w-full hidden md:block">
      {/* 去掉了白底，点击空白处收起详情 */}
      <div 
        className="relative w-full h-[400px] mb-4 overflow-visible cursor-default transition-all"
        onClick={() => setActiveIndex(null)}
      >
        <div className="relative w-full h-full mt-4">
          
          {/* 上升曲线绘制 (加粗，更有弧度) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path 
              d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`} 
              fill="none" 
              stroke="rgba(179,58,45,0.3)" 
              strokeWidth="1.2" 
            />
          </svg>

          {/* 渲染坐标节点 */}
          {points.map((pt, i) => {
            const item = items[i];
            const isActive = activeIndex === i;
            
            // 解析公司名称（实现：英文-中文-职位 三行）
            const companyParts = item.company.split(' ');
            const hasEn = companyParts.length > 1;
            const enStr = hasEn ? companyParts[0] : '';
            const zhStr = hasEn ? companyParts.slice(1).join(' ') : item.company;
            const isEdu = item.type === 'Education';

            return (
              <div 
                key={i} 
                className="absolute z-10 flex flex-col items-center justify-center group"
                style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* 节点上方信息：三行错落展示 */}
                <div 
                  className={`absolute bottom-full mb-3.5 flex flex-col items-center whitespace-nowrap transition-all duration-300 pointer-events-none ${isActive ? 'scale-110 opacity-100' : 'opacity-60 group-hover:opacity-100 group-hover:-translate-y-1'}`}
                >
                  {/* 第一行：英文 + Icon（仅学校保留 Icon）*/}
                  {(enStr || isEdu) && (
                    <span className={`text-[10px] font-bold ${isEdu ? 'text-ink/60' : 'text-rust/60'} uppercase tracking-widest flex items-center gap-1.5 mb-1.5`}>
                      {isEdu && <GraduationCap size={12}/>}
                      {enStr}
                    </span>
                  )}
                  
                  {/* 第二行：中文公司/学校名 (全部统一为主题红，最大字号突出) */}
                  <span className={`text-lg font-black text-rust tracking-tight leading-none mb-2 flex items-center gap-1`}>
                    {zhStr}
                  </span>
                  
                  {/* 第三行：职位 */}
                  <span className="text-sm font-bold text-ink/70 leading-none">
                    {item.title}
                  </span>
                </div>

                {/* 核心节点圆点，全部描红边，点击折叠/展开 */}
                <motion.div 
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(activeIndex === i ? null : i); }}
                  animate={isActive ? { scale: 1.4, backgroundColor: "rgba(179,58,45,1)" } : { scale: 1, backgroundColor: "rgba(255,255,255,1)" }}
                  className={`w-3.5 h-3.5 rounded-full border-[3px] border-rust transition-colors z-20 relative cursor-pointer hover:scale-125 ${isActive ? 'border-transparent' : 'border-rust/70'}`}
                  style={isActive ? { boxShadow: `0 0 0 8px rgba(179,58,45,0.15)` } : {}}
                />

                {/* 节点下方信息 (时间，加大字号) */}
                <div className={`absolute top-full mt-3.5 flex flex-col items-center whitespace-nowrap transition-all pointer-events-none ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                  <span className="text-[13px] font-bold text-ink/40 tracking-wide">{item.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 底部详细展示面板 (点击节点后横向展示模块) */}
      <AnimatePresence mode="wait">
         {activeIndex !== null && items[activeIndex] && (
           <motion.div 
             key={activeIndex}
             initial={{ opacity: 0, height: 0, y: -10 }}
             animate={{ opacity: 1, height: 'auto', y: 0 }}
             exit={{ opacity: 0, height: 0, y: -10 }}
             className="w-full bg-white px-8 pt-6 pb-8 rounded-[2rem] border border-ink/5 shadow-xl overflow-hidden"
           >
             <div className="mb-6 pb-6 border-b border-ink/5 flex items-start justify-between mt-2">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-rust/5 text-rust flex items-center justify-center">
                   {items[activeIndex].type === 'Education' ? <GraduationCap size={24}/> : <Briefcase size={24}/>}
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-ink mb-1">{items[activeIndex].title} <span className="text-ink/20 mx-2">|</span> <span className="text-rust">{items[activeIndex].company}</span></h3>
                   <p className="text-[13px] text-ink/60 font-medium max-w-2xl">{items[activeIndex].desc}</p>
                 </div>
               </div>
               <span className="text-sm font-bold text-rust bg-rust/5 px-4 py-1.5 rounded-full border border-rust/10">{items[activeIndex].date}</span>
             </div>
             
             {items[activeIndex].details && items[activeIndex].details.content ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-ink/5 shadow-sm">
                    <h5 className="text-[11px] font-black uppercase tracking-widest text-ink/40 mb-5 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-ink/20 rounded-full" /> 工作内容</h5>
                    <ul className="space-y-3.5">{items[activeIndex].details.content?.map((item: string, i: number) => (<li key={i} className="text-xs text-ink/70 leading-relaxed relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-ink/20 rounded-full" />{item}</li>))}</ul>
                  </div>
                  <div className="bg-rust/[0.03] p-6 rounded-2xl border border-rust/10 shadow-sm">
                    <h5 className="text-[11px] font-black uppercase tracking-widest text-rust/60 mb-5 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rust/40 rounded-full" /> 核心项目</h5>
                    <ul className="space-y-3.5">{items[activeIndex].details.projects?.map((item: string, i: number) => (<li key={i} className="text-xs text-rust/80 leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-rust/40 rounded-full" />{item}</li>))}</ul>
                  </div>
                  <div className="bg-rust p-6 rounded-2xl shadow-lg">
                    <h5 className="text-[11px] font-black uppercase tracking-widest text-white/80 mb-5 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" /> 突出成果</h5>
                    <ul className="space-y-3.5">{items[activeIndex].details.results?.map((item: string, i: number) => (<li key={i} className="text-xs text-white leading-relaxed relative pl-3 font-medium"><span className="absolute left-0 top-1.5 w-1 h-1 bg-white/50 rounded-full" /><span dangerouslySetInnerHTML={{ __html: item.replace(/(\d+[%+万亿]*)/g, '<strong class="text-white font-black text-sm bg-white/20 px-1 rounded mx-0.5">$1</strong>') }} /></li>))}</ul>
                  </div>
               </div>
             ) : (
               <div className="text-sm text-ink/40 py-8 text-center font-medium tracking-widest">目前暂无更多模块详情</div>
             )}
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => (
  <AnimatePresence>
    {project && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }} className="relative w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-white">
          <div className="h-48 md:h-64 relative w-full flex-shrink-0 bg-ink">
            <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover opacity-80 object-top" />
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
            <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xs font-bold text-rust uppercase tracking-widest mb-3 flex items-center gap-2"><Briefcase size={14}/> 职责与成果</h4>
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
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
      <div className="absolute top-3 left-4">
        <span className="text-white text-[9px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-sm">
          <project.icon size={10} className="text-rust/80" /> {project.tag}
        </span>
      </div>
    </div>
    <div className="p-4 pt-3 flex flex-col flex-1 z-10 bg-white">
      <h3 className="text-base font-bold mb-1.5 tracking-tight text-ink leading-tight">{project.title}</h3>
      <p className="text-xs text-ink/50 leading-relaxed font-medium line-clamp-2 mb-2">{project.desc}</p>
      <div className="mt-auto">
        <motion.span whileHover={{ x: 5 }} className="text-rust font-bold text-[11px] tracking-widest flex items-center gap-1">了解详情 &rarr;</motion.span>
      </div>
    </div>
  </motion.div>
);

const AILabCard = ({ title, tag, desc, bgColor, mockup }: { title: string; tag: string; desc: string; bgColor: string; mockup: React.ReactNode }) => (
  <motion.div whileHover={{ y: -5 }} className={`${bgColor} rounded-[2rem] p-6 flex flex-col min-h-[180px] relative group border border-ink/5 shadow-sm hover:shadow-md transition-all mt-8 md:mt-10`}>
    <div className="absolute -top-10 -right-2 w-28 h-36 md:w-32 md:h-40 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 z-20 drop-shadow-xl pointer-events-none">{mockup}</div>
    <div className="z-10 relative max-w-[65%]">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/50 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 mb-3 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 tracking-tight text-ink leading-tight">{title}</h3>
      <p className="text-xs text-ink/60 leading-relaxed font-medium line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const VideoMockup = ({ src, fallbackImg, rotateClass = "rotate-3" }: { src: string, fallbackImg?: string, rotateClass?: string }) => {
  const isVideo = src?.toLowerCase().match(/\.(mp4|webm|mov)$/);
  const placeholder = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop";
  const finalSrc = src || fallbackImg || placeholder;

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-[4px] border-white/90 bg-white ${rotateClass} transition-transform duration-500`}>
      {isVideo ? (
        <video src={finalSrc} poster={fallbackImg || placeholder} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      ) : (
        <img 
          src={finalSrc} 
          alt="demo" 
          className="w-full h-full object-cover" 
          onError={(e) => { e.currentTarget.src = placeholder; }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
    </div>
  );
};

const FAQDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  const faqs = [
    { q: "离职原因", a: "寻求更广阔的 AI 应用落地场景，将 9 年运营经验与 AIGC 技术深度结合，创造指数级增长。" },
    { q: "求职期望", a: "基于行业标准与岗位价值，期待一份能体现专业深度与创业精神的合作方案，薪资可面议。" },
    { q: "个人评价", a: "具备10亿规模平台操盘视角，有0-1的创业实战韧性。AI实践者，擅长输出业务解决方案，能直接为业务结果负责。" }
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

const FULL_FALLBACK = {
  skills: [
    { title: "平台增长运营经验", icon: TrendingUp, desc: <>3年内推动携程直播平台规模1000万增至<strong className="text-rust font-black text-sm mx-0.5">10亿+</strong>，6个月内推动视频号矩阵直播<strong className="text-rust font-black text-sm mx-0.5">0-4000万</strong>。</> },
    { title: "中后台产品运营", icon: Cpu, desc: <>复杂系统推广培训经验，<strong className="text-ink font-bold">长期与算法、产研、设计、销售、业务团队合作，擅长跨部门协同与商务谈判、资源整合</strong>。</> },
    { title: "业务赋能与项目落地经验", icon: Lightbulb, desc: <><strong className="text-ink font-bold">多次0-1项目落地经验</strong>，具备0-1阶段项目建设→业务体系搭建→规模化增长的全链路操盘能力，擅长业务痛点诊断和赋能</> },
    { title: "复合运营背景与商业思维", icon: Rocket, desc: <>服务过多家互联网企业，参与初创企业运营，能够围绕平台流量、供给与用户特征，<strong className="text-ink font-bold">输出内容营销策略和行业解决方案</strong>。</> }
  ],
  timeline: [
    { type: 'Education', date: "2012.09 - 2016.07", title: "工业设计", company: "嘉兴大学(本科)", desc: "2016级优秀毕业生。培养了深厚的用户体验设计基础与产品思维。" },
    { type: 'Work', date: "2016.09 - 2020.04", title: "产品运营", company: "Ele.me 饿了么", desc: "主导下沉市场智能调度系统覆盖率从30%提升至98%。", details: { content: ["负责下沉市场物流调度系统的产品运营","协调全国 1800 个城市代理商的系统落地","通过数据分析优化配送效率与成本控制"], projects: ["下沉市场智能调度系统覆盖提升项目","代理商降本增效专项行动"], results: ["系统覆盖率从 30% 提升至 98%","帮助全国代理商显著降低运营成本","配送效率提升 25% 以上"] } },
    { type: 'Work', date: "2020.05 - 2021.07", title: "产品运营", company: "Yitiao 一条", desc: "0-1艺术电商平台搭建。优化用户注册转化节点，将小程序注册率提升至80%。", details: { content: ["负责艺术电商平台的产品运营与用户增长","优化用户注册与交易转化路径","打通拍卖+直播的闭环交易链路"], projects: ["一条艺术品电商平台：小程序注册转化优化","拍卖+直播交易链路整合"], results: ["小程序注册率从 30% 提升至 80%","成功上线艺术品拍卖直播功能","显著提升高客单价商品转化效率"] } },
    { type: 'Work', date: "2021.07 - 2025.07", title: "运营经理", company: "Ctrip 携程", desc: "从0-1搭建携程商家直播生态体系，3年推动平台直播GMV从1000万增至10亿+。", details: { content: ["从 0 到 1 搭建商家直播生态体系","制定直播间运营标准与流量分发策略","负责直播业务的整体增长与商业化变现"], projects: ["携程直播青训营：孵化 0 基础团队","携程 AI 直播：真人+AI 24小时客服直播间"], results: ["3 年推动 GMV 从 1000 万增至 10 亿+","直播间转化率提升 70%+","孵化团队 1 个月直播 GMV 破百万"] } },
    { type: 'Education', date: "2024.09 - 2027.03", title: "工商管理(MBA)", company: "复旦大学(硕士)", desc: "专注于商业领导力与创新管理。参与 Esade University 交换项目：Leading Innovation。" },
    { type: 'Work', date: "2025.10 - 至今", title: "企业顾问", company: "予童科技等", desc: "BP撰写与融资 / 线上培训课程体系搭建、婴幼儿家庭AI服务产品孵化" }
  ],
  projects: [
    { title: "饿了么下沉市场外卖配送提效", tag: "系统调优", bgImage: "/taobaoshangou.jpg", icon: MapPin, desc: "主导饿了么下沉市场智能调度系统覆盖率从30%提升至98%，提升平台整体配送效率和履约质量。", detail: "该项目为公司战略级项目，作为业务方主导，产研和算法团队紧密配合，通过系统赋能与宣讲培训，帮助全国 1800 个城市代理商实现降本增效。" },
    { title: "一条艺术电商平台", tag: "电商运营", bgImage: "/yitiao.JPG", icon: Palette, desc: "从0-1搭建艺术品电商平台，构建从艺术家到艺术作品的完整知识体系，降低消费者线上购买门槛。", detail: "负责艺术电商平台产品运营，运营艺术品线上展厅、直播、拍卖、线上销售板块的产品规划与内容生态建设；同艺术品BD、内容编辑团队共同搭建从艺术家到艺术作品的完整基础知识体系，降低艺术品消费者线上购买门槛。" },
    { title: "携程直播青训营", tag: "校企合作", bgImage: "/qingxunying.jpg", icon: Video, desc: "通过搭建视频号直播矩阵，6个月实现项目收入从0到4000万的突破，累计孵化200+学员，获集团Superhero称号。", detail: "负责该项目前期的孵化与规模建设，主导校企合作方案、商务拓展、学员培训、运营策略等全链路落地。具备单场百万直播GMV操盘及个人直播带货能力。" }
  ],
  aiLab: [
    { title: "向往的offer", tag: "AI Agent", desc: "基于大语言模型开发的 AI 面试助手，帮助求职者快速提升面试表现与职业规划。", bgColor: "bg-[#F3F4F6]", media: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" },
    { title: "婴幼儿AI服务产品", tag: "AI Product", desc: "结合多模态交互、AI硬件技术，为婴幼儿提供情感陪伴与早教互动场景。", bgColor: "bg-[#EEF2FF]", media: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif" },
    { title: "AI虚拟形象直播", tag: "Live Stream", desc: "重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低企业直播成本。", bgColor: "bg-[#FEF2F2]", media: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif" }
  ]
};

const skillIcons = [TrendingUp, Cpu, Lightbulb, Rocket];
const projIcons = [MapPin, Palette, Video, Folder];

export default function App() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isWeChatOpen, setIsWeChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showUndergrad, setShowUndergrad] = useState(false);
  
  const [data, setData] = useState(FULL_FALLBACK);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    fetch('/api/notion')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setData(prev => ({
            skills: resData.data.skills?.length > 0 ? resData.data.skills.map((s:any, i:number) => ({...s, icon: skillIcons[i%4]})) : prev.skills,
            timeline: resData.data.timeline?.length > 0 ? resData.data.timeline : prev.timeline,
            projects: resData.data.projects?.length > 0 ? resData.data.projects.map((p:any, i:number) => ({...p, icon: projIcons[i%4]})) : prev.projects,
            aiLab: resData.data.aiLab?.length > 0 ? resData.data.aiLab : prev.aiLab,
          }));
        }
      })
      .catch(() => console.log("加载保底数据中..."));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const desktopTimeline = [...data.timeline].sort((a, b) => {
    const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
    return yearA - yearB;
  });

  const mobileTimeline = [...data.timeline].sort((a, b) => {
    const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
    return yearB - yearA;
  });

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-rust selection:text-white overflow-x-hidden bg-[#F8F9FB]">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rust origin-left z-[1000]" style={{ scaleX }} />
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#F8F9FB]/90 backdrop-blur-md border-b border-ink/5 py-2' : 'py-6'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative z-50 bg-transparent">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display font-black text-2xl tracking-tighter">
            wenying<span className="text-rust">.website</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-2">
            <NavItem zh="关于我" en="About Me" href="#about" icon={User} />
            <NavItem zh="核心技能" en="Core Skills" href="#skills" icon={Star} />
            <NavItem zh="个人经历" en="Experience" href="#experience" icon={Briefcase} />
            <NavItem zh="项目经历" en="Projects" href="#projects" icon={Folder} />
            <NavItem zh="AI 实验室" en="AI Lab" href="#ai-lab" icon={Sparkles} />
          </div>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-ink hover:text-rust transition-colors relative z-50">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-ink/10 shadow-2xl md:hidden flex flex-col py-2 px-6 z-40"
            >
              {[
                { zh: "关于我", en: "About Me", href: "#about", icon: User },
                { zh: "核心技能", en: "Core Skills", href: "#skills", icon: Star },
                { zh: "个人经历", en: "Experience", href: "#experience", icon: Briefcase },
                { zh: "项目经历", en: "Projects", href: "#projects", icon: Folder },
                { zh: "AI 实验室", en: "AI Lab", href: "#ai-lab", icon: Sparkles }
              ].map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-ink/80 hover:text-rust font-bold text-sm py-4 border-b border-ink/5 last:border-0 group"
                >
                  <link.icon size={18} className="text-rust/70 group-hover:text-rust transition-colors" />
                  <span>{link.zh}</span>
                  <span className="text-[10px] text-ink/30 uppercase tracking-widest ml-auto">{link.en}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.div style={{ y: parallaxY }} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[15%] right-[-10%] w-[40vw] h-[40vw] bg-rust/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[30vw] h-[30vw] bg-ink/5 rotate-45 blur-[80px]" />
      </motion.div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
        
        <section id="about" className="relative flex flex-col items-center justify-center pt-24 pb-4 overflow-hidden mb-12">
          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-40 md:w-48 aspect-[3/4] z-10 mb-8 mt-12"
            >
              <img 
                src="/touxiang-1.png" 
                alt="Jodie Zhu" 
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] pointer-events-none relative z-10" 
              />
              <div className="absolute inset-0 bg-rust/10 rounded-full blur-[60px] pointer-events-none z-0" />
              
              <BreathingTag text="创新业务先锋 🚀" delay={0.2} className="top-[10%] -left-[70%] md:-left-[90%]" />
              <BreathingTag text="0-1项目建设者 🧱" delay={0.5} className="top-[45%] -left-[80%] md:-left-[100%]" />
              <BreathingTag text="10年运营经验 💼" delay={2.1} className="top-[80%] -left-[60%] md:-left-[80%]" />

              <BreathingTag text="AI工具重度用户 🛠️" delay={1.2} className="top-[15%] -right-[60%] md:-right-[80%]" />
              <BreathingTag text="校企合作直播培训讲师 🏫" delay={1.5} className="top-[50%] -right-[70%] md:-right-[100%]" />
              <BreathingTag text="做过主播，累计带货500万+ 💰" delay={0.8} className="top-[85%] -right-[50%] md:-right-[70%]" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-rust tracking-tighter uppercase mb-6 text-center"
            >
              ZHU WENYING
            </motion.h1>
            
            <p className="text-xs md:text-[14px] text-ink/70 font-medium leading-relaxed mb-10 max-w-2xl text-center px-4">
              9年互联网运营和产品经验、1年创业项目经验。深耕互联网行业多年，擅长从 0 到 1 搭建业务体系与合作伙伴赋能。持续研究AI与业务场景深度融合的解决方案，探索AI Agent、自动化工作流及人机协同的商业化机会。
            </p>

            <div className="flex flex-row items-center justify-center gap-3 w-full px-4 sm:px-0">
              <a href="mailto:zwy0025@gmail.com" className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white border border-ink/10 text-ink py-3.5 rounded-full font-bold text-[11px] sm:text-[12px] tracking-widest hover:border-rust hover:text-rust transition-all shadow-sm sm:w-44 whitespace-nowrap">
                <Mail size={16} /> 发送邮件
              </a>
              <button onClick={() => setIsWeChatOpen(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-ink text-white py-3.5 rounded-full font-bold text-[11px] sm:text-[12px] tracking-widest hover:bg-rust transition-all shadow-xl sm:w-44 whitespace-nowrap">
                <QrCode size={16} /> 添加微信
              </button>
            </div>
            
          </div>
        </section>

        <section id="skills" className="mb-24">
          <SectionHeader zh="核心技能" en="Core Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skills.map((s:any, idx:number) => (
              <SkillCard key={idx} title={s.title} dataDesc={s.desc} icon={s.icon || skillIcons[idx%4]} />
            ))}
          </div>
        </section>

        <section id="experience" className="mb-24">
          <SectionHeader zh="个人经历" en="Experience" />
          
          <div className="w-full hidden md:block">
            <div 
              className="relative w-full h-[400px] mb-4 overflow-visible cursor-default transition-all"
              onClick={() => setSelectedProject(null)} 
            >
              <ExperienceCurve items={desktopTimeline} />
            </div>
          </div>

          <div className="md:hidden mt-8">
            <h3 className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-10 flex items-center gap-2"><Briefcase size={14} className="text-rust"/> 个人履历</h3>
            <div className="relative pl-2 border-l-2 border-rust/10 ml-2">
              {mobileTimeline.map((item:any, idx:number) => {
                const isUndergrad = item.company.includes('本科') || item.title.includes('本科');
                if (isUndergrad) return null; 
                return <TimelineItem key={idx} {...item} />;
              })}

              {mobileTimeline.filter((i:any) => i.company.includes('本科') || i.title.includes('本科')).map((item:any, idx:number) => (
                <div key={`ug-${idx}`} className="relative">
                  <div 
                    className="relative -left-[2.5px] -mt-6 mb-6 z-20 opacity-40 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2 w-fit group" 
                    onClick={() => setShowUndergrad(!showUndergrad)}
                  >
                    <div className={`w-[7px] h-[7px] rounded-full ${showUndergrad ? 'bg-rust' : 'bg-ink/30'} group-hover:bg-rust transition-colors`} />
                    <span className="text-[10px] text-ink/40 tracking-widest uppercase origin-left">
                      {showUndergrad ? '收起早期经历' : '查看更早经历...'}
                    </span>
                  </div>
                  <AnimatePresence>
                    {showUndergrad && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden relative"
                      >
                         <TimelineItem {...item} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mb-24">
          <SectionHeader zh="项目经历" en="Projects" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.projects.map((p:any, idx:number) => (
              <ProjectCard key={idx} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
          <ProjectModal project={selectedProject?.bgImage ? selectedProject : null} onClose={() => setSelectedProject(null)} />
        </section>
        
        <section id="ai-lab" className="mb-24">
          <SectionHeader zh="AI 实验室" en="AI Lab" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8">
             {data.aiLab.map((item:any, idx:number) => (
              <AILabCard 
                key={idx}
                tag={item.tag} 
                title={item.title} 
                bgColor={item.bgColor || ["bg-[#F3F4F6]", "bg-[#EEF2FF]", "bg-[#FEF2F2]"][idx % 3]}
                desc={item.desc} 
                mockup={<VideoMockup src={item.media} fallbackImg="" rotateClass={idx % 2 === 0 ? "-rotate-3" : "rotate-2"} />} 
              />
            ))}
          </div>
        </section>

        <footer className="pt-20 pb-12 border-t border-ink/10 flex flex-col items-center">
          <motion.button whileHover={{ y: -5 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mb-12 flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:border-rust transition-colors">
              <ArrowUpRight className="rotate-[-135deg] text-ink/40 group-hover:text-rust transition-colors" size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 group-hover:text-rust transition-colors">Back to Top</span>
          </motion.button>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-display font-black text-2xl tracking-tighter mb-2">wenying<span className="text-rust">.website</span></h2>
              <p className="text-ink/30 text-[10px] uppercase tracking-[0.3em]">Building Business with AI © 2026</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a href="mailto:zwy0025@gmail.com" className="flex items-center justify-center gap-2 bg-white border border-ink/10 text-ink px-6 py-2.5 rounded-full font-bold text-[11px] tracking-widest hover:border-rust hover:text-rust transition-all shadow-sm">
                <Mail size={14} /> 邮件联系
              </a>
              <button onClick={() => setIsWeChatOpen(true)} className="flex items-center justify-center gap-2 bg-ink text-white px-6 py-2.5 rounded-full font-bold text-[11px] tracking-widest hover:bg-rust transition-all shadow-md">
                <QrCode size={14} /> 添加微信
              </button>
            </div>
          </div>
        </footer>

      </main>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsFaqOpen(!isFaqOpen)} className="w-14 h-14 bg-rust/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(179,58,45,0.4)] relative group border border-white/20 p-1">
          <div className="w-full h-full rounded-full relative z-10 overflow-hidden border border-white/50">
            {isFaqOpen ? <div className="w-full h-full bg-rust/20 flex items-center justify-center"><X size={18} /></div> : (
              <>
                <img src="/fenshen-4.jpg" className="w-full h-full object-cover scale-[1.3] translate-y-0" alt="Avatar" />
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
