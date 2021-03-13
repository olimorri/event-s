/* eslint-disable no-unused-vars */
import React, { ChangeEvent } from 'react';
import { Flex, Box, FormControl, Input } from '@chakra-ui/react';

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: Function;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <Box>
      <FormControl>
        <Flex>
          <FormControl
            minWidth={'30vh'}
            w={'60vh'}
            id="search_bar"
            marginRight={4}
          >
            <Input
              id="search"
              placeholder="Search for events"
              value={searchTerm}
              name="search"
              onChange={handleChange}
              bg={'white'}
              w={'100%'}
            />
          </FormControl>
        </Flex>
      </FormControl>
    </Box>
  );
}
