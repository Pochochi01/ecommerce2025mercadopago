import { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, updateOrderStatus } from '@/store/admin/orderSlice'
import { useToast } from '@/hooks/use-toast'

const initialFormData = {
    status: '',
}

const AdminOrderDetails = ({orderDetails}) => {

    const [formData,setFormData] = useState(initialFormData)
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const {toast} = useToast();

        
    function handleUpdateStatus(event){
        event.preventDefault();
        const {status} = formData;


        dispatch(updateOrderStatus({id: orderDetails?._id, orderStatus: status})).then(data=>{
            console.log(data,'123456')
            if(data?.payload?.success) {
                dispatch(getOrdersDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin())
                setFormData(initialFormData);
                toast({
                    title : data?.payload?.message,
                })
            }
        })
    }
    
  return (
    <DialogContent className='sm:max-w-[600px]'>
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Nro Orden</p>
                    <Label>{orderDetails?._id}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Fecha</p>
                    <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Precio</p>
                    <Label>${orderDetails?.totalAmount}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Metodo Pago</p>
                    <Label>${orderDetails?.paymentMethod}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Estado del Pago</p>
                    <Label>{orderDetails?.paymentStatus}</Label>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Estado</p>
                    <Label>
                        <Badge className={`py-1 px-3 
                            ${orderDetails?.orderStatus === 'confirm' ? 
                            'bg-green-500'  :
                            orderDetails?.orderStatus === 'rejected' ?
                            'bg-red-800'
                            : 
                            orderDetails?.orderStatus === 'pending' ?
                            'bg-yellow-400' : 
                            'bg-black'}`}>
                            {orderDetails?.orderStatus}
                        </Badge>
                    </Label>
                </div>
            </div>
            <Separator/>
             <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Detalle del Pedido</div>
                    <ul className='grid gap-3'>
                        {
                            orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                            orderDetails?.cartItems.map((item)=> (
                            <li className='flex items-center justify-between'>
                            <span>Producto: {item.title}</span>
                            <span>Cantidad: {item.quantity}</span>
                            <span>Precio: ${item.price}</span>
                        </li>
                        )) : null
                        }
                        
                    </ul>
                </div>
            </div>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Informacion de Envio</div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        <span>Nombre: {user.userName}</span>
                        <span>Direccion: {orderDetails?.addressInfo?.address}</span>
                        <span>Ciudad: {orderDetails?.addressInfo?.city}</span>
                        <span>Codigo Postal: {orderDetails?.addressInfo?.pincode}</span>
                        <span>Telefono: {orderDetails?.addressInfo?.phone}</span>
                        <span>Notas: {orderDetails?.addressInfo?.notes}</span>
                    </div>
                </div>
            </div>
            <div>
                <CommonForm 
                    formControls={[
                        {
                            label: "Estado del Pedido",
                            name: "status",
                            componentType: "select",
                            options: [
                                { id: "Pendiete", label: "Pendiente" },
                                { id: "Empaquetado", label: "Empaquetado" },
                                { id: "En Distribucion", label: "En Distribucion" },
                                { id: "Rechazado", label: "Rechazado" },
                                { id: "En Camino", label: "En Camino" },
                                { id: "Confirmado", label: "Confirmado" },
                            ],
                        }
                    ]}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={'Actualizar Estado Pedido'}
                    onSubmit={handleUpdateStatus}
                />
            </div>
        </div>
    </DialogContent>
  )
}

export default AdminOrderDetails