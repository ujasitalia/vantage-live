import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // graphql query
  let headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization:
      "apikey poranki::stepzen.io+1000::ab3ae7fdbc38beb83a1302df3b2d36b19e6ed4717121399ac324520846a79227",
  };

  let graphql = JSON.stringify({
    query: gql`
      query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
      ) {
        myQuery(
          access_key: $access_key
          categories: $categories
          countries: "us"
          sort: "published_desc"
          keywords: $keywords
        ) {
          data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
      }
    `,
    variables: {
      access_key: process.env.MEDIASTACK_API_KEY,
      categories: category,
      keywords: keywords,
    },
  });

  let requestOptions: RequestInit = {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 30 },
    headers: headers,
    body: graphql,
  };

  const res = await fetch(
    "https://poranki.stepzen.net/api/vantage/__graphql",
    requestOptions
  );
  console.log("loading new data >>>", category, keywords);

  const newsResponse = await res.json();
  // console.log(newsResponse);

  // sort by images and not images present
  const news = sortNewsByImage(newsResponse.data.myQuery);
  // return results
  return news;
};

export default fetchNews;
