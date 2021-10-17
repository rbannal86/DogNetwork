import './FilterSidebar.css';
import { FETCH_BREEDS, FETCH_SEXES, FETCH_SIZES } from '../../graphql/queries';
import DogFilter from '../DogFilter/DogFilter';

const FilterSidebar = ({filterHandlers, selectedValues}) => {
    return(
        <div className='filtersidebar-main'>
            <h3>Breed</h3>
            <DogFilter handleFilter={filterHandlers.handleBreedFilter} selected={selectedValues.breed} query={FETCH_BREEDS} subject='breeds' valueKey='id' nameKey='name'/>
            <h3>Size</h3>
            <DogFilter handleFilter={filterHandlers.handleSizeFilter} selected={selectedValues.size} query={FETCH_SIZES} subject='breeds' valueKey='size' nameKey='size'/>
            <h3>Sex</h3>
            <DogFilter handleFilter={filterHandlers.handleSexFilter} selected={selectedValues.sex} query={FETCH_SEXES} subject='dogs' valueKey='sex' nameKey='sex' />
        </div>
    )
}

export default FilterSidebar;
