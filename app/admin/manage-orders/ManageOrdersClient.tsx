'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils";
import { ActionBtn, Heading } from "@/app/components";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdCached, MdClose, MdDelete, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ExtendedOrder } from "@/app/interfaces";
import moment from "moment";
import 'moment/locale/es';

interface Props {
  orders: ExtendedOrder[];
}

export const ManageOrdersClient = ({ orders }: Props) => {
  const router = useRouter();

  let rows:any = [];
  if(orders) {
    rows = orders.map((order)=> {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus
      }
    })
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'customer', headerName: 'Nombre cliente', width: 130 },
    { field: 'amunnt', headerName: 'Precio(Bs.)', width: 130, renderCell: 
      (params)=> {
        return (<div className="font-bold text-slate-800">{params.row.amount}</div>)
      } 
    },
    { field: 'paymentStatus', headerName: 'Estado del pago', width: 130, renderCell:
      (params)=> (
        <div className="mt-4">
          {params.row.paymentStatus === 'pendiente' ? 
            (<Status 
              text="pendiente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />) : params.row.paymentStatus === 'pagado' ? (
              <Status 
                text="pagado"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />

            ) : <></>
          }
        </div>
      )
    },
    { field: 'deliveryStatus', headerName: 'Estado del envio', width: 130, renderCell:
      (params)=> (
        <div className="mt-4">
          {params.row.deliveryStatus === 'pendiente' ? 
            (<Status 
              text="pendiente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />) : params.row.deliveryStatus === 'entregado' ? (
              <Status 
                text="entregado"
                icon={MdDeliveryDining}
                bg="bg-green-200"
                color="text-green-700"
              />

            )
            // : params.row.deliveryStatus === 'enviado' ? 
            //   (<Status 
            //     text="despachado"
            //     icon={MdDone}
            //     bg="bg-green-200"
            //     color="text-green-700"
            //   />) 
            : <></>
          }
        </div>
      )
    },
    { field: 'date', headerName: 'Fecha', width: 130 },
    { field: 'action', headerName: 'Acciones', width: 150, renderCell: 
      (params)=>(
        <div className="flex justify-between gap-4 w-full">
          <ActionBtn icon={MdDone} onClick={()=>handlePayment(params.row.id)} />
          <ActionBtn icon={MdDeliveryDining} onClick={()=> {
            handleDispatch(params.row.id)
            }} 
          />
          <ActionBtn icon={MdRemoveRedEye} onClick={()=> router.push(`/order/${params.row.id}`)} />
        </div>
      ) 
    },
  ]
  const handleDispatch = useCallback((id: string)=> {
    axios.put('/api/order', {
      id,
      deliveryStatus: 'entregado'
    }).then(()=> {
      toast.success("Orden entregada")
      router.refresh()
    }).catch((error)=> {
      toast.error("Error al despachar la orden")
      console.log(error);
    })
  },[])

  const handlePayment = useCallback((id: string)=> {
    axios.put('/api/order', {
      id,
      status: 'pagado'
    }).then(()=> {
      toast.success("Orden Pagada")
      router.refresh()
    }).catch((error)=> {
      toast.error("Error al despachar la orden")
      console.log(error);
    })
  },[])


  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Administar ordenes" center />        
      </div>
      <div style={{height: 600, width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}
