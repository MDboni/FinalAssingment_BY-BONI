import { create } from 'zustand';
import axios  from "axios";

const ProductStore=create((set)=>({
    BrandList:null,
    BrandListListRequest:async()=>{
        let res=await axios.get(`/api/v1/ProductBrandList`);
        if(res.data['status']==='success'){
            set({BrandList:res.data['data']})
        }
    },

    SliderList:null,
    SliderListRequest:async()=>{
        let res=await axios.get(`/api/v1/ProductSliderList`);
        if(res.data['status']==='success'){
            set({SliderList:res.data['data']})
        }
    },

    CategoriList:null,
    CategoriListRequest:async()=>{
        let res=await axios.get(`/api/v1/ProductCategoryList`);
        if(res.data['status']==='success'){
            set({CategoriList:res.data['data']})
        }
    },


    ListByRemark:null,
    ListByRemarkRequest:async(Remark)=>{
        let res=await axios.get(`/api/v1/ProductListByRemark/${Remark}`);
        if(res.data['status']==='success'){
            set({ListByRemark:res.data['data']})
        }
    },


// ..................................................


    ListProduct:null,

    ListByProductRequest:async(BrandID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/ProductListByBrand/${BrandID}`);
        if(res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },

   
    ListByCategoryRequest:async(CategoryID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/ProductCategoryList/${CategoryID}`);
        if(res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
   
   

    ListByKeywordRequest:async(KeywordID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/ProductListByKeyword/${KeywordID}`);
        if(res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },

    ListByFilterRequest:async(postBody)=>{
        set({ListProduct:null})
        let res=await axios.post(`/api/v1/ProductListByFilter`,postBody);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },

    SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
        set({SearchKeyword:keyword})
    },

    Details:null,
    DetailsRequest:async(id)=>{
        set({Details:null})
        let res=await axios.get(`/api/v1/ProductDetails/${id}`);
        if(res.data['status']==="success"){
            set({Details:res.data['data']})
        }
    },

    ReviewList:null,
    ReviewListRequest:async(id)=>{
        set({ReviewList:null})
        let res=await axios.get(`/api/v1/ProductReviewList/${id}`);
        if(res.data['status']==="success"){
            set({ReviewList:res.data['data']})
        }
    },
    


}))

export default ProductStore;