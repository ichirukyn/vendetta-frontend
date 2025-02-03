import { UserType } from "@/shared/types";
import { create } from "zustand";

interface UserState {
  user?: UserType
  token?: string
  getUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  token: undefined,
  getUser: async () => {
    console.log(localStorage.getItem('authToken'))
    
    // const res = await fetchAllUser({ hidden: true })
    // if (res.data) set({ userList: res.data })
  },
}))