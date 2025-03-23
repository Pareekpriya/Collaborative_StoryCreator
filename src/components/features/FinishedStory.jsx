import React from 'react'
import { Box, Button, Heading, HStack, Stack ,Text, Spinner, VStack, useBreakpointValue, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function FinishedStory() {

   const user = useSelector((state)=>state.auth.user);
   const author = user?.displayName || user?.email

   const stories = useSelector((state)=>state.story.story)
   const loading = useSelector((state)=>state.story.loading)
   const error = useSelector((state)=>state.story.error)

  const isSmallScreen = useBreakpointValue({base:true,md:false});
 
   const navigate = useNavigate()
   
  return (
       <>
        <Flex minH='100vh'
              px={isSmallScreen ? 4 : 0}
              flexDirection={"column"}
              pb={'20'}
         > 
         <Text textStyle={"lg"} fontWeight={"medium"}>Hello, {author}</Text>
         {isSmallScreen ? (
                    <VStack justify={'center'} gap={5} my={5}>
                    <Button bg={"blue.800"} onClick={() => navigate('/stories')} width="100%" borderRadius={"2xl"}>
                      Ongoing Stories
                    </Button>
                    <Button bg={"red.700"} onClick={() => navigate('/finishedStories')} width="100%"  borderRadius={"2xl"}>
                      Finished Stories
                    </Button>
                  </VStack>
                  ): (
                    <HStack justify={"center"} gap={5} my={5}>
                    <Button bg={"blue.800"} onClick={()=>navigate("/stories")}  borderRadius={"2xl"} >Ongoing Stories</Button>
                    <Button bg={"red.700"} onClick={()=>navigate("/finishedStories")}  borderRadius={"2xl"}>Finished Stories</Button>
                    </HStack>  
                  )}

      <Heading textAlign={"center"} mb={5}>Finished Stories</Heading>
                
            

        {loading?(
           <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <Spinner size="lg" />
            </Box>
          ): error? (
                <Text color={"red.500"} textAlign="center">Error: {error}</Text>
          ): (
            stories.filter((story)=> story.contributions?.length === 10).length > 0?(
              <VStack gap={4}>
                {stories.filter(story => story.contributions?.length === 10)
                .map((story,index)=>(
                    <Box key={index} boxShadow={"lg"} borderRadius={"2xl"} w={"full"} p={5} textAlign={"center"} maxW={"700px"}  mx="auto" >
                    <Heading color={"red.600"} textStyle={"xl"} >{story.title}</Heading>
                    <Text color={"gray.700"} mb={3}>Created by: {story.createdBy}</Text>
                    <Text >{story.description}</Text>
                    <Button bg={"blue.800"} mt={3} borderRadius={"2xl"} onClick={()=>navigate(`/story/${story.id}`)}>Read Story</Button>
                  </Box>
                ))}
              </VStack>
            ):(
                <Text textAlign={"center"}>No finished stories available yet.</Text>
            )
          )}
          </Flex>
       </>
  )
}

export default FinishedStory
