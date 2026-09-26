"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Code2, Cpu, FlaskConical, Lightbulb, LockKeyhole, Network } from "lucide-react";
import KnowledgeOrbit from "@/components/knowledge/KnowledgeOrbit";

gsap.registerPlugin(ScrollTrigger);

const interests = [
  { label: "AI", icon: Cpu, note: "what machines can learn" },
  { label: "CODE", icon: Code2, note: "ideas made real" },
  { label: "SCIENCE", icon: FlaskConical, note: "asking why" },
  { label: "CYBER", icon: LockKeyhole, note: "understanding systems" },
  { label: "TECH", icon: Network, note: "what can be built" },
  { label: "BUSINESS", icon: Lightbulb, note: "ideas with a purpose" },
];

function useCinematic(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const intro = q(".gift-intro");
      const reveal = q(".gift-reveal");
      const items = q(".gift-items");
      const glow = q(".gift-glow");
      const rings = q(".gift-ring");

      gsap.set(reveal, { autoAlpha: 0, y: 55, scale: 0.96, filter: "blur(8px)" });
      gsap.set(items, { autoAlpha: 0, y: 35, scale: 0.94, filter: "blur(5px)" });
      gsap.set(glow, { autoAlpha: 0, scale: 0.7 });
      gsap.set(rings, { autoAlpha: 0, scale: 0.7 });

      const entrance = gsap.timeline();
      entrance
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" })
        .to(glow, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.65")
        .to(rings, { autoAlpha: 1, scale: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=0.8")
        .to(reveal, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power4.out" }, "-=0.55");

      gsap.to(glow, { scale: 1.16, opacity: 0.7, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(rings, { rotate: 360, duration: 30, repeat: -1, ease: "none", stagger: 1.5 });

      const scroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1350",
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
        },
      });

      scroll
        .to(reveal, { y: -65, scale: 1.08, autoAlpha: 0.15, filter: "blur(5px)", duration: 0.8 })
        .to(items, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.12, ease: "power4.out" }, "-=0.15")
        .to(items, { y: -18, autoAlpha: 0, filter: "blur(4px)", duration: 0.65, stagger: 0.06, ease: "power3.inOut" })
        .to(glow, { scale: 1.55, autoAlpha: 0.28, duration: 0.9 }, "<");
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
        <div className="gift-scroll"><ArrowDown size={14} /> scroll slowly</div>
      </div>
    </section>
  );
}

function Mind() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  return (
    <section ref={ref} className="gift-scene gift-mind">
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
        <div className="gift-items mind-map" aria-label="A living map of how ideas connect">
          <div className="mind-map-core">AZKA</div>
          <button type="button"><span>LEARN</span></button>
          <button type="button"><span>REMEMBER</span></button>
          <button type="button"><span>QUESTION</span></button>
          <button type="button"><span>CONNECT</span></button>
          <i className="mind-link l1" /><i className="mind-link l2" /><i className="mind-link l3" /><i className="mind-link l4" />
        </div>
        <div className="mind-points"><span>NOTICE</span><span>REMEMBER</span><span>CONNECT</span><span>LEARN</span></div>
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
          {interests.map(({ label, icon: Icon, note }, index) => (
            <button
              className={`interest-node ${active === index ? "is-active" : ""}`}
              key={label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${label}: ${note}`}
            >
              <Icon size={16} strokeWidth={1.5} />
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

function Explore() {
  const ref = useRef<HTMLElement | null>(null);
  useCinematic(ref);
  return (
    <section ref={ref} className="gift-scene gift-explore">
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
          <button type="button" className="sys-node s1">INPUT</button>
          <button type="button" className="sys-node s2">PATTERN</button>
          <button type="button" className="sys-node s3">LOGIC</button>
          <button type="button" className="sys-node s4">OUTPUT</button>
          <i className="sys-line a" /><i className="sys-line b" /><i className="sys-line c" /><i className="sys-line d" />
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
        scrollTrigger: { trigger: section, start: "top top", end: "+=1600", scrub: 1.1, pin: true, anticipatePin: 1 },
      });
      tl.to(words, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power4.out" })
        .to(words, { autoAlpha: 0, y: -45, duration: 0.7, stagger: 0.05 })
        .to(message, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power4.out" }, "-=0.2");
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
  const [leaving, setLeaving] = useState(false);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cover-kicker", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8, ease: "power4.out" });
      gsap.fromTo(".cover-name", { y: 55, autoAlpha: 0, scale: .92, filter: "blur(10px)" }, { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.15, delay: .1, ease: "power4.out" });
      gsap.fromTo(".cover-copy", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, delay: .5, ease: "power3.out" });
      gsap.fromTo(".cover-button", { y: 22, autoAlpha: 0, scale: .94 }, { y: 0, autoAlpha: 1, scale: 1, duration: .8, delay: .72, ease: "back.out(1.5)" });
      // The cover orbit is animated in CSS so it stays reliable on touch devices
      // even if browser/OS rendering changes GSAP transform handling.
    }, root);
    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (leaving) return;
    // Open immediately on touch. The cover animation is visual only and must
    // never block the experience on a mobile browser.
    setLeaving(true);
    onOpen();
  };

  return (
    <main ref={ref} className={`gift-cover ${leaving ? "is-leaving" : ""}`}>
      <div className="cover-light" aria-hidden="true" />
      <div className="cover-grid" aria-hidden="true" />
      <div className="cover-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="cover-orbit-inner" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="cover-content">
        <p className="cover-kicker">A DIGITAL BIRTHDAY GIFT · FOR AZKA</p>
        <p className="cover-name">AZKA<span>//</span></p>
        <h1>Something<br /><em>made to be explored.</em></h1>
        <p className="cover-copy">No ordinary birthday card.<br />Take a breath, then open it.</p>
        <button className="cover-button" type="button" onClick={handleOpen} disabled={leaving}>
          <span>OPEN THE EXPERIENCE</span><ArrowDown size={16} className="cover-arrow" />
        </button>
      </div>
      <p className="cover-foot">TAP TO BEGIN · BEST EXPERIENCED SLOWLY</p>
    </main>
  );
}

export default function BirthdayExperience() {
  const [started, setStarted] = useState(false);
  if (!started) return <CoverScreen onOpen={() => setStarted(true)} />;
  return (
    <main className="gift-experience">
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
