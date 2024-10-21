import React, { useState, useEffect } from 'react';
import { getUserEscrows } from '../utils/contractInteractions';

function EscrowList({ setSelectedEscrow }) {
  const [escrows, setEscrows] = useState([]);

  useEffect(() => {
    const fetchEscrows = async () => {
      try {
        const userEscrows = await getUserEscrows();
        setEscrows(userEscrows);
      } catch (error) {
        console.error('Error fetching escrows:', error);
      }
    };
    fetchEscrows();
  }, []);

  return (
    <div className="escrow-list">
      <h2>My Escrows</h2>
      <ul>
        {escrows.map((escrow) => (
          <li key={escrow.id} onClick={() => setSelectedEscrow(escrow)}>
            Escrow #{escrow.id} - {escrow.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EscrowList;
