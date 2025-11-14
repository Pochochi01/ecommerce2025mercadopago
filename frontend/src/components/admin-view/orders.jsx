import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetails from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, resetOrderDetails } from "@/store/admin/orderSlice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();



  function handleFetchOrderDetails(getId){
    dispatch(getOrdersDetailsForAdmin(getId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);


  useEffect(()=>{
    if(orderDetails!==null) setOpenDetailsDialog(true)
  },[orderDetails])



  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas Las Compras</CardTitle>
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
                <span className="sr-only">Detalles</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 w-28 justify-center ${
                          orderItem?.orderStatus === "Confirmado"
                            ? "bg-green-500" :
                            orderItem?.orderStatus === 'Rechazado' 
                            ? 'bg-red-800' :
                            orderItem?.orderStatus === 'Pendiente' 
                            ? 'bg-yellow-400':
                            orderItem?.orderStatus === 'En Camino'
                            ? 'bg-blue-700' :
                            orderItem?.orderStatus === 'Empaquetado'
                            ? 'bg-orange-600' :
                            orderItem?.orderStatus === 'En Distribucion'
                            ? 'bg-gray-600'
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          Ver Detalles
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
