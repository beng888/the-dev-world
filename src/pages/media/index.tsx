import { RouterLink } from "Layout/components/PageTransition";
import { useInfiniteQuery } from "react-query";

type CharactersPage = {
  results: Character[];
  next: number | undefined;
};
type Character = {
  name: string;
};

type CharacterResponse = {
  results: Character[];
  next: string;
};

function assertIsCharacterResponse(
  response: any
): asserts response is CharacterResponse {
  if (!("results" in response && "next" in response)) {
    throw new Error("Not results");
  }
  if (response.results.length > 0) {
    const firstResult = response.results[0];
    if (!("name" in firstResult)) {
      throw new Error("Not characters");
    }
  }
}

async function getData({ pageParam = 1 }) {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const dataFromServer = await response.json();
  assertIsCharacterResponse(dataFromServer);
  const data: CharactersPage = {
    results: dataFromServer.results,
    next: dataFromServer.next === null ? undefined : pageParam + 1,
  };
  return data;
}

const Media = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<CharactersPage, Error>("characters", getData, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  return (
    <div className="w-screen min-h-screen bg-white h-200vw pt-8vw pl-8vw">
      <RouterLink to="/">
        <p className="text-9vw">
          Featured
          <br /> Media
        </p>
      </RouterLink>
      <div>
        {data &&
          data.pages.map((group, i) => (
            <div key={i}>
              {group.results.map((character) => (
                <div key={character.name}>{character.name}</div>
              ))}
            </div>
          ))}
      </div>
      <div>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading ..." : "More"}
          </button>
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="w-screen min-h-screen bg-white h-200vw pt-8vw pl-8vw">
  //     <RouterLink to="/">
  //       <p className="text-9vw">
  //         Featured
  //         <br /> Media
  //       </p>
  //     </RouterLink>
  //   </div>
  // );
};

export default Media;
