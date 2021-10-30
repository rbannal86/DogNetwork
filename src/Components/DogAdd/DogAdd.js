import { useMutation } from '@apollo/client';
import { useState } from 'react';
import faker from 'faker';
import { INSERT_BREED, INSERT_DOG } from '../../graphql/queries';

const DogAdd = ({ breeds, refetchBreeds, setDogsUpdated, dogsUpdated, refetchDogs }) => {
  const SEX = ['Male', 'Female'];
  const SIZE = ['Small', 'Medium', 'Large'];

  const [creatingDog, setCreatingDog] = useState(false)
  const [addBreed] = useMutation(INSERT_BREED);
  const [addDog] = useMutation(INSERT_DOG);

  const timer = ms => new Promise(res => setTimeout(res, ms));

  const handleMultipleNewDogs = async () => {
    for(let i = 0; i < 5000; i++) {
      await handleNewDog()
      await timer(1000);
      console.log(i)
    }
  }

  const handleNewDog = async () => {
    setCreatingDog(true)
    const name = faker.name.firstName();
    const breed = faker.animal.dog();
    const sex = SEX[Math.floor(Math.random() * 2)];
    const size = SIZE[Math.floor(Math.random() * 3)];
    const age = Math.floor(Math.random() * 20);
    const imageURL = await fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()).then(data => data.message);

    let breedID;

    console.log(breed)
    if(breeds.some(curr => curr.name === breed)) {
      breedID = breeds.filter(curr => curr.name === breed)[0].id
    } else {
      const breedVariables = {
        object: {
          name: breed,
          size
        }
      }
      const breedData = await addBreed({ variables: breedVariables })
      breedID = breedData.data.insert_breeds_one.id;
      // refetchBreeds()
    }

    const dogVariables = {
      object: {
        age,
        images: {
          data: {
            url: imageURL,
          },
        },
        name,
        sex,
        breed: breedID
      }
    }
    await addDog({ variables: dogVariables })
    // await refetchDogs()
    setCreatingDog(false)
    setDogsUpdated(!dogsUpdated)
  }

  return (
    <div>
      <button onClick={() => handleMultipleNewDogs()} disabled={creatingDog}>Add Random Dog</button>
    </div>
  );
};

export default DogAdd;
