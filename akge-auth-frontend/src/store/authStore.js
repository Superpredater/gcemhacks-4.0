import { create } from 'zustand';

// Demo credentials
const DEMO_ACCOUNTS = {
  student1:    { password: '1234', role: 'student' },
  parent1:     { password: '1234', role: 'parent' },
  teacher1:    { password: '1234', role: 'teacher' },
  management1: { password: '1234', role: 'management' },
  admin1:      { password: '1234', role: 'admin' },
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Initialize auth from localStorage
  initializeAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  },

  // Login function
  login: async (userId, password) => {
    set({ isLoading: true, error: null });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate credentials
    if (DEMO_ACCOUNTS[userId] && DEMO_ACCOUNTS[userId].password === password) {
      const user = {
        userId,
        role: DEMO_ACCOUNTS[userId].role,
        loginTime: new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } else {
      set({ 
        error: 'Invalid credentials. Please check your User ID and password.',
        isLoading: false 
      });
      return false;
    }
  },

  // Signup function (for demo, just validates and creates account)
  signup: async (userId, password, role) => {
    set({ isLoading: true, error: null });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if user already exists
    if (DEMO_ACCOUNTS[userId]) {
      set({ 
        error: 'User ID already exists. Please choose a different one.',
        isLoading: false 
      });
      return false;
    }

    // Validate password strength
    if (password.length < 4) {
      set({ 
        error: 'Password must be at least 4 characters long.',
        isLoading: false 
      });
      return false;
    }

    // Create new account (in demo, just add to DEMO_ACCOUNTS)
    DEMO_ACCOUNTS[userId] = { password, role };

    const user = {
      userId,
      role,
      loginTime: new Date().toISOString(),
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAuthenticated: true, isLoading: false });
    return true;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, error: null });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
