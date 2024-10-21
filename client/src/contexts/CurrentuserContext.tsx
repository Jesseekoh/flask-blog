import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';
export interface ICurrentUser {
    username: string;
    isLoggedIn: boolean;
    userId: string;
    userEmail: string;
}

export type CurrentUserContextType = {
    currentUser: ICurrentUser;
    // setCurrentUser: (user: ICurrentUser) => void;
    setCurrentUser: Dispatch<SetStateAction<ICurrentUser>>;
};
export const CurrentUserContext = createContext<CurrentUserContextType | null>(
    null
);

type Props = {
    children: string | ReactNode;
};
export const CurrentUserContextProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<ICurrentUser>({
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
