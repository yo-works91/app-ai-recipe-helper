import { useAtom } from 'jotai';
import { recipesAtom, selectedRecipeAtom, currentViewAtom } from '../store/atoms';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';

function RecipeCandidates() {
    const [recipes] = useAtom(recipesAtom);
    const [, setSelectedRecipe] = useAtom(selectedRecipeAtom);
    const [, setCurrentView] = useAtom(currentViewAtom);

    const handleSelect = (recipe) => {
        setSelectedRecipe(recipe);
        setCurrentView('detail');
    };

    const handleBack = () => {
        setCurrentView('input');
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleBack}
                    className="neu-button w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black hover:bg-gray-50"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-black text-black">
                    おすすめレシピ
                </h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                {recipes.map((recipe) => (
                    <motion.div
                        key={recipe.id}
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="neu-card rounded-2xl p-4 cursor-pointer hover:bg-accent-sage/20"
                        onClick={() => handleSelect(recipe)}
                    >
                        <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-xl bg-accent-mustard border-2 border-black flex items-center justify-center text-3xl flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                🥘
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-black mb-1 truncate text-lg">
                                    {recipe.name}
                                </h3>
                                <p className="text-xs text-black/70 line-clamp-2 mb-2 leading-relaxed font-medium">
                                    {recipe.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold text-black bg-white border border-black inline-flex px-2 py-1 rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                    <Clock size={12} />
                                    {recipe.cookingTime}
                                </div>
                            </div>
                            <div className="flex items-center justify-center text-black">
                                <ChevronRight size={24} strokeWidth={3} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default RecipeCandidates;
