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
                            wrapperClassName='imgWrapper mainImgWrapper'
                            alt=""
                            src={import.meta.env.VITE_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url}
                            effect="blur"
                            height={400}
                            width={"100%"}
                            blurhash={item.attributes?.imgBlurred}
                        />  
                        {/* <img src={import.meta.env.VITE_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url} alt="" className="mainImg" /> */}
                        <OptimizedImage
                            wrapperClassName='imgWrapper secondImgWrapper'
                            alt=""
                            src={import.meta.env.VITE_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url}
                            effect="blur"
                            height={400}
                            width={"100%"}
                            blurhash={item.attributes?.img2Blurred}
                        />                    
                        </div>
                    <h2>{item.attributes.title}</h2>
                    <div className="prices">
                        <h3>${item.attributes.oldPrice || item.attributes.price + 20}</h3>
                        <h3>${item.attributes.price}</h3>
                    </div>
                </div>
            </Link>
        </LazyLoadComponent>

    )
}

export default Card