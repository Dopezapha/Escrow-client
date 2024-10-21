import React, { useState } from 'react';
import { createEscrow } from '../utils/contractInteractions';

function CreateEscrow() {
  const [seller, setSeller] = useState('');
  const [buyer, setBuyer] = useState('');
  const [arbiter, setArbiter] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEscrow(seller, buyer, arbiter, amount);
      // Reset form or show success message
    } catch (error) {
      console.error('Error creating escrow:', error);
      // Show error message to user
    }
  };

  return (
    <div className="create-escrow">
      <h2>Create New Escrow</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Seller Address" value={seller} onChange={(e) => setSeller(e.target.value)} required />
        <input type="text" placeholder="Buyer Address" value={buyer} onChange={(e) => setBuyer(e.target.value)} required />
        <input type="text" placeholder="Arbiter Address" value={arbiter} onChange={(e) => setArbiter(e.target.value)} required />
        <input type="number" placeholder="Amount (STX)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Create Escrow</button>
      </form>
    </div>
  );
}

export default CreateEscrow;
