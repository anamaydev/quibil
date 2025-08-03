import {useState, useEffect} from "react";
import {TenantContext, type Tenant} from "./TenantContext";
import {addMonthlyBill, addTenant, getTenants} from "@/services/tenants.ts";
import {Outlet} from "react-router-dom";

const TenantProvider = () => {

  const [tenant, setTenant] = useState<Tenant>({
    firstName: "",
    lastName: "",
    email: "",
    moveInDate: undefined,
    flat: "",
    ownerId: ""
  })

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("tenantsData");
    if(cached) {
      setTenants(JSON.parse(cached));
      setLoading(false);
    }
    else{
      async function handleGetTenants(){
        const snapshot = await getTenants();
        const tenantsData = snapshot.docs.map(doc => (
          {id: doc.id, ...doc.data() as Omit<Tenant, "id">}
        ))

        setTenants(tenantsData);
        setLoading(false);
        sessionStorage.setItem("tenantsData", JSON.stringify(tenantsData));
      }

      handleGetTenants();
    }
  }, []);

  useEffect(()=>console.log("tenants: ", tenants), [tenants]);

  return (
    <TenantContext.Provider value={{tenant, setTenant, tenants, loading, addTenant, addMonthlyBill}}>
      {/*{loading ? <h1>Loading...</h1> : <Outlet/>}*/}
      <Outlet/>
    </TenantContext.Provider>
  )
}
export default TenantProvider
