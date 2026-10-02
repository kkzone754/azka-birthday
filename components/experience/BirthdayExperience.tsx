"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const KnowledgeOrbit = dynamic(() => import("@/components/knowledge/KnowledgeOrbit"), {
  ssr: false,
  loading: () => <div className="knowledge-orbit-3d knowledge-orbit-loading" aria-hidden="true" />,
});

const preloadKnowledgeOrbit = () => {
  void import("@/components/knowledge/KnowledgeOrbit");
};

gsap.registerPlugin(ScrollTrigger);

const interests = [
  { label: "AI", glyph: "AI", note: "what machines can learn" },
  { label: "CODE", glyph: "</>", note: "ideas made real" },
  { label: "SCIENCE", glyph: "∿", note: "asking why" },
  { label: "CYBER", glyph: "⌘", note: "understanding systems" },
  { label: "TECH", glyph: "◇", note: "what can be built" },
  { label: "BUSINESS", glyph: "↗", note: "ideas with a purpose" },
];

function useDesktopPointer(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 2;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 2;

      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-xp", String(x * 4) + "%");
        root.style.setProperty("--pointer-yp", String(y * 4) + "%");
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [rootRef]);
}

function useCinematic(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const intro = q(".gift-intro");
      const reveal = q(".gift-reveal");
      const items = q(".gift-items");
      const glow = q(".gift-glow");
      const rings = q(".gift-ring");

      if (reduceMotion) {
        gsap.set([intro, reveal, items, glow, rings], {
          autoAlpha: 1,
          clearProps: "transform,filter",
        });
        return;
      }

      gsap.set(intro, { autoAlpha: 0, y: 22 });
      gsap.set(reveal, { autoAlpha: 0, y: 58, scale: 0.965, filter: "blur(9px)" });
      gsap.set(items, { autoAlpha: 0, y: 38, scale: 0.97, filter: "blur(6px)" });
      gsap.set(glow, { autoAlpha: 0, scale: 0.76 });
      gsap.set(rings, { autoAlpha: 0, scale: 0.82 });

      gsap.to(glow, {
        scale: 1.12,
        opacity: 0.68,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(rings, {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: "none",
        stagger: 1.4,
      });

      const scroll = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2500",
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: "azka-story",
          invalidateOnRefresh: true,
        },
      });

      scroll
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" })
        .to(glow, { autoAlpha: 1, scale: 1, duration: 0.65 }, "<")
        .to(rings, { autoAlpha: 1, scale: 1, duration: 0.62, stagger: 0.06 }, "<")
        .to(reveal, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.72, ease: "power4.out" }, "-=0.2")
        .to({}, { duration: 0.72 })
        .to(reveal, { autoAlpha: 0, y: -38, scale: 1.015, filter: "blur(5px)", duration: 0.45, ease: "power3.in" })
        .to(items, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power4.out" }, "-=0.08")
        .to({}, { duration: 1.9 })
        .to(items, { y: -10, autoAlpha: 0.96, duration: 0.3, ease: "power2.out" })
        .to(glow, { scale: 1.4, autoAlpha: 0.3, duration: 0.6 }, "<");
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}

function Opening() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);

  return (
    <section ref={ref} className="gift-scene gift-opening">
      <div className="gift-noise" aria-hidden="true" />
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-ring gift-ring-a" aria-hidden="true" />
      <div className="gift-ring gift-ring-b" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">INITIALIZING A SMALL SURPRISE</p>
        <div className="gift-reveal">
          <p className="gift-name">AZKA<span>//</span></p>
          <h1>THE SHARP<br /><em>MIND</em></h1>
          <div className="gift-rule" />
          <p className="gift-subtitle">Some minds don&apos;t just collect answers.<br />They keep asking why.</p>
        </div>
        <div className="gift-scroll"><span aria-hidden="true">↓</span> scroll slowly</div>
      </div>
    </section>
  );
}

const mindModes = [
  ["LEARN", "New information → understood quickly"],
  ["REMEMBER", "Details → kept → recalled later"],
  ["QUESTION", "Something interesting → dig deeper"],
  ["CONNECT", "One idea → linked to another"],
];

function Mind() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  const [activeMind, setActiveMind] = useState(0);
  return (
    <section ref={ref} className="gift-scene gift-mind">
      <div className="scene-accent accent-orb accent-orb-a" aria-hidden="true" />
      <div className="scene-accent accent-orb accent-orb-b" aria-hidden="true" />
      <div className="scene-accent mind-pulse" aria-hidden="true" />
      <div className="scene-accent mind-scan" aria-hidden="true" />
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-ring gift-ring-a" aria-hidden="true" />
      <div className="gift-ring gift-ring-b" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">01 / THE MIND</p>
        <div className="gift-reveal">
          <p className="gift-overline">QUICK TO NOTICE · QUICK TO CONNECT</p>
          <h2>There&apos;s a reason<br /><span>you remember things so quickly.</span></h2>
          <p className="gift-body roman">Kabhi kabhi class mein question poora bhi nahi hota aur tumhare paas answer hota hai.</p>
          <p className="gift-body">Aur jab koi cheez interesting ho, tum usse sirf sun kar chhor nahi deti — tum usse samajhne ki koshish karti ho.</p>
        </div>
        <div className="gift-items mind-map" aria-label="Interactive map of how ideas connect">
          <div className="mind-map-core">AZKA</div>
          {mindModes.map(([label, note], index) => (
            <button
              className={`mind-map-node m${index + 1} ${activeMind === index ? "is-active" : ""}`}
              key={label}
              type="button"
              onClick={() => setActiveMind(index)}
              aria-label={label + ": " + note}
            >
              {label}
            </button>
          ))}
          <i className="mind-link l1" aria-hidden="true" />
          <i className="mind-link l2" aria-hidden="true" />
          <i className="mind-link l3" aria-hidden="true" />
          <i className="mind-link l4" aria-hidden="true" />
          <p className="mind-map-note">{mindModes[activeMind][1]}</p>
        </div>
      </div>
    </section>
  );
}

function Curiosity() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} className="gift-scene gift-curiosity">
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-ring gift-ring-a" aria-hidden="true" />
      <div className="gift-ring gift-ring-b" aria-hidden="true" />
      <KnowledgeOrbit activeIndex={active} />
      <div className="curiosity-core" aria-hidden="true"><span>CURIOUS</span><strong>MIND</strong><i /></div>
      <div className="gift-content">
        <p className="gift-intro gift-kicker">02 / CURIOSITY</p>
        <div className="gift-reveal">
          <p className="gift-overline">A FEW THINGS YOUR MIND KEEPS CIRCLING BACK TO</p>
          <h2>Questions become<br /><span>directions.</span></h2>
        </div>
        <div className="gift-items curiosity-orbit">
          {interests.map(({ label, glyph, note }, index) => (
            <button
              className={`interest-node ${active === index ? "is-active" : ""}`}
              key={label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${label}: ${note}`}
            >
              <span className="interest-glyph" aria-hidden="true">{glyph}</span>
              <strong>{label}</strong>
              <small>{note}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Builder() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  const [step, setStep] = useState(0);
  const steps = [
    ["01", "IDEA", "something starts as a thought"],
    ["02", "EXPLORE", "questions turn it into a direction"],
    ["03", "BUILD", "the idea becomes something real"],
    ["04", "TEST", "find out what works"],
    ["05", "IMPROVE", "make it a little better"],
  ];
  return (
    <section ref={ref} className="gift-scene gift-builder">
      <div className="builder-cursor" aria-hidden="true" />
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">03 / THE BUILDER</p>
        <div className="gift-reveal">
          <p className="gift-overline">LEARN → TRY → BUILD → IMPROVE</p>
          <h2>You don&apos;t just like<br /><span>technology. You like making things.</span></h2>
        </div>
        <div className="gift-items build-lab">
          <div className="build-track" aria-hidden="true"><span style={{ width: `${(step / 4) * 100}%` }} /></div>
          <div className="build-stage">
            <small>{steps[step][0]}</small>
            <strong>{steps[step][1]}</strong>
            <p>{steps[step][2]}</p>
          </div>
          <div className="build-controls">
            {steps.map(([number, label], index) => (
              <button key={number} type="button" className={step === index ? "is-active" : ""} onClick={() => setStep(index)}>
                <span>{number}</span>{label}
              </button>
            ))}
          </div>
        </div>
        <p className="gift-body">Coding is one way of turning a thought into something real.</p>
      </div>
    </section>
  );
}

const systemNodes = [
  ["INPUT", "What enters the system?"],
  ["PATTERN", "What repeats or connects?"],
  ["LOGIC", "What makes the system behave this way?"],
  ["OUTPUT", "What does the system produce?"],
];

function Explore() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  const [activeNode, setActiveNode] = useState(0);
  return (
    <section ref={ref} className="gift-scene gift-explore">
      <div className="explore-sweep" aria-hidden="true" />
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-grid" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">04 / EXPLORE</p>
        <div className="gift-reveal">
          <p className="gift-overline">SYSTEMS · PATTERNS · QUESTIONS</p>
          <h2>Cyber isn&apos;t about<br /><span>breaking things.</span></h2>
          <p className="gift-body">It can be about being curious enough to understand how things work — and why they work that way.</p>
        </div>
        <div className="gift-items system-map">
          <div className="system-core">SYSTEM</div>
          {systemNodes.map(([label, note], index) => (
            <button
              className={`sys-node s${index + 1} ${activeNode === index ? "is-active" : ""}`}
              key={label}
              type="button"
              onClick={() => setActiveNode(index)}
              aria-label={label + ": " + note}
            >
              {label}
            </button>
          ))}
          <i className="sys-line a" aria-hidden="true" />
          <i className="sys-line b" aria-hidden="true" />
          <i className="sys-line c" aria-hidden="true" />
          <i className="sys-line d" aria-hidden="true" />
          <p className="system-node-note">{systemNodes[activeNode][1]}</p>
          <p className="system-caption">understand the system before trying to change it</p>
        </div>
      </div>
    </section>
  );
}

function Ideas() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  return (
    <section ref={ref} className="gift-scene gift-ideas">
      <div className="ideas-sparks" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">05 / BUILDING IDEAS</p>
        <div className="gift-reveal">
          <p className="gift-overline">TECH × BUSINESS × CREATIVITY</p>
          <h2>Some ideas stay ideas.<br /><span>Others become projects.</span></h2>
          <p className="gift-body">We&apos;ve talked about technology, business, ideas, and what could actually be built.</p>
        </div>
        <div className="gift-items idea-sequence">
          <span><b>01</b> ASK</span><i>→</i><span><b>02</b> EXPLORE</span><i>→</i><span><b>03</b> BUILD</span><i>→</i><span><b>04</b> IMPROVE</span>
        </div>
      </div>
    </section>
  );
}

function Thinking() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  const traits = [
    ["QUICK TO LEARN", "new information → understood → remembered"],
    ["CURIOUS", "question → explore → discover"],
    ["CREATIVE", "idea → experiment → possibility"],
    ["SHARP", "pattern → connection → understanding"],
  ];
  return (
    <section ref={ref} className="gift-scene gift-thinking">
      <div className="thinking-ripple" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">06 / THE WAY YOU THINK</p>
        <div className="gift-reveal">
          <p className="gift-overline">NOT A COMPLIMENT. JUST AN OBSERVATION.</p>
          <h2>It&apos;s not only<br /><span>what you learn.</span></h2>
          <p className="gift-body">It&apos;s the way you move from one question to the next.</p>
        </div>
        <div className="gift-items thinking-traits">
          {traits.map(([title, flow], i) => (
            <div key={title} style={{ "--i": i } as CSSProperties}>
              <strong>{title}</strong><span>{flow}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Noticed() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  return (
    <section ref={ref} className="gift-scene gift-noticed">
      <div className="gift-content">
        <p className="gift-intro gift-kicker">07 / A LITTLE SOMETHING I NOTICED</p>
        <div className="gift-reveal noticed-copy">
          <p className="gift-overline">JUST SOMETHING I&apos;VE NOTICED</p>
          <h2>You get curious about things<br /><span>other people might ignore.</span></h2>
          <div className="noticed-lines">
            <p>You learn quickly.</p>
            <p>You remember surprisingly well.</p>
            <p>And when something interests you, you want to understand it.</p>
          </div>
          <p className="gift-body roman">Bas isi liye yeh little world banaya — tumhari appearance ke around nahi, tumhari thinking ke around.</p>
        </div>
      </div>
    </section>
  );
}

function Future() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  return (
    <section ref={ref} className="gift-scene gift-future">
      <div className="future-constellation" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>
      <div className="gift-glow" aria-hidden="true" />
      <div className="gift-ring gift-ring-a" aria-hidden="true" />
      <div className="gift-ring gift-ring-b" aria-hidden="true" />
      <div className="gift-content">
        <p className="gift-intro gift-kicker">08 / THE FUTURE</p>
        <div className="gift-reveal">
          <p className="future-words">KEEP LEARNING.<br />KEEP BUILDING.<br /><em>KEEP ASKING.</em></p>
          <p className="gift-body roman">Bas aise hi seekhti raho, explore karti raho, aur apne ideas ko reality mein convert karti raho.</p>
        </div>
        <div className="gift-items future-list"><span>CODE</span><span>AI</span><span>SCIENCE</span><span>CYBER</span><span>TECH</span><span>BUSINESS</span></div>
      </div>
    </section>
  );
}

function FinalReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const words = q(".final-word");
      const message = q(".final-message");
      gsap.set([words, message], { autoAlpha: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "+=1900", scrub: 0.8, pin: true, anticipatePin: 1, fastScrollEnd: true, preventOverlaps: "azka-story", invalidateOnRefresh: true },
      });
      tl.to(words, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power4.out" })
        .to(words, { autoAlpha: 0, y: -45, duration: 0.7, stagger: 0.05 })
        .to(message, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" }, "-=0.2")
        .to({}, { duration: 2.4 });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="gift-scene gift-final">
      <div className="gift-glow final-glow" aria-hidden="true" />
      <div className="final-word-wrap">
        <p className="final-word">ONE LAST THING.</p>
        <p className="final-word">I NOTICED.</p>
        <p className="final-word">AND I REMEMBERED.</p>
      </div>
      <div className="final-message">
        <p className="gift-overline">FOR AZKA</p>
        <h2>Happy Birthday,<br /><span>Azka.</span></h2>
        <p className="gift-body">Tumhara sharp thinking, tumhari curiosity, aur jis tarah tum cheezon ko samajhne ki koshish karti ho — that is genuinely something special.</p>
        <p className="gift-body roman">Keep learning. Keep exploring. Keep building. Aur sab se important — questions poochti rehna.</p>
      </div>
    </section>
  );
}

function CoverScreen({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([".cover-kicker", ".cover-name", ".cover-copy", ".cover-button"], { autoAlpha: 1, clearProps: "transform,filter" });
        return;
      }
      gsap.fromTo(".cover-kicker", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8, ease: "power4.out" });
      gsap.fromTo(".cover-name", { y: 55, autoAlpha: 0, scale: .92, filter: "blur(10px)" }, { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.15, delay: .1, ease: "power4.out" });
      gsap.fromTo(".cover-copy", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, delay: .5, ease: "power3.out" });
      gsap.fromTo(".cover-button", { y: 22, autoAlpha: 0, scale: .94 }, { y: 0, autoAlpha: 1, scale: 1, duration: .8, delay: .72, ease: "back.out(1.5)" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref} className="gift-cover">
      <div className="cover-light" aria-hidden="true" />
      <div className="cover-grid" aria-hidden="true" />
      <div className="cover-orbit" aria-hidden="true">
        <div className="cover-orbit-track"><i /><i /><i /></div>
      </div>
      <div className="cover-orbit-inner" aria-hidden="true">
        <div className="cover-orbit-inner-track"><span /><span /><span /><span /></div>
      </div>

      <div className="cover-content">
        <p className="cover-kicker">A DIGITAL BIRTHDAY GIFT · FOR AZKA</p>
        <p className="cover-name">AZKA<span>//</span></p>
        <h1>Something<br /><em>made to be explored.</em></h1>
        <p className="cover-copy">No ordinary birthday card.<br />Take a breath, then open it.</p>

        <button
          className="cover-button"
          type="button"
          onClick={onOpen}
          onPointerEnter={preloadKnowledgeOrbit}
          onFocus={preloadKnowledgeOrbit}
          aria-label="Open the birthday experience"
        >
          <span>OPEN THE EXPERIENCE</span>
          <span className="cover-arrow" aria-hidden="true">↓</span>
        </button>
      </div>

      <p className="cover-foot">CLICK TO BEGIN · BEST EXPERIENCED SLOWLY</p>
    </main>
  );
}


function StoryProgress({ rootRef }: { rootRef: RefObject<HTMLElement | null> }) {
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const progress = progressRef.current;
    if (!root || !progress) return;

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
    });

    return () => trigger.kill();
  }, [rootRef]);

  return (
    <div className="story-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}

function BirthdayExperience() {
  const [started, setStarted] = useState(false);
  const experienceRef = useRef<HTMLElement | null>(null);
  useDesktopPointer(experienceRef);

  useLayoutEffect(() => {
    if (!started) return;
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, [started]);

  if (!started) return <CoverScreen onOpen={() => setStarted(true)} />;

  return (
    <main ref={experienceRef} className="gift-experience">
      <StoryProgress rootRef={experienceRef} />
      <Opening />
      <Mind />
      <Curiosity />
      <Builder />
      <Explore />
      <Ideas />
      <Thinking />
      <Noticed />
      <Future />
      <FinalReveal />
    </main>
  );
}

export default BirthdayExperience;
