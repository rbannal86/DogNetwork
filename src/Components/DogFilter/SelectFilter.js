import { useQuery } from "@apollo/client";

import './DogFilter.css';

const SelectFilter = ({handleFilter, selected, query, subject, valueKey, nameKey}) => {
    const { loading, error, data } = useQuery(query);

    if(error) return <h2>Error Loading Filter</h2>

    if(loading) return <h3>Loading...</h3>
    
    const setSelected = () => {
        if(selected.length > 1) return '';
        return selected[0];
    }

    const generateOptions = () => {
        return data[subject].map((item) => <option value={item[valueKey]} key={item[valueKey]}>{item[nameKey]}</option>)
    }

    return(
        <select
            name={subject}
            id={subject}
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={setSelected()}
            className="dogfilter-input"
        >
            <option value={''}>Any</option>
            {generateOptions()}
        </select>
    )
}

export default SelectFilter;
