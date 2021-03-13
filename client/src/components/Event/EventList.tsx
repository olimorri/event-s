import React from 'react';
import EventCard from './EventCard';
import { Wrap } from '@chakra-ui/react';
import { Event } from '../../interfaces/Event';

export default function EventList({ events }: { events: Event[] }) {
  return (
    <Wrap w={'100%'} marginTop={5} align="start">
      {events
        .filter((event: Event) => event.date > new Date().toISOString())
        .map((event: Event) => (
          <EventCard event={event} key={event._id} />
        ))}
    </Wrap>
  );
}
