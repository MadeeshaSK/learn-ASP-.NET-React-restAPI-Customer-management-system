// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import customerService from './services/customerService';
import './App.css';

function App() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const data = await customerService.getAll();
            setCustomers(data);
        } catch (error) {
            console.error('Error loading customers:', error);
            alert('Error loading customers. Please check if the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleNewCustomer = () => {
        setSelectedCustomer({
            id: 0,
            name: '',
            email: '',
            phone: '',
            birthday: ''
        });
    };

    const handleSaveCustomer = async (formData) => {
        try {
            if (formData.id === 0) {
                await customerService.create(formData);
                alert('Customer created successfully!');
            } else {
                await customerService.update(formData.id, formData);
                alert('Customer updated successfully!');
            }
            await loadCustomers();
            setSelectedCustomer(null);
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('Error saving customer. Please try again.');
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            await customerService.delete(id);
            alert('Customer deleted successfully!');
            await loadCustomers();
            setSelectedCustomer(null);
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('Error deleting customer. Please try again.');
        }
    };

    const handleClearForm = () => {
        setSelectedCustomer(null);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container-fluid mt-4">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <CustomerList
                            customers={customers}
                            selectedCustomer={selectedCustomer}
                            onSelectCustomer={handleSelectCustomer}
                            onNewCustomer={handleNewCustomer}
                        />
                    </div>
                    <div className="col-md-8">
                        <CustomerForm
                            customer={selectedCustomer}
                            onSave={handleSaveCustomer}
                            onDelete={handleDeleteCustomer}
                            onClear={handleClearForm}
                        />
                    </div>
                </div>
            </main>
            <footer className="footer mt-5 py-3 bg-light">
                <div className="container text-center">
                    <span className="text-muted">
                        © 2026 Customer Management System | MadeeshaSK @ Github
                    </span>
                </div>
            </footer>
        </>
    );
}

export default App;