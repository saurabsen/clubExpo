import './billingCard.css';

const BillingCard = ({ type, padding, margin }) => {
  const cardStyle = {
    padding,
    margin,
    backgroundColor: '#F3EFFB',
    borderRadius: '16px',
    border: '1px solid #E0E2E0',
  };

  return (
    <div style={cardStyle} className='billing'>
      {type === 'stater' ? (
        <div>
          <p className='billing-card-title'>Starter</p>
          <p className='billing-card-price'>
            C$ 16.99 <span className='billing-card-price-period'>/ user / month</span>
          </p>
          <p className='billing-card-content-1'>For small teams</p>
          <hr />
          <p className='billing-card-content-2'>
            Maximum of <span className='billing-card-content-2-number'>500</span> users{' '}
          </p>
        </div>
      ) : type === 'growth' ? (
        <div>
          <p className='billing-card-title'>Growth</p>
          <p className='billing-card-price'>
            C$ 14.99 <span className='billing-card-price-period'>/ user / month</span>
          </p>
          <p className='billing-card-content-1'>For growing teams</p>
          <hr />
          <p className='billing-card-content-2'>
            Maximum of <span className='billing-card-content-2-number'>2000</span> users{' '}
          </p>
        </div>
      ) : type === 'scale' ? (
        <div>
          <p className='billing-card-title'>Scale</p>
          <p className='billing-card-price'>Custom</p>
          <p className='billing-card-content-1'>For teams at scale</p>
          <hr />
          <p className='billing-card-content-2'>
            for <span className='billing-card-content-2-number'>&gt; 2000</span> users{' '}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default BillingCard;
