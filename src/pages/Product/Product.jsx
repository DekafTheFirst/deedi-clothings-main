import React, { useEffect } from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartItem } from "../../redux/cartReducer";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import Accordion from "./Accordion/Accordion";

import { v4 as uuidv4 } from 'uuid';


const Product = () => {
  const id = useParams().id
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const { data: product, loading, error } = useFetch(`/products/${id}?populate=*`)
  const sortedSizes = product?.attributes?.availableSizes?.data?.sort((a, b) => a.id - b.id);

  const products = useSelector(state => state.cart.products)


  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeError, setSelectedSizeError] = useState(null)

  useEffect(() => {
    setSelectedSize(selectedSize)
    // console.log(selectedSize);
  }, [selectedSize])


  // const images = [
  //   "/img/products/1.1.jpg",
  //   "/img/products/1.2.jpg"
  // ]



  const handleThumbnailClicked = (index) => {
    setSelectedImg(index)
  }

  return (
    <div className="product-page">

      <div className="container-fluid">

        <div className="row">
          {loading ? "loading" : (<>
            <div className="col-md-6 images-wrapper">
              <div className="mainImg">
                <OptimizedImage
                  // wrapperClassName='imgWrapper'
                  className={'img'}
                  alt=""
                  src={
                    import.meta.env.VITE_UPLOAD_URL + product?.attributes.img?.data[selectedImg]?.attributes?.url
                  }
                  effect="blur"
                />
              </div>
              <div className="thumbnail-images">
                {product?.attributes?.img?.data.map((image, index) =>
                  <div className={`thumbnail-wrapper ${index === selectedImg ? 'selected' : ''}`} onClick={() => handleThumbnailClicked(index)} key={index}>
                    <OptimizedImage
                      // wrapperClassName='imgWrapper'
                      className={'thumbnail'}
                      alt=""
                      src={
                        import.meta.env.VITE_UPLOAD_URL + image?.attributes?.formats?.thumbnail?.url
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="right col-md-6">
              <div className="section heading">
                <h1 className="title">{product?.attributes?.title}</h1>
                <h6 className="category">Women's Dresses</h6>
                <div className="prices">
                  <p className='discountedPrice'>{`$${product?.attributes.price}`}</p>
                  <p className="price">{`$${product?.attributes?.oldPrice || product?.attributes.price + 20}`}</p>
                </div>
              </div>
              <div className="section filters">
                <div className="filter-item sizes">
                  <span className="title">Available Sizes</span>
                  <div className="options">
                    {sortedSizes?.map((sizeObject, index) => {
                      const size = sizeObject.attributes.size
                      return (
                        <span
                          className={`option ${size == selectedSize ? 'active' : ''}`}
                          key={sizeObject.id}
                          onClick={() => {
                            setSelectedSize(size);
                            setSelectedSizeError(null)
                          }}
                        >
                          {size}
                        </span>
                      )
                    }
                    )}
                    {/* <span className="option">M</span>
                    <span className="option">L</span>
                    <span className="option">XL</span>
                    <span className="option">XXL</span> */}
                  </div>
                  <span className={`error ${selectedSizeError ? 'showError' : ''}`}>Please select a size</span>
                </div>
                {/* <div className="filter-item colors">
                  <span className="title">Available Colors</span>
                  <div className="options">
                    <div className="option burgundy active"><span></span></div>
                    <div className="option gray"><span></span></div>
                    <div className="option green"><span></span></div>
                  </div>
                </div> */}
              </div>
              <div className="section add-to-cart">
                <div className="quantity">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  >
                    <span>-</span>
                  </button>
                  <span className="no-of-items">{quantity}</span>
                  <button onMouseDown={() => setQuantity((prev) => prev + 1)}><span>+</span></button>
                </div>
                <button
                  className="add btn-1"
                  onClick={() => {
                    if (selectedSize) {
                      
                      const item = products.find(item => item.productId === product.id && item.size === selectedSize);

                      if (item) {
                        dispatch(updateCartItem({
                          cartItemId: item.cartItemId,
                        }))
                      }

                      else {
                        const prefix = 'cartItem_'; // Example prefix
                        const cartItemId = `${prefix}${uuidv4()}`;

                        dispatch(addToCart({
                          productId: product.id,
                          cartItemId,
                          title: product.attributes.title,
                          desc: 'description',
                          quantity: 1,
                          img: product.attributes.img.data[0].attributes.url,
                          size: selectedSize,
                          price: product.attributes.price
                        }))
                      }
                    }
                    else {
                      setSelectedSizeError(true)
                    }
                  }
                  }
                >
                  <AddShoppingCartIcon /> ADD TO CART
                </button>
                <button className="add-to-wishlist btn-2">
                  <StarBorderIcon /> <span>ADD TO WISH LIST</span>
                </button>
              </div>
              <div className="info">
                <span className="product-type">Product Type: {product?.attributes?.sub_categories?.data?.map((subCategory) => {
                  return <span className="subCategory" key={subCategory.id}> {subCategory.attributes.title}, </span>
                })}</span>
                <span>Tag(s): T-Shirt, Women, Top</span>
              </div>
              <div className="info">
                {/* <span>DESCRIPTION: </span>
                <hr />
                <span>ADDITIONAL INFORMATION</span>
                <hr />
                <span>FAQ</span> */}
                {product?.attributes?.desc &&
                  <Accordion description={product?.attributes?.desc} />
                }
              </div>
            </div>
          </>)}
        </div>
      </div>



    </div>
  );
};

export default Product;