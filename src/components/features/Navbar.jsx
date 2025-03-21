import {  Box, Button, Flex, Heading, Span, IconButton, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/actions/authAction'
import { ColorModeButton } from "@/components/ui/color-mode"
import { FaHome, FaBook, FaPlus, FaUser } from 'react-icons/fa'

function Navbar() {
  const user = useSelector((state)=>state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


   const handleLogOut= () =>{
    if (window.confirm('Do you really want to logout?')) {
      dispatch(logout(navigate));
    }
  }
  
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
  
      <Flex as={"nav"} justify={"space-between"} p={2} m={2} >
        <Box>
          <Heading textStyle={"3xl"} fontWeight={"bold"} color={"blue.800"} style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Story<Span color={"red.500"}>Weave</Span>
          </Heading>
          </Box>

        {isSmallScreen ? (
          <Flex align="center" gap={2}  position="fixed" 
          bottom="0" 
          left="0"
          right="0"
          justify="space-around" 
          boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)" 
          p={5} 
          zIndex="999"
           >
         <Box
            as="button"
            onClick={() => navigate('/')}
            _hover={{ color: 'blue.600', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            <FaHome size="24px" />
           </Box> 
           <Box
            as="button"
            onClick={() => navigate('/stories')}
            _hover={{ color: 'blue.600', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            <FaBook size="24px" />
          </Box>
          <Box
            as="button"
            onClick={() => navigate('/createStory')}
            _hover={{ color: 'blue.600', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            <FaPlus size="24px" />
          </Box>
          {user ? (
                       <Box
                       as="button"
                       onClick={handleLogOut}
                       _hover={{ color: 'blue.600', transform: 'scale(1.1)' }}
                       transition="all 0.3s ease"
                     >
                       <FaUser size="24px" />
                       </Box>
          ):(
            <Box
            as="button"
            onClick={() => navigate('/login')}
            _hover={{ color: 'blue.600', transform: 'scale(1.1)' }}
            transition="all 0.3s ease"
          >
            <FaUser size="24px" />
          </Box>
          )}
         </Flex> 
          ): (
         <Flex>
           <Button onClick={()=>navigate("/")} variant={""}  textStyle={"md"} fontWeight={"medium"}>Home</Button>
          <Button onClick={()=>navigate("/stories")} variant={""}  textStyle={"md"} fontWeight={"medium"}>Stories</Button>
          <Button onClick={()=>navigate("/createStory")} variant={""}  textStyle={"md"} fontWeight={"medium"}>Create Story</Button>
       {user ? ( <Button onClick={handleLogOut} variant={""}  textStyle={"md"} fontWeight={"medium"}>Logout</Button> 
       ) : (<Button onClick={()=>navigate("/login")} variant={""}  textStyle={"md"} fontWeight={"medium"}>Login</Button> ) 
       }
        </Flex>
          )}
         
        <ColorModeButton />
        </Flex>
    
   )
}; 

export default Navbar; 