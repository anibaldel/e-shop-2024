import getOrders from "@/actions/getOrders";
import { Summary } from "./Summary";
import getProducts from '@/actions/getProducts';
import getUsers from "@/actions/getUsers";
import { BarGraph } from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

export default async function AdminPage() {
  const products = await getProducts({category: null})
  const orders = await getOrders()
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div className="pt-8">
      <Summary  products={products} orders={orders} users={users}/>
      <div className="mt-4 mx-auto max-w-[1150px]">
        <BarGraph data = {graphData} />
      </div>
    </div>
  );
}