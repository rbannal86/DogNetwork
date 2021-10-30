import { useState, lazy, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_DOGS_FILTER, FETCH_BREEDS, FETCH_DOG_COUNT } from '../../graphql/queries';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
import DogScroll from '../DogScroll/DogScroll';

import './DogView.css';

const DogCard = lazy(() => import('../DogCard/DogCard'));
// import DogCard from '../DogCard/DogCard';

const DogView = () => {
  const [breed, setBreed] = useState([]);
  const [size, setSize] = useState(['Small', 'Medium', 'Large']);
  const [sex, setSex] = useState(['Male', 'Female']);
  const [name, setName] = useState('.*');
  const [offset, setOffset] = useState(0);

  const LIMIT = 60;

  const { loading, error, data } = useQuery(FETCH_DOGS_FILTER, {
    variables: {
      breed,
      size,
      sex,
      name,
      offset,
      limit: LIMIT,
    }
  });

  const {data: countData} = useQuery(FETCH_DOG_COUNT, {
    variables: {
      breed,
      size,
      sex,
      name,
    }
  });

  const { data: breedData } = useQuery(FETCH_BREEDS, { onCompleted: () => {
    setBreed(breedData.breeds.map(breed => breed.id));
  } });

  const handleBreedFilter = (breed) => {
    const breedIDs = breedData.breeds.map(breed => breed.id);
    // eslint-disable-next-line quotes
    if (breed === ``) setBreed(breedIDs);
    else setBreed([breed]);
  };

  const handleSizeFilter = (size) => {
    // eslint-disable-next-line quotes
    if (size === ``) setSize(['Small', 'Medium', 'Large']);
    else setSize([size]);
  };

  const handleSexFilter = (sex) => {
    // eslint-disable-next-line quotes
    if (sex === ``) setSex(['Male', 'Female']);
    else setSex([sex]);
  };

  const handleNameFilter = (name) => {
    if (name === '') setName('.*');
    else setName(name);
  };

  const filterHandlers = {
    handleBreedFilter,
    handleSizeFilter,
    handleSexFilter,
    handleNameFilter
  };

  const selectedValues = {
    size,
    breed,
    sex,
    name
  };

  const renderDogs = () => {
    return data.dogs.map((dog, index) => {
      return <li key={`dog ${index}`} className="dogview-list-item">
        <Suspense fallback={<div>Loading...</div>}>
          <DogCard name={dog.name}
            age={dog.age}
            breed={dog.breedByBreed.name}
            images={dog.images}
            sex={dog.sex}
          />
        </Suspense>
      </li>;
    });
  };

  return (
    <div className="dogview-main">
      <FilterSidebar filterHandlers={filterHandlers} selectedValues={selectedValues} dogCount={countData?.dogs_aggregate?.aggregate?.count || 0}/>
      {error ? <h2>Error Fetching Dogs</h2> : null}
      {loading ? <LoadingDisplay /> : null}
      {!error && !loading ?
        <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
          <DogScroll offset={offset} setOffset={setOffset} limit={LIMIT} dogCount={countData?.dogs_aggregate?.aggregate?.count || 0}/>
          <ul className="dogview-list">
            {renderDogs()}
          </ul>
        </div> :
        null
      }
    </div>
  );
};

export default DogView;
