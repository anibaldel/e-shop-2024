'use client';

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils";
import { ActionBtn, Heading } from "@/app/components";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface Props {
  products: Product[];
}

export const ManageProductsClient = ({ products }: Props) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows:any = [];
  if(products) {
    rows = products.map((product)=> {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images
      }
    })
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Nombre', width: 220 },
    { field: 'price', headerName: 'Precio(Bs.)', width: 150, renderCell: 
      (params)=> {
        return (<div className="font-bold text-slate-800">{params.row.price}</div>)
      } 
    },
    { field: 'category', headerName: 'Categoría', width: 100 },
    { field: 'brand', headerName: 'Marca', width: 100 },
    { field: 'inStock', headerName: 'En Stock', width: 120, renderCell:
      (params)=> (
        <div className="mt-4">
          {params.row.inStock === true ? 
            <Status 
              text="en stock"
              icon={MdDone}
              bg="bg-teal-200"
              color="text-teal-700"
            /> : 
            <Status 
              text="Fuera de Stock"
              icon={MdClose}
              bg="bg-rose-200"
              color="text-rose-700"
            />
          }
        </div>
      )
    },
    { field: 'action', headerName: 'Acciones', width: 150, renderCell: 
      (params)=>(
        <div className="flex justify-between gap-4 w-full">
          <ActionBtn icon={MdCached} onClick={()=> {
            handleToggleStock(params.row.id, params.row.inStock)
            }} 
          />
          <ActionBtn icon={MdDelete} onClick={()=>handleDelete(params.row.id, params.row.images)} />
          <ActionBtn icon={MdRemoveRedEye} onClick={()=> router.push(`/product/${params.row.id}`)} />
        </div>
      ) 
    },
  ]
  const handleToggleStock = useCallback((id: string, inStock: boolean)=> {
    axios.put('/api/product', {
      id,
      inStock: !inStock
    }).then(()=> {
      toast.success("Estatus del producto actualizado")
      router.refresh()
    }).catch((error)=> {
      toast.error("Error al actualizar el estatus del producto")
      console.log(error);
    })
  },[])

  const handleDelete= useCallback(async(id: string, images: any[])=> {
    toast('Eliminado el producto, espere...!')
    const handleImageDelete = async()=> {
      try {
        for(const item of images) {
          if(item.image) {
            const imageRef = ref(storage, item.image)
            await deleteObject(imageRef);
            console.log('imagen eliminada', item.image);
          }
        }
      } catch (error) {
        return console.log("Error al eliminar las imagenes", error);
      }
    }
    await handleImageDelete();

    axios.delete(`/api/product/${id}`).then(()=> {
      toast.success("Producto eliminado")
      router.refresh()
    }).catch((error)=> {
      toast.error("Error al eliminar el producto")
      console.log(error);
    })
  },[])
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Administar Productos" center />        
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
