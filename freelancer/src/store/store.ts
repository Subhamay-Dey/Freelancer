import {create} from "zustand"
import {createClient} from "@/supabase/supabaseClient"
import { User } from "@supabase/supabase-js";

type UserStore = {
    user: User | null
    fetchUser: () => Promise<void>;
    setUser : (user: User | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    fetchUser: async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();

        if(data.session?.user) {
            set({ user: data.session.user });
        } else {
            set({ user: null });
        }
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
}))