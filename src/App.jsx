import { useState, useEffect, useRef } from "react";

const BERNARD_PHOTO = "/bernard-photo.jpg";


// ─── AI Chatbot Component ───
const AIChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm Bernard's AI assistant. Ask me anything about his background, lecture topics, or the upcoming BSP Berlin / Hamburg sessions. Try: \"What will the lectures cover?\" or \"Tell me about Bernard's career.\"",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const knowledgeBase = {
    lectures: {
      keywords: ["lecture", "topic", "session", "programme", "program", "teach", "cover", "week", "schedule", "class"],
      response: "Bernard's three-day lecture series at BSP in Berlin / Hamburg covers three interconnected themes:\n\n1️⃣ Generative AI in Business & Education — foundations and real-world impact\n2️⃣ From Chatbots to Agents — with a live demo of \"Open Claw\", an autonomous AI agent framework\n3️⃣ AI, Organisations & Human Behaviour — how AI reshapes work, teams, and decision-making\n\nAll sessions are interactive: expect group discussions, live demos, and real-world problem solving.",
    },
    career: {
      keywords: ["career", "background", "experience", "work", "philips", "ceo", "history", "professional", "resume", "cv"],
      response: "Bernard has 30+ years of international leadership experience, mostly with Philips across 4 continents:\n\n🇩🇪 Germany — VP & Head of Product Management, Car Systems Europe (7 years in Wetzlar/Frankfurt)\n🇦🇹 Vienna — Turnaround GM, transforming a loss-making fax division into Europe's #1 player\n🇭🇰 Hong Kong — SVP & GM of the $1B Mobile Audio business\n🇺🇸 Silicon Valley / NYC — EVP Business Development, IP deals with Microsoft, Sony, Samsung & Hollywood\n🇷🇺 Moscow — CEO Philips Russia, scaling to €1B across Russia, Ukraine & Central Asia\n\nToday he's a lecturer at Tio Business School and CEO/founder of Iceland Cream (international skincare brands).",
    },
    ai: {
      keywords: ["ai", "artificial intelligence", "generative", "gpt", "llm", "chatbot", "agent", "technology", "machine learning", "prompt"],
      response: "Bernard combines deep business experience with cutting-edge AI expertise. He completed Vanderbilt University's programme on Prompt Engineering, Innovative Teaching and Advanced Data Analysis in 2024.\n\nAt Tio Business School he teaches Business AI, runs an AI Laboratory where students experiment with LLMs and automation tools, and develops digital leadership competencies. He's particularly focused on the transition from AI experimentation to meaningful practical adoption in organisations — treating AI as a General Purpose Technology that reshapes industries.\n\nHis blog at bernarddonners-ai.nl covers thought leadership on these themes.",
    },
    germany: {
      keywords: ["germany", "german", "deutsch", "berlin", "bsp", "frankfurt", "wetzlar", "vienna", "wien", "austria", "europe"],
      response: "Bernard has deep roots in German-speaking Europe. He spent 7 years in Wetzlar/Frankfurt (1989–1996) leading Philips Car Systems Europe, and 3 years in Vienna (1996–1999) executing one of Philips' most celebrated turnarounds.\n\nHe speaks fluent German and is looking forward to returning to a German academic setting at BSP Berlin. His teaching style bridges international business practice with the kind of applied, interdisciplinary approach that BSP values.",
    },
    education: {
      keywords: ["education", "study", "degree", "university", "qualification", "imd", "insead", "stanford", "vanderbilt", "mba"],
      response: "Bernard's education spans top international institutions:\n\n📚 HTS Elektrotechniek (Venlo) — Engineering foundation\n🎓 IMD Lausanne — Managing Marketing & Sales for Senior Executives\n🏛️ INSEAD Fontainebleau — Strategic Alliances\n🎯 Stanford University — Advanced Negotiations\n🤖 Vanderbilt University (2024) — Prompt Engineering, Innovative Teaching & Advanced Data Analysis\n\nHe speaks Dutch, English, and German fluently, with French and Russian at intermediate level.",
    },
    iceland: {
      keywords: ["iceland", "skincare", "cream", "startup", "founder", "skyn", "allgolden", "entrepreneur", "business"],
      response: "Since 2011, Bernard has been CEO & Co-founder of Iceland Cream, building international skincare brands including skyn ICELAND and AllGolden.\n\nHe developed data-driven digital distribution strategies for Europe, leveraging e-commerce platforms (Amazon, Bol.com) and social media marketing. He successfully launched skyn ICELAND in Russia, scaling it to €1M revenue.\n\nThe American HQ in New York recognized his approach as \"reference class\" for international expansion and digital transformation.",
    },
    hello: {
      keywords: ["hello", "hi", "hey", "good", "morning", "afternoon"],
      response: "Hello! Great to connect. I'm here to tell you all about Bernard Donners and his upcoming guest lectures at BSP Berlin. What would you like to know? You could ask about his lecture topics, career background, AI expertise, or his connection to Germany.",
    },
  };

  const getResponse = (userInput) => {
    const lower = userInput.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const [key, entry] of Object.entries(knowledgeBase)) {
      const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) return bestMatch.response;

    return "That's a great question! While I may not have the specific details on that, I'd recommend reaching out to Bernard directly or exploring his website at bernarddonners-ai.nl. I can tell you about his lecture programme, career history, AI expertise, or his connection to Germany — just ask!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, width: 400, maxHeight: "70vh",
      background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      display: "flex", flexDirection: "column", zIndex: 1000, overflow: "hidden",
      border: "1px solid #e2e8f0", fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #00d2ff, #7b2ff7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🤖</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Ask Bernard's AI</div>
            <div style={{ color: "#94a3b8", fontSize: 11 }}>Powered by AI — a preview of what's coming to BSP</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "#94a3b8", cursor: "pointer",
          fontSize: 20, padding: 4, lineHeight: 1,
        }}>×</button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column",
        gap: 12, maxHeight: "45vh", background: "#f8fafc",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
          }}>
            <div style={{
              background: msg.role === "user"
                ? "linear-gradient(135deg, #1a1a2e, #16213e)"
                : "#fff",
              color: msg.role === "user" ? "#fff" : "#334155",
              padding: "10px 14px", borderRadius: 12, fontSize: 13, lineHeight: 1.6,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              whiteSpace: "pre-line",
              borderBottomRightRadius: msg.role === "user" ? 4 : 12,
              borderBottomLeftRadius: msg.role === "ai" ? 4 : 12,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: "flex-start", maxWidth: "85%" }}>
            <div style={{
              background: "#fff", padding: "10px 14px", borderRadius: 12, fontSize: 13,
              color: "#94a3b8", boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              <span className="typing-dots">Thinking</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div style={{
        padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap",
        borderTop: "1px solid #e2e8f0", background: "#fff",
      }}>
        {["What lectures?", "AI expertise?", "Career history", "Why Germany?"].map((q) => (
          <button key={q} onClick={() => { setInput(q); }}
            style={{
              background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 20,
              padding: "4px 10px", fontSize: 11, cursor: "pointer", color: "#475569",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#e2e8f0"; }}
            onMouseLeave={(e) => { e.target.style.background = "#f1f5f9"; }}
          >{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px", borderTop: "1px solid #e2e8f0", display: "flex", gap: 8,
        background: "#fff",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          style={{
            flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0",
            borderRadius: 8, fontSize: 13, outline: "none",
            fontFamily: "'Inter', sans-serif",
          }}
        />
        <button onClick={handleSend} style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px",
          cursor: "pointer", fontSize: 13, fontWeight: 600,
        }}>Send</button>
      </div>
    </div>
  );
};

// ─── Animated Counter ───
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Main App ───
export default function BSPBerlinMicrosite() {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lectures = [
    {
      day: "Day 1",
      title: "Generative AI in Business & Education",
      icon: "🧠",
      description: "Setting the stage: what generative AI actually is, how it works, and why it matters for business students and future leaders. We'll explore real industry shifts and the concept of AI as a General Purpose Technology.",
      format: "Lecture + group discussion",
    },
    {
      day: "Day 2",
      title: "From Chatbots to Agents",
      icon: "🤖",
      description: "A journey from simple chat interfaces to autonomous AI agents. Includes a live demonstration of 'Open Claw' — an agent framework that can reason, plan, and act. Students will see AI in action, not just in theory.",
      format: "Lecture + live demo + hands-on",
    },
    {
      day: "Day 3",
      title: "AI, Organisations & Human Behaviour",
      icon: "🏢",
      description: "How does AI reshape organisational behaviour, team dynamics, and leadership? Drawing on 30+ years of international management experience — from Philips Russia to Silicon Valley — Bernard explores the human side of technological transformation.",
      format: "Lecture + case study + discussion",
    },
  ];

  const careerTimeline = [
    { year: "1989–1996", role: "VP Product Management, Car Systems Europe", company: "Philips Germany", location: "Wetzlar / Frankfurt", flag: "🇩🇪", highlight: "Launched world's first retail car navigation. Built teams across 12 European countries." },
    { year: "1996–1999", role: "SVP & General Manager, Fax Division", company: "Philips Austria", location: "Vienna", flag: "🇦🇹", highlight: "Turnaround: from #2 on Philips' 'bleeder list' to Europe's #1, with 100%+ ROA." },
    { year: "1999–2000", role: "SVP & GM, Mobile Audio ($1B)", company: "Philips", location: "Hong Kong", flag: "🇭🇰", highlight: "Led $1B global business. Launched Philips internet radio — a first in the industry." },
    { year: "2000–2004", role: "EVP Business Development", company: "Philips North America", location: "Silicon Valley / New York", flag: "🇺🇸", highlight: "IP deals with Microsoft, Sony, Samsung. Led lobbying in Washington. Negotiated with Hollywood and AOL Time Warner." },
    { year: "2004–2008", role: "CEO Philips Russia", company: "Philips", location: "Moscow", flag: "🇷🇺", highlight: "Built the company from a representative office to a €1B operation across Russia, Ukraine & Central Asia." },
    { year: "2011–present", role: "CEO & Co-founder", company: "Iceland Cream", location: "Amsterdam", flag: "🇳🇱", highlight: "Digital transformation of international skincare brands. Recognised by NYC HQ as 'reference class' for global expansion." },
    { year: "2024–present", role: "Lecturer International Business & AI", company: "Tio Business School", location: "Amsterdam", flag: "🇳🇱", highlight: "Teaching AI, International Strategy & Organisational Behaviour. Running an AI Laboratory for students." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: "#1e293b", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes dots { 0% { content: ''; } 25% { content: '.'; } 50% { content: '..'; } 75% { content: '...'; } }

        .typing-dots::after { content: ''; animation: dots 1.5s infinite; }
        .fade-in { animation: fadeInUp 0.8s ease-out forwards; }
        .fade-in-delay-1 { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-delay-2 { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
        .fade-in-delay-3 { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }

        .nav-link { color: #cbd5e1; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }

        .section-title { font-size: 36px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
        .section-subtitle { font-size: 17px; color: #64748b; max-width: 600px; line-height: 1.6; }

        .day-tab { padding: 12px 20px; border: 1px solid #e2e8f0; border-radius: 10px; cursor: pointer; transition: all 0.3s; background: #fff; font-size: 14px; font-weight: 500; color: #64748b; }
        .day-tab:hover { border-color: #1a1a2e; color: #1a1a2e; }
        .day-tab.active { background: #1a1a2e; color: #fff; border-color: #1a1a2e; }

        .timeline-dot { width: 14px; height: 14px; border-radius: 50%; background: #1a1a2e; border: 3px solid #fff; box-shadow: 0 0 0 2px #1a1a2e; }

        .chat-trigger { position: fixed; bottom: 24px; right: 24px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; border: none; cursor: pointer; font-size: 26px; box-shadow: 0 8px 30px rgba(26,26,46,0.4); transition: transform 0.3s, box-shadow 0.3s; display: flex; align-items: center; justify-content: center; z-index: 999; }
        .chat-trigger:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(26,26,46,0.5); }

        .stat-card { text-align: center; padding: 24px; }
        .stat-number { font-size: 42px; font-weight: 800; background: linear-gradient(135deg, #1a1a2e, #7b2ff7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stat-label { font-size: 13px; color: #64748b; margin-top: 4px; font-weight: 500; }

        a { color: #7b2ff7; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* ─── Navigation ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? "rgba(26,26,46,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: scrolled ? "12px 40px" : "20px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #00d2ff, #7b2ff7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>BD</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Bernard Donners</span>
          <span style={{ color: "#64748b", fontSize: 13, marginLeft: 4 }}>× BSP Berlin</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#about" className="nav-link">About</a>
          <a href="#programme" className="nav-link">Programme</a>
          <a href="#career" className="nav-link">Career</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "120px 40px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Animated background elements */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.07 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 300 + i * 100, height: 300 + i * 100,
              borderRadius: "50%",
              border: "1px solid #fff",
              left: `${10 + i * 15}%`, top: `${5 + i * 12}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="fade-in" style={{ marginBottom: 24 }}>
            <span style={{
              display: "inline-block", padding: "6px 16px", borderRadius: 20,
              background: "rgba(123, 47, 247, 0.15)", color: "#a78bfa",
              fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
            }}>
              Guest Lecture Series — June 2026 — Berlin / Hamburg
            </span>
          </div>

          <h1 className="fade-in-delay-1" style={{
            fontSize: 64, fontWeight: 800, color: "#fff",
            lineHeight: 1.1, letterSpacing: -2, marginBottom: 20,
          }}>
            AI, International Business<br />
            <span style={{
              background: "linear-gradient(90deg, #00d2ff, #7b2ff7, #00d2ff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "gradientMove 3s ease infinite",
            }}>& Organisational Behaviour</span>
          </h1>

          <p className="fade-in-delay-2" style={{
            fontSize: 19, color: "#94a3b8", maxWidth: 640, margin: "0 auto 40px",
            lineHeight: 1.7,
          }}>
            Three days of interactive lectures by <strong style={{ color: "#e2e8f0" }}>Bernard Donners</strong> at{" "}
            <strong style={{ color: "#e2e8f0" }}>BSP Business and Law School</strong> in Berlin / Hamburg — exploring how generative AI
            is transforming business, education, and the way we work.
          </p>

          <div className="fade-in-delay-3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#programme" style={{
              display: "inline-block", padding: "14px 32px", borderRadius: 10,
              background: "linear-gradient(135deg, #7b2ff7, #00d2ff)",
              color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none",
              boxShadow: "0 8px 30px rgba(123, 47, 247, 0.3)", transition: "transform 0.2s",
            }}>View Programme</a>
            <button onClick={() => setChatOpen(true)} style={{
              padding: "14px 32px", borderRadius: 10,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer",
              transition: "all 0.2s", backdropFilter: "blur(8px)",
            }}>💬 Ask My AI Assistant</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 60 }}>
            {[
              { n: 30, s: "+", l: "Years International Leadership" },
              { n: 4, s: "", l: "Continents" },
              { n: 5, s: "", l: "Languages" },
              { n: 1, s: "B", l: "Revenue Managed (EUR)" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>
                  {s.n === 1 ? "€" : ""}<Counter end={s.n} suffix={s.s} />
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── School Banner ─── */}
      <section style={{
        background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
        padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
      }}>
        <span style={{ fontSize: 14, color: "#64748b" }}>Hosted by</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>BSP Business and Law School — Hochschule für Management und Recht</span>
        <span style={{ fontSize: 14, color: "#64748b" }}>Siemens Villa, Calandrellistraße 1-9, 12247 Berlin</span>
      </section>

      {/* ─── About ─── */}
      <section id="about" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{
              width: "100%", aspectRatio: "3/4", borderRadius: 16,
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: 40, color: "#fff", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
                {[...Array(20)].map((_, i) => (
                  <div key={i} style={{
                    position: "absolute", fontSize: 14, color: "#fff",
                    left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}>{["AI", "🤖", "💡", "🌍", "📊", "⚡"][i % 6]}</div>
                ))}
              </div>
              <img src={BERNARD_PHOTO} alt="Bernard Donners" style={{
                width: 160, height: 160, borderRadius: "50%", objectFit: "cover",
                border: "3px solid rgba(255,255,255,0.2)", marginBottom: 16, position: "relative",
              }} />
              <div style={{ fontSize: 22, fontWeight: 700, position: "relative" }}>Bernard Donners</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, position: "relative" }}>Lecturer • CEO • AI Practitioner</div>
              <div style={{ display: "flex", gap: 12, marginTop: 20, position: "relative" }}>
                <a href="https://www.linkedin.com/in/bernard-donners-288b0aa/" target="_blank" rel="noopener noreferrer"
                  style={{ padding: "6px 14px", borderRadius: 6, background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                  LinkedIn →
                </a>
                <a href="https://www.bernarddonners-ai.nl" target="_blank" rel="noopener noreferrer"
                  style={{ padding: "6px 14px", borderRadius: 6, background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                  Website →
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="section-title">About Bernard</div>
            <div className="section-subtitle" style={{ maxWidth: "100%", marginBottom: 24 }}>
              Where 30 years of international business leadership meets the AI frontier.
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "#475569" }}>
              <p style={{ marginBottom: 16 }}>
                Bernard Donners is a lecturer at <strong>Tio Business School</strong> (Amsterdam), where he teaches
                International Business, Organisational Behaviour, and AI-related topics. His work focuses on the impact
                of generative AI on learning, creativity, and work — and on how organisations can move from
                experimentation to meaningful, practical adoption.
              </p>
              <p style={{ marginBottom: 16 }}>
                Before entering academia, Bernard spent over three decades in international executive roles at
                <strong> Royal Philips</strong>, leading businesses across <strong>Germany, Austria, Hong Kong, the United States,
                and Russia</strong> — managing operations of up to €1 billion. He is also CEO & co-founder of
                <strong> Iceland Cream</strong>, building international skincare brands through data-driven digital strategies.
              </p>
              <p>
                Bernard holds qualifications from <strong>IMD Lausanne</strong>, <strong>INSEAD</strong>,
                <strong> Stanford University</strong>, and completed Vanderbilt University's programme on
                <strong> Prompt Engineering, Innovative Teaching and Advanced Data Analysis</strong> in 2024.
                He speaks Dutch, English, and German fluently, with French and Russian at intermediate level.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              {["AI in Business", "International Strategy", "Organisational Behaviour", "Digital Transformation", "Change Leadership", "LLMs & Agents"].map((tag) => (
                <span key={tag} style={{
                  padding: "6px 14px", borderRadius: 20, background: "#f1f5f9",
                  fontSize: 12, fontWeight: 600, color: "#475569",
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Programme ─── */}
      <section id="programme" style={{ background: "#f8fafc", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-title">Lecture Programme</div>
            <div className="section-subtitle" style={{ margin: "0 auto" }}>
              Three days of interactive sessions combining conceptual depth with hands-on practice.
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
            {lectures.map((l, i) => (
              <button key={i}
                className={`day-tab ${activeDay === i ? "active" : ""}`}
                onClick={() => setActiveDay(i)}
              >
                {l.day}
              </button>
            ))}
          </div>

          <div style={{
            background: "#fff", borderRadius: 16, padding: 48,
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0",
            transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12,
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, flexShrink: 0,
              }}>
                {lectures[activeDay].icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#7b2ff7", fontWeight: 600, marginBottom: 4 }}>
                  {lectures[activeDay].day}
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, letterSpacing: -0.5 }}>
                  {lectures[activeDay].title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", marginBottom: 16 }}>
                  {lectures[activeDay].description}
                </p>
                <div style={{
                  display: "inline-block", padding: "6px 14px", borderRadius: 8,
                  background: "#f1f5f9", fontSize: 13, color: "#64748b", fontWeight: 500,
                }}>
                  Format: {lectures[activeDay].format}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Career Timeline ─── */}
      <section id="career" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-title">International Career</div>
            <div className="section-subtitle" style={{ margin: "0 auto" }}>
              30+ years of leadership across four continents — from engineering to the C-suite to the AI frontier.
            </div>
          </div>

          <div style={{ position: "relative", paddingLeft: 40 }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute", left: 6, top: 8, bottom: 8, width: 2,
              background: "linear-gradient(180deg, #1a1a2e, #7b2ff7, #00d2ff)",
            }} />

            {careerTimeline.map((item, i) => (
              <div key={i} style={{
                position: "relative", marginBottom: 36, paddingLeft: 24,
              }}>
                <div className="timeline-dot" style={{
                  position: "absolute", left: -34, top: 6,
                }} />
                <div style={{
                  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
                  padding: "20px 24px", transition: "all 0.3s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{item.flag} {item.role}</div>
                      <div style={{ fontSize: 13, color: "#7b2ff7", fontWeight: 600 }}>{item.company} — {item.location}</div>
                    </div>
                    <div style={{
                      padding: "4px 10px", borderRadius: 6, background: "#f1f5f9",
                      fontSize: 12, fontWeight: 600, color: "#64748b", whiteSpace: "nowrap",
                    }}>{item.year}</div>
                  </div>
                  <div style={{ fontSize: 14, color: "#475569", marginTop: 8, lineHeight: 1.6 }}>
                    {item.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Education ─── */}
      <section style={{ background: "#f8fafc", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-title">Education & Languages</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { inst: "Vanderbilt University", prog: "Prompt Engineering, AI & Innovative Teaching", year: "2024" },
              { inst: "Stanford University", prog: "Advanced Negotiations", year: "2001" },
              { inst: "INSEAD", prog: "Strategic Alliances", year: "1996" },
              { inst: "IMD Lausanne", prog: "Marketing & Sales for Senior Executives", year: "1985–86" },
            ].map((e, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 12, padding: 24,
                border: "1px solid #e2e8f0", textAlign: "center",
              }}>
                <div style={{ fontSize: 13, color: "#7b2ff7", fontWeight: 700, marginBottom: 8 }}>{e.year}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{e.inst}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{e.prog}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{ fontSize: 15, color: "#475569" }}>
              <strong>Languages:</strong> Dutch (native) • English (fluent) • German (fluent) • French (intermediate) • Russian (intermediate)
            </div>
          </div>
        </div>
      </section>

      {/* ─── Resources ─── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-title">Explore More</div>
            <div className="section-subtitle" style={{ margin: "0 auto" }}>
              Read Bernard's thought leadership and connect online.
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                icon: "🌐", title: "AI & Business Website",
                desc: "Bernard's personal site on AI in business and education — insights, projects, and perspective.",
                link: "https://www.bernarddonners-ai.nl", label: "Visit bernarddonners-ai.nl",
              },
              {
                icon: "✍️", title: "Blog: Thought Leadership",
                desc: "Reflections on AI, digital transformation, and the future of work and learning.",
                link: "https://www.bernarddonners-ai.nl/blog", label: "Read the blog",
              },
              {
                icon: "💼", title: "LinkedIn Profile",
                desc: "Connect with Bernard and follow his latest posts on AI, business, and education.",
                link: "https://www.linkedin.com/in/bernard-donners-288b0aa/", label: "View on LinkedIn",
              },
            ].map((r, i) => (
              <a key={i} href={r.link} target="_blank" rel="noopener noreferrer" style={{
                background: "#fff", borderRadius: 12, padding: 32,
                border: "1px solid #e2e8f0", textDecoration: "none", color: "#1e293b",
                transition: "all 0.3s", display: "block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{r.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{r.title}</div>
                <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>{r.desc}</div>
                <div style={{ fontSize: 13, color: "#7b2ff7", fontWeight: 600 }}>{r.label} →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact / Footer ─── */}
      <section id="contact" style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
        padding: "80px 40px", color: "#fff", textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Let's Connect</div>
          <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7, marginBottom: 32 }}>
            For questions about the lecture programme or collaboration opportunities,
            don't hesitate to reach out.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="mailto:bernarddonners@gmail.com" style={{
              padding: "12px 28px", borderRadius: 10, background: "rgba(255,255,255,0.1)",
              color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>📧 bernarddonners@gmail.com</a>
            <a href="https://www.bernarddonners-ai.nl" target="_blank" rel="noopener noreferrer" style={{
              padding: "12px 28px", borderRadius: 10, background: "rgba(255,255,255,0.1)",
              color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>🌐 bernarddonners-ai.nl</a>
          </div>
          <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.8 }}>
              Guest Lecture Series — June 2026 — Berlin / Hamburg<br />
              BSP Business and Law School — Hochschule für Management und Recht<br />
              Siemens Villa, Calandrellistraße 1-9, 12247 Berlin
            </div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 16 }}>
              🤖 This microsite was conceptualised, designed, and coded entirely with AI — a preview of what Bernard will bring to BSP Berlin.
            </div>
          </div>
        </div>
      </section>

      {/* ─── Chatbot ─── */}
      <AIChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      {!chatOpen && (
        <button className="chat-trigger" onClick={() => setChatOpen(true)} title="Ask Bernard's AI">
          💬
        </button>
      )}
    </div>
  );
}
