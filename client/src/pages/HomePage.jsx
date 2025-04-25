import React, { useEffect } from 'react'
import Layout from '../component/layout/Layout'
import Slider from '../component/products/Slider'
import Fetares from '../component/Fetare/Fetares'
import Category from '../component/products/Category'
import Brands from '../component/products/Brands'
import ProductStore from '../store/ProductStore'
import FeatureStore from '../store/FetaresStore'
import Product from '../component/products/Product.jsx'


const HomePage = () => {

const {BrandListListRequest,SliderListRequest,CategoriListRequest,ListByRemarkRequest} =ProductStore()
const { FeatureListRequest } = FeatureStore()


useEffect(()=>{
  (async()=>{
    await BrandListListRequest(),
    await SliderListRequest(),
    await CategoriListRequest(),
    await FeatureListRequest(),
    await ListByRemarkRequest('new')
  })()
},[])


  return (
    <Layout>
      <Slider/>
      <Fetares/>
      <Category/>
      <Product/>
      <Brands/>
    </Layout>
  )
}

export default HomePage