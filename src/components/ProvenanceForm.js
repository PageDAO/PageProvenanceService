import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableTextArea from './ExpandableTextArea';
import '../styles/ProvenanceForm.css';
import ExpandableInput from './ExpandableInput';

const contentTypes = ['Book', 'Article', 'Research Paper', 'Other'];

const expandedAttestationOptions = [
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
  },
  {
    id: 'editionValidity',
    text: 'I confirm that this is an authorized edition of the work.'
  },
  {
    id: 'translationRights',
    text: 'I hold or have been granted the necessary rights for this translation.'
  },
];
function ProvenanceForm() {
  const [formData, setFormData] = useState({
    contractAddress: '',
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
    contentType: 'Book',
    edition: '',
    publisher: '',
    language: '',
    approvedSources: [''],
    additionalNotes: '',
    attestations: [],
    customAttestation: ''
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

  const removeSource = (index) => {
    const newSources = formData.approvedSources.filter((_, i) => i !== index);
    setFormData({ ...formData, approvedSources: newSources });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you could add blockchain integration
      // const contractAddress = await generateSmartContract(formData);
      // setFormData({ ...formData, contractAddress });
      navigate('/preview', { state: { formData } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="provenance-form">
      <h2>Create Provenance Artifact</h2>
      
      <div className="form-group">
        <label htmlFor="contractAddress">Contract Address:</label>
        <input
          id="contractAddress"
          name="contractAddress"
          type="text"
          value={formData.contractAddress}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.contractAddress}
        />
        {errors.contractAddress && <span className="error" role="alert">{errors.contractAddress}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="title">Book Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.title}
        />
        {errors.title && <span className="error" role="alert">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.author}
        />
        {errors.author && <span className="error" role="alert">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN:</label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="publicationDate">Publication Date:</label>
        <input
          id="publicationDate"
          name="publicationDate"
          type="month"
          value={formData.publicationDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contentType">Content Type:</label>
        <select
          id="contentType"
          name="contentType"
          value={formData.contentType}
          onChange={handleChange}
        >
          {contentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Approved Sources:</label>
        {formData.approvedSources.map((source, index) => (
          <div key={index} className="approved-sources">
            <input
              type="url"
              name="approvedSources"
              value={source}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter approved source URL"
            />
            <button type="button" onClick={() => removeSource(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSource}>Add Source</button>
        {errors.approvedSources && <span className="error" role="alert">{errors.approvedSources}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="additionalNotes">Additional Notes:</label>
        <ExpandableTextArea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Enter any additional information about the book's provenance"
        />
      </div>

      <fieldset>
        <legend>Attestations</legend>
        {expandedAttestationOptions.map(option => (
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
      </fieldset>
      {errors.attestations && <span className="error" role="alert">{errors.attestations}</span>}

      <button type="submit">Generate Provenance Artifact</button>
    </form>
  );
}
export default ProvenanceForm;