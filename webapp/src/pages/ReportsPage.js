import React, { useState } from 'react';
import './ReportsPage.css'; // Make sure to have styles for the modal and grid
import graph1 from '../assets/graph1.png';
import graph2 from '../assets/graph2.png';
import graph3 from '../assets/graph3.png';
import graph4 from '../assets/graph4.png';
import graph5 from '../assets/graph5.png';
import graph6 from '../assets/graph6.png';

function ReportsPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const graphs = [
    { title: 'Crime Types vs Counts', img: graph1 },
    { title: 'Crime Counts per Year', img: graph2 },
    { title: 'Crime Counts per Month', img: graph3 },
    { title: 'Crime Counts by Days(of the week)', img: graph4 },
    { title: 'Arrest Rate by Crime Type', img: graph5 },
    { title: 'Crime Counts by Block', img: graph6 }
  ];

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="reports-container">
      <div className="top-navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/">Settings</a></li>
        </ul>
      </div>

      <div className="reports-content">
        <h1>Crime Analysis Reports</h1>
        <div className="cards-container">
          {graphs.map((graph, index) => (
            <div className="card" key={index} onClick={() => setSelectedImage(graph.img)}>
              <h2>{graph.title}</h2>
              <img src={graph.img} alt={graph.title} style={{ maxWidth: '100%', cursor: 'pointer' }} />
            </div>
          ))}
          {/* If you want exactly 6 graphs (2 rows of 3), the grid will just have empty spaces for the remaining cells.
              If you want to fill out all 9 cells, you could add placeholders here. */}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>
            <img src={selectedImage} alt="Expanded Graph" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
