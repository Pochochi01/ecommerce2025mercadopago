import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const PaymentSuccessPage = () => {
  
  const navigate = useNavigate()
  
  return (
    <Card className='p-10 '>
      <CardHeader className='p-0' >
        <CardTitle className='text-4xl' >Pago Registrado Correctamente!!</CardTitle>
      </CardHeader>
      <Button className='mt-5' onClick={()=> navigate('/shop/account')}>Ver Pedido</Button>
    </Card>
  )
}

export default PaymentSuccessPage