import { NetlifyNetwork } from "@netlify/sdk";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { message } = JSON.parse(event.body);
  const network = new NetlifyNetwork();

  try {
    const response = await network.ai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant for William Dean Photography. You help clients with real estate photography inquiries in Kern County, Tennessee. Be professional, warm, and concise. Help clients understand services, pricing, turnaround, and booking. Always encourage them to call or text 865-364-0099 to book a shoot.",
        },
        { role: "user", content: message },
      ],
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: response.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
