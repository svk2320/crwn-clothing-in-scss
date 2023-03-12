import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../services/firebase/firebase.services.js";

import SHOP_DATA from '../data/shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
    // eslint-disable-next-line
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() =>{
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}