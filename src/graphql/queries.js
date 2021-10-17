import { gql } from '@apollo/client';

export const FETCH_DOGS = gql`
    query DogQuery {
        dogs(where: {deactivated: {_is_null: true}}) {
        age
        sex
        breedByBreed {
            id
            name
            size
        }
        name
        images {
            url
        }
        }
    }
`;

export const FETCH_BREEDS = gql`
    query BreedQuery {
        breeds {
            name
            id
        }
    }
`  
export const BREED_FILTER =  gql`
    query MyQuery($breed: [Int]) {
        dogs(where: {deactivated: {_is_null: true}, breed: {_in: $breed}}) {
          age
          sex
          breedByBreed {
            id
            name
            size
          }
          name
          images {
            url
          }
        }
      }
    `
