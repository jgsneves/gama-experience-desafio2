import { useHistory } from 'react-router-dom';

export const ProductCard = ({productName, id, productValue, productDescription}: Product) => {
    const history = useHistory();

    function handleEditButtonClick() {
        history.push(`/products/${id}`)
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL' 
    });

    function handleDeleteButtonClick() {
        const getProductList = localStorage.getItem('products');
        if (getProductList) {
            const parsedList: Product[] = JSON.parse(getProductList);
            const filteredList = parsedList.filter(product => product.id !== id);
            localStorage.setItem('products', JSON.stringify(filteredList));
            history.go(0);
        }
    }

    return(
        <article>
            <h2>{productName}</h2>
            <h3>{id}</h3>
            <h2>{formatter.format(productValue)}</h2>
            <p>{productDescription}</p>
            <button onClick={handleEditButtonClick}>Editar</button>
            <button onClick={handleDeleteButtonClick}>Excluir</button>
        </article>
    );
}