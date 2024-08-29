"use client"
import app from "@/services/firebase";
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface IDataContenxt {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

interface IDataProviderProps {
    children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const auth = getAuth(app);

const DataContext = createContext<IDataContenxt>({
    user: null,
    setUser: () => {},
});

export const DataProvider = ({ children }: IDataProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    //observador
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => {
            const user = auth.currentUser;
            if(user){
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    });

    return <DataContext.Provider value={{ user, setUser }}>{children}</DataContext.Provider>
}

//Consumer para utilizar el contexto
export function useDataContext(){
    return useContext(DataContext);
}