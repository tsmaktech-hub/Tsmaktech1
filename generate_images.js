import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function generateImages() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompts = [
    {
      id: "nebula",
      prompt: "A professional dashboard for a team attendance and workflow management system, modern UI, dark theme, emerald accents, clean layout, high quality digital art."
    },
    {
      id: "lasustech",
      prompt: "A digital attendance management system for a university, student records, secure portal, educational theme, professional UI, high quality digital art."
    }
  ];

  const results = {};

  for (const item of prompts) {
    console.log(`Generating image for ${item.id}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: item.prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          results[item.id] = `data:image/png;base64,${part.inlineData.data}`;
          console.log(`Successfully generated image for ${item.id}`);
        }
      }
    } catch (error) {
      console.error(`Error generating image for ${item.id}:`, error);
    }
  }

  fs.writeFileSync("generated_images.json", JSON.stringify(results, null, 2));
  console.log("Results saved to generated_images.json");
}

generateImages();
