import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qetdbotejknyftzahpjd.supabase.co",
  "sb_publishable_LNm9r3lemCIPQNa8b1xMKA_GpHwB3x1"
);
const USER_ID = "nick3rson";

const ctfSubSections = [
  {
    id: "ctf_web", title: "Web Exploitation", emoji: "🌐", color: "#ef4444",
    topics: [
      { id: "cw1", text: "HTTP Methods — GET, POST, PUT, DELETE, OPTIONS" },
      { id: "cw2", text: "Burp Suite — Intercept, Repeater, Intruder, Decoder" },
      { id: "cw3", text: "SQL Injection — UNION, Blind, Error-based, Time-based" },
      { id: "cw4", text: "XSS — Reflected, Stored, DOM-based, bypass filter" },
      { id: "cw5", text: "CSRF — SameSite, token bypass" },
      { id: "cw6", text: "LFI / RFI — Path traversal, null byte, wrapper" },
      { id: "cw7", text: "IDOR — เข้าถึง resource คนอื่นผ่าน ID" },
      { id: "cw8", text: "SSRF — ดึง internal service ผ่านเซิร์ฟเวอร์" },
      { id: "cw9", text: "JWT — decode, alg:none, secret brute force" },
      { id: "cw10", text: "Command Injection — ;, &&, |, backtick" },
      { id: "cw11", text: "File Upload Bypass — MIME, extension, magic bytes" },
      { id: "cw12", text: "PortSwigger Web Academy — ทำ Lab ครบทุกหมวด" },
      { id: "cw13", text: "PicoCTF Web — ทำให้ได้ Medium ทุกข้อ" },
    ],
  },
  {
    id: "ctf_crypto", title: "Cryptography", emoji: "🔑", color: "#a855f7",
    topics: [
      { id: "cc1", text: "Encoding — Base64, Base32, Base58, Hex, Binary" },
      { id: "cc2", text: "Classic Cipher — Caesar, ROT13, Vigenere, Substitution" },
      { id: "cc3", text: "XOR Cipher — single byte, multi-byte, known plaintext" },
      { id: "cc4", text: "Hash — MD5, SHA1, SHA256, crack ด้วย hashcat/john" },
      { id: "cc5", text: "RSA พื้นฐาน — n, e, d, phi, small e attack" },
      { id: "cc6", text: "RSA กลาง — common modulus, wiener, factorization" },
      { id: "cc7", text: "AES — ECB mode, padding oracle attack" },
      { id: "cc8", text: "CyberChef — ใช้ได้คล่องทุก operation" },
      { id: "cc9", text: "เขียน Python script crack cipher อัตโนมัติ" },
      { id: "cc10", text: "PicoCTF Crypto — ทำให้ได้ Medium ทุกข้อ" },
    ],
  },
  {
    id: "ctf_forensics", title: "Forensics", emoji: "🔍", color: "#06b6d4",
    topics: [
      { id: "cf1", text: "File Analysis — file, strings, xxd, binwalk, exiftool" },
      { id: "cf2", text: "Steganography — steghide, zsteg, stegsolve, LSB" },
      { id: "cf3", text: "Image Forensics — metadata, hidden data, pixel analysis" },
      { id: "cf4", text: "Wireshark — filter, follow stream, export objects" },
      { id: "cf5", text: "Network Forensics — pcap analysis, HTTP/DNS/FTP stream" },
      { id: "cf6", text: "Memory Forensics — Volatility พื้นฐาน" },
      { id: "cf7", text: "Disk Forensics — Autopsy, file carving" },
      { id: "cf8", text: "Archive — zip password crack, tar, 7z" },
      { id: "cf9", text: "PicoCTF Forensics — ทำให้ได้ Medium ทุกข้อ" },
    ],
  },
  {
    id: "ctf_pwn", title: "Pwn / Binary", emoji: "💥", color: "#f97316",
    topics: [
      { id: "cp1", text: "x86/x64 Assembly พื้นฐาน — registers, instructions" },
      { id: "cp2", text: "GDB / pwndbg — breakpoint, examine memory, step" },
      { id: "cp3", text: "Stack Layout — EBP, ESP, return address" },
      { id: "cp4", text: "Buffer Overflow พื้นฐาน — overwrite return address" },
      { id: "cp5", text: "ret2win — หา offset, overwrite RIP" },
      { id: "cp6", text: "Python pwntools — process, remote, pack/unpack" },
      { id: "cp7", text: "PLT/GOT — dynamic linking, function address" },
      { id: "cp8", text: "ROP Chains พื้นฐาน — gadgets, ropper/ROPgadget" },
      { id: "cp9", text: "Format String Bug — %x, %n, arbitrary read/write" },
      { id: "cp10", text: "PicoCTF Pwn — ทำให้ได้ Easy ทุกข้อ" },
    ],
  },
  {
    id: "ctf_rev", title: "Reverse Engineering", emoji: "⚙️", color: "#22c55e",
    topics: [
      { id: "cr1", text: "Binary Analysis — file, strings, ltrace, strace" },
      { id: "cr2", text: "Ghidra — decompile, rename, analyze function" },
      { id: "cr3", text: "IDA Free — disassemble, graph view" },
      { id: "cr4", text: "GDB — dynamic analysis ขณะโปรแกรมรัน" },
      { id: "cr5", text: "Reverse C code — เข้าใจ if/loop/function จาก asm" },
      { id: "cr6", text: "Crackme — แก้ password check, license validation" },
      { id: "cr7", text: "Anti-debug bypass — ptrace, timing check" },
      { id: "cr8", text: "Python bytecode — dis module, .pyc decompile" },
      { id: "cr9", text: "PicoCTF Reverse — ทำให้ได้ Medium ทุกข้อ" },
    ],
  },
  {
    id: "ctf_osint", title: "OSINT & Network", emoji: "🌍", color: "#eab308",
    topics: [
      { id: "co1", text: "Google Dorking — site:, filetype:, inurl:, intitle:" },
      { id: "co2", text: "Reverse Image Search — Google, TinEye, Yandex" },
      { id: "co3", text: "WHOIS, DNS lookup, Shodan, Censys" },
      { id: "co4", text: "Wayback Machine — หา historical content" },
      { id: "co5", text: "Social Media OSINT — username search, metadata" },
      { id: "co6", text: "Geolocation — หาที่จากรูป, shadow analysis" },
      { id: "co7", text: "Network — Nmap scan, port enumeration" },
      { id: "co8", text: "Network — Netcat, banner grabbing" },
      { id: "co9", text: "Packet Analysis — pcap, tcpdump, tshark" },
      { id: "co10", text: "PicoCTF OSINT + Network — ทำให้ได้ทุกข้อ" },
    ],
  },
];

const curriculum = [
  {
    id: "python1", phase: "Phase 1 · มี.ค.", title: "Python — Refresh & ต่อยอด",
    emoji: "🐍", color: "#3b82f6", bg: "#1e3a5f",
    topics: [
      { id: "py1", text: "ทบทวน List Comprehension, Lambda, Map/Filter" },
      { id: "py2", text: "String — format, split, join, strip, replace" },
      { id: "py3", text: "Dict & Set — methods ครบทุกตัว" },
      { id: "py4", text: "File I/O — อ่าน/เขียน txt, csv, json" },
      { id: "py5", text: "Exception Handling — try/except/finally/raise" },
      { id: "py6", text: "Modules — os, sys, re, math, random" },
      { id: "py7", text: "Regular Expression (re) — หา pattern ใน string" },
      { id: "py8", text: "เขียน Script ถอดรหัส Base64, Caesar, ROT13" },
      { id: "py9", text: "เขียน Script อ่านไฟล์ + ประมวลผล + output" },
    ],
  },
  {
    id: "python2", phase: "Phase 1 · มี.ค.", title: "Python — OOP & Algorithm",
    emoji: "🐍", color: "#60a5fa", bg: "#172554",
    topics: [
      { id: "py10", text: "OOP — Class, Object, __init__, self" },
      { id: "py11", text: "OOP — Inheritance, Polymorphism, Encapsulation" },
      { id: "py12", text: "OOP — Magic Methods (__str__, __len__, __eq__)" },
      { id: "py13", text: "Recursion — Factorial, Fibonacci, Tower of Hanoi" },
      { id: "py14", text: "Sorting — Bubble, Selection, Merge, Quick Sort" },
      { id: "py15", text: "Searching — Binary Search, BFS, DFS" },
      { id: "py16", text: "Stack, Queue, Linked List ด้วย Python" },
      { id: "py17", text: "Dynamic Programming พื้นฐาน (TOI A3 เตรียม)" },
      { id: "py18", text: "Library — requests (HTTP), json, subprocess" },
      { id: "py19", text: "เขียน CTF Script — Brute force, Hash crack" },
    ],
  },
  {
    id: "web1", phase: "Phase 2 · มี.ค.-เม.ย.", title: "HTML & CSS — Refresh ระดับสูงขึ้น",
    emoji: "🎨", color: "#f59e0b", bg: "#3d2800",
    topics: [
      { id: "w1", text: "HTML5 Semantic Tags — header, nav, section, article, footer" },
      { id: "w2", text: "HTML Forms — input types, validation, accessibility" },
      { id: "w3", text: "CSS Flexbox — ครบทุก property จนชำนาญ" },
      { id: "w4", text: "CSS Grid — template-areas, auto-fill, minmax" },
      { id: "w5", text: "CSS Animation — transition, keyframes, transform" },
      { id: "w6", text: "CSS Variables (--custom-property) + Dark Mode" },
      { id: "w7", text: "Responsive Design — media queries, mobile-first" },
      { id: "w8", text: "CSS ขั้นสูง — pseudo-elements, calc(), clamp()" },
      { id: "w9", text: "ทำ Landing Page สวยๆ โดยไม่ใช้ Bootstrap" },
    ],
  },
  {
    id: "web2", phase: "Phase 2 · มี.ค.-เม.ย.", title: "JavaScript — เริ่มใหม่อย่างจริงจัง",
    emoji: "⚡", color: "#fbbf24", bg: "#2d1f00",
    topics: [
      { id: "js1", text: "var vs let vs const — scope, hoisting" },
      { id: "js2", text: "Functions — declaration, expression, arrow function" },
      { id: "js3", text: "Array methods — map, filter, reduce, find, forEach" },
      { id: "js4", text: "Object — destructuring, spread, rest operator" },
      { id: "js5", text: "DOM — querySelector, createElement, innerHTML" },
      { id: "js6", text: "Events — addEventListener, event object, bubbling" },
      { id: "js7", text: "Async JS — callback, Promise, async/await" },
      { id: "js8", text: "Fetch API — GET/POST, JSON parse, error handling" },
      { id: "js9", text: "ES6+ — template literal, optional chaining, nullish" },
      { id: "js10", text: "localStorage / sessionStorage" },
      { id: "js11", text: "HTTP — Status Code, Headers, CORS พื้นฐาน" },
      { id: "js12", text: "Browser DevTools — Network tab, Console, Debugger" },
      { id: "js13", text: "Project: Weather App ดึง API จริงๆ" },
    ],
  },
  {
    id: "react", phase: "Phase 4 · พ.ค.", title: "React + Node.js",
    emoji: "⚛️", color: "#22c55e", bg: "#003d1a",
    topics: [
      { id: "r1", text: "React — Component, JSX" },
      { id: "r2", text: "React — Props & State (useState)" },
      { id: "r3", text: "React — useEffect, Lifecycle" },
      { id: "r4", text: "React — React Router (หลายหน้า)" },
      { id: "r5", text: "Node.js — พื้นฐาน, npm" },
      { id: "r6", text: "Express.js — สร้าง API ง่ายๆ" },
      { id: "r7", text: "REST API — GET, POST, PUT, DELETE" },
      { id: "r8", text: "เชื่อม Frontend React + Backend Node" },
      { id: "r9", text: "Database พื้นฐาน — MySQL หรือ SQLite" },
    ],
  },
  {
    id: "bonus", phase: "ทำตลอด · มี.ค.-พ.ค.", title: "เครื่องมือ & อื่นๆ",
    emoji: "🎯", color: "#a855f7", bg: "#2d003d",
    topics: [
      { id: "b0", text: "✅ Certificate Red Team — DropCTF (มีแล้ว!)" },
      { id: "b1", text: "HackTheBox — Linux Fundamental (ทำต่อ)" },
      { id: "b4", text: "Git & GitHub พื้นฐาน" },
      { id: "b5", text: "สร้าง GitHub Profile ไว้โชว์ผลงาน" },
    ],
  },
  {
    id: "port1", phase: "Portfolio · พ.ค.-ส.ค.", title: "สะสมผลงาน (เทอม 1 ม.6)",
    emoji: "📁", color: "#06b6d4", bg: "#002d3d",
    topics: [
      { id: "p1", text: "ทำ Web Project อย่างน้อย 1 อัน ขึ้น GitHub" },
      { id: "p2", text: "เข้าแข่ง CTF อย่างน้อย 1 รายการ" },
      { id: "p3", text: "เก็บ Certificate จาก CS50P (Harvard)" },
      { id: "p4", text: "เก็บ Certificate จาก TryHackMe" },
      { id: "p5", text: "เขียน Write-up โจทย์ CTF ที่แก้ได้" },
      { id: "p6", text: "ทำ GitHub ให้ Active มี Commit สม่ำเสมอ" },
      { id: "p7", text: "ทำระบบ Login + Database (Full Stack)" },
    ],
  },
  {
    id: "port2", phase: "Portfolio · ก.ย.-ต.ค.", title: "สร้างเว็บ Portfolio (React)",
    emoji: "✨", color: "#f97316", bg: "#3d1500",
    topics: [
      { id: "pp1", text: "หน้า Hero — ชื่อ + รูป + ปุ่ม GitHub" },
      { id: "pp2", text: "หน้า About Me — แนะนำตัว + ทักษะ" },
      { id: "pp3", text: "หน้า Experience — ใส่ผลการแข่งขันทั้งหมด" },
      { id: "pp4", text: "หน้า Projects — รูป + code + เทคโนโลยี" },
      { id: "pp5", text: "หน้า Certificates — รูปใบเซอร์แต่ละใบ" },
      { id: "pp6", text: "หน้า Contact — Email + GitHub + Form" },
      { id: "pp7", text: "โฮสขึ้น Vercel ได้ลิงก์จริง" },
    ],
  },
  {
    id: "port2b", phase: "Portfolio · ก.ย.-ต.ค.", title: "สร้าง PDF Portfolio (ยื่นมหาลัย)",
    emoji: "📄", color: "#eab308", bg: "#2d2500",
    topics: [
      { id: "pd1", text: "หน้าปก — ชื่อ + รูปชุดนักเรียน + คณะที่สมัคร" },
      { id: "pd2", text: "หน้าแนะนำตัว + เป้าหมาย + Essay ทำไมอยากเรียน CS" },
      { id: "pd3", text: "หน้าผลการเรียน GPAX 3.50+" },
      { id: "pd4", text: "หน้าผลงานแข่งขัน — Cyber Top Talent, DEPA, Robotic, ICT, ศิลปหัตถกรรม" },
      { id: "pd5", text: "หน้า Projects — Screenshot + อธิบาย + QR Code GitHub" },
      { id: "pd6", text: "หน้า Certificates — รูปใบเซอร์ทั้งหมด" },
      { id: "pd7", text: "หน้าทักษะ — C, Python, JS, Git, Linux, CTF Tools" },
      { id: "pd8", text: "ใส่ QR Code ลิงก์ไปเว็บ Portfolio ในหน้าสุดท้าย" },
    ],
  },
  {
    id: "port3", phase: "Portfolio · พ.ย.-ธ.ค.", title: "ยื่น TCAS รอบ 1",
    emoji: "🎓", color: "#ec4899", bg: "#3d0028",
    topics: [
      { id: "pt1", text: "ตรวจสอบเงื่อนไข KMITL / KMUTNB อีกครั้ง" },
      { id: "pt2", text: "ขัดเกลา Portfolio ให้สมบูรณ์" },
      { id: "pt3", text: "ให้อาจารย์หรือพี่รีวิว Portfolio" },
      { id: "pt4", text: "ส่งสมัคร TCAS รอบ 1 ✅" },
    ],
  },
];

const groups = [
  { label: "🚀 ก่อนเปิดเทอม (มี.ค. — พ.ค.)", ids: ["python1", "python2", "web1", "web2", "ctf_master", "react", "bonus"] },
  { label: "📁 สะสม Portfolio (พ.ค. — ธ.ค.)", ids: ["port1", "port2", "port2b", "port3"] },
];

export default function App() {
  const [checked, setChecked] = useState({});
  const [open, setOpen] = useState({ python1: true });
  const [ctfOpen, setCtfOpen] = useState({});
  const [ctfExpanded, setCtfExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("todo_progress")
          .select("checked")
          .eq("user_id", USER_ID)
          .single();
        if (data?.checked) setChecked(data.checked);
      } catch {}
      setLoaded(true);
    })();
  }, []);

  // Save to Supabase on change
  useEffect(() => {
    if (!loaded) return;
    setSyncing(true);
    const timer = setTimeout(async () => {
      try {
        await supabase
          .from("todo_progress")
          .upsert({ user_id: USER_ID, checked }, { onConflict: "user_id" });
      } catch {}
      setSyncing(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [checked, loaded]);

  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const toggleSection = (id) => setOpen((p) => ({ ...p, [id]: !p[id] }));
  const toggleCtfSub = (id) => setCtfOpen((p) => ({ ...p, [id]: !p[id] }));

  const progress = (topics) => {
    const done = topics.filter((t) => checked[t.id]).length;
    return { done, total: topics.length, pct: Math.round((done / topics.length) * 100) };
  };

  const allCtfTopics = ctfSubSections.flatMap(s => s.topics);
  const ctfDone = allCtfTopics.filter(t => checked[t.id]).length;
  const ctfTotal = allCtfTopics.length;
  const ctfPct = Math.round((ctfDone / ctfTotal) * 100);

  const allTopics = [...curriculum.flatMap(c => c.topics), ...allCtfTopics];
  const totalDone = allTopics.filter(t => checked[t.id]).length;
  const totalAll = allTopics.length;
  const totalPct = Math.round((totalDone / totalAll) * 100);

  const renderSection = (section) => {
    const { done, total, pct } = progress(section.topics);
    const isOpen = open[section.id];
    return (
      <div key={section.id} style={{ background: "#111118", border: `1px solid ${isOpen ? section.color + "44" : "#1e293b"}`, borderRadius: 16, marginBottom: 10, overflow: "hidden", transition: "border-color 0.3s" }}>
        <div onClick={() => toggleSection(section.id)} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: isOpen ? section.bg + "66" : "transparent", transition: "background 0.3s" }}>
          <span style={{ fontSize: 20 }}>{section.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: section.color, background: section.color + "22", padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap" }}>{section.phase}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{section.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: section.color, borderRadius: 99, transition: "width 0.3s" }} />
              </div>
              <span style={{ fontSize: 11, color: "#64748b", minWidth: 36 }}>{done}/{total}</span>
            </div>
          </div>
          <span style={{ color: "#475569", fontSize: 16, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▾</span>
        </div>
        {isOpen && (
          <div style={{ padding: "4px 18px 14px" }}>
            {section.topics.map((topic) => (
              <div key={topic.id} onClick={() => toggle(topic.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 10, cursor: "pointer", marginBottom: 3, background: checked[topic.id] ? section.color + "11" : "transparent", transition: "background 0.2s" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked[topic.id] ? section.color : "#334155"}`, background: checked[topic.id] ? section.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {checked[topic.id] && <span style={{ fontSize: 12, color: "#fff", fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: 14, color: checked[topic.id] ? "#64748b" : "#cbd5e1", textDecoration: checked[topic.id] ? "line-through" : "none", transition: "all 0.2s" }}>{topic.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCtfMaster = () => (
    <div style={{ background: "#111118", border: `1px solid ${ctfExpanded ? "#ef444444" : "#1e293b"}`, borderRadius: 16, marginBottom: 10, overflow: "hidden" }}>
      {/* CTF Master Header */}
      <div onClick={() => setCtfExpanded(p => !p)} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: ctfExpanded ? "#3d000066" : "transparent", transition: "background 0.3s" }}>
        <span style={{ fontSize: 20 }}>🔐</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", background: "#ef444422", padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap" }}>Phase 3 · เม.ย.-มิ.ย.</span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>CTF & Cybersecurity</span>
            <span style={{ fontSize: 10, color: "#64748b", background: "#1e293b", padding: "2px 6px", borderRadius: 99 }}>6 หมวด</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${ctfPct}%`, background: "linear-gradient(90deg, #ef4444, #a855f7)", borderRadius: 99, transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: 11, color: "#64748b", minWidth: 36 }}>{ctfDone}/{ctfTotal}</span>
          </div>
        </div>
        <span style={{ color: "#475569", fontSize: 16, transform: ctfExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▾</span>
      </div>

      {/* CTF Sub-sections */}
      {ctfExpanded && (
        <div style={{ padding: "4px 12px 12px" }}>
          {ctfSubSections.map((sub) => {
            const { done, total, pct } = progress(sub.topics);
            const isOpen = ctfOpen[sub.id];
            return (
              <div key={sub.id} style={{ background: "#0d0d14", border: `1px solid ${isOpen ? sub.color + "44" : "#1e293b"}`, borderRadius: 12, marginBottom: 8, overflow: "hidden" }}>
                <div onClick={() => toggleCtfSub(sub.id)} style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: isOpen ? sub.color + "11" : "transparent" }}>
                  <span style={{ fontSize: 16 }}>{sub.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: sub.color }}>{sub.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 3, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: sub.color, borderRadius: 99, transition: "width 0.3s" }} />
                      </div>
                      <span style={{ fontSize: 10, color: "#64748b", minWidth: 30 }}>{done}/{total}</span>
                    </div>
                  </div>
                  <span style={{ color: "#475569", fontSize: 14, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▾</span>
                </div>
                {isOpen && (
                  <div style={{ padding: "2px 14px 12px" }}>
                    {sub.topics.map((topic) => (
                      <div key={topic.id} onClick={() => toggle(topic.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: checked[topic.id] ? sub.color + "11" : "transparent" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${checked[topic.id] ? sub.color : "#334155"}`, background: checked[topic.id] ? sub.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {checked[topic.id] && <span style={{ fontSize: 10, color: "#fff", fontWeight: 900 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: checked[topic.id] ? "#64748b" : "#cbd5e1", textDecoration: checked[topic.id] ? "line-through" : "none" }}>{topic.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", width: "100%", boxSizing: "border-box", background: "#0a0a0f", fontFamily: "'Segoe UI', sans-serif", padding: "24px 16px", color: "#e2e8f0", margin: 0 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: "#94a3b8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Roadmap สู่ KMITL / KMUTNB</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#f1f5f9" }}>Full Stack + CTF + Portfolio 🎓</h1>
          <div style={{ marginTop: 20, background: "#161622", borderRadius: 16, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: "#94a3b8" }}>ความคืบหน้าทั้งหมด</span>
              <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{totalDone}/{totalAll} หัวข้อ</span>
            </div>
            <div style={{ height: 8, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${totalPct}%`, background: "linear-gradient(90deg, #3b82f6, #ec4899)", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
            <div style={{ textAlign: "right", marginTop: 6, fontSize: 13, color: "#64748b" }}>{totalPct}% {syncing ? "☁️ กำลังบันทึก..." : loaded ? "✓ ซิงค์แล้ว" : "⏳ กำลังโหลด..."}</div>
          </div>
        </div>

        {groups.map((group) => (
          <div key={group.label} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 10, paddingLeft: 4 }}>{group.label}</div>
            {group.ids.map(id => {
              if (id === "ctf_master") return renderCtfMaster();
              const section = curriculum.find(s => s.id === id);
              return section ? renderSection(section) : null;
            })}
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 8, marginBottom: 32, color: "#334155", fontSize: 12 }}>กด ✓ เมื่อเรียนจบแต่ละหัวข้อ 💪</div>
      </div>
    </div>
  );
}
