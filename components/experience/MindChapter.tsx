export function MindChapter() {
  return (
    <section id="mind" className="story-section-v2 mind-v2">
      <div className="section-heading-v2">
        <p className="eyebrow">01 / THE MIND</p>
        <h2>Quick to notice.<br /><em>Quick to understand.</em></h2>
      </div>

      <div className="mind-v2-grid">
        <div className="mind-v2-visual" aria-hidden="true">
          <div className="mind-v2-core">
            <span className="mind-v2-core-word">CURIOUS</span>
            <span className="mind-v2-core-sub">QUESTION / CONNECT / LEARN</span>
          </div>
          <span className="mind-v2-label label-a">QUESTION</span>
          <span className="mind-v2-label label-b">REMEMBER</span>
          <span className="mind-v2-label label-c">CONNECT</span>
          <span className="mind-v2-line line-a" />
          <span className="mind-v2-line line-b" />
        </div>

        <div className="mind-v2-copy">
          <p className="mind-observation">
            Kabhi kabhi class mein question poora bhi nahi hota aur tumhare paas answer hota hai.
          </p>
          <p>
            Aur jab koi cheez interesting ho, tum usse sirf sun kar chhor nahi deti —
            tum usse samajhne ki koshish karti ho.
          </p>
          <p className="mind-note">That kind of curiosity is worth celebrating.</p>
        </div>
      </div>
    </section>
  );
}
