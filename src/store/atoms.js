import { atom } from 'jotai';

// 入力された食材リスト
export const ingredientsAtom = atom([]);

// 生成されたレシピ候補リスト
export const recipesAtom = atom([]);

// 選択されたレシピ詳細
export const selectedRecipeAtom = atom(null);

// 現在の画面状態 ('input', 'selection', 'detail')
export const currentViewAtom = atom('input');
