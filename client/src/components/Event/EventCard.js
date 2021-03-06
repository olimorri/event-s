import React from 'react';
import { Box, Flex, Image , Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function EventCard ({value}) {
  return (
      <Box bg="gray.200" w="40%" h="40%" p={4} m={4}  borderRadius="md" key={value._id}>
          <RouterLink to={
            {
              pathname: `/events/${value._id}`,
              state: {event: value}}
            }>
            {/* <div onClick={() => {navigation}}> */}
              <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Image borderRadius="md" src={value.photo} alt="" />
                <Text size="2xl">{value.name}</Text>
                <Text>{value.description}</Text>
                <Text>{value.location}</Text>
                <Text>{value.date.slice(0,10)}</Text>
              </Flex>
            {/* </div> */}
        </RouterLink>
      </Box>
  )
}

export default EventCard;


// import Image from 'next/image';
// import {
//   Box,
//   Center,
//   Heading,
//   Text,
//   Stack,
//   Avatar,
//   useColorModeValue,
// } from '@chakra-ui/react';

// export default function blogPostWithImage() {
//   return (
//     <Center py={6}>
//       <Box
//         maxW={'445px'}
//         w={'full'}
//         bg={useColorModeValue('white', 'gray.900')}
//         boxShadow={'2xl'}
//         rounded={'md'}
//         p={6}
//         overflow={'hidden'}>
//         <Box
//           h={'210px'}
//           bg={'gray.100'}
//           mt={-6}
//           mx={-6}
//           mb={6}
//           pos={'relative'}>
//           <Image
//             src={
//               'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
//             }
//             layout={'fill'}
//           />
//         </Box>
//         <Stack>
//           <Text
//             color={'green.500'}
//             textTransform={'uppercase'}
//             fontWeight={800}
//             fontSize={'sm'}
//             letterSpacing={1.1}>
//             Blog
//           </Text>
//           <Heading
//             color={useColorModeValue('gray.700', 'white')}
//             fontSize={'2xl'}
//             fontFamily={'body'}>
//             Boost your conversion rate
//           </Heading>
//           <Text color={'gray.500'}>
//             Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
//             nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
//             erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
//             et ea rebum.
//           </Text>
//         </Stack>
//         <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
//           <Avatar
//             src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
//             alt={'Author'}
//           />
//           <Stack direction={'column'} spacing={0} fontSize={'sm'}>
//             <Text fontWeight={600}>Achim Rolle</Text>
//             <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
//           </Stack>
//         </Stack>
//       </Box>
//     </Center>
//   );
// }