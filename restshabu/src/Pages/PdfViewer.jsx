import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onError = (err) => {
    setError(err);
    console.error('Error while loading PDF:', err);
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="navigation-buttons" style={{justifyContent:'center', width: '100%', display: 'flex' }}>
        <button onClick={handlePrevious} style={{  backgroundColor:'green',color:'white', width:'auto', marginRight: '5px' }}>
          Previous
        </button>
        <button onClick={handleNext} style={{backgroundColor:'red',color:'white',width:'auto', marginLeft: '5px', marginRight: '5px' }}>
          Next
        </button>
        <Link to='/queue'><button onClick={handleNext} style={{ backgroundColor:'#5c91fe',color:'white',width:'auto', marginLeft: '5px' }}>
          Go to Booktablepage
        </button></Link>
      </div>
              {error && <div>Error: {error.message}</div>}
<div style={{ width: 'fit-content', maxWidth: '800px', textAlign: 'center' }}>
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onError}
        >
          <Page
             pageNumber={pageNumber}
            renderTextLayer={false} // Disable text layer rendering
          />
                  </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
