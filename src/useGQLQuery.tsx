import { useQuery } from "react-query";

const endpoint =
  "https://serve.onegraph.com/graphql?app_id=0b33e830-7cde-4b90-ad7e-2a39c57c0e11";
const headers = { "Content-Type": "application/json" };

export const useGQLQuery = (key, query, config = {}) => {
  const fetchData = () =>
    fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => response.json())
      .then(
        ({
          data: {
            devTo: {
              articles: { nodes: result },
            },
          },
        }) => result
      );
  return useQuery<any, Error>(key, fetchData, config);
};
