import { Image, Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import React from 'react';
import source from '@/assets/images/storiesCreating.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={{ base: 10, md: 20 }} 
        p={6} 
        m={10} 
        justify={'center'} 
        align={'center'}
        height={'70vh'}
      >
        <Flex direction={'column'} gap={6} align={{ base: 'center', md: 'flex-start' }}>
          <Heading fontSize={{ base: '4xl', md: '5xl' }}>StoryWeave</Heading>
          <Text fontWeight={'bold'} fontSize={{ base: 'md', md: 'lg' }} color={'blue.800'}>
            Create your <Box as="span" color="yellow.400">story</Box>
          </Text>
          <Button 
            fontWeight="bold" 
            textStyle={'md'} 
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

      <Box as='footer' py={4} textAlign={'center'}>
      <Text textStyle={'md'} fontWeight={'medium'}>
        &copy; StoryWeave, 2025. All rights reserved.
      </Text>
    </Box>
    </>
  );
}

export default Home;
