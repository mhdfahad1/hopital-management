import React, { createContext, useState } from 'react'
export const loginContext = createContext()

function ContextShare({ children }) {

    const [loggined, setLoggined] = useState(false)
    return (
        <div>
            <loginContext.Provider value={{ loggined, setLoggined }}>
                {children}
            </loginContext.Provider>
        </div>
    )
}

export default ContextShare