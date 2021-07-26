import { useHistory } from 'react-router-dom';

export const ClientCard = ({clientAddress, id, clientName}: Client) => {
    const history = useHistory();

    function handleEditButtonClick() {
        history.push(`/clients/${id}`)
    }

    function handleDeleteButtonClick() {
        const getClientsList = localStorage.getItem('clients');
        if (getClientsList) {
            const parsedList: Client[] = JSON.parse(getClientsList);
            const filteredList = parsedList.filter(client => client.id !== id);
            localStorage.setItem('clients', JSON.stringify(filteredList));
            history.go(0);
        }
    }
    
    return(
        <article>
            <h2>{clientName}</h2>
            <h3>{id}</h3>
            <p>Endereço:</p>
            <p>{clientAddress}</p>
            <button onClick={handleEditButtonClick}>Editar</button>
            <button onClick={handleDeleteButtonClick}>Excluir</button>
        </article>
    );
}