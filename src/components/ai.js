import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const hf = new HfInference(import.meta.env.VITE_APP_API_KEY);

export async function getRecipeFromMistral(userMessage) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3", 
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      max_tokens: 150, 
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error getting chatbot reply:", err.message);
    return "Sorry, I couldn’t get a reply right now.";
  }
}
