import React from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import logo from '../assets/page_dao_logo.jpg';
import '../styles/PDFPreview.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
  publisherInfo: {
    marginLeft: 10,
  },
});

const attestationOptions = {
  originalWork: 'I attest that this is my original work and I hold the necessary rights to distribute it.',
  noInfringement: 'I attest that this work does not infringe upon the intellectual property rights of any third party.',
  contentWarranty: 'I warrant that the content of this work is not unlawful and does not violate any applicable laws or regulations.',
  distributionRights: 'I confirm that I have the right to distribute this work through the specified channels.',
  accurateInformation: 'I attest that all information provided about this work is accurate and complete to the best of my knowledge.'
};

function PDFPreview() {
  const location = useLocation();
  const { formData } = location.state;

  const ProvenanceDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <Text>Provenance Artifact</Text>
        </View>
        <Text style={styles.title}>Page Provenance Service</Text>
        <Text>This document certifies the legitimacy and provenance of the associated content.</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>CAIP Address:</Text>
          <Text style={styles.value}>{formData.caipAddress}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{formData.title}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Author:</Text>
          <Text style={styles.value}>{formData.author}</Text>
        </View>
        
        {formData.isbn && (
          <View style={styles.section}>
            <Text style={styles.label}>ISBN:</Text>
            <Text style={styles.value}>{formData.isbn}</Text>
          </View>
        )}
        
        {formData.publicationDate && (
          <View style={styles.section}>
            <Text style={styles.label}>Publication Date:</Text>
            <Text style={styles.value}>{formData.publicationDate}</Text>
          </View>
        )}
        
        {formData.publisherInfo && (
          <View style={styles.section}>
            <Text style={styles.label}>Publisher Information:</Text>
            <View style={styles.publisherInfo}>
              <Text style={styles.value}>Publisher: {formData.publisherInfo.name}</Text>
              <Text style={styles.value}>Format: {formData.publisherInfo.format}</Text>
              <Text style={styles.value}>Distribution: {formData.publisherInfo.distribution.join(', ')}</Text>
            </View>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.label}>License:</Text>
          <Text style={styles.value}>{formData.isCC0 ? 'CC0' : 'All Rights Reserved'}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Approved Sources:</Text>
          {formData.approvedSources.map((source, index) => (
            <Text key={index} style={styles.value}>{source}</Text>
          ))}
        </View>
        
        {formData.additionalNotes && (
          <View style={styles.section}>
            <Text style={styles.label}>Additional Notes:</Text>
            <Text style={styles.value}>{formData.additionalNotes}</Text>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.label}>Attestations:</Text>
          {formData.attestations.map((attestation, index) => (
            <Text key={index} style={styles.value}>
              • {attestationOptions[attestation]}
            </Text>
          ))}
        </View>
        
        <View style={styles.footer}>
          <Text>This is a 1/1 Page Provenance Service artifact. Its existence certifies the legitimacy of the associated content.</Text>
          <Text>Generated on: {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="pdf-preview">
      <h2>Provenance Artifact Preview</h2>
      <PDFViewer width="100%" height="600px">
        <ProvenanceDocument />
      </PDFViewer>
    </div>
  );
}

export default PDFPreview;