import TextField from '@mui/material/TextField';
import './DogFilter.css';

const InputFilter = ({handleFilter}) => {
    return(
        <TextField
            className="dogfilter-input"
            type="text" 
            onChange={(e) => handleFilter(e.target.value)}
            placeholder='Insert Name To Search'
            variant="standard"
            sx={{ backgroundColor: 'whitesmoke', width: '100%', fontSize: '1.2rem', height: '2rem'}}
        />
    )
}

export default InputFilter;
