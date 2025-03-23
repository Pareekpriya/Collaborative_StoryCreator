import { signupWithGoogle } from '@/redux/actions/authAction'
import { loginWithEmail } from '@/redux/actions/authAction';
import { Button, HStack, Card, Field, Input, Stack, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
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
    
     const cardMarginX = useBreakpointValue({ base: '0.5', md: '0' });
     const paddingButton = useBreakpointValue({base:'2', md:'4'})
     const buttonGap = useBreakpointValue({base:2, md:4})
     
    const handleGoogleLogin = () =>{
        dispatch(signupWithGoogle(navigate))
    }
  return (
    <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    minH="80vh"
    px={cardMarginX}
    minW={"100%"}
  >
    
    <Card.Root borderRadius={"3xl"} maxW="sm" boxShadow={"2xl"} justifySelf={"center"} alignSelf={"center"} mx={cardMarginX} w={"100%"}
    >
    <Card.Header>
      <Card.Title mb={"10px"}  textAlign={"center"}>Login to StoryWeave</Card.Title>
    
      <HStack gap={buttonGap} minW={"100%"} justifyContent={"center"}>
      <Button p={paddingButton} borderRadius={"full"} variant={"outline"}>Continue with Email</Button>
      <Button p={paddingButton} borderRadius={"full"} variant={"outline"} onClick={handleGoogleLogin}>Continue with Google</Button>
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
        <Button variant="solid" borderRadius={"full"} bg={"red"} onClick={handleEmail}>Login</Button>

      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="center">
      <Stack flexDirection={"row"} justifyContent={"center"}>
      <Text>Don't have account? </Text>
      <Button color={"blue.600"} borderRadius={"full"} variant={"subtle"} onClick={()=>navigate("/signup")}>Signup here</Button>
     </Stack>
    </Card.Footer>
  </Card.Root>
    </Flex>
     
  )
}

export default Login
