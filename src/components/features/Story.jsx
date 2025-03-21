import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

function Story() {
 
   const {id} = useParams();
   const stories = useSelector((state)=>state.story.story)

   const navigate = useNavigate();

   const [currentStory, setCurrentStory] = useState(null);

   useEffect(()=>{
    const foundStory = stories.find((story)=>story.id===id);
    setCurrentStory(foundStory)
   },[id,stories])
    
   if(!currentStory){
      return <p>Story not found!</p>
   }

  return (
    <>
     <Button onClick={()=>navigate(-1)}
        fontSize={"xl"}
        p={3}
        m={3}
        rounded={"full"}
        bg={"blackAlpha.300"}
        _hover={{bg:"red.600"}}
        >
        {"<"}
     </Button>
       <VStack w={"full"} p={5} my={6} textAlign={"center"} justifySelf={"center"} gap={6} maxW={"800px"}>
         <Box boxShadow={"2xl"}borderRadius={"3xl"} w={"full"}  justifyItems={"center"} alignContent={"center"} p={5}>
            <Heading size="xl" color="red.600" mb={2}>{currentStory.title}</Heading>
            <Text fontSize="md" color="gray.500">Created by: <Text as="span" fontWeight="bold">{currentStory.createdBy}</Text>
            </Text>
         </Box>

         <Box boxShadow={"2xl"} borderRadius={"3xl"} w={"full"} justifyItems={"center"} alignContent={"center"} p={5}>
            <Text>{currentStory?.contributions?.length > 0  ? 
             
               currentStory.contributions.map((contribution) =>
                  contribution.sentence).join(' ')
               
              : 
               
              " No description yet!"
            
             }   
         </Text>
         </Box>

        <Button colorPalette={"red"} borderRadius={"xl"} textStyle={"md"} onClick={()=>navigate(-1)}>Go Back</Button>
       </VStack>
    </>
       
  )
}

export default Story
