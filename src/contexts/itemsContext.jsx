import { createContext } from "react";

const ItemContext = createContext()

export const Provider =({children})=> {
    return <ItemContext.Provider value="1">{children}</ItemContext.Provider>
}