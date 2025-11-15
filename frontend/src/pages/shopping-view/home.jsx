import { ShirtIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails} from '@/store/shop/productSlice'
import ShoppingProductTile from '@/components/shopping-view/productTile'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice'
import ProductDetailsDialog from '@/components/shopping-view/productDetails'
import { getFeatureImages } from '@/store/commonSlice'

const categoriesWithIcon = [
    {id: 'categoria1', label: 'Categoria1', icon: ShirtIcon},
    {id: 'categoria2', label: 'Categoria2', icon: ShirtIcon},
    {id: 'categoria3', label: 'Categoria3', icon: ShirtIcon},
    {id: 'categoria4', label: 'Categoria4', icon: ShirtIcon},
    {id: 'categoria5', label: 'Categoria5', icon: ShirtIcon},
  ]

  const brand = [
      { id: "marca1", label: "Marca1" },
      { id: "marca2", label: "Marca2" },
      { id: "marca3", label: "Marca3" },
      { id: "marca4", label: "Marca4" },
      { id: "marca5", label: "Marca5" },
    ]


const ShoppingHome = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList, productDetails} = useSelector((state)=> state.shopProducts);
  const {featureImageList} = useSelector((state)=>state.commonFeature)

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();


  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddToCart(getCurrentProductId){
    dispatch(
      addToCart({
        userId: user?.id, 
        productId: getCurrentProductId, 
        quantity: 1})
      ).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
          title: 'Producto Agregado al Carrito'
        })
      }
    });
  }

  useEffect(()=> {
    if(productDetails !== null) setOpenDetailsDialog(true)
  },[productDetails]);

  
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide((prevSlide)=> (prevSlide + 1) % featureImageList.length)
    },3000)

    return () => clearInterval(timer);
  },[featureImageList])
  
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams:{}, sortParams:'price-lowtohight'}))
  },[dispatch])
  
  useEffect(()=>{
    dispatch(getFeatureImages());
  },[dispatch])

  return (
    <div className = 'flex flex-col min-h-screen'>
      <div className = 'flex flex-col relative w-[640px] h-[520px] md:w-full md:h-[600px] overflow-hidden bg-slate-200'>
        <div className='h-[520px] w-[520px] bg-yellow-400 rotate-45 ml-40 rounded-3xl'></div>
        <h3 className=' absolute text-2xl font-bold md:text-6xl lg:text-7xl w-[600px] pt-4 md:pt-20 pl-0 md:pl-64 text-center '>Nuestros Productos</h3>
        <p className=' relative opacity-0 md:opacity-90 md:absolute lg:absolute mt-10 w-[600px] md:pt-60 md:pl-64 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur magni eligendi accusamus dignissimos deleniti necessitatibus magnam, quam quidem nam inventore iure, voluptatem quaerat doloribus ea laudantium expedita! Tempore, porro.</p>
        
            { 
              featureImageList && featureImageList.length > 0 ? 
              featureImageList.map((slide, index)=> (   
              <img
                src={slide?.image}
                key={index}
                className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} 
                mt-14 md:mt-10 ml-2 md:right-10 absolute w-[420px] h-[420px] md:h-[520px] md:w-[520px] object-cover transition-opacity duration-2000`}
              />              
            )) : null
            /*
              
            
        
        <Button 
            variant = 'outline' 
            size='icon' 
            onclick = {()=>setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
            className=  'absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
          >
            <ChevronLeftIcon className='w-4 h-4'/>
          </Button>
          <Button 
            variant = 'outline' 
            size='icon' 
            onclick = {()=>setCurrentSlide((prevSlide) => (prevSlide + 1 ) % slides.length)}
            className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
          >
            <ChevronRightIcon className='w-4 h-4'/>
          </Button>
          */}
        </div>
        {/*Seccion con tarjeta para navegar a productos filtrando por item deseado*/}
        <section className='py-12 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Comprar por Categoria</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {
                  categoriesWithIcon.map(categoryItem => 
                  <Card onClick={()=>handleNavigateToListingPage(categoryItem,'category')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                    <CardContent className='flex flex-col items-center justify-center p-6'>
                      <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                      <span className='font-bold' >
                        {categoryItem.label}
                      </span>
                    </CardContent>
                  </Card>)
                }
              </div>
          </div>
        </section>
        <section className='py-12 bg-slate-200'>
          <div className="container mx-auto px-4">
            <h2 className='text-3xl font-bold text-center mb-8'>
              Productos Destacados
            </h2>
            <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList &&productList.length > 0 ? 
              productList.map((productItem)=>(
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddToCart={handleAddToCart}
              />))
              : null
            }
            </div>
          </div>
        </section>
        <ProductDetailsDialog 
        open={openDetailsDialog} 
        setOpen={setOpenDetailsDialog} 
        productDetails={productDetails}/>
 
        </div>
      )}

export default ShoppingHome
