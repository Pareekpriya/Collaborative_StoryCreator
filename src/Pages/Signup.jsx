import { signupWithGoogle } from '@/redux/actions/authAction'
import { Button, Flex, HStack, Card, Field, Input, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupWithEmail } from '@/redux/actions/authAction';

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGoogleSignup = () =>{
      dispatch(signupWithGoogle(navigate))
  }

  const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  
    
   const handleEmail = ()=>{
        dispatch(signupWithEmail(email,password,navigate))
  
   }

  const cardMarginX = useBreakpointValue({ base: '0.5', md: '0' });
  const paddingButton = useBreakpointValue({base:'3', md:'4'})

   return (
    <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    minH="80vh"
    px={cardMarginX}
    minW={"100%"}
  >
            
        <Card.Root borderRadius={"3xl"} maxW="sm"  boxShadow={"2xl"} justifySelf={"center"} alignSelf={"center"} w={"100%"}>
        <Card.Header>
          <Card.Title mb={"10px"} textAlign={"center"}>Signup to StoryWeave</Card.Title>
        
          <HStack gap={1} minW={"100%"} justifyContent={"center"}>
          <Button p={paddingButton} variant={"outline"} borderRadius={"full"}>Continue with Email</Button>
          <Button p={paddingButton} variant={"outline"} borderRadius={"full"} onClick={handleGoogleSignup}>Continue with Google</Button>
          </HStack>
          </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Email</Field.Label>
           <Input type='email' value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
        <Input type='password' value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent={"space-around"}>
          <HStack gap={1} minW={"100%"} justifyContent={"center"} >
          <Button w={"3xs"} bg={"red"} borderRadius={"full"} onClick={handleEmail}>Signup</Button>
          <Button borderRadius={"full"} variant={"outline"} onClick={()=>navigate("/")}>Cancel</Button>
         </HStack>
        </Card.Footer>
      </Card.Root>
        </Flex>
         
  )
}

export default Signup
