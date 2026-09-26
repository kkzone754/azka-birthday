"use client";

import { useState } from "react";
import { interests } from "@/lib/content";

export function CuriosityChapter() {
  const [active, setActive] = useState(0);
  const selected = interests[active];

  return (
    <section id="curiosity" className="story-section-v2 curiosity-v2">
      <div className="section-heading-v2 compact-v2">
        <p className="eyebrow">02 / CURIOSITY</p>
        <h2>There is always another <span>question.</span></h2>
      </div>

      <div className="constellation-v2">
        <div className="constellation-stage" aria-label="Interactive constellation of Azka's interests">
          <div className="constellation-orbit orbit-one" />
          <div className="constellation-orbit orbit-two" />
          <div className="constellation-center">
            <strong>AZKA</strong>
            <span>curiosity</span>
          </div>
          {interests.map((item, index) => (
            <button
              key={item.label}
              className={`constellation-node constellation-node-${index + 1} ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-label={`Explore ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="constellation-detail" aria-live="polite">
          <p className="eyebrow">A SIDE OF CURIOSITY</p>
          <h3>{selected.label}</h3>
          <p>{selected.detail}</p>
          <span>tap another node to explore</span>
        </div>
      </div>
    </section>
  );
}
