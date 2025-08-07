import React from 'react'
import { Link } from 'react-router-dom'


export default function NewsItem(props) {
  return (
    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
        <div className="card">
  <img src={props.pic?props.pic:"image/noimage.jpg"} height={200} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <div className='source-date'>
       <p> {props.source}</p>
        <p>{new Date(props.date).toLocaleDateString()}</p>
    </div>
    <p className="card-text">{props.description}</p>
    <Link to={props.url} target="_blank" rel="norererrer" className="btn btn-primary backgrond w-100">Read Full Articles</Link>
  </div>
</div>
    </div>
  )
}
