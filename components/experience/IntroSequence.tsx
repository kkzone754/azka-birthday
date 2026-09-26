"use client";

import { ArrowDown, ArrowRight } from "lucide-react";

type Props = { onEnter: () => void };

export function IntroSequence({ onEnter }: Props) {
  return (
    <section id="top" className="hero-v2">
      <div className="intro-v2">
        <p className="eyebrow">A SMALL DIGITAL EXPERIENCE</p>
        <p className="system-line">INITIALIZING<span className="blink">_</span></p>
        <p className="azka-mark">AZKA<span>//</span></p>
        <h1>THE <span>SHARP</span> MIND</h1>
        <p className="intro-line">Some minds don&apos;t just collect answers.<br /><em>They keep asking why.</em></p>
        <button className="primary-action" onClick={onEnter}>
          ENTER EXPERIENCE <ArrowRight size={17} />
        </button>
      </div>

      <div className="intro-orbit" aria-hidden="true">
        <div className="intro-orbit-ring intro-orbit-ring-a" />
        <div className="intro-orbit-ring intro-orbit-ring-b" />
        <div className="intro-orbit-core"><span>curiosity</span><small>still active</small></div>
        <span className="intro-orbit-node intro-node-a">ASK</span>
        <span className="intro-orbit-node intro-node-b">LEARN</span>
        <span className="intro-orbit-node intro-node-c">BUILD</span>
      </div>

      <button className="scroll-hint" onClick={onEnter} aria-label="Begin the experience">
        <span>BEGIN THE STORY</span><ArrowDown size={16} />
      </button>
    </section>
  );
}
