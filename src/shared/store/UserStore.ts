import { UserType } from "@/shared/types";
import { create } from "zustand";

interface UserState {
  userList?: UserType
  getUser: () => Promise<void>
  clearUserList: () => void
}

export const useUserStore = create<UserState>((set) => ({
  userList: undefined,
  getUser: async () => {
    console.log(localStorage.getItem('authToken'))
    
    // const res = await fetchAllUser({ hidden: true })
    // if (res.data) set({ userList: res.data })
  },
  clearUserList: () => set({ userList: [] }),
}))