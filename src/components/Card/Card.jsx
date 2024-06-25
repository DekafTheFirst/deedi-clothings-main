import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.scss"
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

const Card = ({ item }) => {
    return (
        <LazyLoadComponent >
            <Link className="link" to={`/product/${item.id}`}>
                <div className="card">
                    <div className="image">
                        {item.attributes.isNew && <span className='new-season'>New Season</span>}
                        <OptimizedImage
                            // wrapperClassName='imgWrapper'
                            className={'img'}
                            alt=""
                            src={import.meta.env.VITE_UPLOAD_URL + item.attributes?.img?.data[0]?.attributes?.url}
                            effect="blur"
                            height={400}
                            width={"100%"}
                        />
                        {/* <img src={import.meta.env.VITE_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url} alt="" className="mainImg" /> */}
                        <OptimizedImage
                            // wrapperClassName='imgWrapper'
                            className={'img secondImg'}
                            alt=""
                            src={`${import.meta.env.VITE_UPLOAD_URL + item.attributes?.img?.data[1]?.attributes?.url}`}
                            effect="blur"
                            height={400}
                            width={"100%"}
                        />
                    </div>

                </div>
                <h2>{item.attributes.title}</h2>
                <div className="prices">
                    <h3>${item.attributes.oldPrice || item.attributes.price + 20}</h3>
                    <h3>${item.attributes.price}</h3>
                </div>
            </Link>
        </LazyLoadComponent>

    )
}

export default Card