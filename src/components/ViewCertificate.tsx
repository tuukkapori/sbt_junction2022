import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCertificateById } from '../services/firebase';

const ViewCertificate = () => {
  const [loading, setLoading] = useState(true);
  const [certFound, setCertFound] = useState(false);
  const [certificate, setCertificate] = useState<any>({
    test: 'text',
    lmao: 'fuck',
  });
  const { certificateId } = useParams();
  console.log('certId ', certificateId);

  useEffect(() => {
    const showCert = async () => {
      setLoading(true);
      const cert = await getCertificateById(certificateId);
      if (cert) {
        setCertFound(true);
        setCertificate(cert);
      } else {
        setCertFound(false);
      }
      setLoading(false);
    };
    showCert();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {certFound ? (
            <>
              {' '}
              <h4>Certificate</h4>
              <h2>{certificateId}</h2>
              <pre>{JSON.stringify(certificate, null, 2)}</pre>
            </>
          ) : (
            <>
              <h2>Certificate not found.</h2>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewCertificate;
