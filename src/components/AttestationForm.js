import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AttestationForm.css';

const attestationOptions = [
  {
    id: 'originalWork',
    text: 'I attest that this is my original work and I hold the necessary rights to distribute it.'
  },
  {
    id: 'noInfringement',
    text: 'I attest that this work does not infringe upon the intellectual property rights of any third party.'
  },
  {
    id: 'contentWarranty',
    text: 'I warrant that the content of this work is not unlawful and does not violate any applicable laws or regulations.'
  },
  {
    id: 'distributionRights',
    text: 'I confirm that I have the right to distribute this work through the specified channels.'
  },
  {
    id: 'accurateInformation',
    text: 'I attest that all information provided about this work is accurate and complete to the best of my knowledge.'
  }
];

function AttestationForm() {
  const [formData, setFormData] = useState({
    contractAddress: '',
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
    approvedSources: [''],
    additionalNotes: '',
    attestations: []
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (name === 'approvedSources') {
      const newSources = [...formData.approvedSources];
      newSources[index] = value;
      setFormData({ ...formData, approvedSources: newSources });
    } else if (type === 'checkbox') {
      const newAttestations = checked
        ? [...formData.attestations, value]
        : formData.attestations.filter(a => a !== value);
      setFormData({ ...formData, attestations: newAttestations });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSource = () => {
    setFormData({ ...formData, approvedSources: [...formData.approvedSources, ''] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contractAddress) newErrors.contractAddress = 'Contract address is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (formData.approvedSources.some(source => source.trim() === '')) {
      newErrors.approvedSources = 'All approved sources must be filled or removed';
    }
    if (formData.attestations.length === 0) {
      newErrors.attestations = 'Please select at least one attestation';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/preview', { state: { formData } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="attestation-form">
      <h2>Create Attestation</h2>
      <div>
        <label htmlFor="contractAddress">Contract Address:</label>
        <input
          type="text"
          id="contractAddress"
          name="contractAddress"
          value={formData.contractAddress}
          onChange={handleChange}
          required
        />
        {errors.contractAddress && <span className="error">{errors.contractAddress}</span>}
      </div>
      <div>
        <label htmlFor="title">Book Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>
      <div>
        <label htmlFor="isbn">ISBN (optional):</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Approved Sources:</label>
        {formData.approvedSources.map((source, index) => (
          <input
            key={index}
            type="url"
            name="approvedSources"
            value={source}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
        <button type="button" onClick={addSource}>Add Source</button>
        {errors.approvedSources && <span className="error">{errors.approvedSources}</span>}
      </div>
      <div>
        <h3>Attestations</h3>
        {attestationOptions.map(option => (
          <div key={option.id}>
            <input
              type="checkbox"
              id={option.id}
              name="attestations"
              value={option.id}
              checked={formData.attestations.includes(option.id)}
              onChange={handleChange}
            />
            <label htmlFor={option.id}>{option.text}</label>
          </div>
        ))}
        {errors.attestations && <span className="error">{errors.attestations}</span>}
      </div>

      <button type="submit">Generate Provenance Artifact</button>
    </form>
  );
}
export default AttestationForm;