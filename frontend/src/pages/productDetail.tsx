import React, { ChangeEvent, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


export const ProductDetail = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const [productDetails, setProductDetails] = React.useState<Product>({} as Product);

    function handleProductDetailSubmit(event: FormEvent) {
        event.preventDefault();
        const getProductList = localStorage.getItem('products');
        if (getProductList) {
            const parsedList: Product[] = JSON.parse(getProductList);
            const filteredList = parsedList.filter(product => product.id !== productDetails.id);
            const newClientList = [...filteredList, productDetails];
            localStorage.setItem('products', JSON.stringify(newClientList));
            history.push('/products');
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {id , value} = event.target;
        setProductDetails({...productDetails, [id]: value})
    }

    React.useEffect(() => {
        const getProductList = localStorage.getItem('products');
        if (getProductList) {
            const parsedList: Product[] = JSON.parse(getProductList);
            const id = pathname.replace('/products/', '');
            const productObject = parsedList.filter(product => product.id === id)[0];
            setProductDetails(productObject);
        }
    }, [pathname]);

    return(
        <form onSubmit={handleProductDetailSubmit}>
            <h2>Informe os novos dados do produto:</h2>
            <h3>{productDetails.id}</h3>
            <label htmlFor="productName">Nome</label>
            <input onChange={handleInputChange} type="text" id="productName" name="product"/>
            <label htmlFor="productValue">Preço</label>
            <input onChange={handleInputChange} type="text" id="productValue" name="product" />
            <label htmlFor="productDescription">Descrição</label>
            <input onChange={handleInputChange} type="text" id="productDescription" name="product" />
            <button type="submit">Enviar</button>
        </form>
    );
}