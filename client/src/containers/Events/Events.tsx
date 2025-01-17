/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import EventList from '../../components/Event/EventList';
import SearchBar from '../SearchBar';
import SortBar from '../SortBar';
import Map from '../map/Map';
import Spinner from '../../components/Handling/Spinner';
import { Box, Flex, Text, Stack, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Event } from '../../interfaces/Event';

export default function Events({ events }: { events: Event[] }) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([...events]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [checkboxes, setCheckboxes] = useState<string[]>([]);

  function search(): void {
    if (!searchTerm && checkboxes.length) return check();
    const searchEvents: Event[] = (checkboxes.length
      ? filteredEvents
      : events
    ).filter(
      (event: Event) =>
        event.name.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm),
    );
    setFilteredEvents(searchEvents);
  }
  function check(): void {
    if (!checkboxes.length && !searchTerm) return setFilteredEvents(events);
    if (!checkboxes.length && searchTerm) {
      search();
    } else {
      const checkedEvents: Event[] = (searchTerm
        ? filteredEvents
        : events
      ).filter((event: Event) => checkboxes.includes(event.type));
      setFilteredEvents(checkedEvents);
    }
  }
  useEffect((): void => {
    if (!checkboxes.length && !searchTerm) return setFilteredEvents(events);
    if (checkboxes.length && !searchTerm) {
      check();
    }
    search();
  }, [searchTerm]);
  useEffect(() => {
    check();
  }, [checkboxes]);

  return (
    <Box
      bg={'custom.100'}
      h={'100vh'}
      bgImage="url('https://res.cloudinary.com/dujun1hoe/image/upload/v1615228154/event-s/gradient-background-26046-26731-hd-wallpapers.jpg_cenrqe.png')"
      bgSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Flex h={'50px'} align={'flex-end'} justify={'center'}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <Heading color={'white'} align={'center'} justify={'center'}>
            Find an event
          </Heading>
        </motion.div>
      </Flex>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} p={5}>
        {false ? (
          <Spinner />
        ) : (
          <>
            <Flex flex={1} paddingTop={0} p={8} justify={'center'}>
              <Stack spacing={6} w={'full'} maxW={'lg'}>
                <SortBar
                  checkboxes={checkboxes}
                  setCheckboxes={setCheckboxes}
                />
                <Map filteredEvents={filteredEvents} />
                <Text color={'black'} fontWeight="bold" align={'center'}>
                  {
                    filteredEvents.filter(
                      (event: Event) => event.date > new Date().toISOString(),
                    ).length
                  }{' '}
                  matching events
                </Text>
              </Stack>
            </Flex>
            <Flex
              borderRadius="md"
              flex={2}
              p={8}
              flexDirection={'column'}
              justifyContent={'end'}
              bg={'transparent'}
              h={'80vh'}
            >
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Box w={'100%'} overflow={'scroll'} h={'100vh'} mt={10}>
                <EventList events={filteredEvents} />
              </Box>
            </Flex>
          </>
        )}
      </Stack>
    </Box>
  );
}
