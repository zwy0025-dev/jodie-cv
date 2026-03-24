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
  User,
  Star,
  Briefcase,
  Folder,
  Sparkles,
  ArrowUpRight // <-- 就是这里！把它补回来了
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

const FloatingTag = ({ text, className, delay }: { text: string, className: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    animate={{ y: [0, -10, 0] }}
    transition={{ 
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay },
      opacity: { duration: 0.5, delay: delay * 0.5 }
    }}
    className={`absolute z-20 px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/50 backdrop-blur-sm ${className}`}
  >
    <span className="font-bold tracking-tight">{text}</span>
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

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => (
  <AnimatePresence>
    {project && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }} className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="h-48 md:h-64 relative w-full flex-shrink-0">
            <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md transition-colors"><X size={20} /></button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/90 text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/10 mb-3 inline-block">{project.tag}</span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{project.title}</h3>
            </div>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto bg-[#F8F9FB]">
            <div className="mb-6">
              <h4 className="text-xs font-bold text-rust uppercase tracking-widest mb-2 flex items-center gap-2"><Star size={14}/> 项目简介</h4>
              <p
