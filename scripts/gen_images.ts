import { GoogleGenAI } from "@google/genai";

async function generatePropertyImages() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("No API key found in environment variables.");
    process.exit(1);
  }
  const ai = new GoogleGenAI({ apiKey });
  const prompts = [
    "Modern minimalist kitnet apartment interior, high-end furniture, large window with city view, daytime lighting, 4k.",
    "Industrial style loft apartment, exposed brick walls, creative workspace, warm lighting.",
    "Scandinavian design kitnet apartment, light wood floors, white walls, cozy textiles, plants, bright natural light.",
    "Luxury loft apartment, marble finishes, sleek kitchen, elegant decor, night view of city lights.",
    "Bohemian style kitnet apartment, colorful rugs, floor cushions, hanging plants, artistic atmosphere.",
    "Compact and functional loft apartment, smart storage solutions, clean lines, neutral colors.",
    "Vintage style kitnet apartment, mid-century modern furniture, retro appliances, warm and inviting.",
    "Zen-inspired loft apartment, bamboo elements, sliding doors, minimalist aesthetic, peaceful vibes.",
    "Art deco kitnet apartment, geometric patterns, gold accents, velvet furniture, sophisticated look.",
    "Futuristic loft apartment, neon accents, high-tech gadgets, sleek metallic surfaces, cyberpunk feel."
  ];

  const results = await Promise.all(prompts.map(prompt => 
    ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "4:3" } }
    })
  ));

  const images = results.map(response => {
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    return part?.inlineData?.data ? `data:image/png;base64,${part.inlineData.data}` : null;
  }).filter(Boolean);

  console.log(JSON.stringify(images));
}

generatePropertyImages();
