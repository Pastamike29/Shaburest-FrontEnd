import React, { createContext } from 'react'
import './Shopcontext.css'
import ingredata from '../Context/ingredata'
export const Shopcontext = createContext(null);

const ShopContextProvider  = (props) =>{
    const contextValue = {ingredata};

    return (
        <Shopcontext.Provider value = {contextValue}>
            {props.children}
        </Shopcontext.Provider>
    )
}
export default ShopContextProvider;
