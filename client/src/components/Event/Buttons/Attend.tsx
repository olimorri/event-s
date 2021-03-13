import React, { MouseEventHandler } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  ButtonGroup,
} from '@chakra-ui/react';

export default function Attend({
  handleClick,
}: {
  handleClick: MouseEventHandler;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button w={'40%'}>Attend</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Please confirm!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleClick} colorScheme="gray">
                Attend
              </Button>
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
