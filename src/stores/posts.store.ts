import { create } from 'zustand'

export const usePostStore = create((set) => ({
  postUpdate: false,
  postDelete: false,
  onPostUpdate: (() => set({ postUpdate: true })),
  onPostDelete: (() => set({ postDelete: true })),
  reset: (() => set({ postDelete: false, postUpdate: false })),
}))