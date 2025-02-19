import { createContext } from 'react';
import { MyContextType } from './model/contextApi';
export const MyContext = createContext<MyContextType>({
    theme: 'light',
    user: 'Guest',
    toggleTheme: () => {}, // Default function (no-op)
});
