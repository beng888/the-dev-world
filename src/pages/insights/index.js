import Profile from "@pages/home/Profile";
import { RouterLink } from "Layout/components/PageTransition";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useGlobalContext } from "@contexts/GlobalContext";

import { categories } from "@common/static";
import Cross from "@common/icon/Cross";
import { useRouter } from "next/router";

const Insights = () => {
  const [page, setPage] = useState(1);
  const [height, setHeight] = useState(0);
  const { loco, nav, globalKey } = useGlobalContext();

  const [locoValue, setlocoValue] = loco;
  const [globalKeyValue, setGlobalKeyValue] = globalKey;
  const [navValue, setnavValue] = nav;

  const router = useRouter();
  const pageLimit = 20,
    ArticlesPerPage = 15;

  console.log(categories);

  const containerRef = useRef(null);
  const testRef = useRef(null);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(testRef.current.clientHeight);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    // window.alert(containerRef.current.clientHeight);
    containerRef.current && setHeight(containerRef.current.clientHeight);

    setlocoValue({ ...locoValue, resetLocomotive: true });

    console.log(router.pathname);
  }, [page]);

  // useEffect(() => {
  //   setlocoValue({ ...locoValue, resetLocomotive: true });
  // }, [height]);

  const fetchInfiniteArticles = async ({ pageParam = page }) => {
    setPage(page + 1);
    // containerRef.current && setHeight(containerRef.current.clientHeight);

    // if (page > 1) {
    //   setlocoValue({ ...locoValue, resetLocomotive: true });
    //   window.alert(`${page}`);
    // }

    if (router.pathname === "/insights") {
      setnavValue({ ...navValue, navScrollTraveled: 0 });
    }
    // setGlobalKeyValue(globalKeyValue + 1);
    const response = await fetch(
      `https://dev.to/api/articles?per_page=${ArticlesPerPage}&page=${pageParam}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response.json();
  };

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery("users", fetchInfiniteArticles, {
      getNextPageParam: (lastPage, pages) => {
        return page !== pageLimit ? page : false;
      },
      refetchOnWindowFocus: false,
    });

  // console.log(data);

  const Articles = ({
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
  }) => {
    return (
      <div className="pb-0">
        {isLoading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p>Something went wrong ...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-2vw md:pl-8vw md:pr-3vw">
              {data.pages.map((page) =>
                page.map((article) => (
                  <div key={article.id} className="w-full">
                    <img src={article.social_image} className="w-full" />
                    <div className="flex flex-col p-2vw ">
                      <p className="flex gap-4 text-sm">
                        <span className="whitespace-nowrap">
                          {article.created_at}
                        </span>
                        <span>{article.user.name}</span>
                      </p>
                      <p className="my-4 text-2xl">{article.title}</p>
                      <p className="text-sm">Topics: {article.tags}</p>
                    </div>
                  </div>
                ))
              )}{" "}
            </div>
            {isFetching && <p>Loading ...</p>}
            {hasNextPage && (
              <div className="grid h-96 place-content-center">
                <Cross
                  onClick={() => fetchNextPage()}
                  stroke="white"
                  strokeWidth={2}
                  className="w-20 h-20 p-4 mb-2 duration-1000 transform rotate-45 bg-gray-400 border rounded-full cursor-pointer hover:bg-gray-300"
                />

                <div>Load More </div>
              </div>
            )}

            <div className="relative w-full md:pl-5vw">
              <Profile profiles={data.pages[0]} />
            </div>
          </>
        )}
      </div>
    );
  };

  if (!locoValue.resetLocomotive) {
    return (
      <div
        // key={globalKeyValue}
        ref={containerRef}
        className="relative w-screen overflow-x-hidden overflow-y-scroll bg-white pt-8vw h-200vw"
        // style={{ minHeight: height ? `${height}px` : "100vh" }}
        // style={{ minHeight: "500vh" }}
        // style={{ minHeight: `${height}px` }}
      >
        <div ref={testRef}></div>
        <RouterLink to="/media">
          <p className="leading-tighter text-9vw pl-8vw">
            Featured
            <br /> Insights {`${height}px`} {`${locoValue.resetLocomotive}`}{" "}
            {`${globalKeyValue}`}
          </p>
        </RouterLink>
        <div
          className="leading-tighter text-9vw pl-8vw"
          onClick={() => setlocoValue({ ...locoValue, resetLocomotive: true })}
        >
          RESET
        </div>
        <div className="flex items-center justify-between overflow-x-auto gap-2vw pl-8vw h-20vw">
          <div className="border rounded-full py-0.5vw px-1.5vw whitespace-nowrap">
            View all
          </div>

          {categories?.map((c) => (
            <div
              key={c.title}
              className="border rounded-full py-0.5vw px-1.5vw whitespace-nowrap"
            >
              {c.title}
            </div>
          ))}
        </div>
        <div className="pb-0">
          {isLoading ? (
            <p>Loading ...</p>
          ) : error ? (
            <p>Something went wrong ...</p>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-2vw md:pl-8vw md:pr-3vw">
                {data.pages.map((page) =>
                  page.map((article) => (
                    <div key={article.id} className="w-full">
                      <img src={article.social_image} className="w-full" />
                      <div className="flex flex-col p-2vw ">
                        <p className="flex gap-4 text-sm">
                          <span className="whitespace-nowrap">
                            {article.created_at}
                          </span>
                          <span>{article.user.name}</span>
                        </p>
                        <p className="my-4 text-2xl">{article.title}</p>
                        <p className="text-sm">Topics: {article.tags}</p>
                      </div>
                    </div>
                  ))
                )}{" "}
              </div>
              {isFetching && <p>Loading ...</p>}
              {hasNextPage && (
                <div className="grid h-96 place-content-center">
                  <Cross
                    onClick={() => fetchNextPage()}
                    stroke="white"
                    strokeWidth={2}
                    className="w-20 h-20 p-4 mb-2 duration-1000 transform rotate-45 bg-gray-400 border rounded-full cursor-pointer hover:bg-gray-300"
                  />

                  <div>Load More </div>
                </div>
              )}

              <div className="relative w-full min-h-screen md:pl-5vw">
                <Profile profiles={data.pages[0]} />
              </div>
            </>
          )}
        </div>
        {/* <Articles
        key={globalKeyValue}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        error={error}
      /> */}
      </div>
    );
  }

  return <div>asdasd</div>;
};

export default Insights;
