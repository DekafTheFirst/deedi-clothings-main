import React, { useState } from 'react'
import List from '../../components/List/List'
import { useParams } from 'react-router-dom'
import "./Products.scss"
import useFetch from '../../hooks/useFetch'
import { CircularProgress } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage'

const Products = () => {
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState("asc")
  const [selectedSubCats, setSelectedSubCats] = useState([])


  const catSlug = useParams().slug

  const { data: category, loading: categoryLoading, error: categoryError } = useFetch(`/categories?populate=*&filters[slug][$eq]=${catSlug}`)
  const { data: subCategories, loading: subCategoriesLoading, error: subCategoriesError } = useFetch(`/sub-categories?[filters] [categories] [slug] [$eq]=${catSlug}`)
  
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(isChecked ? [...selectedSubCats, value] : selectedSubCats.filter(item => item !== value))

  }

  // console.log(selectedSubCats)

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {subCategories?.map((item) =>
          (<div className="inputItem" key={item.id}>
            <input type="checkbox" id={item.id} value={item.id} onChange={handleChange} />
            <label htmlFor={item.id}>{item.attributes.title}</label>
          </div>)
          )}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
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
      <div className="right">
        {!category
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
        }

        <List catSlug={catSlug} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
      </div>
    </div>
  )
}

export default Products