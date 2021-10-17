import './FilterSidebar.css';
import { FETCH_BREEDS } from '../../graphql/queries';
import DogFilter from '../DogFilter/DogFilter';

const FilterSidebar = ({handleFilter, selectedBreed}) => {
    return(
        <div className='filtersidebar-main'>
            <DogFilter handleFilter={handleFilter} selected={selectedBreed} query={FETCH_BREEDS} subject='breeds'/>
        </div>
    )
}

export default FilterSidebar;
