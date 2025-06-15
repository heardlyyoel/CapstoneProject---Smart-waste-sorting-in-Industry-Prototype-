import React, { useEffect, useRef } from 'react';

const DashboardEmployeeContent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Gagal mengakses kamera:', err);
      }
    };
    getCameraStream();
  }, []);

  const handleReport = () => {
    alert("Report sent to admin (dummy)");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Dashboard</h2>
      <div style={{
        width: '100%',
        height: '300px',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <button onClick={handleReport} style={{ marginTop: '20px' }}>
        ⚠️ Report Error to Admin
      </button>
    </div>
  );
};

export default DashboardEmployeeContent;
