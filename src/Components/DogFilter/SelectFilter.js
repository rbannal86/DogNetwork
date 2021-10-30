import { useQuery } from "@apollo/client";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import './DogFilter.css';

const SelectFilter = ({handleFilter, selected, query, subject, valueKey, nameKey}) => {
    const { loading, error, data } = useQuery(query);

    if(error) return <h2>Error Loading Filter</h2>;

    if(loading) return <h3>Loading...</h3>;

    const setSelected = () => {
        // eslint-disable-next-line quotes
        if(selected.length > 1) return ``;
        return selected[0];
    };

    const generateOptions = () => {
        return data[subject].map((item) => <MenuItem value={item[valueKey]} key={item[valueKey]}>{item[nameKey]}</MenuItem>);
    };

    return(
        <Select
            name={subject}
            labelId={subject}
            onChange={(e) => handleFilter(e.target.value)}
            // eslint-disable-next-line quotes
            defaultValue={``}
            // eslint-disable-next-line quotes
            value={setSelected() || ``}
            className="dogfilter-input"
            sx={{ backgroundColor: 'whitesmoke', width: '100%', fontSize: '1.2rem', height: '2rem' }}
        >
            {/* eslint-disable-next-line quotes */}
            <MenuItem value={``}>Any</MenuItem>
            {generateOptions()}
        </Select>
    );
};

export default SelectFilter;
