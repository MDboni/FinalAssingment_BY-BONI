import React, { useEffect } from 'react'
import ProductStore from '../store/ProductStore'
import { useParams } from 'react-router-dom'
import ListProduct from '../component/products/ListProduct'
import Layout from '../component/layout/Layout'

const ByRemarkPage = () => {
 
  const { ListByKeywordRequest } = ProductStore()
  const { keyword } = useParams()


  useEffect(()=>{
    (async()=>{
      await ListByKeywordRequest(keyword)
    })()
  },[keyword])

  return (
    <Layout>
      <ListProduct/>
    </Layout>
  )
}

export default ByRemarkPage