import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AttestationForm from './components/AttestationForm';
import PDFPreview from './components/PDFPreview';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Page Provenance Service</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AttestationForm />} />
            <Route path="/preview" element={<PDFPreview />} />
          </Routes>
        </main>
        <footer>
          <p>© 2024 PageDAO</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;