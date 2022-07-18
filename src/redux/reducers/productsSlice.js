import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    productsCopy: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {
                ...state,
                products: [...action.payload]
            }
        },
        setDataCopy: (state, action) => {
            return {
                ...state,
                productsCopy: [...action.payload]
            }
        },
        sortData: (state, action) => {
            state.productsCopy[0].sales = action.payload.sorted;

            return state;
        }
    }
});

export const { setData, setDataCopy, sortData } = productsSlice.actions;
export default productsSlice.reducer; 