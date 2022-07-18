import React from 'react';
import { useSelector } from 'react-redux';

function ProductCard() {
    const product = useSelector(state => state.products.products[0]);

    const productTags = product && product.tags.map((tag, i) => (
        <div key={i}>{tag}</div>
    ));

    return (
        <div className="product-card">
            <img src={product && product.image} alt={product && product.title} />
            <div className="product-card__title">{product && product.title}</div>
            <p>{product && product.subtitle}</p>

            <div className="product-card__tags">
                {productTags}
            </div>
        </div>
    )
}

export default React.memo(ProductCard);