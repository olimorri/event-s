import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import UsersApiService from '../../services/UsersApiService';
import auth from '../../utils/auth';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { UserProps } from '../../interfaces/UserProps';

const initialState = {
  email: '',
  password: '',
};

export default function Login(props: UserProps) {
  const [state, setState] = useState(initialState); //TODO: where does the intial state value actually come from?

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email: string = state.email;
    const password: string = state.password;
    const user: {} = { email, password };
    const res = await UsersApiService.login(user);
    console.log(res);
    //{error: "401", message: "Username or password is incorrect"}

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      props.setIsAuthenticated(true);
      auth.login(() => props.history.push('/profile'));
    }
  };

  const validateForm = (): boolean => {
    return !state.email || !state.password;
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'custom.100'}
      bgImage="url('https://res.cloudinary.com/dujun1hoe/image/upload/v1615228154/event-s/gradient-background-26046-26731-hd-wallpapers.jpg_cenrqe.png')"
      bgSize="100%"
      backgroundRepeat="no-repeat"
    >
      <motion.div
        initial={{
          opacity: 0,
          x: '-100vw',
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          // @ts-ignore
          type: 'spring',
          // @ts-ignore
          stiffness: 100,
          // @ts-ignore
          ease: 'easeIn',
        }}
        exit={{
          opacity: 0,
          x: '-100vw',
        }}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color={'white'} fontSize={'4xl'}>
              Sign in to your account
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="name@email.com"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Choose a password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                  />
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
                  Sign in
                </Button>
              </Stack>
              <RouterLink to="/register">
                <Text align={'end'} color="blue.400">
                  Create new account
                </Text>
              </RouterLink>
            </Stack>
          </Box>
        </Stack>
      </motion.div>
    </Flex>
  );
}
