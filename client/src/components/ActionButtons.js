import React from 'react';
import {
  releaseToSeller,
  refundToBuyer,
  dispute,
  resolveDispute,
  cancelEscrow,
  extendTimeout,
  rateTransaction
} from '../utils/contractInteractions';

function ActionButtons({ escrow }) {
  const handleAction = async (action, ...args) => {
    try {
      await action(escrow.id, ...args);
      // Update escrow status or show success message
    } catch (error) {
      console.error(`Error performing action:`, error);
      // Show error message to user
    }
  };

  return (
    <div className="action-buttons">
      {escrow.status === 'funded' && (
        <>
          <button onClick={() => handleAction(releaseToSeller)}>Release to Seller</button>
          <button onClick={() => handleAction(refundToBuyer)}>Refund to Buyer</button>
          <button onClick={() => handleAction(dispute)}>Dispute</button>
          <button onClick={() => handleAction(cancelEscrow)}>Cancel Escrow</button>
          <button onClick={() => handleAction(extendTimeout, 1440)}>Extend Timeout (1 day)</button>
        </>
      )}
      {escrow.status === 'disputed' && (
        <>
          <button onClick={() => handleAction(resolveDispute, true)}>Resolve (To Seller)</button>
          <button onClick={() => handleAction(resolveDispute, false)}>Resolve (To Buyer)</button>
        </>
      )}
      {['completed', 'refunded', 'resolved'].includes(escrow.status) && !escrow.rating && (
        <div>
          <p>Rate this transaction:</p>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button key={rating} onClick={() => handleAction(rateTransaction, rating)}>
              {rating} Star{rating !== 1 ? 's' : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
