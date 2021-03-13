import React from 'react';
import EventCard from './EventCard';
import { Wrap } from '@chakra-ui/react';
import { EventListProps } from '../../interfaces/EventListProps';
import { Event } from '../../interfaces/Event';

export default function EventList({ value }: EventListProps) {
  return (
    <Wrap w={'100%'} marginTop={5} align="start">
      {value
        .filter((event: Event) => event.date > new Date().toISOString())
        .map((event: Event) => (
          <EventCard value={event} key={event._id} />
        ))}
    </Wrap>
  );
}
