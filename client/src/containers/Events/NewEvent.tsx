import React, { useState, ChangeEvent, MouseEvent } from 'react';
import {
  Flex,
  Text,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  InputGroup,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Event } from '../../interfaces/Event';
import { User } from '../../interfaces/User';

const initialState: Event = {
  attendees: 0,
  geolocation: '',
  owner: '',
  name: '',
  limit: 1,
  location: '',
  type: '',
  description: '',
  date: '',
  duration: 1,
  photo: 'https://source.unsplash.com/random/300x300',
};

export default function NewEvent({
  createEvent,
  user,
}: {
  createEvent: Function;
  user: User;
}) {
  const [event, setEvent] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let { name, value }: { name: string; value: string } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    let { name, value }: { name: string; value: string } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    let { name, value }: { name: string; value: string } = e.target;
    setEvent({ ...event, [name]: value });
  };

  function handleClick(e: MouseEvent): void {
    e.preventDefault();
    if (event.date === '' || event.date < new Date().toISOString()) {
      alert('Please select a date in the future');
    } else if (event.name === '' || event.location === '') {
      alert('Please fill out all the required fields');
    }
    createEvent(event);
    setEvent(initialState);
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgImage="url('https://res.cloudinary.com/dujun1hoe/image/upload/v1615228154/event-s/gradient-background-26046-26731-hd-wallpapers.jpg_cenrqe.png')"
      bgSize="100%"
      backgroundRepeat="no-repeat"
    >
      <Box
        rounded={'lg'}
        bg={'white'}
        boxShadow={'base'}
        p={8}
        minH={'80vh'}
        minW={'40vh'}
        w={'80%'}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            // type: 'spring',
            stiffness: 100,
            // @ts-ignore
            ease: 'easeIn',
            delay: 0.5,
            duration: 1,
          }}
        >
          {user.host ? (
            <>
              <Text mb={16} fontSize={'4xl'} align={'center'}>
                Create a new event
              </Text>

              <Flex
                justify={'center'}
                justifyContent={'space-between'}
                alignContent={'center'}
                wrap={'wrap'}
              >
                <FormControl id="name">
                  <FormLabel>Name of event</FormLabel>
                  <Input
                    value={event.name}
                    name="name"
                    onChange={handleInputChange}
                    id="name"
                    placeholder="Type something..."
                  />
                </FormControl>

                <FormControl id="location">
                  <FormLabel>Location</FormLabel>
                  <Input
                    id="location"
                    placeholder="Type something..."
                    value={event.location}
                    name="location"
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id="type_of_event">
                  <FormLabel>Event type</FormLabel>
                  <Select
                    placeholder="Select..."
                    value={event.type}
                    name="type"
                    onChange={handleSelectChange}
                  >
                    <option>Food</option>
                    <option>Music</option>
                    <option>Sport</option>
                    <option>Leisure</option>
                    <option>Outdoor</option>
                    <option>Other</option>
                  </Select>
                </FormControl>
                <Flex w={'100%'} mt={3}>
                  <FormControl id="duration">
                    <FormLabel>Duration (in hours)</FormLabel>
                    <NumberInput
                      defaultValue={1}
                      min={1}
                      max={24}
                      clampValueOnBlur={false}
                      allowMouseWheel
                    >
                      <NumberInputField
                        value={event.duration}
                        name="duration"
                        onChange={handleInputChange}
                      />
                    </NumberInput>
                  </FormControl>
                  <FormControl id="limit">
                    <FormLabel justify={'center'}>Limit of attendees</FormLabel>
                    <NumberInput
                      min={1}
                      max={99999}
                      clampValueOnBlur={false}
                      allowMouseWheel
                    >
                      <NumberInputField
                        value={event.limit}
                        name="limit"
                        onChange={handleInputChange}
                      />
                    </NumberInput>
                  </FormControl>
                </Flex>
              </Flex>
              <Box>
                <Text mb="8px">Description:</Text>
                <Textarea
                  placeholder="Describe your event"
                  size="sm"
                  value={event.description}
                  name="description"
                  onChange={handleTextareaChange}
                />
              </Box>
              <FormControl mt={4} mb={4}>
                <InputGroup>
                  <FormLabel>Date</FormLabel>
                  <form>
                    <input
                      type="date"
                      value={event.date}
                      name="date"
                      onChange={handleInputChange}
                    />
                  </form>
                  <Input
                    id="photo"
                    placeholder="Insert a link to your event photo"
                    value={event.photo}
                    name="photo"
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <Stack direction="row" spacing={4} justify="center">
                <RouterLink to="/events">
                  <Button
                    align={'center'}
                    bg={'custom.200'}
                    w={'30vh'}
                    color={'white'}
                    type="submit"
                    _hover={{
                      bg: 'custom.300',
                    }}
                    onClick={handleClick}
                  >
                    Create
                  </Button>
                </RouterLink>
              </Stack>
            </>
          ) : (
            <Text align={'center'}>Only hosts can create new event</Text>
          )}
        </motion.div>
      </Box>
    </Flex>
  );
}
