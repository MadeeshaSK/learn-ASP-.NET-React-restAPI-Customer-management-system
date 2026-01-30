//src/components/CustomerList.jsx
const CustomerList = ({ customers, selectedCustomer, onSelectCustomer, onNewCustomer }) => {
    return (
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Customer List</h5>
          <button 
            className="btn btn-sm btn-light" 
            onClick={onNewCustomer}
          >
            <i className="bi bi-plus-circle"></i> New
          </button>
        </div>
        <div className="card-body p-0">
          <div style={{ height: '500px', overflowY: 'auto' }}>
            {customers.length > 0 ? (
              customers.map(customer => (
                <div
                  key={customer.id}
                  className={`customer-item p-3 border-bottom ${
                    selectedCustomer?.id === customer.id ? 'active' : ''
                  }`}
                  onClick={() => onSelectCustomer(customer)}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{customer.name}</strong><br />
                  <small className="text-muted">{customer.email}</small>
                </div>
              ))
            ) : (
              <div className="text-center text-muted p-4">
                No customers found
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  export default CustomerList
  