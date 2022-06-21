import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $Name: String!
    $email: String!
    $designation: String
    $experience:String
  ) {
    createUser(
      Name: $Name
      email: $email
      designation: $designation
      experience:$experience
    ) {
      id
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser(
    $id: Int!
    
  ) {
    deleteUser(id: $id) {
      id
    }
  }
`;