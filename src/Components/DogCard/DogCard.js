import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import './DogCard.css'

const DogCard = ({name, breed, age, images, sex}) => {
    const card = (
        <React.Fragment>
            <CardContent>
                <Box sx={{ border: 2 }} marginBottom='3%'>
                    <CardMedia
                        component="img"
                        height="120"
                        image={images[0].url}
                        alt={name}
                    ></CardMedia>
                </Box>
            </CardContent>
            <CardContent sx={{ paddingLeft: 0 }}>
                <Box>
                    <Typography textAlign='left' fontWeight='bold' gutterBottom>
                        {name}
                    </Typography>
                    <Typography textAlign='left'>
                        Breed: {breed}
                    </Typography>
                    <Typography textAlign='left'>
                        Age: {age}
                    </Typography>
                    <Typography textAlign='left'>
                        Sex: {sex}
                    </Typography>
                </Box>
            </CardContent>
        </React.Fragment>
    )

    return(
        <Box sx={{border: 2, borderColor: 'black', height: 175 }}>
            <Card sx ={{ display: 'flex', height: 175, width: 350 }}variant="outlined">{card}</Card>
        </Box>
        
    )
}

export default DogCard;
