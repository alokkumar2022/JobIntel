import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserTier } from '@/types';
import { mockUser } from '@/data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  upgradeTier: (tier: UserTier) => void;
}

// Demo credentials
const DEMO_USERS: Record<string, { password: string; tier: UserTier; isAdmin?: boolean }> = {
  'user@demo.com': { password: 'demo123', tier: 'free' },
  'premium@demo.com': { password: 'demo123', tier: 'premium' },
  'ultra@demo.com': { password: 'demo123', tier: 'ultra' },
  'admin@demo.com': { password: 'admin123', tier: 'ultra', isAdmin: true },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const demoUser = DEMO_USERS[email];
        
        if (demoUser && demoUser.password === password) {
          const user: User = {
            ...mockUser,
            email,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            tier: demoUser.tier,
          };
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            isAdmin: demoUser.isAdmin || false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          ...mockUser,
          id: Date.now().toString(),
          email,
          name,
          tier: 'free',
          skills: [],
          preferredLocations: [],
          preferredRoles: [],
          createdAt: new Date().toISOString(),
        };
        
        set({ user, isAuthenticated: true, isLoading: false, isAdmin: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAdmin: false });
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      upgradeTier: (tier: UserTier) => {
        set((state) => ({
          user: state.user ? { ...state.user, tier } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
