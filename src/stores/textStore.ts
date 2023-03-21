import { defineStore } from 'pinia';
import type TextType from '../interfaces/TextType';

export const useTextStore = defineStore('text', {
  state: () => ({
    textList: [] as TextType[],
    activeText: null as TextType | null,
  }),

  actions: {
    getActiveText() {
      return this.activeText;
    },
    getTextList() {
      return this.textList;
    },
    setActiveText(text: TextType | null) {
      this.activeText = text;
    },

    setTextList(textList: TextType[]) {
      this.textList = textList;
    },

    clearActiveText() {
      // console.log('CLEARING TEXT');
      this.activeText = null;
    },
  },
});
