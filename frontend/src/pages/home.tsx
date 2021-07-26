import React, { ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface NewProductFormData {
    productName: string;
    productValue: number;
    productDescription: string;
}

interface NewClientFormData {
    clientName: string;
    clientAddress: string;
}

export const Home = () => {
    const history = useHistory();

    const [showNewProductForm, setShowNewProductForm] = React.useState(false);
    const [showNewClientForm, setShowNewClientForm] = React.useState(false);

    const [newProductFormData, setNewProductFormData] = React.useState<NewProductFormData>({
        productDescription: '',
        productValue: 0,
        productName: '',
    });
    const [newClientFormData, setNewClientFormData] = React.useState<NewClientFormData>({
        clientAddress: '',
        clientName: '',
    });

    function handleNewProductSubmit(event: FormEvent) {
        event.preventDefault();
        const productsList = localStorage.getItem('products');
        const newProductDTO: Product = {
            id: uuidv4(),
            productDescription: newProductFormData.productDescription,
            productName: newProductFormData.productName,
            productValue: newProductFormData.productValue,
        };

        if (productsList) {
            const parsedList = JSON.parse(productsList);
            localStorage.setItem('products', JSON.stringify([...parsedList, newProductDTO]));
        } else {
            localStorage.setItem('products', JSON.stringify([newProductDTO]));
        }
        history.push('/products');
    }

    function handleNewClientSubmit(event: FormEvent) {
        event.preventDefault();
        const clientlist = localStorage.getItem('clients');
        const newClientDTO: Client = {
            id: uuidv4(),
            clientAddress: newClientFormData.clientAddress,
            clientName: newClientFormData.clientName
        };

        if (clientlist) {
            const parsedList = JSON.parse(clientlist);
            localStorage.setItem('clients', JSON.stringify([...parsedList, newClientDTO]));
        } else {
            localStorage.setItem('clients', JSON.stringify([newClientDTO]));
        }
        history.push('/clients');
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {id, value, name} = event.target;

        if (name === 'product') {
            setNewProductFormData({...newProductFormData, [id]: value});
        } else {
            setNewClientFormData({...newClientFormData, [id]: value});
        }
    }

    return(
        <>
            <h1>Página Inicial</h1>
            <button onClick={() => setShowNewProductForm(!showNewProductForm)} type="button">
                Produto
            </button>
            <button onClick={() => setShowNewClientForm(!showNewClientForm)} type="button">
                Cliente
            </button>
            {showNewProductForm && (
                <form onSubmit={handleNewProductSubmit}>
                    <h2>Informe os dados do novo produto:</h2>
                    <label htmlFor="productName">Nome</label>
                    <input onChange={handleInputChange} type="text" id="productName" name="product"/>
                    <label htmlFor="productValue">Preço</label>
                    <input onChange={handleInputChange} type="text" id="productValue" name="product" />
                    <label htmlFor="productDescription">Descrição</label>
                    <input onChange={handleInputChange} type="text" id="productDescription" name="product" />
                    <button type="submit">Enviar</button>
                </form>
            )}
            {showNewClientForm && (
                <form onSubmit={handleNewClientSubmit}>
                    <h2>Informe os dados do novo cliente:</h2>
                    <label htmlFor="clientName">Nome</label>
                    <input onChange={handleInputChange} type="text" id="clientName" name="client" />
                    <label htmlFor="clientAddress">Endereço</label>
                    <input onChange={handleInputChange} type="text" id="clientAddress" name="client" />
                    <button type="submit">Enviar</button>
                </form>
            )}
        </>
    );
}