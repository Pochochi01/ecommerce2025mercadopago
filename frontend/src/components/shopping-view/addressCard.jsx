import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo , handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress,selectId}) => {
  return (
    <Card 
    onClick={()=>setCurrentSelectedAddress ? setCurrentSelectedAddress(addressInfo): null} 
    className={`cursor-pointer border-red-700 ${selectId?._id === addressInfo?._id ? 'border-red-900 border-[3px]' : 'border-black'}`}>
        <CardContent className={`${selectId === addressInfo?._id ? 'border-black': ''} grid gap-4 p-4`}>
            <Label>Direccion: {addressInfo.address}</Label>
            <Label>Ciudad: {addressInfo.city}</Label>
            <Label>Cod. Postal: {addressInfo.pincode}</Label>
            <Label>Telefono: {addressInfo.phone}</Label>
            <Label>Notas: {addressInfo.notes}</Label>
        </CardContent>
        <CardFooter className='p-3 flex justify-between'>
            <Button onClick={()=>{handleEditAddress(addressInfo)}}>Editar</Button>
            <Button onClick={()=>{handleDeleteAddress(addressInfo)}}>Borrar</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard