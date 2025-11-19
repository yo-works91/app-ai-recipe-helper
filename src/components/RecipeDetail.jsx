import { useAtom } from 'jotai';
import { selectedRecipeAtom, currentViewAtom } from '../store/atoms';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Utensils, List, Carrot } from 'lucide-react';

function RecipeDetail() {
    const [recipe] = useAtom(selectedRecipeAtom);
    const [, setCurrentView] = useAtom(currentViewAtom);

    if (!recipe) return null;

    const handleBack = () => {
        setCurrentView('selection');
    };

    return (
        <div className="w-full pb-8">
            <div className="relative mb-6">
                <button
                    onClick={handleBack}
                    className="neu-button absolute top-0 left-0 z-10 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black hover:bg-gray-50"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="aspect-[4/3] bg-accent-slate border-2 border-black rounded-3xl flex items-center justify-center text-6xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-50" />
                    <span className="relative z-10">🥘</span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-black text-black mb-3 leading-tight">
                    {recipe.name}
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-black mb-4">
                    <span className="bg-accent-mustard border border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                        <Clock size={16} />
                        {recipe.cookingTime}
                    </span>
                </div>
                <p className="text-black/80 text-sm leading-relaxed font-medium bg-white p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    {recipe.description}
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-accent-sage/30 rounded-2xl p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-black mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-accent-sage border border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            <Carrot size={18} className="text-black" />
                        </div>
                        材料
                    </h3>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-black font-bold">
                                <div className="w-2 h-2 bg-black rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-accent-terracotta/30 rounded-2xl p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-black mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-accent-terracotta border border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            <Utensils size={18} className="text-black" />
                        </div>
                        調味料
                    </h3>
                    <ul className="space-y-2">
                        {recipe.seasonings.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-black font-bold">
                                <div className="w-2 h-2 bg-black rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded-2xl p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-black mb-4 flex items-center gap-2">
                        <div className="p-1.5 bg-gray-200 border border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            <List size={18} className="text-black" />
                        </div>
                        作り方
                    </h3>
                    <div className="space-y-4">
                        {recipe.instructions.map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-lg border-2 border-black flex items-center justify-center text-sm font-black shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]">
                                    {i + 1}
                                </div>
                                <p className="text-black text-sm leading-relaxed pb-4 border-b-2 border-dashed border-gray-300 w-full last:border-0 last:pb-0 font-medium pt-1">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;
