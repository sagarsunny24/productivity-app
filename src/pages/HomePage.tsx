import { Container,Box ,Typography } from "@mui/material"
import homeImg from '../assets/homeimg.png'
export default function HomePage() {
  return (
     <Container sx={{mt:10}}>
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
