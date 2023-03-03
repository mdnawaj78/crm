import axios from 'axios';
import React, { useState } from 'react';
import styles from './New_Lead.module.css'; 

const NewLead = () => {

  const [formData, setFormData] = useState({
    status: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    interest: '',
    source: '',
    remarks: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate form
    const validationErrors = {};
    if (formData.name.trim() === '') {
      validationErrors.name = 'Name is required';
    }
    if (formData.email.trim() === '') {
      validationErrors.email = 'Email is required';
    }
    if (formData.phone.trim() === '') {
      validationErrors.phone = 'Phone is required';
    }
    if (formData.country.trim() === '') {
      validationErrors.country = 'Country is required';
    }
    if (formData.interest.trim() === '') {
      validationErrors.interest = 'Interest is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost/crm/newleads.php', formData);
      setFormData({
        status: '',
        name: '',
        email: '',
        phone: '',
        country: '',
        interest: '',
        source: '',
        remarks: ''
      });
      setErrors({});
      window.location.href = '/crm';
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };
  
 
  return (
    <div className={styles.parent}>
      <div className={styles.login_container}>
        <h2>New Lead</h2>
        <form onSubmit={handleSubmit}>
          <select
            className={styles.form_input}
            name="status"
            value={formData.status}
            onChange={handleChange}
             
          >
            <option value="" disabled>Select</option>
            <option value="New">New</option>
            <option value="Connected">Connected</option>
            <option value="Not_Interested">Not Interested</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="UserName"
            className={styles.form_input}
            value={formData.name}
            onChange={handleChange}
             
          />
          {errors.name && <p className={styles.error_message}>{errors.name}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.form_input}
            value={formData.email}
            onChange={handleChange}
             
          />
          {errors.email && <p className={styles.error_message}>{errors.email}</p>}
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className={styles.form_input}
            value={formData.phone}
            onChange={handleChange}
             
          />
          {errors.phone && <p className={styles.error_message}>{errors.phone}</p>}
          <input
            type="text"
            name="country"
            placeholder="Country"
            className={styles.form_input}
            value={formData.country}
            onChange={handleChange}
             
          />
          {errors.country && <p className={styles.error_message}>{errors.country}</p>}
          <input
            type="text"
            name="interest"
            placeholder="Interest"
            className={styles.form_input}
            value={formData.interest}
            onChange={handleChange}
            // required
          />
          {errors.interest && <p className={styles.error_message}>{errors.interest}</p>}

          <select
            className={styles.form_input}
            name="source"
            value={formData.source}
            onChange={handleChange}
            // required
          >
            <option value="" disabled>Select</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Tiktok">Tiktok</option>
          </select>
          {errors.source && <p className={styles.error_message}>{errors.source}</p>}
          
          <input
            type="text"
            name="remarks"
            placeholder="remarks"
            className={styles.form_input}
            value={formData.remarks}
            onChange={handleChange}
            // required
          />
          {errors.remarks && <p className={styles.error_message}>{errors.remarks}</p>}

          <button type="submit" className={styles.form_button}>
            Submit
          </button>
        </form>
      </div>
    </div>

  );
};

export default NewLead;
