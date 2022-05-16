import { gql } from "@apollo/client";

// queries
const getBookQuery = gql`
{
    book{
      title
      author
      pages{
        content
        pageIndex
        tokens{
          position
          value
        }
      }
    }
  }
`;

export { getBookQuery }