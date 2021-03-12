/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import UsersApiService from '../../services/UsersApiService';
import { Link as RouterLink } from 'react-router-dom';
import { User } from '../../interfaces/User';

import {
  Flex,
  Box,
  Text,
  Button,
  Image,
  Heading,
  Wrap,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export default function Profile(props: any) {
  const user: User = props.user;
  const setUser: Function = props.setUser;
  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await UsersApiService.profile();

      function isUser(userInfo: any): userInfo is User {
        return userInfo.error === undefined;
      }

      if (isUser(userInfo)) {
        setUser(userInfo);
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile();
  }, [setUser]);

  return (
    <Box h={'100%'}>
      <Stack
        minH={'100vh'}
        bgImage="url('https://res.cloudinary.com/dujun1hoe/image/upload/v1615228154/event-s/gradient-background-26046-26731-hd-wallpapers.jpg_cenrqe.png')"
        bgSize="100% 50%"
        // bgSize="cover"
        backgroundRepeat="no-repeat"
        justify={'center'}
        align={'center'}
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
            // stiffness: 100,
            // @ts-ignore
            ease: 'easeIn',
            duration: 1,
          }}
        >
          <Flex
            borderRadius="md"
            bg={'custom.100'}
            flexDirection={'column'}
            maxW={'900px'}
            minH={'60%'}
            minW={'300px'}
            p={8}
          >
            {user.firstName ? (
              <>
                <Flex
                  w={'100%'}
                  justify={'center'}
                  p={4}
                  spacing="0px"
                  maxH={'300px'}
                >
                  <Box boxSize="sm" h={'100%'}>
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
                        //type: 'spring',
                        // stiffness: 100,
                        // @ts-ignore
                        ease: 'easeIn',
                        delay: 0.5,
                        duration: 1,
                      }}
                    >
                      <Image
                        alignSelf={'center'}
                        boxShadow={'md'}
                        borderRadius="md"
                        src={user.photo}
                        alt=""
                        minW={'300px'}
                      />
                    </motion.div>
                  </Box>
                  {/* <Spacer w={'30px'} /> */}
                  <Flex
                    w={'40vh'}
                    align={'center'}
                    justify={'center'}
                    flexDirection={'column'}
                  >
                    <Heading align={'center'}>Welcome </Heading>
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
                        //type: 'spring',
                        stiffness: 100,
                        // @ts-ignore
                        ease: 'easeIn',
                        delay: 2,
                        duration: 4,
                      }}
                    >
                      <Heading align={'center'}>
                        {' '}
                        {user.firstName} {user.lastName}
                      </Heading>
                    </motion.div>
                  </Flex>
                </Flex>
                <Flex
                  m={5}
                  align={'center'}
                  justify={'center'}
                  dir={'row'}
                  justifyContent={'space-evenly'}
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
                      //type: 'spring',
                      // stiffness: 100,
                      // @ts-ignore
                      ease: 'easeIn',
                      delay: 0.7,
                      duration: 1,
                    }}
                  >
                    <Box align={'center'}>
                      <Image
                        src={
                          'https://res.cloudinary.com/dujun1hoe/image/upload/v1615239488/event-s/account_ee8lc9.png'
                        }
                      />
                      <Text>User type:</Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        {user.host ? 'Host' : 'Guest'}
                      </Text>
                    </Box>
                  </motion.div>
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
                      //type: 'spring',
                      // stiffness: 100,
                      // @ts-ignore
                      ease: 'easeIn',
                      delay: 0.9,
                      duration: 1,
                    }}
                  >
                    <Box align={'center'}>
                      <Image
                        src={
                          'https://res.cloudinary.com/dujun1hoe/image/upload/v1615239489/event-s/calendar_qsoxdg.png'
                        }
                      />
                      <Text>Number of events:</Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        {user.eventList.length ? user.eventList.length : 0}
                      </Text>
                    </Box>
                  </motion.div>
                </Flex>

                {user.eventList.length ? (
                  <>
                    <Text align={'center'} justify={'center'}>
                      Current events:
                    </Text>
                    <Wrap
                      justify={'center'}
                      h={'100%'}
                      p={4}
                      marginTop={'5%'}
                      w={'100%'}
                      justifyContent={'space-around'}
                      borderRadius="md"
                    >
                      {user.eventList.map((el) => (
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
                            //type: 'spring',
                            stiffness: 100,
                            // @ts-ignore
                            ease: 'easeIn',
                            delay: 1,
                            duration: 1,
                          }}
                        >
                          <RouterLink to={`/events/${el._id}`} key={el._id}>
                            <Box borderRadius="md" h={'100%'}>
                              <Button m={4}>{el.name}</Button>
                            </Box>
                          </RouterLink>
                        </motion.div>
                      ))}
                    </Wrap>
                  </>
                ) : (
                  <Text m={10} align={'center'} justify={'center'}>
                    You haven't got any events yet.{' '}
                    {user.host
                      ? `It's the perfect time to create one!`
                      : `Why don't you have a look around and sign up to some?`}
                  </Text>
                )}
              </>
            ) : (
              <RouterLink to="/login">
                <Button>You need to log in first</Button>
              </RouterLink>
            )}
          </Flex>
        </motion.div>
      </Stack>
    </Box>
  );
}
