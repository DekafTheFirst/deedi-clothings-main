import React, { useState } from 'react'
import List from '../../components/List/List'
import { useParams } from 'react-router-dom'
import "./Products.scss"
import useFetch from '../../hooks/useFetch'
import { CircularProgress } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage'
import TuneIcon from '@mui/icons-material/Tune';
import { Close } from '@mui/icons-material'

const Products = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersUsed, setFiltersUsed] = useState(false);

  const catSlug = useParams().slug

  const { data: category, loading: categoryLoading, error: categoryError } = useFetch(`/categories?populate=*&filters[slug][$eq]=${catSlug}`)
  const { data: subCategories, loading: subCategoriesLoading, error: subCategoriesError } = useFetch(`/sub-categories?[filters] [categories] [slug] [$eq]=${catSlug}`)
  const { data: products, loading: productsLoading, error } = useFetch(`/products?populate=*&[filters] [categories] [slug]=${catSlug}${selectedSubCats.map(item => `&[filters][sub_categories][id][$eq]=${item}`)}&[filters] [price] [$lte]=${maxPrice}&sort=price:${sort}`)


  const handleShowFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(isChecked ? [...selectedSubCats, value] : selectedSubCats.filter(item => item !== value))
    setFiltersUsed(true)
  }

  const handleMaxPriceMouseUp = () => {
    setMaxPrice(tempMaxPrice);
    setFiltersUsed(true)
  };

  const handleTempMaxPriceChange = (event) => {
    setTempMaxPrice(event.target.value);
  };

  const handleApplyButtonClicked = () => {
    handleShowFilterToggle()
    setFiltersUsed(false)
  }


  // console.log(selectedSubCats)

  return (
    <div className={`product-list-page ${showFilters ? 'filter-is-visible' : ''}`}>

      <div className="container-fluid">

        <div className={`filters-wrapper ${showFilters ? 'show' : ''}`}>
          <div className={`filters `} >
            <div className="heading-mobile-only">
              <h6 className="filterTitle">Filters</h6>
              <Close className='close' onClick={handleShowFilterToggle} />
            </div>
            <div className="filterItem">
              <h6 className="filterTitle">Product Categories</h6>
              {subCategories?.map((item) =>
              (<div className="inputItem" key={item.id}>
                <input type="checkbox" id={item.id} value={item.id} onChange={handleSubCategoryChange} />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>)
              )}
            </div>
            <div className="filterItem price">
              <h6 className="filterTitle">Filter by price</h6>
              <div className="inputItem">
                <span>0</span>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={tempMaxPrice}
                  onMouseUp={handleMaxPriceMouseUp}
                  onTouchEnd={handleMaxPriceMouseUp}
                  onChange={handleTempMaxPriceChange}
                />
                <span>{tempMaxPrice}</span>
              </div>
            </div>
            <div className="filterItem">
              <h4 className="filterTitle">Sort by</h4>
              <div className="inputItem">
                <input
                  type="radio"
                  id="asc"
                  value="asc"
                  name="price"
                  onChange={(e) => setSort("asc")}
                />
                <label htmlFor="asc">Price (Lowest first)</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={(e) => setSort("desc")}
                />
                <label htmlFor="desc">Price (Highest first)</label>
              </div>
            </div>
          </div>
          <button className={`btn apply-btn ${filtersUsed ? 'activated' : 'deactivated'}`} onClick={handleApplyButtonClicked} disabled={!filtersUsed}>Apply Changes {filtersUsed ? `(${products && products.length})` : ''}</button>

        </div>
        <div className="products">
          <div className="top">
            {products && <span className='no-of-products'>{products.length === 1 ? '1 Product' : `${products.length} Products`}</span>}
            <button className="btn filter-toggle-btn" onClick={handleShowFilterToggle}>Filters <TuneIcon fontSize='small' /> </button>
          </div>
          {/* {!category
            ?
            (<CircularProgress />)
            :
            (
              <OptimizedImage
                width={'100%'}
                height={300}
                className="catImg"
                wrapperClassName="catImgWrapper"
                src={import.meta.env.VITE_UPLOAD_URL + category[0]?.attributes?.img?.data?.attributes?.url}
                alt=""
                effect="blur"
                blurhash={category[0]?.attributes.imgBlurred}
              />
            )
          } */}

          <List products={products} productsLoading={productsLoading} />
          {/* <List catSlug={catSlug} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
          <List catSlug={catSlug} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
          <List catSlug={catSlug} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} /> */}

        </div>
      </div>
    </div>
  )
}

export default Products