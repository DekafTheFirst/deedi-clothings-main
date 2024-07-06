import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.scss"
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

const Card = ({ item }) => {
    return (
        <LazyLoadComponent >
            <Link className="card " to={`/product/${item.id}`}>
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
                <div className="details">
                    <span className='product-title'>{item.attributes.title}</span>
                    <div className="prices">
                        <span className='discountedPrice'>${item.attributes.price}</span>
                        <span className='price'>${item.attributes.oldPrice || item.attributes.price + 20}</span>
                    </div>
                </div>
            </Link>

        </LazyLoadComponent>

    )
}

export default Card