import { useLocalStore } from "mobx-react-lite";
import React from "react";

export const StoreContext = React.createContext<any>(null);

export const StoreProvider: React.FC<{}> = ({ children }) => {
    const store = useLocalStore(() => ({ 
        todos: ["sing", "play", "workout"],
        title: "Mobx Tilte"
    }));

    return (
        <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
    )
}