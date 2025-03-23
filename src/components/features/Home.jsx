import { Image, Flex, Box, Heading, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import source from '@/assets/images/storiesCreating.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const footerPadding = useBreakpointValue({ base: '80px', md: '20px' });

  return (
    <Flex
    direction="column"
    minH="100vh"
    justify={"center"}
    align={"center"}
    // h={"auto"}
    overflowY="auto"
    pb={footerPadding}
  >
    <Flex
      flex="1"
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 10, md: 20 }}
      p={4}
      m={6}
      justify="center"
      align="center"

    >
      <Flex
        direction="column"
        gap={5}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Heading fontSize={{ base: '4xl', md: '5xl' }}>StoryWeave</Heading>
        <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} color="blue.800">
          Create your <Box as="span" color="yellow.400">story</Box>
        </Text>
        <Button
          fontWeight="bold"
          textStyle="md"
          w={{ base: '80%', md: '60%' }}
          onClick={() => navigate('/stories')}
        >
          Read a story
        </Button>
      </Flex>
  
      <Box maxW={{ base: '90%', md: '50%' }}>
        <Image src={source} alt="StoryWeave" />
      </Box>
    </Flex>
  
    <Box as="footer" textAlign="center" width="100%" > 
      <Text textStyle="md" fontWeight="medium">
        &copy; StoryWeave, 2025. All rights reserved.
      </Text>
    </Box>
  </Flex>
  
  );
}

export default Home;
