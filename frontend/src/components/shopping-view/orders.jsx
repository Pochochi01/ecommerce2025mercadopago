import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetailsView from './orderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, resetOrderDetails, getOrderDetails } from '@/store/shop/paymentSlice'
import { Badge } from '../ui/badge'

const ShoppingOrders = () => {

const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const dispatch = useDispatch();
const { user } = useSelector((state)=> state.auth);
const { orderList, orderDetails } = useSelector((state)=> state.shopPayment)

function handleFetchOrderDetails(getId){
  dispatch(getOrderDetails(getId))
}

useEffect(()=>{
  dispatch(getAllOrdersByUserId(user?.id))
},[dispatch])

useEffect(()=>{
  if(orderDetails !== null) setOpenDetailsDialog(true)
},[orderDetails])

console.log(orderList,'orderlist')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historico de Compras</CardTitle>
      </CardHeader>
      <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Identificador</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>
                            <span className='sr-only'>
                                Detalles
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    orderList && orderList.length > 0 ?
                    orderList.map((orderItem)=>
                       <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                    <TableCell>
                      <Badge className={`py-1 px-3 
                      ${orderItem?.orderStatus === 'Confirmado' ? 
                        'bg-green-500' :
                            orderItem?.orderStatus === 'Rechazado' 
                            ? 'bg-red-800'
                            : "bg-black"
                            }`}>
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell> 
                      <Dialog 
                      open={openDetailsDialog} 
                      onOpenChange={()=>{setOpenDetailsDialog(false)
                      dispatch(resetOrderDetails())
                      }}>
                        <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>Ver Detalles</Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails}/>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                    ) : null
                  }
                 
                </TableBody>
            </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders