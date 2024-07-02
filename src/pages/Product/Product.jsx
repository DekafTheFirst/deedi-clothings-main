import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
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
                height={400}
                width={"100%"}
              />

            </div>
            <div className="thumbnail-images">
              {data?.attributes?.img?.data.map((image, index) =>

                <OptimizedImage
                  // wrapperClassName='imgWrapper'
                  className={'thumbnail'}
                  alt=""
                  src={
                    import.meta.env.VITE_UPLOAD_URL + data?.attributes.img?.data[selectedImg]?.attributes?.url
                  }
                  effect="blur"
                  height={400}
                  width={"100%"}
                />
              )}
            </div>

          </div>
          <div className="right">
            <h1 className="title">{data?.attributes?.title}</h1>
            <span className="price">{`$${data?.attributes?.price}`}</span>
            <p>Best Selling Product</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
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
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
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