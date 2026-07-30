import { Container,Box ,Typography,Button } from "@mui/material"
import homeImg from '../assets/homeimg.png'
import { useNavigate } from "react-router"
export default function HomePage() {
  const navigate = useNavigate()
  return (
     <Container sx={{mt:10}}>
       <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
            >
              Welcome to task-man
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
                fontSize: 15,
              }}
            >
              Productivity App
            </Typography>
            <Button variant="contained" sx={{mt:5}} onClick={()=>navigate('/login')}>Go to Login</Button>
          </Box>
          
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <Typography variant='h1' sx={{fontFamily: 'Bricolage Grotesque'}} >
      task <span><i>man</i></span> 
      </Typography>
      <Typography variant='h5' sx={{fontFamily:'Bricolage Grotesque'}}>
        Super <i style={{color:'blue'}}>power</i> your tasks now with our new task manager
      </Typography>
      <Box
  component="img"
  src={homeImg}
  alt=""
  sx={{
    mt: 5,
    width: "100%",
    maxWidth: {
      xs: 280,
      sm: 400,
      md: 250,
    },
    height: "auto",
    objectFit: "cover",
    display: "block",
    mx: "auto",
  }}
/>
      </Box>
    </Container>
  )
}
