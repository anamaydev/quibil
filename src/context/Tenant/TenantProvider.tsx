import {useState, type ReactNode} from "react";
import {TenantContext, type Tenant} from "./TenantContext";
import {addTenant} from "@/services/tenants.ts";

const TenantProvider = ({children}: {children: ReactNode}) => {

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
      {children}
    </TenantContext.Provider>
  )
}
export default TenantProvider
