import { editStory, fetchStory } from '@/redux/actions/storyAction'
import { VStack, Button, Box, Heading, Text, Textarea, useBreakpointValue, Flex, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


function Contribute() {
   const {id} = useParams()
   const stories = useSelector((state)=>state.story.story) 
   const user = useSelector((state)=>state.auth.user)

   const author = user.displayName || user.email;
   
   console.log("stories:", stories)
   console.log("Story ID from URL:",id);
   const dispatch = useDispatch()
   const navigate = useNavigate();
  
   const [contribution,setContribution] = useState("");
   const [currentStory, setCurrentStory] = useState(null);
   const [errorMessage,setErrorMessage] = useState("");
   const [successMessage,setSuccessMessage] = useState("");

   const [showContribution,setShowContribution] = useState(false);

   if (!stories) {
      return <Text>No story data available.</Text>;
    }

   useEffect(()=>{
   const contributeInStory = stories.find((story)=>story.id===id)
   if(contributeInStory){
      setCurrentStory(contributeInStory)
   }
   },[id,stories])

   useEffect(() => {
      if (stories.length === 0) {
         dispatch(fetchStory());
       }
    }, [dispatch, stories]);

   const handleSubmitContribution = () =>{
      if (!currentStory) return;

     if(contribution.trim().split(' ').length > 20){
       setErrorMessage("Contribution cannot exceed 20 words!")
       return;
     } 

     dispatch(editStory(id,currentStory,contribution,author))
     setContribution("");
     setSuccessMessage("Contribution Added Successfully!");

     setTimeout(()=>{
       navigate(-1);      
     },2000)
   }

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const isSmallScreen = useBreakpointValue({base:true,md:false});
   
   if (!currentStory) {
      return <Text>Loading story details...</Text>;
    }

  return (
    <>
      {successMessage ? ( <Text color={"green.500"}>{successMessage}</Text> ) : 
     (
      <>
         <Button onClick={()=>navigate(-1)}
            fontSize={"xl"}
            p={1}
            m={1}
            rounded={"full"}
            bg={"blackAlpha.300"}
            _hover={{bg:"red.600"}}
            >
            {"<"}
         </Button> 

       <VStack p={8} w={"full"} maxW={"800px"} mx={"auto"} gap={6} 
              >
          
           <Box boxShadow={"2xl"} borderRadius={"3xl"} w={"full"} justifyItems={"center"} alignContent={"center"} p={5}>
                      <Heading size="xl" color="red.600" mb={2}>{currentStory?.title}</Heading>
                      <Text fontSize="md" color="gray.500">Created by: <Text as="span" fontWeight="bold">{currentStory?.createdBy}</Text>
                      </Text>
                      <Text fontSize="md" mt={4}>Latest Contribution:{' '}
                        {currentStory?.contributions?.length>0 ? currentStory.contributions[currentStory.contributions.length -1].sentence : "No contributions yet."}</Text>
           </Box>

          <Textarea
           placeholder='Write your contribution...'
           h={20}
           mb={4}
           value={contribution}
           onChange={(e)=>setContribution(e.target.value)}
           borderRadius={"xl"}
          /> 
          {errorMessage && <Text color={"red.500"}>{errorMessage}</Text>}
          <Stack h="70vh" overflowY="auto" align={"center"}>
          <Button onClick={handleSubmitContribution} borderRadius={"2xl"} w={"200px"}>Submit Contribution</Button>

          <Button  w={"200px"} borderRadius={"2xl"} onClick={()=>setShowContribution(!showContribution)}>{showContribution? "Hide Contributions" : "Show All Contributions"}</Button>

          {showContribution && currentStory.contributions?.length > 0 && 
           ( 
            <VStack 
            w="full"
            gap={4}
            maxH="80vh" 
            p={4}              
             >

            {currentStory.contributions.map((contribution,index)=>(
               <Box key={index} boxShadow={"xl"} borderRadius={"2xl"} w={"full"} p={5}>
                   <Text fontSize="md" mb={2}>{contribution.sentence}</Text>
                   <Text fontWeight="bold">By {contribution.contributedBy}</Text>
               </Box>
            ))}
            </VStack>
            )
          }
          </Stack>
       </VStack>
       
      </>
     )
   }

    </>
    
  )
}

export default Contribute
