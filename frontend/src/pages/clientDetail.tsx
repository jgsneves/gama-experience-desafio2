import React, { ChangeEvent, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


export const ClientDetail = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const [clientDetails, setClientDetails] = React.useState<Client>({} as Client);

    function handleNewClientSubmit(event: FormEvent) {
        event.preventDefault();
        const getClientList = localStorage.getItem('clients');
        if (getClientList) {
            const parsedList: Client[] = JSON.parse(getClientList);
            const filteredList = parsedList.filter(client => client.id !== clientDetails.id);
            const newClientList = [...filteredList, clientDetails];
            localStorage.setItem('clients', JSON.stringify(newClientList));
            history.push('/clients');
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {id , value} = event.target;
        setClientDetails({...clientDetails, [id]: value})
    }

    React.useEffect(() => {
        const getClientList = localStorage.getItem('clients');
        if (getClientList) {
            const parsedList: Client[] = JSON.parse(getClientList);
            const id = pathname.replace('/clients/', '');
            const clientObject = parsedList.filter(client => client.id === id)[0];
            setClientDetails(clientObject);
        }
    }, [pathname]);

    return(
        <form onSubmit={handleNewClientSubmit}>
                <h1>Dados do cliente</h1>
                <h2>{clientDetails?.id}</h2>
                <label htmlFor="clientName">Nome</label>
                <input 
                    onChange={handleInputChange} 
                    type="text" 
                    id="clientName"
                />
                <label htmlFor="clientAddress">Endereço</label>
                <input 
                    onChange={handleInputChange} 
                    type="text" 
                    id="clientAddress" 
                />
                <button type="submit">Salvar</button>
        </form>
    );
}