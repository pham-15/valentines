import { useState } from "react";
import { Link } from "react-router-dom";
import MarkdownViewer from "../components/MarkdwonViewer";

export default function Valentines2026() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 💖 Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://valentines-backend-eao8.onrender.com/api/chat/sendMessage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      const data = await res.json();

      setMessages([...newMessages, { role: "assistant", content: data.text }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry 😔 something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#ce4257] px-5 py-8 text-white">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-semibold">2026</h1>
          <p className="text-sm opacity-90">A little chat, just for you 💌</p>
        </div>

        {/* Valentine prompt */}
        {!hasAccepted ? (
          <div className="flex flex-col items-center gap-6 rounded-xl bg-white/10 p-6 text-center">
            <h2 className="text-2xl font-semibold">
              Will you be my valentine? 💘
            </h2>

            {rejected && (
              <p className="text-sm text-white/80">Wrong, try again 😤</p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setHasAccepted(true);
                  setRejected(false);
                }}
                className="rounded-xl border-2 border-black bg-white/30 px-6 py-3 font-semibold hover:bg-white/40"
              >
                Yes 💖
              </button>

              <button
                onClick={() => setRejected(true)}
                className="rounded-xl border-2 border-black bg-black/30 px-6 py-3 font-semibold hover:bg-black/40"
              >
                No 🙃
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Chat box */}
            <div className="flex flex-1 flex-col gap-3 rounded-xl bg-white/10 p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-black/30 text-right"
                      : "mr-auto bg-white/20"
                  }`}
                >
                  <MarkdownViewer markdown={msg.content} />
                </div>
              ))}

              {loading && (
                <div className="mr-auto rounded-xl bg-white/20 px-4 py-2 text-sm opacity-80">
                  Typing…
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="flex gap-2 rounded-xl bg-white/10 p-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-lg bg-transparent px-3 py-2 text-white placeholder-white/60 outline-none"
              />
              <button
                type="submit"
                className="rounded-lg border-2 border-black bg-white/20 px-4 py-2 font-semibold hover:bg-white/30 disabled:opacity-50"
                disabled={loading}
              >
                Send
              </button>
            </form>
          </>
        )}

        {/* Back */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block rounded-xl border-2 border-black bg-white/10 px-6 py-3 font-semibold hover:bg-white/20"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
