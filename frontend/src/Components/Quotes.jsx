import React from 'react'
import {useNavigate} from 'react-router-dom';


function Quotes({source, quote}) {
  const navigate = useNavigate();

  const handlenavigate = async () => {
    navigate("/editform",{state:{quote:quote}})
  }
  
  const styles = {
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    },
    source: {
      fontSize: '1.2em',
      marginBottom: '8px',
      color: '#333'
    },
    text: {
      fontSize: '1em',
      color: '#666'
    }
  };

  return (
    <div style={styles.card}>
        <h3 style={styles.source}>{source}</h3>
        <hr />
        <p style={styles.text}>{quote}</p>
        <div>
          <button onClick={()=>handlenavigate()}>Edit</button>
        </div>
    </div>
  )
}

export default Quotes