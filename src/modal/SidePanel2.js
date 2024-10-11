import React, { useEffect, useRef, useState } from 'react';
import { json } from 'react-router-dom';
import AptTranscationHistory from './AptTranscationHistory';

const SideModal2 = ({ isOpen, onClose, data }) => {
  const modalRef = useRef();
  
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setTransactionModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleApartmentClick = (apartment) => {
    setSelectedApartment(apartment);
    setTransactionModalOpen(true);
  };

  return (
    <>
    <div style={styles.overlay}>
      <div ref={modalRef} style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <h2>목록</h2>
        {data ? (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {typeof value === 'object' && value !== null ? (
                <div>
                <pre onClick={() => handleApartmentClick(value)}>{value.apartmentname}</pre>
                <pre>{value.sigungu + " " + value.bungi}</pre>
                <pre>{value.roadname}</pre>
                </div>
              ) : (
                <span>{value}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
      </div>
    </div>
    {selectedApartment && (
        <AptTranscationHistory
          isOpen={transactionModalOpen}
          onClose={() => setTransactionModalOpen(false)}
          apartmentData={selectedApartment}
        />
      )}
      
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '300px',
    backgroundColor: 'white',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    padding: '20px',
    overflowY: 'auto',
    transform: 'translateX(0)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1001,
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer'
  },
  apartMentName: {

  }
};

export default SideModal2;