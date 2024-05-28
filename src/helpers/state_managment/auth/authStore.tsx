import { create } from 'zustand';

interface AuthState {
  username: string;
  password: string;
  show: boolean;
  loading: boolean;
  role: string
  setRole: (val: string) => void;
  setUsername: (val: string) => void;
  setPassword: (val: string) => void;
  setShow: (val: boolean) => void;
  setLoading: (val: boolean) => void;
}

const authStore = create<AuthState>((set) => ({
  username: '',
  password: '',
  show: false,
  loading: false,
  role: '',
  setRole: (val: string) => set({role: val}),
  setUsername: (val: string) => set({ username: val }),
  setPassword: (val: string) => set({ password: val }),
  setShow: (val: boolean) => set({ show: val }),
  setLoading: (val: boolean) => set({ loading: val }),
}));

export default authStore;