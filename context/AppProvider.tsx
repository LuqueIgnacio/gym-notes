import React, { createContext, useState } from 'react';

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [rutinas, setRutinas] = useState()
    return(
        <AppContext.Provider value={[rutinas, setRutinas]}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider, AppContext}