import { useQuery } from "@apollo/client";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import './DogFilter.css';

const SelectFilter = ({handleFilter, selected, query, subject, valueKey, nameKey}) => {
    const { loading, error, data } = useQuery(query);

    if(error) return <h2>Error Loading Filter</h2>

    if(loading) return <h3>Loading...</h3>
    
    const setSelected = () => {
        console.log(selected)
        if(selected.length > 1) return ' ';
        return selected[0];
    }

    const generateOptions = () => {
        return data[subject].map((item) => <MenuItem value={item[valueKey]} key={item[valueKey]}>{item[nameKey]}</MenuItem>)
    }

    return(
        <Select
            name={subject}
            labelId={subject}
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={setSelected()}
            value={setSelected()}
            className="dogfilter-input"
        >
            <MenuItem value={' '}>Any</MenuItem>
            {generateOptions()}
        </Select>
    )
}

export default SelectFilter;
