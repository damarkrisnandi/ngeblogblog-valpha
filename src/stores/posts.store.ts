import { create } from 'zustand'
import { IPost } from '@/models/post.interface';

export const usePostStore = create((set) => ({
  posts: [] as IPost[],
  action: {
    setPosts: ((newPosts: IPost[]) => set({ posts: newPosts })),
  },
  postUpdate: false,
  postDelete: false,
  onPostUpdate: (() => set({ postUpdate: true })),
  onPostDelete: (() => set({ postDelete: true })),
  reset: (() => set({ postDelete: false, postUpdate: false })),
}))