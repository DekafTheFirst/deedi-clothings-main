import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/cartReducer";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import Accordion from "./Accordion/Accordion";

import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";


const transformStocks = (stocks) => {
  return stocks?.map((size) => {
    return {
      id: size.id,
      size: size.attributes.size.data.attributes.size,
      stock: size.attributes.stock,
    }
  })
}

const Product = () => {
  const id = useParams().id
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const { data: product, loading, error } = useFetch(`/products/${id}?populate[img]=*&populate[categories]=*&populate[sub_categories]=*&populate[stocks][populate][size]=*&populate[stocks][populate]=*`)
  // console.log('product', product)
  const cartItems = useSelector(state => state.cart.items);

  const mappedStocks = useMemo(() => {
    return transformStocks(product?.attributes?.stocks?.data);
  }, [product?.attributes?.stocks?.data]);




  const [selectedStock, setSelectedStock] = useState(null);
  const [maxStockReached, setMaxStockReached] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedSizeError, setSelectedStockError] = useState(null);


  useEffect(() => {
    if (selectedStock) {
      setMaxStockReached(false);
      console.log('selectedStock', selectedStock)
    }
  }, [mappedStocks, selectedStock]);

  // const images = [
  //   "/img/products/1.1.jpg",
  //   "/img/products/1.2.jpg"
  // ]



  const handleThumbnailClicked = (index) => {
    setSelectedImg(index)
  }

  const handleAddToCart = () => {
    if (selectedStock) {
      const localCartItemId = `cartItem_${uuidv4()}`


      const thisItemInCart = cartItems.find((item) => item.productId === product.id && item.size == selectedStock.size);
      console.log('thisItemInCart', thisItemInCart)
      console.log('selectedStock', selectedStock);
      // console.log('transformedStocks', transformedStocks);

      if (thisItemInCart?.quantity + quantity > selectedStock.stock) {
        setMaxStockReached(true)
      }

      else {
        dispatch(addItemToCart({
          productId: product.id,
          title: product.attributes.title,
          desc: 'description',
          quantity,
          localCartItemId,
          img: product.attributes.img.data[0].attributes.url,
          size: selectedStock.size,
          price: product.attributes.price
        })).then((result) => {
          if (result.error) {
            // Handle error (e.g., show a message to the user)
            console.error('Failed to add item to cart:', result.error.message);
          } else {
            // Optionally, show a success message or update UI
            const updatedStocks = mappedStocks.map((stock) => {
              if (stock.id === selectedStock?.id) {
                return {
                  ...stock,
                  stock: stock?.stock - quantity
                }
              }
              return stock;
            });
            // setMaxStockReached(false)
            toast.success('Added to cart')
            console.log('Item added to cart successfully');
          }
        });
      }
      // Dispatch add item action

    } else {
      setSelectedStockError(true);
    }
  }

  const handleNotifyWhenAvailable = () => {

  }

  // const stockWarning = 

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
                    {mappedStocks?.map((stock, index) => {
                      const isOutOfStock = stock?.stock === 0;

                      return (
                        <span
                          className={`option ${stock.id == selectedStock?.id ? 'active' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
                          key={stock.id}
                          onClick={() => {
                            setSelectedStock(stock);
                            setSelectedStockError(null)
                          }}
                        >
                          {stock.size}
                        </span>
                      )
                    }
                    )}

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
                {
                  selectedStock &&
                  <div className="stock-warning">

                    {(() => {
                      switch (true) {
                        case selectedStock.stock === 0:
                          return (
                            <div className="out-of-stock">
                              <span>*This product is out of stock</span>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email to find out when it's back"
                              />
                            </div>
                          );

                        case selectedStock?.stock <= 5 && !maxStockReached:
                          return (
                            <span className={`message ${selectedStock?.stock < 3 ? 'urgent' : ''}`}>
                              {`*Only ${selectedStock.stock} left in stock - order soon.`}
                            </span>
                          );


                        case maxStockReached:
                          return (
                            <div className="out-of-stock">
                              <span>You have requested more of {product?.attributes?.title} ({selectedStock?.size}) than the {selectedStock?.stock} available</span>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email to find out when more are available" />
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </div>
                }
                {/* {maxStockReached && <div className="out-of-stock">
                  <span>*This product is out of stock</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to find out when it's back" />
                </div>} */}
                {selectedStock?.stock === 0 ?
                  <button
                    className={`add btn-1`}
                    onClick={handleNotifyWhenAvailable}
                  >
                    {'Notify me when available'}
                  </button>
                  :
                  <button
                    className={`add btn-1`}
                    disabled={selectedStock?.stock === 0}
                    onClick={handleAddToCart}
                  >
                    {'Add to Cart'}
                  </button>}
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