import { createContext, useState, ReactElement, ReactNode } from 'react';
export interface currentUserContextType {
    username: string;
    isLoggedIn: boolean;
    userId: string;
    userEmail: string;
}

export const CurrentUserContext = createContext<currentUserContextType | null>(
    null
);

type Props = {
    children: string | ReactNode;
};
export const CurrentUserContextProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<currentUserContextType>({
        username: '',
        userId: '',
        userEmail: '',
        isLoggedIn: false,
    });
    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
