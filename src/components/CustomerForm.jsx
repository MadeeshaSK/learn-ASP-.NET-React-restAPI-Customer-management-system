//src/components/CustomerForm.jsx
import { useState, useEffect } from 'react'

const CustomerForm = ({ customer, onSave, onDelete, onClear }) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    birthday: ''
  })

  useEffect(() => {
    if (customer) {
      const birthdayFormatted = customer.birthday 
        ? new Date(customer.birthday).toISOString().split('T')[0] 
        : ''
      
        setFormData({
          id: customer.id || 0, 
          name: customer.name || '',
          email: customer.email || '', 
          phone: customer.phone || '',
          birthday: birthdayFormatted
        })
    } else {
      setFormData({
        id: 0,
        name: '',
        email: '',
        phone: '',
        birthday: ''
      })
    }
  }, [customer])

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Form validation function
  const validateForm = () => {
    // Name validation
    if (!formData.name.trim()) {
      alert('Name is required')
      return false
    }
    if (formData.name.trim().length < 2) {
      alert('Name must be more than 2 letters')
      return false
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      alert('Name can only contain letters and spaces')
      return false
    }

    // Email validation
    if (formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Please enter a valid email (e.g., user@example.com)')
        return false
      }
    }

    // Phone validation
    if (formData.phone.trim()) {
      if (!/^\d+$/.test(formData.phone)) {
        alert('Phone can only contain numbers')
        return false
      }
      if (formData.phone.length < 8) {
        alert('Phone must be more than 8 numbers')
        return false
      }
    }

    // Birthday validation
    if (!formData.birthday) {
      alert('Birthday is required')
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const dataToSend = {
        id: Number(formData.id) || 0,
        name: formData.name.trim(),
        email: formData.email?.trim() || null,
        phone: formData.phone?.trim() || null,
        birthday: formData.birthday
      }
      onSave(dataToSend)
    }
  }

  // Handle delete action
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      onDelete(formData.id)
    }
  }

  const isEditMode = formData.id !== 0

  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">
          {isEditMode ? 'Edit Customer' : customer ? 'New Customer' : 'Customer Details'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email 
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Birthday <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-save"></i> Save
            </button>
            {isEditMode && (
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={handleDelete}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={onClear}
            >
              <i className="bi bi-x-circle"></i> Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm
