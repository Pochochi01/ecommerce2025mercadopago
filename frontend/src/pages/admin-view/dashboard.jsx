import ProductImageUpload from "@/components/admin-view/imageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/commonSlice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";


const adminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const {featureImageList} = useSelector((state)=>state.commonFeature);


  function handleUploadFeatureImage(){
    dispatch(addFeatureImage(uploadedImageUrl)).then((data)=>{
      if(data?.payload?.success){
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    })
  }

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[dispatch]);


  return (
    <div>
      <h1>Cargar Imagenes Destacadas</h1>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button 
        onClick = {handleUploadFeatureImage}
        className = 'mt-5 w-full' >
          Cargar
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {
          featureImageList && featureImageList.length > 0 ?
          featureImageList.map((featureImgItem) => (
          <div className="relative">
            <img 
              src={featureImgItem.image}
              className="w-full h-[300px] object-cover rounded-md"
            />
            <h1>imagenes banner</h1>
          </div>)) : null
        }
      </div>
    </div>
  )
}

export default adminDashboard









/* Pantalla de Jura Canarios Mundial Quilombo!!!

recordarles lo ignorante que son y como quisieron tapar errores del sistema culpandome


import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const AdminDashboard = () => {


  const [count , setCount] = useState(22);
  const incrementar =()=> setCount(prev => prev+1);
  const decrementar =()=> setCount(prev => prev-1);



  return (
    <div className='bg-gray-200 flex flex-row'>
      <Fragment>
      <div className='mb-5 w-full flex flex-col justify-center items-center'>
        <Link to = "/admin/products">
        <Button className='mt-4 w-[300px]'>
          Volver a la lista de Pajaros
        </Button>
        </Link>

         <div className="bg-white pl-30 pr-30 mt-4 rounded-md">
          <h3 className='text-center justify-center items-center pt-10 font-bold'>Planilla de Jura - Jaula:8521</h3>
          <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
            <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Forma</p>
            <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
              <button onClick={decrementar} className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
                -
              </button>
              <div className='text-center'>
                <h2>{count}</h2>
              </div>
              <button onClick={incrementar} className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
                +
              </button>

            </div>
          </div>
          <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
            <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Plumaje</p>
            <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
              <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
                -
              </div>
              <div className='text-center'>
                17
              </div>
              <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
                +
              </div>

            </div>
          </div>
          <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
            <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Nuca y Cuello</p>
            <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
              <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
                -
              </div>
              <div className='text-center'>
                9
              </div>
              <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
                +
              </div>

            </div>
          </div>
          <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
            <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Cabeza</p>
            <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
              <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
                -
              </div>
              <div className='text-center'>
                9
              </div>
              <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
                +
              </div>

            </div>
          </div>
          <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
            <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Color</p>
            <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
              <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
                -
              </div>
              <div className='text-center'>
                9
              </div>
              <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
                +
              </div>

            </div>
          </div>
      </div>

      </div>
       
      
      <Sheet >
        <SheetContent side='center' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle className='bg-black text-white'>
             
            </SheetTitle>
          </SheetHeader>
          
          <div className='py-3'>
            <CommonForm 
            
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
    </div>
    
  ) 

}


export default AdminDashboard */