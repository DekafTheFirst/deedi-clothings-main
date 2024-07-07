import React, { useEffect } from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import Accordion from "./Accordion/Accordion";

const Product = () => {
  const id = useParams().id
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const { data: product, loading, error } = useFetch(`/products/${id}?populate=*`)
  console.log(product)
  const sortedSizes = product?.attributes?.availableSizes?.data?.sort((a, b) => a.id - b.id);



  const [selectedSize, setSelectedSize] = useState('small');

  useEffect(() => {
    setSelectedSize(sortedSizes?.[0]?.attributes.size)
  }, [product])


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
        {loading ? "loading" : (<>
          <div className="images-wrapper">
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
          <div className="right">
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
                    const sizeShortForm = sizeObject.attributes.shortForm

                    return (
                      <span
                        className={`option ${size == selectedSize ? 'active' : ''}`}
                        key={sizeObject.id}
                        onClick={() => setSelectedSize(size)}
                      >
                        {sizeShortForm}
                      </span>
                    )
                  }
                  )}
                  {/* <span className="option">M</span>
                  <span className="option">L</span>
                  <span className="option">XL</span>
                  <span className="option">XXL</span> */}


                </div>
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
                onClick={() =>
                  dispatch(addToCart({
                    id: product.id,
                    title: product.attributes.title,
                    desc: product.attributes.desc,
                    img: product.attributes.img.data[0].attributes.url,
                    selectedSize,
                    price: product.attributes.price
                  }))
                }
              >
                <AddShoppingCartIcon /> ADD TO CART
              </button>
              <button className="add-to-wishlist btn-2">
                <StarBorderIcon /> <span>ADD TO WISH LIST</span>
              </button>
            </div>

            <div className="info">
              <span className="product-type">Product Type: {product?.attributes?.sub_categories?.data?.map((subCategory)=>{
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
              {product && <Accordion description={product?.attributes?.desc}/>}
            </div>
          </div>
        </>)}
      </div>



    </div>
  );
};

export default Product;