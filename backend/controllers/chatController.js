import fetch from "node-fetch";

const FACTS = `
Important info:
- Alex loves Hannah.
- Alex loves spending time with Hannah.
- Alex loves holding hands with Hannah.
- Alex loves going on walks with Hannah.
- Alex loves eating with Hannah.
- Alex loves cooking for Hannah, especially kimchi fried rice with pork belly.
- Alex loves watching movies with Hannah.
- Alex loves Snoopy.
- Hannah loves Miffy.
`.trim();

const SYSTEM_CONTEXT = `
You are a helpful assistant for my Valentines project.
Be concise, sweet, and friendly.

Use the "Important info" as the source of truth about Alex and Hannah.
If the user asks something that is NOT in the Important info, say you don't know based on the provided info,
and ask ONE short follow-up question to learn what you need.
`.trim();

export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Body must be { messages: [{role, content}, ...] }",
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "google/gemma-3n-e2b-it:free";

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Missing OPENROUTER_API_KEY in .env" });
    }

    // Prepend context as a USER message (works even when "system" isn't supported)
    const contextualizedMessages = [
      {
        role: "user",
        content: `${SYSTEM_CONTEXT}\n\n${FACTS}\n\nNow continue the conversation below.`,
      },
      ...messages.map((m) => ({
        role: m.role,
        content: String(m.content ?? ""),
      })),
    ];

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost",
        "X-Title": process.env.OPENROUTER_APP_NAME || "valentines",
      },
      body: JSON.stringify({
        model,
        messages: contextualizedMessages,
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      return res.status(resp.status).json({
        error: "OpenRouter request failed",
        details: errorText,
      });
    }

    const data = await resp.json();
    const text =
      data?.choices?.[0]?.message?.content ?? "(No response text returned.)";
    res.json({ text });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
};
