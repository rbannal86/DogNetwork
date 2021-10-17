import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_DOGS_FILTER } from "../../graphql/queries";

import DogCard from '../DogCard/DogCard';
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";

import './DogView.css'

const DogView = () => {
  const [breed, setBreed] = useState([...Array(100).keys()]);
  const [size, setSize] = useState(['Small', 'Medium', 'Large']);
  const [sex, setSex] = useState(['Male', 'Female']);

  const { loading, error, data } = useQuery(FETCH_DOGS_FILTER, {
    variables: {
      breed,
      size,
      sex
    }
  });

  const handleBreedFilter = (breed) => {
    if (breed === '') setBreed([...Array(100).keys()]);
    else setBreed([breed]);
  };

  const handleSizeFilter = (size) => {
    if (size === '') setSize(['Small', 'Medium', 'Large']);
    else setSize([size]);
  }
  
  const handleSexFilter = (sex) => {
    if (sex === '') setSex(['Male', 'Female']);
    else setSex([sex]);
  }
  
  const filterHandlers = {
    handleBreedFilter,
    handleSizeFilter,
    handleSexFilter
  }

  const selectedValues = {
    size,
    breed,
    sex
  }

  const renderDogs = () => {
    return data.dogs.map((dog, index) => {
      return <li key={`dog ${index}`} className="dogview-list-item">
        <DogCard name={dog.name}
          age={dog.age}
          breed={dog.breedByBreed.name}
          images={dog.images}
          sex={dog.sex}
        />
      </li>
    });
  }

  return (
    <div className="dogview-main">
      {/* <DogFilter handleFilter={handleBreedFilter} selectedBreed={breed}/> */}
      <FilterSidebar filterHandlers={filterHandlers} selectedValues={selectedValues}/>
      {error ? <h2>Error Fetching Dogs</h2> : null}
      {loading ? <LoadingDisplay /> : null}
      {!error && !loading ?
        <ul className="dogview-list">
          {renderDogs()}
        </ul> :
        null
      }
    </div>
  );
};

export default DogView;
