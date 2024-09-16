import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProvenanceForm from './components/ProvenanceForm';
import PDFPreview from './components/PDFPreview';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>PageProvenanceService</h1>
          <nav>
            <ul>
              <li><a href="https://pagedao.org" target="_blank" rel="noopener noreferrer">PageDAO</a></li>
              <li><a href="https://pagedao.org/about" target="_blank" rel="noopener noreferrer">About</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProvenanceForm />} />
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