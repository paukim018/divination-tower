import { useState, useEffect, useRef } from "react";

const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water" },
];

const ELEMENT_COLORS = {
  Fire: { primary: "#c0392b", glow: "rgba(231, 76, 60, 0.3)" },
  Earth: { primary: "#8B7355", glow: "rgba(139, 115, 85, 0.3)" },
  Air: { primary: "#7f8c8d", glow: "rgba(149, 165, 166, 0.3)" },
  Water: { primary: "#2471a3", glow: "rgba(52, 152, 219, 0.3)" },
};

function StarField() {
  const stars = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.current.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#f1c40f",
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}

function LoadingOrb() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "40px 0" }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #a88beb, #7b2ff7 40%, #1a0533 80%)",
        boxShadow: "0 0 30px rgba(123, 47, 247, 0.5), 0 0 60px rgba(123, 47, 247, 0.2)",
        animation: "pulse 1.5s ease-in-out infinite",
      }} />
      <p style={{
        fontFamily: "'Crimson Text', serif", fontSize: 16,
        color: "rgba(241, 196, 15, 0.7)", letterSpacing: 2,
        animation: "fadeInOut 2s ease-in-out infinite",
      }}>
        The stars are aligning...
      </p>
    </div>
  );
}

function HoroscopeCard({ reading, sign }) {
  const colors = ELEMENT_COLORS[sign.element];
  return (
    <div style={{
      animation: "cardReveal 0.6s ease-out forwards",
      opacity: 0,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        marginBottom: 20, paddingBottom: 16,
        borderBottom: "1px solid rgba(241, 196, 15, 0.15)",
      }}>
        <div style={{
          width: 50, height: 50, borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.primary}, #1a0533)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, boxShadow: `0 0 20px ${colors.glow}`,
          border: "1px solid rgba(241, 196, 15, 0.2)",
        }}>
          {sign.symbol}
        </div>
        <div>
          <h3 style={{
            margin: 0, fontFamily: "'Cinzel Decorative', serif",
            fontSize: 20, color: "#f1c40f",
            textShadow: "0 0 10px rgba(241, 196, 15, 0.3)",
          }}>
            {reading.character}
          </h3>
          <p style={{
            margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)",
            fontFamily: "'Crimson Text', serif", letterSpacing: 1.5, textTransform: "uppercase",
          }}>
            Your guide today
          </p>
        </div>
      </div>

      <p style={{
        fontFamily: "'Crimson Text', serif", fontSize: 17,
        lineHeight: 1.75, color: "rgba(255, 255, 255, 0.82)",
        margin: "0 0 22px",
      }}>
        {reading.horoscope}
      </p>

      <div style={{
        background: "rgba(241, 196, 15, 0.04)",
        border: "1px solid rgba(241, 196, 15, 0.12)",
        borderRadius: 8, padding: "16px 20px",
        position: "relative",
      }}>
        <span style={{
          position: "absolute", top: -8, left: 18,
          fontSize: 24, color: "rgba(241, 196, 15, 0.4)",
          fontFamily: "'Cinzel Decorative', serif",
        }}>"</span>
        <p style={{
          fontFamily: "'Crimson Text', serif", fontSize: 16,
          fontStyle: "italic", lineHeight: 1.65,
          color: "rgba(241, 196, 15, 0.75)", margin: 0,
        }}>
          {reading.quote}
        </p>
        <p style={{
          fontFamily: "'Crimson Text', serif", fontSize: 12,
          color: "rgba(255,255,255,0.35)", margin: "8px 0 0", textAlign: "right",
        }}>
          — {reading.character}
        </p>
      </div>
    </div>
  );
}

export default function HogwartsHoroscope() {
  const [selected, setSelected] = useState(null);
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  async function fetchReading(sign) {
    setSelected(sign.name);
    setReading(null);
    setError(null);

    const cacheKey = `${sign.name}-${new Date().toDateString()}`;
    if (cache[cacheKey]) {
      setReading(cache[cacheKey]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a mystical astrologer at Hogwarts School of Witchcraft and Wizardry. Today is ${today}. Generate a daily horoscope for the zodiac sign ${sign.name} (${sign.element} element).

Pick ONE Harry Potter character who best embodies today's energy for this sign. Then write:
1. A 2-3 sentence horoscope in a mystical but warm tone, weaving in themes relevant to ${sign.name} and subtle Harry Potter world references.
2. A short original quote (1-2 sentences) that this character might say, matching the horoscope's theme. Make it sound authentically like that character.

Respond ONLY with a JSON object, no markdown fences:
{"character": "Character Name", "horoscope": "The horoscope text...", "quote": "The quote text..."}`,
            },
          ],
        }),
      });
      const data = await response.json();
      const text = data.content.map((b) => b.text || "").join("");
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setReading(parsed);
      setCache((prev) => ({ ...prev, [cacheKey]: parsed }));
    } catch (err) {
      console.error(err);
      setError("The crystal ball has gone dark. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #0a0118 0%, #110a2a 30%, #0d1b2a 60%, #0a0118 100%)",
      color: "#fff", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(123,47,247,0.5); }
          50% { transform: scale(1.08); box-shadow: 0 0 50px rgba(123,47,247,0.7); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes headerGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(241,196,15,0.3), 0 0 40px rgba(241,196,15,0.1); }
          50% { text-shadow: 0 0 30px rgba(241,196,15,0.5), 0 0 60px rgba(241,196,15,0.2); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sign-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(241,196,15,0.1);
          border-radius: 12px;
          padding: 14px 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .sign-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(241,196,15,0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sign-btn:hover::before { opacity: 1; }
        .sign-btn:hover {
          border-color: rgba(241,196,15,0.35);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .sign-btn.active {
          border-color: rgba(241,196,15,0.5);
          background: rgba(241,196,15,0.06);
          box-shadow: 0 0 25px rgba(241,196,15,0.1), inset 0 0 20px rgba(241,196,15,0.03);
        }
      `}</style>

      <StarField />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 820, margin: "0 auto",
        padding: "50px 24px 60px",
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 48,
          animation: "slideUp 0.8s ease-out",
        }}>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: 13, letterSpacing: 4, textTransform: "uppercase",
            color: "rgba(241, 196, 15, 0.5)", marginBottom: 12,
          }}>
            ✦ Divination Tower ✦
          </p>
          <h1 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700,
            color: "#f1c40f", lineHeight: 1.2,
            animation: "headerGlow 4s ease-in-out infinite",
            marginBottom: 10,
          }}>
            Professor Trelawney's<br />Daily Divinations
          </h1>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: 15, color: "rgba(255,255,255,0.4)",
            letterSpacing: 1,
          }}>
            {today}
          </p>
          <div style={{
            width: 60, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(241,196,15,0.4), transparent)",
            margin: "18px auto 0",
          }} />
        </div>

        {/* Zodiac Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: 10, marginBottom: 40,
          animation: "slideUp 0.8s 0.2s ease-out both",
        }}>
          {ZODIAC_SIGNS.map((sign) => {
            const colors = ELEMENT_COLORS[sign.element];
            return (
              <button
                key={sign.name}
                className={`sign-btn ${selected === sign.name ? "active" : ""}`}
                onClick={() => fetchReading(sign)}
              >
                <span style={{ fontSize: 28, lineHeight: 1 }}>{sign.symbol}</span>
                <span style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: 10, letterSpacing: 0.5,
                  color: selected === sign.name ? "#f1c40f" : "rgba(255,255,255,0.6)",
                }}>
                  {sign.name}
                </span>
                <span style={{
                  fontSize: 8, letterSpacing: 1,
                  color: colors.primary, textTransform: "uppercase",
                  fontFamily: "'Crimson Text', serif",
                }}>
                  {sign.element}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reading Area */}
        {selected && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(241, 196, 15, 0.1)",
            borderRadius: 16, padding: "30px 28px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(241,196,15,0.05)",
            animation: "slideUp 0.5s ease-out",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 22,
            }}>
              <span style={{ fontSize: 32 }}>
                {ZODIAC_SIGNS.find((s) => s.name === selected)?.symbol}
              </span>
              <div>
                <h2 style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: 22, color: "#f1c40f", margin: 0,
                }}>
                  {selected}
                </h2>
                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: 12, color: "rgba(255,255,255,0.35)",
                  margin: 0, letterSpacing: 1,
                }}>
                  {ZODIAC_SIGNS.find((s) => s.name === selected)?.dates}
                </p>
              </div>
            </div>

            {loading && <LoadingOrb />}
            {error && (
              <p style={{
                fontFamily: "'Crimson Text', serif",
                color: "#e74c3c", textAlign: "center", padding: 20,
              }}>
                {error}
              </p>
            )}
            {reading && (
              <HoroscopeCard
                reading={reading}
                sign={ZODIAC_SIGNS.find((s) => s.name === selected)}
              />
            )}
          </div>
        )}

        {/* Empty State */}
        {!selected && (
          <div style={{
            textAlign: "center", padding: "40px 20px",
            animation: "slideUp 0.8s 0.4s ease-out both",
          }}>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: 18, fontStyle: "italic",
              color: "rgba(255,255,255,0.3)", lineHeight: 1.7,
            }}>
              Select your sign above to reveal<br />
              what the stars and the Sorting Hat<br />
              have in store for you today.
            </p>
          </div>
        )}

        {/* Footer */}
        <p style={{
          textAlign: "center", marginTop: 50,
          fontFamily: "'Crimson Text', serif",
          fontSize: 11, color: "rgba(255,255,255,0.15)",
          letterSpacing: 2,
        }}>
          ✦ Powered by the Department of Mysteries ✦
        </p>
      </div>
    </div>
  );
}
