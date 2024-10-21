import React from 'react';
import ActionButtons from './ActionButtons';

function EscrowDetails({ escrow }) {
  return (
    <div className="escrow-details">
      <h2>Escrow #{escrow.id} Details</h2>
      <p><strong>Status:</strong> {escrow.status}</p>
      <p><strong>Seller:</strong> {escrow.seller}</p>
      <p><strong>Buyer:</strong> {escrow.buyer}</p>
      <p><strong>Arbiter:</strong> {escrow.arbiter}</p>
      <p><strong>Amount:</strong> {escrow.amount} STX</p>
      <p><strong>Fee:</strong> {escrow.fee} STX</p>
      <p><strong>Created at:</strong> Block #{escrow.createdAt}</p>
      {escrow.rating && <p><strong>Rating:</strong> {escrow.rating}/5</p>}
      <ActionButtons escrow={escrow} />
    </div>
  );
}

export default EscrowDetails;
