import {useState} from "react";
import {TenantContext, type Tenant} from "./TenantContext";
import {addTenant} from "@/services/tenants.ts";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tenants, _setTenants] = useState<Tenant[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, _setLoading] = useState(true);

  return (
    <TenantContext.Provider value={{tenant, setTenant, tenants, loading, addTenant}}>
      {/*{children}*/}
      <Outlet/>
    </TenantContext.Provider>
  )
}
export default TenantProvider
