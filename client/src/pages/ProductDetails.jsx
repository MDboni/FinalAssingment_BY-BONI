import React, { useEffect} from 'react'
import Layout from '../component/layout/Layout'
import Details from '../component/products/Details'
import Brands from '../component/products/Brands'
import { useParams } from 'react-router-dom'
import ProductStore from '../store/ProductStore'

const ProductDetails = () => {
    const {BrandList,DetailsRequest,ReviewListRequest,BrandListRequest}=ProductStore();
    const {id}=useParams();
    
    useEffect(() => {
        (async ()=>{
            await DetailsRequest(id);
            await ReviewListRequest(id);
            BrandList===null?await BrandListRequest():null
        })()
    }, [id]);


  return (
    <Layout>
      <Details/>
      <Brands/>
    </Layout>
  )
}

export default ProductDetails