// src/ContactForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import { createContact, updateContact } from './apiService';

const ContactForm = ({ fetchContacts, selectedContact, setSelectedContact }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    } else {
      // Reset the form when no contact is selected
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedContact) {
        // Update existing contact
        await updateContact(selectedContact._id, contact);
        setSelectedContact(null);
      } else {
        // Create new contact
        await createContact(contact);
      }
      // Reset form
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 3 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        {selectedContact ? 'Edit Contact' : 'Add New Contact'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={contact.firstName}
              onChange={handleChange}
            />
          </Grid>
          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              value={contact.lastName}
              onChange={handleChange}
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={contact.email}
              onChange={handleChange}
            />
          </Grid>
          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={contact.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          {/* Company */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="company"
              label="Company"
              value={contact.company}
              onChange={handleChange}
            />
          </Grid>
          {/* Job Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="jobTitle"
              label="Job Title"
              value={contact.jobTitle}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-start" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            {selectedContact ? 'Update Contact' : 'Add Contact'}
          </Button>
          {selectedContact && (
            <Button
              onClick={() => setSelectedContact(null)}
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactForm;
