import { postStory } from "@/redux/actions/storyAction"
import {
  Button,
  Card,
  Field,
  Stack,
  Input,
  Textarea,
  Text,
  Flex,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateStory() {
    const user = useSelector((state)=>state.auth.user)
    const stories = useSelector((state)=>Array.isArray(state.story.story)?state.story.story:[]);
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const alertShown = useRef(false);

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [storySuccess,setStorySuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

   const author = user?.displayName || user?.email || "User";

    useEffect(()=>{
      if(!user && !alertShown.current){
        alertShown.current = true;
       alert("You need to login first!")
       navigate("/login")
      }
     },[user,navigate])

     const handleSubmitStory = () => {
      if (!title.trim() || !description.trim()) {
        alert("Both title and description are required.")
        return
      }

      const wordCount = description.trim().split(/\s+/).length;

      if(wordCount>18){
        setErrorMessage("Description cannot exceed 18 words.");
        return;
      }

      dispatch(postStory({ title, description, author }))
      setTitle("")
      setDescription("")
      setStorySuccess(true);

      setTimeout(()=>{
        setStorySuccess(false)
        navigate("/stories")
      },2000)
    }

    console.log("Stories:",stories)
    
  return (
    
    <>
    <Text  textStyle={"lg"} fontWeight={"medium"} mt={2}>Hello, {user?.displayName || user?.email || "User"}</Text>
    {storySuccess? (
      <Text fontSize="xl" color="green.500" textAlign="center">Story created successfully, you can see your story in story section!</Text>
    ):
    user ? (
      <Flex
         direction="column"
         alignItems="center"
         justifyContent="center"
         minH="70vh" 
         px={6} 
       >
     <Card.Root maxW="sm" bg={"white"} border={"none"} boxShadow={"2xl"} color={"black"} justifySelf={"center"} mt={10}>
     <Card.Header>
       <Card.Title color={"red.700"} textStyle={'2xl'} fontWeight={"semibold"}>Create a New Story</Card.Title>
       <Card.Description>
        Share your creativity with a title and a one-sentence story!</Card.Description>
     </Card.Header>
     <Card.Body>
       <Stack gap="4" w="full">
         <Field.Root>
           <Input placeholder="Enter your story title" boxShadow={"md"} p={3} borderRadius={8} type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
         </Field.Root>
         <Field.Root>
           <Textarea placeholder="Write your story description in one sentence" boxShadow={"md"} h={70} borderRadius={8} value={description} onChange={(e)=>setDescription(e.target.value)}/>
           {errorMessage && <Text color="red.500" textAlign={"center"}>{errorMessage}</Text>}
         </Field.Root>
       </Stack>
     </Card.Body>
     <Card.Footer justifyContent="center">
       <Button variant="solid" colorPalette={"red"}  w={"100%"} boxShadow={"md"} p={3} borderRadius={8} textStyle={"lg"} fontWeight={"semibold"} onClick={handleSubmitStory}>Submit Story</Button>
     </Card.Footer>
   </Card.Root>
   </Flex> 
    ): null
    }

     </>
         
            
  )
};

export default CreateStory;