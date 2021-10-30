import './FilterSidebar.css';
import { FETCH_BREEDS, FETCH_SEXES, FETCH_SIZES } from '../../graphql/queries';
import SelectFilter from '../DogFilter/SelectFilter';
import InputFilter from '../DogFilter/InputFilter';

const FilterSidebar = ({filterHandlers, selectedValues, dogCount}) => {
    return(
        <div className='filtersidebar-main'>
            <h2>Filters</h2>
            <h3>Breed</h3>
            <SelectFilter handleFilter={filterHandlers.handleBreedFilter} selected={selectedValues.breed} query={FETCH_BREEDS} subject='breeds' valueKey='id' nameKey='name'/>
            <h3>Size</h3>
            <SelectFilter handleFilter={filterHandlers.handleSizeFilter} selected={selectedValues.size} query={FETCH_SIZES} subject='breeds' valueKey='size' nameKey='size'/>
            <h3>Sex</h3>
            <SelectFilter handleFilter={filterHandlers.handleSexFilter} selected={selectedValues.sex} query={FETCH_SEXES} subject='dogs' valueKey='sex' nameKey='sex' />
            <h3>Name</h3>
            <InputFilter handleFilter={filterHandlers.handleNameFilter} />
            <h4>{`Lookin' at ${dogCount} pupper${dogCount === 1 ? '' : 's'}`}</h4>
        </div>
    );
};

export default FilterSidebar;
