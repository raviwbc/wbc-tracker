import { createContext } from 'react';
export const MyContext = createContext<MyContextType>({
    theme: 'light',
    user: 'Guest',
    toggleTheme: () => {}, // Default function (no-op)
});
