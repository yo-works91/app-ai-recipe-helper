import { GoogleGenerativeAI } from "@google/generative-ai";

// APIキーの取得（環境変数から）
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateRecipes(ingredients) {
    if (!API_KEY) {
        throw new Error("APIキーが設定されていません。VITE_GEMINI_API_KEYを設定してください。");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    あなたはプロの料理研究家です。
    以下の食材を使って、家庭で作れる美味しいレシピを3つ提案してください。
    
    【使用食材】
    ${ingredients.join(', ')}
    
    【出力形式】
    以下のJSON形式で出力してください。Markdownのコードブロックは不要です。純粋なJSON文字列のみを返してください。
    
    [
      {
        "id": 1,
        "name": "レシピ名",
        "description": "魅力的な短い説明文（50文字程度）",
        "cookingTime": "調理時間（例: 15分）",
        "ingredients": ["食材1", "食材2", ...],
        "seasonings": ["調味料1", "調味料2", ...],
        "instructions": ["手順1", "手順2", "手順3", ...]
      },
      ...
    ]
    
    ※ idは1, 2, 3としてください。
    ※ ingredientsには、入力された食材以外に、一般家庭にある常備野菜や肉類を追加しても構いませんが、メインは入力された食材にしてください。
    ※ seasoningsは一般的な家庭にある調味料を使用してください。
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // JSONパース（万が一Markdown記法が含まれていても除去してパースを試みる）
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const recipes = JSON.parse(jsonStr);

        return recipes;
    } catch (error) {
        console.error("レシピ生成エラー:", error);
        throw new Error("レシピの生成に失敗しました。もう一度お試しください。");
    }
}
