import './upcomingevents.css';

const UpcomingEvents = ({ upcomingEvents }) => {
  const numberToMonth = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  };

  const longToShortMonth = {
    "January": "Jan",
    "February": "Feb",
    "March": "Mar",
    "April": "Apr",
    "May": "May",
    "June": "Jun",
    "July": "Jul",
    "August": "Aug",
    "September": "Sep",
    "October": "Oct",
    "November": "Nov",
    "December": "Dec"
  };

  let formattedEvents = [];

  upcomingEvents.forEach((event) => {
    formattedEvents.push(
      {
        ...event,
        eventDate: new Date(event.eventDate)
      }
    );
  });

  formattedEvents = formattedEvents.filter(event => (event.eventDate >= (new Date())));

  let sortedEvents = [...formattedEvents].sort((a, b) => {
    return a.eventDate - b.eventDate;
  });

  let monthCounter;
  let monthShortname;

  const checkForMonth = (currentDate) => {
    if (1 + currentDate.getMonth() !== monthCounter) {
      monthCounter = 1 + currentDate.getMonth();
      monthShortname = longToShortMonth[numberToMonth[monthCounter]];
      return <p className="monthname">{numberToMonth[monthCounter]}</p>;
    }
  };


  return (
    <div className="upcomingevents">
      <h4>Upcoming Events</h4>

      {sortedEvents.map((event, i) => {
        const eventDate = event.eventDate;

        return (
          <>
            {checkForMonth(eventDate)}
            <div className="event-container">
              <div className="event-date">
                <p><span>{monthShortname}</span><span><br/>{eventDate.getDate()}</span></p>
              </div>
              <a className="event-title" href={event.eventLink}>
                <p>{event.eventName}</p>
              </a>
              <a className="clubname" href={event.eventLink}>
                <p>{event.clubName}</p>
              </a>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default UpcomingEvents;
