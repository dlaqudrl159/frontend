import React, { useEffect, useRef, useState, memo, useMemo, useCallback} from 'react';
import { json } from 'react-router-dom';
import AptTranscationHistory from './AptTranscationHistory';

const SidePanel = memo(({selectedMarkerData , setSelectedMarkerData}) => {
  console.log("SideModal 함수")
  const modalRef = useRef();
  
  const [selectedApartment, setSelectedApartment] = useState(null);

  const onClose = () => {
    setSelectedMarkerData(null);
  }

  useEffect(() => {

    const handleClickOutside = (event) => {
      console.log(modalRef.current)
      console.log(event)
      console.log(event.target)
      console.log(!modalRef.current.contains(event.target));
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedMarkerData(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSelectedMarkerData]);

  const handleApartmentClick = useCallback((apartment) => {
    console.log(apartment);
    setSelectedApartment(apartment);
  },[setSelectedApartment]);

  const rederData = useMemo(() => {

    return Object.entries(selectedMarkerData).map(([key, value]) => (
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
    ))

  },[selectedMarkerData,handleApartmentClick])

  if (!selectedMarkerData) return null;
  return (
    <>
    {console.log("SideModal 랜더")}
    
    <div style={styles.overlay}>
      <div ref={modalRef} style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <h2>목록</h2>
        <div>
        {rederData || <p>데이터가 없습니다.</p>}
        </div>
      </div>
    </div>
    {selectedApartment && (
        <AptTranscationHistory
          apartmentData={selectedApartment}
        />
      )}

    </>
  );
});

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

export default SidePanel;