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
        breeds(order_by: { name: asc }) {
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

export const FETCH_SEXES = gql`
    query MyQuery {
        dogs(distinct_on: sex) {
        sex
        }
    }
`

export const FETCH_DOGS_FILTER =  gql`
    query MyQuery($breed: [Int], $size: [String], $sex: [String], $name: String, $offset: Int, $limit: Int) {
        dogs(offset: $offset, limit: $limit, where: {deactivated: {_is_null: true}, name: {_regex: $name} sex: {_in: $sex}, breed: {_in: $breed}, breedByBreed: {size: {_in: $size}}}) {
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

export const FETCH_DOG_COUNT = gql`
        query MyQuery($breed: [Int], $size: [String], $sex: [String], $name: String) {
            dogs_aggregate(where: {deactivated: {_is_null: true}, name: {_regex: $name} sex: {_in: $sex}, breed: {_in: $breed}, breedByBreed: {size: {_in: $size}}}) {
                aggregate {
                    count
                }
            }
        }
`

export const INSERT_BREED = gql`
    mutation insert_single_breed($object: breeds_insert_input!) {
        insert_breeds_one(object: $object) {
            id
        }
    }
    `

export const INSERT_DOG = gql`
    mutation addDog($object: dogs_insert_input!) {
        insert_dogs_one(object: $object) {
            id
        }
    }
`
