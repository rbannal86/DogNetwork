import './DogFilter.css';

const InputFilter = ({handleFilter}) => {
    return(
        <input
            className="dogfilter-input"
            type="text" 
            onChange={(e) => handleFilter(e.target.value)}
            placeholder='Insert Name To Search'
        />
    )
}

export default InputFilter;
