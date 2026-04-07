import React, {useState, useEffect} from 'react'
import { getEventDetails } from '../api/event';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDetails = await getEventDetails();
        setEvent(eventDetails);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, []);

  return (
    <div>
      {event ? (
        <div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Location: {event.location}</p>
          <p>Capacity: {event.capacity}</p>
          <p>Date: {event.date}</p>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  )
}

export default EventDetails
