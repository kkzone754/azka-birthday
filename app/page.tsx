"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Code2, Cpu, FlaskConical, LockKeyhole, Sparkles, Volume2, VolumeX } from "lucide-react";

const interests = [
  { label: "AI", detail: "Exploring what machines can learn, create, and understand.", icon: Cpu },
  { label: "CODE", detail: "Turning an idea into something that actually works.", icon: Code2 },
  { label: "SCIENCE", detail: "Ask why. Then ask what happens next.", icon: FlaskConical },
  { label: "CYBER", detail: "Understanding systems and how they can be protected.", icon: LockKeyhole },
];

const chapters = [
  { id: "mind", label: "01 / MIND" },
  { id: "curiosity", label: "02 / CURIOSITY" },
  { id: "builder", label: "03 / BUILDER" },
  { id: "explorer", label: "04 / EXPLORE" },
  { id: "ideas", label: "05 / IDEAS" },
];

export default function Home() {
  const [activeInterest, setActiveInterest] = useState(0);
  const [sound, setSound] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);

  const active = useMemo(() => interests[activeInterest], [activeInterest]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="experience-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to beginning">
          AZKA<span>//</span>
        </button>
        <div className="topbar-meta">
          <span className="status-dot" />
          <span>CURIOSITY / ONLINE</span>
          <button
            className="sound-toggle"
            onClick={() => setSound((value) => !value)}
            aria-label={sound ? "Turn sound off" : "Turn sound on"}
          >
            {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow">A DIGITAL EXPERIENCE / 2026</p>
          <p className="system-line">INITIALIZING<span className="blink">_</span></p>
          <h1>
            THE
            <span>SHARP</span>
            MIND
          </h1>
          <p className="hero-description">
            A little digital world for someone who never seems to stop learning,
            questioning, building, and exploring.
          </p>
          <button className="primary-action" onClick={() => scrollTo("mind")}>
            ENTER EXPERIENCE <ArrowRight size={17} />
          </button>
        </div>

        <div className="hero-orbit" aria-label="Interactive knowledge orbit">
          <div className="orbit-ring orbit-ring-large" />
          <div className="orbit-ring orbit-ring-small" />
          <div className="orbit-core">
            <span>AZKA</span>
            <small>NODE / 01</small>
          </div>
          <span className="orbit-node node-ai">AI</span>
          <span className="orbit-node node-code">CODE</span>
          <span className="orbit-node node-science">SCI</span>
          <span className="orbit-node node-cyber">CYBER</span>
        </div>

        <button className="scroll-hint" onClick={() => scrollTo("mind")}>
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
        </button>
      </section>

      <nav className="chapter-nav" aria-label="Experience chapters">
        {chapters.map((chapter) => (
          <button key={chapter.id} onClick={() => scrollTo(chapter.id)}>
            {chapter.label}
          </button>
        ))}
      </nav>

      <section id="mind" className="section-pad story-section mind-section">
        <div className="section-heading">
          <p className="eyebrow">01 / THE MIND</p>
          <h2>Some people remember things. <em>Some understand them.</em></h2>
        </div>
        <div className="mind-layout">
          <div className="mind-visual">
            <div className="mind-core">
              <div className="mind-core-glow" />
              <div className="mind-core-lines" />
              <strong>CURIOUS</strong>
              <span>THINK / LEARN / CONNECT</span>
            </div>
            <span className="data-label data-one">FAST LEARNING</span>
            <span className="data-label data-two">SHARP THINKING</span>
            <span className="data-label data-three">CREATIVE SIGNAL</span>
          </div>
          <div className="story-copy">
            <p>
              A sharp mind is not only about knowing answers. It is about noticing
              patterns, asking better questions, and being interested enough to keep going.
            </p>
            <p className="roman">
              “Dimagh ko busy rakhna zaroori hai.” <span>— probably a good idea.</span>
            </p>
          </div>
        </div>
      </section>

      <section id="curiosity" className="section-pad story-section curiosity-section">
        <div className="section-heading compact">
          <p className="eyebrow">02 / CURIOSITY</p>
          <h2>There is always another <span>question.</span></h2>
        </div>

        <div className="interest-stage">
          <div className="interest-list">
            {interests.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`interest-node ${index === activeInterest ? "is-active" : ""}`}
                  onClick={() => setActiveInterest(index)}
                >
                  <span className="interest-icon"><Icon size={17} /></span>
                  <span>{item.label}</span>
                  <span className="interest-index">0{index + 1}</span>
                </button>
              );
            })}
          </div>
          <div className="interest-detail">
            <div className="detail-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="eyebrow">SIGNAL DETECTED</p>
            <h3>{active.label}</h3>
            <p>{active.detail}</p>
            <span className="detail-status">INTEREST / ACTIVE</span>
          </div>
        </div>
      </section>

      <section id="builder" className="section-pad story-section builder-section">
        <div className="section-heading compact">
          <p className="eyebrow">03 / THE BUILDER</p>
          <h2>From idea → <span>something real.</span></h2>
        </div>

        <div className="code-window">
          <div className="code-toolbar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>curiosity.ts</span>
            <span className="code-live">● LIVE</span>
          </div>
          <pre aria-label="Animated code illustration">{`const idea = curiosity;
const skill = practice;

while (learning) {
  explore();
  build();
  improve();
}

return something_real;`}</pre>
          <div className="build-meter">
            <div><span>BUILD STATUS</span><span>ALWAYS ITERATING</span></div>
            <div className="meter-track"><span /></div>
          </div>
        </div>

        <p className="builder-note">
          You don&apos;t just like technology. You like figuring out how things work.
        </p>
      </section>

      <section id="explorer" className="section-pad story-section explorer-section">
        <div className="terminal-copy">
          <p className="eyebrow">04 / EXPLORE</p>
          <h2>Investigate the <span>unknown.</span></h2>
          <p>
            A harmless little nod to the cybersecurity side of curiosity:
            understand systems, find patterns, learn how they work.
          </p>
        </div>
        <div className="terminal-card">
          <div className="terminal-top"><span>secure_shell</span><span>127.0.0.1</span></div>
          <div className="terminal-body">
            <p><span>$</span> scan --unknown</p>
            <p className="muted">searching...</p>
            <p className="terminal-block">UNKNOWN<br />UNKNOWN<br />UNKNOWN</p>
            <button onClick={() => setDeveloperMode((value) => !value)}>
              {developerMode ? "HIDE RESULT" : "INVESTIGATE"}
            </button>
            {developerMode && (
              <div className="terminal-result">
                <span>ACCESS GRANTED</span>
                <p>reason: curiosity</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="ideas" className="section-pad story-section ideas-section">
        <p className="eyebrow">05 / BUILDING IDEAS</p>
        <div className="ideas-heading">
          <h2>Some ideas stay ideas.<br /><span>Others become projects.</span></h2>
          <Sparkles className="idea-spark" size={34} />
        </div>
        <div className="idea-grid">
          <div className="idea-card large"><span>01</span><strong>IDEA</strong><p>Start with a question.</p></div>
          <div className="idea-card"><span>02</span><strong>EXPLORE</strong><p>Learn what is possible.</p></div>
          <div className="idea-card"><span>03</span><strong>BUILD</strong><p>Turn curiosity into action.</p></div>
          <div className="idea-card wide"><span>04</span><strong>IMPROVE</strong><p>Make the next version better.</p></div>
        </div>
      </section>

      <section className="future-section section-pad">
        <div className="future-orbit" aria-hidden="true"><span /><span /><span /></div>
        <p className="eyebrow">SYSTEM COMPLETE</p>
        <h2>KEEP LEARNING.<br />KEEP BUILDING.<br /><span>KEEP ASKING.</span></h2>
        <div className="final-message">
          <p className="eyebrow">ONE LAST THING</p>
          <p className="final-lead">
            Some people stand out because of what they have.
            <br /><em>Some stand out because of how they think.</em>
          </p>
          <p>
            Your curiosity, sharp thinking, and the way you keep learning are genuinely
            something special.
          </p>
          <p className="roman">Bas aise hi seekhti raho, explore karti raho, aur apne ideas ko reality mein convert karti raho.</p>
          <h3>Happy Birthday, Azka. <span>✦</span></h3>
          <p className="keep-going">keep going<span>_</span></p>
        </div>
      </section>

      <footer className="site-footer">
        <span>AZKA //</span>
        <span>CURIOSITY DETECTED.</span>
        <span>KEEP GOING.</span>
      </footer>
    </main>
  );
}
