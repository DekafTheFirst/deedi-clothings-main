import React from "react";
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

const Product = () => {
  const id = useParams().id
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`)


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
                  import.meta.env.VITE_UPLOAD_URL + data?.attributes.img?.data[selectedImg]?.attributes?.url
                }
                effect="blur"
              />

            </div>
            <div className="thumbnail-images">
              {data?.attributes?.img?.data.map((image, index) =>
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
              <h1 className="title">{data?.attributes?.title}</h1>
              <span className="price">{`$${data?.attributes?.price}`}</span>
            </div>
            <div className="section filters">
              <div className="filter-item sizes">
                <span className="title">Available Sizes</span>
                <div className="options">
                  <span className="option active">S</span>
                  <span className="option">M</span>
                  <span className="option">L</span>
                  <span className="option">XL</span>
                  <span className="option">XXL</span>


                </div>
              </div>

              <div className="filter-item colors">
                <span className="title">Available Colors</span>
                <div className="options">
                  <div className="option burgundy active"><span></span></div>
                  <div className="option gray"><span></span></div>
                  <div className="option green"><span></span></div>
                  <div className="option gray"><span></span></div>
                  <div className="option green"><span></span></div>

                </div>
              </div>
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
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    img: data.attributes.img.data[0].attributes.url,
                    quantity,
                    price: data.attributes.price
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
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION </span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>)}
      </div>



    </div>
  );
};

export default Product;