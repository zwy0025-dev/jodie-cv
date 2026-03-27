import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Cpu, Lightbulb, Rocket, MessageCircle, X, ChevronRight,
  Menu, Mail, QrCode, ChevronDown, User, Star, Briefcase, Folder, Sparkles, ArrowUpRight,
  MapPin, Palette, Video, GraduationCap 
} from 'lucide-react';

// --- 通用组件 (完全继承 App 5 的精致设计) ---

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
    className={`absolute z-20 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white flex items-center gap-2 whitespace-nowrap ${className}`}
  >
    <div className="w-1.5 h-1.5 rounded-full bg-rust/80" />
    <span className="font-bold text-[11px] tracking-wide text-ink/80">{text}</span>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-ink/20 rounded-full" /> 工作内容</h5>
                  <ul className="space-y-2.5">{details.content.map((item: string, i: number) => (<li key={i} className="text-xs text-ink/70 leading-relaxed relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-ink/20 rounded-full" />{item}</li>))}</ul>
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
    <div className="absolute -top-10 -right-2 w-28 h-36 md:w-32 md:h-40 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 z-20 drop-shadow-xl pointer-events-none">
      {mockup}
    </div>
    <div className="z-10 relative max-w-[65%]">
      <span className="text-[9px] font-black uppercase tracking-widest text-ink/50 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 mb-3 inline-block">{tag}</span>
      <h3 className="text-lg font-bold mb-2 tracking-tight text-ink leading-tight">{title}</h3>
      <p className="text-xs text-ink/60 leading-relaxed font-medium line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const VideoMockup = ({ src, fallbackImg, rotateClass = "rotate-3" }: { src: string, fallbackImg?: string, rotateClass?: string }) => {
  const isGif = src?.toLowerCase().endsWith('.gif');
  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-[4px] border-white/90 bg-white ${rotateClass} transition-transform duration-500`}>
      {isGif ? (
        <img src={src} alt="demo" className="w-full h-full object-cover" />
      ) : (
        <video src={src} poster={fallbackImg} autoPlay loop muted playsInline className="w-full h-full object-cover" />
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

// --- 保底数据 (融合了 App 5 的全部长文案与细节) ---
const FULL_FALLBACK = {
  skills: [
    { title: "平台增长运营经验", icon: TrendingUp, desc: <>3年内推动携程直播平台规模1000万增至<strong className="text-rust font-black text-sm mx-0.5">10亿+</strong>，6个月内推动视频号矩阵直播<strong className="text-rust font-black text-sm mx-0.5">0-4000万</strong>。</> },
    { title: "中后台产品运营", icon: Cpu, desc: <>复杂系统推广培训经验，<strong className="text-ink font-bold">长期与算法、产研、设计、销售、业务团队合作，擅长跨部门协同与商务谈判、资源整合</strong>。</> },
    { title: "业务赋能与项目落地经验", icon: Lightbulb, desc: <><strong className="text-ink font-bold">多次0-1项目落地经验</strong>，具备0-1阶段项目建设→业务体系搭建→规模化增长的全链路操盘能力，擅长业务痛点诊断和赋能</> },
    { title: "复合运营背景与商业思维", icon: Rocket, desc: <>服务过多家互联网企业，参与初创企业运营，能够围绕平台流量、供给与用户特征，<strong className="text-ink font-bold">输出内容营销策略和行业解决方案</strong>。</> }
  ],
  timeline: [
    { type: 'Work', date: "2025.10 - 至今", title: "餐厅合伙人/企业顾问", company: "和牛定食餐厅/予童科技", desc: "BP撰写与融资 / 线上培训课程体系搭建、婴幼儿家庭AI服务产品孵化" },
    { type: 'Work', date: "2021.07 - 2025.07", title: "运营经理", company: "Ctrip 携程", desc: "从0-1搭建携程商家直播生态体系，3年推动平台直播GMV从1000万增至10亿+。", details: { content: ["从 0 到 1 搭建商家直播生态体系","制定直播间运营标准与流量分发策略","负责直播业务的整体增长与商业化变现"], projects: ["携程直播青训营：孵化 0 基础团队","携程 AI 直播：真人+AI 24小时客服直播间"], results: ["3 年推动 GMV 从 1000 万增至 10 亿+","直播间转化率提升 70%+","孵化团队 1 个月直播 GMV 破百万"] } },
    { type: 'Work', date: "2020.05 - 2021.07", title: "产品运营", company: "Yitiao 一条", desc: "0-1艺术电商平台搭建。优化用户注册转化节点，将小程序注册率提升至80%。", details: { content: ["负责艺术电商平台的产品运营与用户增长","优化用户注册与交易转化路径","打通拍卖+直播的闭环交易链路"], projects: ["一条艺术品电商平台：小程序注册转化优化","拍卖+直播交易链路整合"], results: ["小程序注册率从 30% 提升至 80%","成功上线艺术品拍卖直播功能","显著提升高客单价商品转化效率"] } },
    { type: 'Work', date: "2016.09 - 2020.04", title: "产品运营", company: "Ele.me 饿了么", desc: "主导下沉市场智能调度系统覆盖率从30%提升至98%。", details: { content: ["负责下沉市场物流调度系统的产品运营","协调全国 1800 个城市代理商的系统落地","通过数据分析优化配送效率与成本控制"], projects: ["下沉市场智能调度系统覆盖提升项目","代理商降本增效专项行动"], results: ["系统覆盖率从 30% 提升至 98%","帮助全国代理商显著降低运营成本","配送效率提升 25% 以上"] } },
    { type: 'Education', date: "2024.09 - 2027.03", title: "工商管理(MBA)", company: "复旦大学（硕士）", desc: "专注于商业领导力与创新管理。参与 Esade University 交换项目：Leading Innovation。" }
  ],
  projects: [
    { title: "饿了么下沉市场外卖配送提效", tag: "系统调优", bgImage: "/taobaoshangou.jpg", icon: MapPin, desc: "主导饿了么下沉市场智能调度系统覆盖率从30%提升至98%，提升平台整体配送效率和履约质量。", detail: "该项目为公司战略级项目，作为业务方主导，产研和算法团队紧密配合，通过系统赋能与宣讲培训，帮助全国 1800 个城市代理商实现降本增效。" },
    { title: "一条艺术电商平台", tag: "电商运营", bgImage: "/yitiao.JPG", icon: Palette, desc: "从0-1搭建艺术品电商平台，构建从艺术家到艺术作品的完整知识体系，降低消费者线上购买门槛。", detail: "负责艺术电商平台产品运营，运营艺术品线上展厅、直播、拍卖、线上销售板块的产品规划与内容生态建设；同艺术品BD、内容编辑团队共同搭建从艺术家到艺术作品的完整基础知识体系，降低艺术品消费者线上购买门槛。" },
    { title: "携程直播青训营", tag: "校企合作", bgImage: "/qingxunying.jpg", icon: Video, desc: "通过搭建视频号直播矩阵，6个月实现项目收入从0到4000万的突破，累计孵化200+学员，获集团Superhero称号。", detail: "负责该项目前期的孵化与规模建设，主导校企合作方案、商务拓展、学员培训、运营策略等全链路落地。具备单场百万直播GMV操盘及个人直播带货能力。" }
  ],
  aiLab: [
    { title: "向往的offer", tag: "AI Agent", desc: "基于大语言模型开发的 AI 面试助手，帮助求职者快速提升面试表现与职业规划。", bgColor: "bg-[#F3F4F6]", media: "https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" },
    { title: "婴幼儿AI服务产品", tag: "AI Product", desc: "结合多模态交互、AI硬件技术，为婴幼儿提供情感陪伴与早教互动场景。", bgColor: "bg-[#EEF2FF]", media: "/aitoy.mp4" },
    { title: "AI虚拟形象直播", tag: "Live Stream", desc: "重构直播间场景，实现 24 小时无人直播与实时互动，大幅降低企业直播成本。", bgColor: "bg-[#FEF2F2]", media: "/xiaozhang.mp4" }
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
    
    // --- Notion 数据获取逻辑 ---
    // 如果 Notion 获取成功，它会覆盖保底数据。如果 Notion 获取的数据里缺乏 details，
    // 我们在这个前端代码里做了兼容处理，保证页面不出错。
    fetch('/api/notion')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setData(prev => ({
            skills: resData.data.skills?.length > 0 ? resData.data.skills.map((s:any, i:number) => ({...s, icon: skillIcons[i%4]}
