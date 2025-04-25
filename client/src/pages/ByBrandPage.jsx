import React, { useEffect } from 'react'
import ProductStore from '../store/ProductStore'
import { useParams } from 'react-router-dom'
import ListProduct from '../component/products/ListProduct'
import Layout from '../component/layout/Layout'

const ByBrandPage = () => {

  const { ListByProductRequest } = ProductStore()
  const { id } = useParams()


  useEffect(()=>{
    (async()=>{
      await ListByProductRequest(id)
    })()
  },[id])

  return (
    <Layout>
      <ListProduct/>
    </Layout>
  )
}

export default ByBrandPage