import React, { useState } from 'react';
import UsersApiService from '../../services/UsersApiService';
import auth from '../../utils/auth';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Heading,
  FormHelperText,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { UserProps } from '../../interfaces/UserProps';
import { User } from '../../interfaces/User';
import { UserRequestError } from '../../interfaces/UserRequestError';

let email: string = '';
let password: string = '';
let firstName: string = '';
let lastName: string = '';
let photo: string = '';
let host: boolean = false;
let userTypeChosen: boolean = false;

const initialState = {
  email,
  password,
  firstName,
  lastName,
  photo,
  host,
};

export default function Register(props: UserProps) {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;
    let value: string | boolean = e.target.value;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    userTypeChosen = true;
    let name: string = e.target.name;
    let value: string = e.target.value;

    if (name === 'host') {
      if (value !== 'Guest') {
        setState((prevState) => ({
          ...prevState,
          host: true,
        }));
      }
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const { email, password, firstName, lastName, host, photo } = state;
    const user = { email, password, firstName, lastName, host, photo };
    const res = await UsersApiService.register(user);

    function isUser(res: any): res is User {
      return res.error === undefined;
    }

    function isUserRequest(res: any): res is UserRequestError {
      return res.error !== undefined;
    }

    if (isUser(res)) {
      props.setIsAuthenticated(true);
      auth.login(() => props.history.push('/profile'));
    } else if (isUserRequest(res)) {
      alert(`${res.message}`);
      setState(initialState);
    }
  };

  const validateForm = () => {
    if (
      !state.email ||
      !state.password ||
      !state.firstName ||
      !state.lastName ||
      userTypeChosen === false
    )
      return false;
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.100'}
      bgImage="url('https://res.cloudinary.com/dujun1hoe/image/upload/v1615228154/event-s/gradient-background-26046-26731-hd-wallpapers.jpg_cenrqe.png')"
      bgSize="100%"
      backgroundRepeat="no-repeat"
    >
      <Stack spacing={8} w={'50%'} maxW={'lg'} py={12} px={6}>
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
            ease: 'linear',
          }}
          exit={{
            opacity: 0,
            x: '-100vw',
          }}
        >
          <Stack align={'center'}>
            <Heading color={'white'} fontSize={'4xl'}>
              Create new account
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="first_name">
                <FormLabel>First name</FormLabel>
                <Input
                  id="first_name"
                  placeholder="First Name"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                />
                {/* </FormControl> */}
                {/* <FormControl id="last_name"> */}
                <FormLabel>Last name</FormLabel>
                <Input
                  id="last_name"
                  placeholder="Last Name"
                  name="lastName"
                  value={state.lastName}
                  onChange={handleChange}
                />
                {/* </FormControl>
            <FormControl id="email"> */}
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="name@email.com"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
                <FormHelperText>
                  I'll never share your email. I don't know how!
                </FormHelperText>
                {/* </FormControl>
            <FormControl id="password"> */}
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Choose a password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
                <FormLabel>Photo</FormLabel>
                <Input
                  id="photo"
                  placeholder="Insert a link to your event photo"
                  value={state.photo}
                  name="photo"
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <FormControl id="type">
                  <FormLabel>Type of user</FormLabel>
                  <Select
                    name="host"
                    onChange={handleUserSelection}
                    placeholder="Hosting or attending?"
                  >
                    <option>Guest</option>
                    <option>Host</option>
                  </Select>
                </FormControl>
                <Button
                  bg={'custom.200'}
                  color={'white'}
                  _hover={{
                    bg: 'custom.300',
                  }}
                  isDisabled={validateForm()}
                  onClick={handleClick}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </motion.div>
      </Stack>
    </Flex>
  );
}
