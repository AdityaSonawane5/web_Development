import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {fetchProductDetails, updateProduct} from "../../redux/slices/ProductsSlice";
import axios from 'axios';


const EditProductPage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id} = useParams();
    const {selectedProduct,loading,error}=useSelector((state)=>state.products);


    const [productData,setProductsData]=useState({
        name:"",
        description:"",
        price:0,
        CountInStock:0,
        sku:"",
        category:"",
        brand:"",
        sizes:[],
        colors:[],
        collections:"",
        material:"",
        gender:"",
        images:[]
    })

    const [uploading,setUploading] = useState(false);//Images uploading state

    useEffect(()=>{
        if(id){
            dispatch(fetchProductDetails(id))
        }
    },[dispatch,id]);

    useEffect(()=>{
        if(selectedProduct){
            setProductsData(selectedProduct);
        }
    },[selectedProduct]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProductsData((prevData)=>({...prevData,[name]:value}));
    }

    const handelImageUpload= async (e)=>{
        const file=e.target.files[0]
        const formData=new FormData();
        formData.append("image",file);
        try {
            setUploading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,
                {
                    headers:{"Content-Type":"multipart/form-data"},
                }
            );
            setProductsData((prevData)=>({
                ...prevData,
                images:[...prevData.images,{url:imageUrl,altText: ""}]
            }))
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(updateProduct({id,productData}));
        navigate("/admin/projects")
    };

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md '>
      <h2 className='text-3xl font-bold md-6 '>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-6'>
            <label className='block font-semibold mb-2'>Product Name</label>
            <input type="text" name='name' value={productData.name} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required/>
        </div>

        {/*Decription  */}
        <div className='mb-6'>
            <label className='block font-semibold mb-2'>Description</label>
            <textarea name="description" value={productData.description} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' rows={4} required></textarea>
        </div>

        {/* Price */}
        <div className='mb-6'>
            <label htmlFor="" className='block font-semibold mb-2'>Price</label>
            <input 
                type="number" 
                name="price" 
                value={productData.price} 
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 '
             />
        </div>

        {/* count In sock  */}
        <div className='mb-6'>
            <label htmlFor="" className='block font-semibold mb-2'>Count in Stock</label>
            <input 
                type="number" 
                name="CountInStock" 
                value={productData.CountInStock} 
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 '
             />
        </div>

        {/* SKU */}
        <div className='mb-6'>
            <label htmlFor="" className='block font-semibold mb-2'>SKU</label>
            <input 
                type="text" 
                name="sku" 
                value={productData.sku} 
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2 '
             />
        </div>

        {/* Sizes */}
        <div className='mb-6'>
            <label htmlFor="" className='block font-semibold mb-2'>Size (comma-separated)</label>
            <input 
                type="text" 
                name="sizes" 
                value={productData.sizes.join(", ")} 
                onChange={(e)=>setProductsData({
                    ...productData,
                    sizes:e.target.value.split(",").map((size)=>size.trim()),
                    })
                }
                className='w-full border border-gray-300 rounded-md p-2 '
             />
        </div>

        {/* Colors */}
        <div className='mb-6'>
            <label htmlFor="" className='block font-semibold mb-2'>Colors (comma-separated)</label>
            <input 
                type="text" 
                name="colors" 
                value={productData.colors.join(", ")} 
                onChange={(e)=>setProductsData({
                    ...productData,
                    colors:e.target.value.split(",").map((color)=>color.trim()),
                    })
                }
                className='w-full border border-gray-300 rounded-md p-2 '
             />
        </div>

        {/* Image Upload */}
        <div className='mb-6'>
            <label className='block font-semibold mb-2 '>Upload Image</label>
            <input type="file" onChange={handelImageUpload}/>
            {
                uploading && <p>UpLoading image....</p>
            }
            <div className='flex gap-4 mt-4'>
                {productData.images.map((image,index)=>(
                    <div key={index}>
                        <img src={image.url} alt={image.altText || "Product Image"}
                        className='w-20 h-20 object-cover rounded-md shadow-md'
                         />
                    </div>
                ))}
            </div>
        </div>
        <button type='submit' className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">Update Product</button>
      </form>
    </div>
  )
}

export default EditProductPage
// 7:05:17 