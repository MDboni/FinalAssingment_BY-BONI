import React, { useEffect } from 'react'
import ProductStore from '../store/ProductStore'
import { useParams } from 'react-router-dom'
import ListProduct from '../component/products/ListProduct'
import Layout from '../component/layout/Layout'

const ByCategoryPage = () => {

  const { ListByCategoryRequest } = ProductStore()
  const { id } = useParams()


  useEffect(()=>{
    (async()=>{
      await ListByCategoryRequest(id)
    })()
  },[id])

  return (
    <Layout>
      <ListProduct/>
    </Layout>
  )
}

export default ByCategoryPage