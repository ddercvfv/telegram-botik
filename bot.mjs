import fetch from 'node-fetch';

const TELEGRAM_TOKEN = '7841228174:AAE1noHGlGrvgpqcG8dVe3I5IeMxiBx0-nM';
const OPENAI_API_KEY = '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'
const TELEGRAM_API = https://api.telegram.org/bot${TELEGRAM_TOKEN};

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
