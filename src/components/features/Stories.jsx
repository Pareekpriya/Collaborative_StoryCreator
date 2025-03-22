import { fetchStory } from '@/redux/actions/storyAction'
import { Box, Grid, Flex, Text, Spinner, Avatar, Card, HStack, Button, For, Stack, GridItem, Heading, useBreakpointValue, VStack } from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import source from "@/assets/images/iconsStory.png"

function Stories() {

    const user = useSelector((state)=>state.auth.user)
    const stories = useSelector((state)=>state.story.story)
    const loading = useSelector((state)=>state.story.loading)
    const error = useSelector((state)=>state.story.error)

    const [errorMessage,setErrorMessage] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch()
     
    const alertShown = useRef(false);
    
    console.log("user:", user)
    console.log("stories:",stories)

    const author = user?.displayName || user?.email || "User"

     useEffect(()=>{
       if(!user && !alertShown.current){
        alertShown.current = true;
       alert("You need to login first!")
       navigate("/login")
       }
      },[user,navigate])

      useEffect(()=>{
        if(user){
          dispatch(fetchStory())
        }
      },[dispatch,user])

    const getPreview = (description) =>{
        const sentenceEnd = description.indexOf('.');
        return sentenceEnd !== -1 ? description.slice(0, sentenceEnd +1 ): description;
    };
    

  const handleContribution = (story) =>{
    if(story.contributions.length === 10){
      setErrorMessage((prev)=>({
        ...prev,
         [story.id]:
        "This story's contribution limit is exceeded, try another one!"
      }))
    }
    else{
      navigate(`/contribute/${story.id}`)
    }
  }

  const isSmallScreen = useBreakpointValue({base:true,md:false});

  if (!user) {
    return null;  
  }  

  return (
         <Box pb={20}>
            <Text textStyle={"lg"} fontWeight={"medium"}>Hello, {author}</Text>
        
          {isSmallScreen ? (
            <VStack justify={'center'} gap={5} my={5}>
            <Button onClick={() => navigate('/stories')} width="100%" borderRadius={"2xl"}>
              Ongoing Stories
            </Button>
            <Button onClick={() => navigate('/finishedStories')} width="100%"  borderRadius={"2xl"}>
              Finished Stories
            </Button>
          </VStack>
          ): (
            <HStack justify={"center"} gap={5} my={5}>
            <Button onClick={()=>navigate("/stories")}  borderRadius={"2xl"} >Ongoing Stories</Button>
            <Button onClick={()=>navigate("/finishedStories")}  borderRadius={"2xl"}>Finished Stories</Button>
            </HStack>  
          )}
          
           <Heading textAlign={"center"} mb={5}>Ongoing Stories</Heading>
            {loading?(
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <Spinner size="lg" />
                </Box>
  ): error? (
        <Text color={"red.500"}>Error: {error}</Text>
  ):
   
    stories.length>0 ? (

      <Flex wrap="wrap" justify="center" gap={4}>
  {stories.map((story) => (
    <Box key={story.id} width={isSmallScreen ? "100%" : "320px"}>
      <Card.Root width="100%" minHeight="270px" maxHeight={"320px"} height={"300px"} boxShadow="2xl" borderRadius="3xl">
      <Card.Body gap="0">
                    <Avatar.Root size="lg" shape="rounded">
                      <Avatar.Image src={source} />
                      <Avatar.Fallback name="Story Avatar" />
                    </Avatar.Root>
                    <Card.Title mb="2">{story.title}</Card.Title>
                    <Text textStyle={"sm"} fontWeight={"medium"}>Created by: {story.createdBy}</Text>
                    <Text fontSize="sm" color="gray.500" mb={3}>{new Date(story.createdAt).toLocaleString()}</Text>
                    <Card.Description>
                     { getPreview(story.description)}
                    </Card.Description>
                    {errorMessage[story.id] && <Text color={"red.600"} mt={2}>{errorMessage[story.id]}</Text>}
                  </Card.Body>
                  <Card.Footer justifyContent="flex-start" >
                    <Button onClick={()=>navigate(`/story/${story.id}`)} borderRadius={"xl"}>Read</Button>
                    <Button onClick={()=>handleContribution(story)} borderRadius={"xl"}>Contribute</Button>
                  </Card.Footer>
      </Card.Root>
    </Box>
    ))}
    </Flex>

//         <Grid templateColumns= {isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}  justifyItems={"center"} alignItems="start"  gap={isSmallScreen ? 4 : 0}  px={isSmallScreen ? 4 : 0} >
//         {stories.map((story)=>(
//              <GridItem key={story.id} width={isSmallScreen ? '100%' : '320px'}> 
         
//                 <Card.Root width='100%' minHeight="280px" maxHeight="320px" overflow="hidden" boxShadow={"2xl"} borderRadius={"3xl"}>
//                   <Card.Body gap="0">
//                     <Avatar.Root size="lg" shape="rounded">
//                       <Avatar.Image src={source} />
//                       <Avatar.Fallback name="Story Avatar" />
//                     </Avatar.Root>
//                     <Card.Title mb="2">{story.title}</Card.Title>
//                     <Text textStyle={"sm"} fontWeight={"medium"}>Created by: {story.createdBy}</Text>
//                     <Text fontSize="sm" color="gray.500" mb={3}>{new Date(story.createdAt).toLocaleString()}</Text>
//                     <Card.Description>
//                      { getPreview(story.description)}
//                     </Card.Description>
//                     {errorMessage[story.id] && <Text color={"red.600"} mt={2}>{errorMessage[story.id]}</Text>}
//                   </Card.Body>
//                   <Card.Footer justifyContent="flex-start" >
//                     <Button onClick={()=>navigate(`/story/${story.id}`)} borderRadius={"xl"}>Read</Button>
//                     <Button onClick={()=>handleContribution(story)} borderRadius={"xl"}>Contribute</Button>
//                   </Card.Footer>
//                 </Card.Root>
//             </GridItem>
//     )

//     )
// }
//     </Grid>
     
    ):(
        <Text>No stories available. Create one to get started!</Text>
    )     
  }

        </Box>
    );
}

export default Stories
