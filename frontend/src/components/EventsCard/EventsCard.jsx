import './eventscard.css';
import locationSvg from '../../assets/icons/location.svg';
import calendarSvg from '../../assets/icons/calendar.svg';
import moneySvg from '../../assets/icons/money.svg';
import clockSvg from '../../assets/icons/clock.svg';
import Button from '@mui/material/Button';
import {ReactComponent as ShareSvg} from '../../assets/icons/share.svg';
import ButtonDropMenu from '../ButtonDropMenu/ButtonDropMenu';

const EventsCard = ({clubName,
  clubLogoUrl,
  eventName,
  eventDesc,
  eventDate,
  eventTime,
  eventLoc,
  eventPrice,
  eventImgUrl,
  numberOfAttendees,
  registerClickHandler,
  cardClickHandler,
  shareClickHandler,
  attendeeImgUrlList,
  withinClub=false,
  registered=false,
  clubAdminView=false}) => {

  const clubBrand = (
    <div className="eventscard-clubbrand">
      <div className="eventscard-clubbrand-logo" style={{backgroundImage: `url(${clubLogoUrl})`}}></div>
      <p>{clubName}</p>
    </div>
  );

  const notRegisteredBtn = (
    <Button style={{width: '100%'}} variant='contained'>Register</Button>
  );

  const registeredBtn = (
    <ButtonDropMenu style={{width: '100%'}} />
  );

  return (
    <div className="eventscard" >
      <div className="eventscard-header">
        {(withinClub === false) ? clubBrand : ""}
        <h4 className='desktopEventName'>{eventName}</h4>
      </div>
      <div className="eventscard-img-btn-wrapper">
        <div className="eventscard-main-image" style={{backgroundImage: `url(${eventImgUrl})`}}></div>
        <h4 className='mobileEventName'>{eventName}</h4>
        <div className="eventscard-buttons">
          <Button variant='outlined'><ShareSvg/></Button>
          {(registered) ? registeredBtn : notRegisteredBtn}
        </div>

      </div>
      <div className="eventscard-main">
        <p>{eventDesc}</p>
      </div>
      <div className="eventscard-footer">
        <div className="eventscard-footer-line">
          <p><span><img src={calendarSvg} alt="Date" className='cardicon'/></span> {eventDate}</p>
          <p><span><img src={clockSvg} alt="Time" className='cardicon'/></span> {eventTime}</p>
        </div>
        <div className="eventscard-footer-line">
          <p><span><img src={locationSvg} alt="Location" className='cardicon'/></span> {eventLoc}</p>
          <p><span><img src={moneySvg} alt="Price" className='cardicon'/></span> {eventPrice}</p>
        </div>
        <div className="eventscard-footer-line">
          <div className="attendees-section">
            <div className="attendee-photos">
              {attendeeImgUrlList.map((url, i) => {
                if (i > 4) return <></>;
                return <div className={`eventscard-attendee attendee${i+1}`} style={{backgroundImage: `url(${url})`}} key={i+1}></div>;
              })}
            </div>
            <p>{numberOfAttendees} {numberOfAttendees > 1 ? "attendees" : "attendee"}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EventsCard;
