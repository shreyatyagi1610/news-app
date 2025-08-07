import React, { useEffect, useState } from 'react'
import NewsItem from '../Components/NewsItem'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  let [searchParams] = useSearchParams()
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [q, setQ] = useState("")
  let [page, setPage] = useState(1)

  async function getAPIData(q) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=1&sortBy=publishedAt&language=${searchParams.get("language") ?? "hi"}&apiKey=df2681312f484003b9e033f74ac5073b`)
    response = await response.json()
    if (response.status === "ok") {
      setTotalResults(response.totalResults)
      setArticles(response.articles)
    }
  }

  let fetchMoreData = async () => {
    setPage(page + 1)
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=${page}&sortBy=publishedAt&language=${searchParams.get("language") ?? "hi"}&apiKey=df2681312f484003b9e033f74ac5073b`)
    response = await response.json()
    if (response.status === "ok") {
      setTotalResults(response.totalResults)
      setArticles(articles.concat(response.articles))
    }
  }


  useEffect(() => {
    let q = searchParams.get("q") ?? "All"
    setQ(q)
    getAPIData(q)
  }, [searchParams])
  return (
    <>
      <div className='container-fluid'>
        <h5 className='first text-center p-2  mt-2 text-capitalize'>{q} Articles</h5>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<div className='my-5 text-center'>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
        >
          <div className='row'>
            {
              articles.map((item, index) => {
                return <NewsItem key={index}
                  source={item.source?.name}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  date={item.publishedAt}
                  pic={item.urlToImage}
                />
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    </>

  )
}

