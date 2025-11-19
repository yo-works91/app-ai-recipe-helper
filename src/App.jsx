import { useAtom } from 'jotai';
import { currentViewAtom } from './store/atoms';
import IngredientInput from './components/IngredientInput';
import RecipeCandidates from './components/RecipeCandidates';
import RecipeDetail from './components/RecipeDetail';
import { AnimatePresence, motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

function App() {
  const [currentView] = useAtom(currentViewAtom);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-8">
      {/* 動的な背景グラデーション */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-100/40 blur-[100px] animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md">
        <div className="neu-panel rounded-3xl overflow-hidden min-h-[800px] relative flex flex-col">

          {/* ヘッダー装飾 */}
          <div className="bg-accent-sage border-b-2 border-black p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center justify-center gap-3 mb-2 relative z-10"
            >
              <div className="p-2 bg-bg-beige border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <ChefHat className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-2xl font-black text-black tracking-tight">
                AI Recipe Helper
              </h1>
            </motion.div>
            <p className="text-black font-bold text-sm">
              冷蔵庫の余り物が、極上のレシピに 🍳
            </p>
          </div>

          <main className="flex-1 relative z-10 px-6 py-8 overflow-y-auto custom-scrollbar bg-bg-beige">
            <AnimatePresence mode="wait">
              {currentView === 'input' && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <IngredientInput />
                </motion.div>
              )}
              {currentView === 'selection' && (
                <motion.div
                  key="selection"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <RecipeCandidates />
                </motion.div>
              )}
              {currentView === 'detail' && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <RecipeDetail />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <footer className="text-center py-4 border-t-2 border-black bg-white text-black text-xs font-bold">
            <p>&copy; {new Date().getFullYear()} AI Recipe Helper</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
