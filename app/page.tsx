import { categories } from "@/constants";
import fetchNews from "@/lib/fetchNews";
import React from "react";
import NewsList from "./NewsList";
import response from "../response.json";

async function HomePage() {
  // fetch news data
  const news: NewsResponse =
    await fetchNews(categories.join(","));
  // console.log(news);

  return (
    <div>
      {/* newslist */}
      <NewsList news={news} />
    </div>
  );
}

export default HomePage;
