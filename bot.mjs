import fetch from 'node-fetch';

const TELEGRAM_TOKEN = '7841228174:AAE1noHGlGrvgpqcG8dVe3I5IeMxiBx0-nM';
const OPENAI_API_KEY = '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'
const TELEGRAM_API = 'https://api.telegram.org/bot${TELEGRAM_TOKEN}';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const message = req.body.message;
    const chatId = message.chat.id;
    const userText = message.text;

    const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${OPENAI_API_KEY},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    const gptData = await gptResponse.json();
    const reply = gptData.choices?.[0]?.message?.content || "Что-то пошло не так.";

    await fetch(${TELEGRAM_API}/sendMessage, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: reply })
    });

    return res.status(200).send("ok");
  } else {
    res.status(200).send("Bot is running.");
  }
}
