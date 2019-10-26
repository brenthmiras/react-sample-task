import React, { Component } from 'react';
import http from 'axios';

export default class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            // Initialize loading state to false
            // Tells whether to show loading indicator
            isLoading: false,

            // Initialize contacts list
            contacts: []
        }

        // Bind retrieveContacts method's 'this'
        this.retrieveContacts = this.retrieveContacts.bind(this);
    }

    componentDidMount() {

        // Show loading indicator
        this.setState({isLoading: true});

        // Retrieve contacts from server
        this.retrieveContacts()
            .then( contacts => {
    
                this.setState({
                    // If successful, store the list to state
                    contacts,

                    // and dismiss the loading indicator
                    isLoading: false
                });
            })
            .catch((e) => {
                
                // Log the error for debugging
                console.error(e);

                // Show simple alert
                alert("Could not load data!");

                // and dismiss the loading indicator
                this.setState({isLoading: false});
            });
    }

    retrieveContacts() {

        const url = `http://localhost:3000/contacts`;

        return http.get(url)
        .then( response => {

            // Extract contacts list from response
            return response.data.contacts;
        });
    }

    render() {

        const {contacts, isLoading} = this.state;

        return (
            <div className="container-fluid">
                <br/>
                <ContactsList items={contacts}/>

                { isLoading ? 
                    <div align="center">
                        Loading... Please wait.
                    </div>
                    : ''
                }
            </div>
        );
    }
}

function ContactsList(props) {

    const {items} = props;

    const table_headers = (
        <tr>
            <th scope="col">NAME</th>
            <th scope="col">COMPANY NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">WORK PHONE</th>
            <th scope="col">GST TREATMENT</th>
            <th scope="col">RECEIVABLES</th>
            <th scope="col">PAYABLES</th>
        </tr>
    );

    const table_rows = items.map( (item, index) => {
        return (
            <tr key={item.id || index}>
                <td>{item.contact_name}</td>
                <td>{item.company_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.gst_treatment}</td>
                <td>{item.outstanding_receivable_amount}</td>
                <td>{item.outstanding_payable_amount}</td>
            </tr>
        );
    });

    return (
        <table className="table table-hover">
            <thead>
                {table_headers}
            </thead>
            <tbody>
                {table_rows}
            </tbody>
        </table>
    );
}
