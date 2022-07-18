import React from 'react';
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard';
import ProductGraph from './ProductGraph';
import ProductTable from './ProductTable';

function Main() {
    const data = useSelector(state => state.products.products[0]);
    const sales = data && data.sales;

    return (
        <div className="main">
            <ProductCard />
            <ProductGraph data={sales} width={700} height={200} />
            <ProductTable />
        </div>
    )
}

export default React.memo(Main);