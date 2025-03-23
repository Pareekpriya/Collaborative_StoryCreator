import { Box, Button, Flex, Heading, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

function Story() {
 
   const {id} = useParams();
   const stories = useSelector((state)=>state.story.story)

   const navigate = useNavigate();

   const [currentStory, setCurrentStory] = useState(null);

       useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

   const buttonmargin = useBreakpointValue({base:'8' , md:'0'})
   useEffect(()=>{
    const foundStory = stories.find((story)=>story.id===id);
    setCurrentStory(foundStory)
   },[id,stories])
    
   if(!currentStory){
      return <p>Story not found!</p>
   }

  return (
    <Flex 
     minH={"100vh"}
     overflowY={"auto"}
     flexDirection={"column"}
    >
     <Button onClick={()=>navigate(-1)}
        fontSize={"xl"}
        p={3}
        m={3}
        rounded={"full"}
        bg={"blackAlpha.300"}
        _hover={{bg:"red.600"}}
        alignSelf="flex-start" 
        >
        {"<"}
     </Button>
       <VStack w={"full"} p={5} my={6} textAlign={"center"} justifySelf={"center"} gap={6} maxW={"800px"} mx={"auto"} flex={1}>
         <Box boxShadow={"2xl"}borderRadius={"3xl"} w={"full"} p={5}>
            <Heading size="xl" color="red.600" mb={2}>{currentStory.title}</Heading>
            <Text fontSize="md" color="gray.500">Created by: <Text as="span" fontWeight="bold">{currentStory.createdBy}</Text>
            </Text>
         </Box>

         <Box boxShadow={"2xl"} borderRadius={"3xl"} w={"full"} p={5}>
            <Text>{currentStory?.contributions?.length > 0  ? 
             
               currentStory.contributions.map((contribution) =>
                  contribution.sentence).join(' ')
               
              : 
               
              " No description yet!"
            
             }   
         </Text>
         </Box>

        <Button colorPalette={"red"} borderRadius={"xl"} textStyle={"md"} mb={buttonmargin} onClick={()=>navigate(-1)}>Go Back</Button>
       </VStack>
    </Flex>
       
  )
}

export default Story
