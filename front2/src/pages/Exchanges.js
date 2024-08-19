// En Exchange.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Exchange = () => {
    const [exchange, setExchange] = useState(null);
    const [exchanges, setExchanges] = useState([]);
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');
    const [loanDate, setLoanDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [username, setUsername] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/exchange/me', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) throw new Error('Error fetching user');

                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const fetchExchanges = async () => {
        try {
            const response = await fetch('http://localhost:5000/exchange/exchange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Error fetching exchanges');

            const data = await response.json();
            setExchanges(data);
        } catch (error) {
            console.error('Error fetching exchanges:', error);
        }
    };

    const fetchExchangeById = async (exchangeId) => {
        try {
            const response = await fetch('http://localhost:5000/exchange/getExchange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ id: exchangeId })
            });
            if (!response.ok) throw new Error('Error fetching exchange details');

            const data = await response.json();
            setExchange(data);
        } catch (error) {
            console.error('Error fetching exchange details:', error);
        }
    };

    const requestBook = async (e) => {
        e.preventDefault();
        if (title.trim() && owner.trim() && loanDate.trim() && returnDate.trim()) {
            try {
                const response = await fetch('http://localhost:5000/exchange/createExchange', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        owner: owner,
                        title: title,
                        loanDate: loanDate,
                        returnDate: returnDate,
                        requester: username
                    }),
                });
                if (response.ok) {
                    fetchExchanges();
                    setTitle('');
                    setOwner('');
                    setLoanDate('');
                    setReturnDate('');
                } else {
                    const errorData = await response.json();
                    console.error('Error requesting book:', errorData.error);
                }
            } catch (error) {
                console.error('Error requesting book:', error);
            }
        }
    };

    const viewDetails = (exchangeId) => {
        navigate(`/exchanges/${exchangeId}`);
    };

    useEffect(() => {
        if (id) {
            fetchExchangeById(id);
        } else {
            fetchExchanges();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('http://localhost:5000/exchange/createExchange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    owner: owner,
                    loanDate: loanDate,
                    returnDate: returnDate,
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Exchange created:', data);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    return (
        <div>
            {!id && (
                <>
                    <form onSubmit={requestBook} style={formStyle}>
                        <h2>Request a Book</h2>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Book Title"
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder="Owner"
                            style={inputStyle}
                        />
                        <label style={labelStyle}>Loan Date</label>
                        <input
                            type="date"
                            value={loanDate}
                            onChange={(e) => setLoanDate(e.target.value)}
                            style={inputStyle}
                        />
                        <label style={labelStyle}>Return Date</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            style={inputStyle}
                        />
                        <button type="submit" style={buttonStyle}>Request Book</button>
                    </form>
                    <ul>
                        {exchanges.map((exchange) => (
                            <li key={exchange._id} onClick={() => viewDetails(exchange._id)}>
                                {exchange.title} - {exchange.owner.username} - {exchange.status}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {id && exchange && (
                <div>
                    <h2>Exchange Details</h2>
                    <p><strong>Title:</strong> {exchange.title}</p>
                    <p><strong>Requester:</strong> {exchange.requester.username}</p>
                    <p><strong>Owner:</strong> {exchange.owner.username}</p>
                    <p><strong>Book:</strong> {exchange.book.title}</p>
                    <p><strong>Status:</strong> {exchange.status}</p>
                </div>
            )}
        </div>
    );
};

// Estilos en línea
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto'
};

const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
};

const labelStyle = {
    marginTop: '10px'
};

export default Exchange;
