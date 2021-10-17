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

export const FETCH_SIZES = gql`
    query SizeQuery {
        breeds(distinct_on: size) {
        size
        }
    }
`
export const BREED_FILTER =  gql`
    query MyQuery($breed: [Int], $size: [String]) {
        dogs(where: {deactivated: {_is_null: true}, breed: {_in: $breed}, breedByBreed: {size: {_in: $size}}}) {
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
