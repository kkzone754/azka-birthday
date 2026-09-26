"use client";

import { useState } from "react";
import { Sparkles, Volume2, VolumeX } from "lucide-react";
import { chapters } from "@/lib/content";
import { IntroSequence } from "@/components/experience/IntroSequence";
import { MindChapter } from "@/components/experience/MindChapter";
import { CuriosityChapter } from "@/components/experience/CuriosityChapter";

export default function Home() {
  const [sound, setSound] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="experience-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to the beginning">
          AZKA<span>//</span>
        </button>
        <div className="topbar-meta">
          <span className="status-dot" />
          <span>CURIOSITY / ONLINE</span>
          <button
            className="sound-toggle"
            onClick={() => setSound((value) => !value)}
            aria-label={sound ? "Turn sound off" : "Turn sound on"}
            aria-pressed={sound}
          >
            {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </header>

      <IntroSequence onEnter={() => scrollTo("mind")} />

      <nav className="chapter-nav" aria-label="Experience chapters">
        {chapters.map((chapter) => (
          <button key={chapter.id} onClick={() => scrollTo(chapter.id)}>
            {chapter.label}
          </button>
        ))}
      </nav>

      <MindChapter />
      <CuriosityChapter />

      <section id="builder" className="section-pad story-section builder-section">
        <div className="section-heading compact">
          <p className="eyebrow">03 / THE BUILDER</p>
          <h2>From idea → <span>something real.</span></h2>
        </div>

        <div className="code-window">
          <div className="code-toolbar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>learning.ts</span>
            <span className="code-live">● CURIOUS</span>
          </div>
          <pre aria-label="A small code-inspired illustration">{`const curiosity = true;

while (learning) {
  explore();
  build();
  improve();
}

return keep_going;`}</pre>
          <div className="build-meter">
            <div><span>LEARNING STATUS</span><span>STILL ITERATING</span></div>
            <div className="meter-track"><span /></div>
          </div>
        </div>

        <p className="builder-note">
          Coding is not just about writing lines. It is about making an idea do something.
        </p>
      </section>

      <section id="explorer" className="section-pad story-section explorer-section">
        <div className="terminal-copy">
          <p className="eyebrow">04 / THE EXPLORER</p>
          <h2>Understand the <span>system.</span></h2>
          <p>
            A small cybersecurity-inspired moment — not about breaking things,
            but about being curious enough to understand how they work.
          </p>
        </div>
        <div className="terminal-card">
          <div className="terminal-top"><span>system_explorer</span><span>LOCAL / SAFE</span></div>
          <div className="terminal-body">
            <p><span>›</span> map --unknown</p>
            <p className="muted">following connections...</p>
            <p className="terminal-block">NODE A<br />NODE B<br />NODE C</p>
            <button onClick={() => setDeveloperMode((value) => !value)}>
              {developerMode ? "RESET EXPLORATION" : "INVESTIGATE"}
            </button>
            {developerMode && (
              <div className="terminal-result">
                <span>PATH FOUND</span>
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
        <div className="idea-flow" aria-label="Idea building process">
          <div><span>01</span><strong>QUESTION</strong><p>Start with something worth exploring.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>02</span><strong>EXPLORE</strong><p>Find out what is possible.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>03</span><strong>BUILD</strong><p>Turn curiosity into something real.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>04</span><strong>IMPROVE</strong><p>Make the next version better.</p></div>
        </div>
        <p className="idea-personal">
          We have talked about technology, business, ideas, and what could actually be built.
        </p>
      </section>

      <section id="future" className="future-section section-pad">
        <div className="future-orbit" aria-hidden="true"><span /><span /><span /></div>
        <p className="eyebrow">06 / THE FUTURE</p>
        <h2>KEEP LEARNING.<br />KEEP BUILDING.<br /><span>KEEP ASKING.</span></h2>

        <div className="final-message">
          <p className="eyebrow">ONE LAST THING</p>
          <p className="final-lead">
            Some people stand out because of what they know.
            <br /><em>Some stand out because of how they think.</em>
          </p>
          <p>
            Tumhara sharp thinking aur jis tarah tum cheezon ko samajhne ke liye curious rehti ho —
            that is genuinely something special.
          </p>
          <p className="roman">
            Bas aise hi seekhti raho, explore karti raho, aur apne ideas ko reality mein convert karti raho.
          </p>
          <h3>Happy Birthday, Azka. <span>✦</span></h3>
          <p className="keep-going">keep going<span>_</span></p>
        </div>
      </section>

      <footer className="site-footer">
        <span>AZKA //</span>
        <span>CURIOUS BY NATURE.</span>
        <span>KEEP GOING.</span>
      </footer>
    </main>
  );
}
