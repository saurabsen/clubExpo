import { createFeature, joinFeature, engagementFeature } from '../../assets';
import './featureCard.css';

const FeatureCard = ({ type, padding, margin, width, height }) => {
  const cardStyle = {
    padding,
    margin,
    width,
    height,
  };

  return (
    <div style={cardStyle}>
      {type === 'create' ? (
        <div>
          <img src={createFeature} alt='Create Club Feature Icon' className='feature-card-image' />
          <p className='feature-card-title'>Create clubs</p>
          <p className='feature-card-content'>
            Create a new club with all the necessary information, such as the club name, description.
          </p>
        </div>
      ) : type === 'join' ? (
        <div>
          <img src={joinFeature} alt='Join Club Feature Icon' className='feature-card-image' />
          <p className='feature-card-title'>Create & join events</p>
          <p className='feature-card-content'>Create and join events that are relevant to their interests.</p>
        </div>
      ) : type === 'engagement' ? (
        <div>
          <img src={engagementFeature} alt='Engagement Club Feature Icon' className='feature-card-image' />
          <p className='feature-card-title'>View engagement statistics</p>
          <p className='feature-card-content'>
            Admins with valuable insights into how engaged their members are with the club.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FeatureCard;
