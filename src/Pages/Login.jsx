import { signupWithGoogle } from '@/redux/actions/authAction'
import { loginWithEmail } from '@/redux/actions/authAction';
import { Button, HStack, Card, Field, Input, Stack, Text, Flex } from '@chakra-ui/react'
import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const error = useSelector((state)=>state.auth.error)     
       
     const handleEmail = ()=>{
      dispatch(loginWithEmail(email,password,navigate))
    
     }
    

    const handleGoogleLogin = () =>{
        dispatch(signupWithGoogle(navigate))
    }
  return (
    <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    minH="80vh" 
    px={6} 
  >
    
    <Card.Root maxW="sm" boxShadow={"2xl"} justifySelf={"center"} mt={55}>
    <Card.Header>
      <Card.Title textAlign={"center"}>Login to StoryWeave</Card.Title>
    
      <HStack>
      <Button>Continue with Email</Button>
      <Button onClick={handleGoogleLogin}>Continue with Google</Button>
      </HStack>
      </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
             <Input type='password' value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
        </Field.Root>
        {error && <Text color="red.500" textAlign={"center"}>Invalid email or password, try again!</Text>}
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="space-between">
      <Button variant="solid" mt={8} onClick={handleEmail}>Login</Button>
      <Stack justifyContent={"flex-end"}>
      <Text>Don't have account? </Text>
      <Button onClick={()=>navigate("/signup")}>Signup here</Button>
     </Stack>
    </Card.Footer>
  </Card.Root>
    </Flex>
     
  )
}

export default Login
