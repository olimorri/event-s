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

export default function Attend({ attend }: { attend: MouseEventHandler }) {
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
              <Button variant="outline" id="cancel">
                Cancel
              </Button>
              <Button onClick={attend} colorScheme="gray" id="confirm-attend">
                Attend
              </Button>
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
