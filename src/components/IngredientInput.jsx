import { useState } from 'react';
import { useAtom } from 'jotai';
import { ingredientsAtom, currentViewAtom, recipesAtom } from '../store/atoms';
import { generateRecipes } from '../lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sparkles, Loader2, Carrot, Check } from 'lucide-react';

function IngredientInput() {
    const [inputValue, setInputValue] = useState('');
    const [ingredients, setIngredients] = useAtom(ingredientsAtom);
    const [, setCurrentView] = useAtom(currentViewAtom);
    const [, setRecipes] = useAtom(recipesAtom);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAdd = () => {
        if (inputValue.trim()) {
            setIngredients([...ingredients, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const handleRemove = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const generatedRecipes = await generateRecipes(ingredients);
            setRecipes(generatedRecipes);
            setCurrentView('selection');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-lg font-black text-black mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-accent-terracotta border-2 border-black rounded-full flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Carrot size={18} />
                    </span>
                    食材リスト
                </h2>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="食材を入力 (例: 卵)"
                        disabled={isLoading}
                        className="neu-input flex-1 px-4 py-3 rounded-xl bg-white placeholder:text-gray-400 text-black font-bold"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdd}
                        disabled={isLoading || !inputValue.trim()}
                        className="neu-button px-4 bg-accent-mustard hover:bg-yellow-400 text-black rounded-xl flex items-center justify-center font-bold disabled:opacity-50 disabled:shadow-none disabled:translate-x-[3px] disabled:translate-y-[3px]"
                    >
                        <Plus size={24} />
                    </motion.button>
                </div>

                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence mode="popLayout">
                        {ingredients.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 border-2 border-dashed border-black/30 rounded-2xl bg-white/50"
                            >
                                <p className="text-black/60 text-sm font-bold">リストは空です</p>
                                <p className="text-black/40 text-xs mt-1 font-medium">食材を追加してください</p>
                            </motion.div>
                        ) : (
                            ingredients.map((item, index) => (
                                <motion.div
                                    key={`${item}-${index}`}
                                    layout
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    className="neu-card group flex items-center justify-between p-4 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full border-2 border-black bg-white flex items-center justify-center group-hover:bg-accent-sage transition-colors">
                                            <Check size={14} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-black font-bold">{item}</span>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(index)}
                                        disabled={isLoading}
                                        className="text-black/40 hover:text-red-600 transition-colors p-2 hover:bg-red-100 rounded-lg border-2 border-transparent hover:border-black"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-100 border-2 border-black text-red-600 rounded-xl text-sm text-center font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    {error}
                </motion.div>
            )}

            <div className="fixed bottom-6 left-0 w-full px-6 pointer-events-none flex justify-center z-20">
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    disabled={ingredients.length === 0 || isLoading}
                    className={`neu-button w-full max-w-sm py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 pointer-events-auto
            ${ingredients.length > 0 && !isLoading
                            ? 'bg-accent-terracotta text-black'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-x-[3px] translate-y-[3px]'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            AIが考え中...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            レシピを考案する！
                        </>
                    )}
                </motion.button>
            </div>
            {/* ボタンの分の余白 */}
            <div className="h-24" />
        </div>
    );
}

export default IngredientInput;
