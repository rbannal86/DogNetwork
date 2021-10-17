import { useQuery } from "@apollo/client";

const DogFilter = ({handleFilter, selected, query, subject}) => {
    const { loading, error, data } = useQuery(query);

    if(error) return <h2>Error Loading Filter</h2>

    
    if(loading) return <h3>Loading...</h3>
    
    const setSelected = () => {
        if(selected.length > 1) return '';
        return selected[0];
    }

    const generateOptions = () => {
        return data[subject].map((item) => <option value={item.id} key={item.id}>{item.name}</option>)
    }

    return(
        <div>
            <select
                name={subject}
                id={subject}
                onChange={(e) => handleFilter(e.target.value)}
                defaultValue={setSelected()}
            >
                <option value={''}>Any</option>
                {generateOptions()}
            </select>
        </div>
    )
}

export default DogFilter;
