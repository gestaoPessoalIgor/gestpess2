import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  salary?: number;
  extraIncome?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserIncome: (salary: number, extraIncome: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // TODO: Implementar autenticação com Firebase
        set({ 
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Usuário Teste',
            email: email,
            salary: 5000,
            extraIncome: 1000
          }
        });
      },
      
      loginWithGoogle: async () => {
        // TODO: Implementar autenticação com Google
        set({ 
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Usuário Google',
            email: 'usuario@gmail.com',
            photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            salary: 5000,
            extraIncome: 1000
          }
        });
      },
      
      logout: async () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUserIncome: (salary: number, extraIncome: number) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            salary,
            extraIncome
          } : null
        }));
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);