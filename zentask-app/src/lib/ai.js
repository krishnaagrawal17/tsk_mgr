const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateSubtasks(taskTitle) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('VITE_OPENROUTER_API_KEY is not defined in .env');
  }

  const prompt = `You are an AI task assistant. Break down the following task into 3-5 smaller, actionable subtasks. 
Return ONLY a valid JSON array of strings, where each string is a subtask title. Do not include markdown formatting like \`\`\`json.
Task: "${taskTitle}"`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: prompt }
        ],
        response_format: { type: "json_object" } 
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${errorText}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content.trim();
    
    // OpenRouter might still return markdown wrapper or a JSON object instead of an array depending on the model's strictness.
    // Let's attempt to parse it safely.
    if (content.startsWith('```json')) {
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    }

    const parsed = JSON.parse(content);
    
    // If the model wrapped it in an object (e.g., { "subtasks": [...] })
    if (Array.isArray(parsed)) {
      return parsed;
    } else if (parsed && typeof parsed === 'object') {
      const values = Object.values(parsed);
      for (const val of values) {
        if (Array.isArray(val)) return val;
      }
    }
    
    return [];

  } catch (error) {
    console.error("Failed to generate subtasks:", error);
    throw error;
  }
}
