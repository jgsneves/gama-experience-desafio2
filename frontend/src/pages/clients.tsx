import React from 'react';
import { ClientCard } from '../components/clientCard';

export const Clients = () => {
    const [clientList, setClientList] = React.useState<Client[] | undefined>(undefined);

    React.useEffect(() => {
        const getClientListFromLocalStorage = localStorage.getItem('clients');

        if (getClientListFromLocalStorage) {
            setClientList(JSON.parse(getClientListFromLocalStorage));
        }
    }, []);
    return(
        <>
            <h1>Clientes</h1>
            {clientList ? (
                clientList.map(client => (
                    <ClientCard 
                        clientName={client.clientName} 
                        key={client.id} 
                        id={client.id} 
                        clientAddress={client.clientAddress}
                    />
                ))
            ) : <p>Ainda não temos lista de clientes :(</p>}
        </>
    );
}