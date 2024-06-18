import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Blurhash } from "react-blurhash";
import "./OptimizedImage.scss"


const OptimizedImage = ({ src, blurhash, height, width, wrapperClassName, className, alt, effect }) => {

    const [isLoaded, setLoaded] = useState(false);
    const [isLoadStarted, setLoadStarted] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
        // console.log("loaded")
    };

    const handleLoadStarted = () => {
        // console.log("Started: ");
        setLoadStarted(true);
    };

    return (
        <>
            <LazyLoadImage
                wrapperClassName={wrapperClassName}
                className={className}
                alt={alt}
                src={src}
                effect={effect}
                height={height}
                width={width}
                onLoad={handleLoad}
                beforeLoad={handleLoadStarted}
            />

            {!isLoaded && isLoadStarted && (
                <Blurhash
                    hash={blurhash}
                    width={width}
                    height={height}
                    punch={1} 
                    className={`blurHash ${className}`}
                />
            )}
        </>


    )
}

export default OptimizedImage