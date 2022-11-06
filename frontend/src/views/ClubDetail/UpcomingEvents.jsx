import { Typography } from '@mui/material';
import EventsCard from '../../components/EventsCard/EventsCard';

const UpcomingEvents = (props) => {
  const { events } = props;
  return (
    <>
      <Typography variant="h5" component="h5" sx={{ pb: 1 }}>
        Upcoming Events
      </Typography>
      {events.map((event) => {
        return (
          <EventsCard
            key={event.updatedAt}
            clubName={event.clubName}
            clubLogoUrl={event.clubLogoUrl}
            eventName={event.eventName}
            eventDesc={event.eventDesc}
            eventDate={event.eventDate}
            eventTime={event.eventTime}
            eventLoc={event.eventLoc}
            eventPrice={event.eventPrice}
            eventImgUrl={event.eventImgUrl}
            numberOfAttendees={event.numberOfAttendees}
            registerClickHandler={event.registerClickHandler}
            eventId={event.eventId}
            shareClickHandler={event.shareClickHandler}
            attendeeImgUrlList={event.attendeeImgUrlList}
            withinClub={event.withinClub}
            registered={event.registered}
            clubAdminView={event.clubAdminView}
          />
        );
      })}
    </>
  );
};

export default UpcomingEvents;
