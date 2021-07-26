import React from 'react';
import { ProductCard } from '../components/productCard';

export const Products = () => {
    const [productList, setProductList] = React.useState<Product[] | undefined>();

    React.useEffect(() => {
        const getProductListFromLocalStorage = localStorage.getItem('products');

        if (getProductListFromLocalStorage) {
            setProductList(JSON.parse(getProductListFromLocalStorage));
        }
    }, []);
    return(
        <>
            <h1>Produtos</h1>
            {productList ? (
                productList.map(product => (
                    <ProductCard 
                        productDescription={product.productDescription} 
                        id={product.id} 
                        key={product.id} 
                        productName={product.productName} 
                        productValue={product.productValue}
                    />
                ))
            ) : <p>Ainda não temos uma lista de produtos :(</p>}
        </>
    );
}