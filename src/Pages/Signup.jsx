import { signupWithGoogle } from '@/redux/actions/authAction'
import { Button, Flex, HStack, Card, Field, Input, Stack, Text } from '@chakra-ui/react'
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

   return (
    <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="80vh" 
        px={6} 
      >
     {/* <VStack p={5}>
       <Button onClick={handleGoogleSignup}>Signup with Google</Button>
       <Button onClick={()=>navigate("/signupWithEmail")}>Signup with Email & Password</Button>
    </VStack> */}

          
        <Card.Root maxW="sm" justifySelf={"center"} mt={55}>
        <Card.Header>
          <Card.Title textAlign={"center"}>Signup to StoryWeave</Card.Title>
        
          <HStack>
          <Button>Continue with Email</Button>
          <Button onClick={handleGoogleSignup}>Continue with Google</Button>
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
        <Card.Footer>
          <HStack>
          <Button onClick={handleEmail}>Signup</Button>
          <Button onClick={()=>navigate("/")}>Cancel</Button>
         </HStack>
        </Card.Footer>
      </Card.Root>
        </Flex>
         
  )
}

export default Signup
