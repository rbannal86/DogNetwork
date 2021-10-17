import { FETCH_BREEDS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const DogFilter = ({handleFilter, selectedBreed}) => {
    const { loading, error, data } = useQuery(FETCH_BREEDS);
    
    if(error) return <h2>Whoops!</h2>

    if(loading) return <h2>Loading...</h2>

    const setSelected = () => {
        if(selectedBreed.length > 1) return '';
        return selectedBreed[0];
    }

    const generateOptions = () => {
        return data.breeds.map((breed) => <option value={breed.id} key={breed.name}>{breed.name}</option>);
    }

    return(
        <div>
            <select
                name='breed'
                id='breed'
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
