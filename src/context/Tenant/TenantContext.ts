import {createContext, type Dispatch, type SetStateAction} from "react";
import {type DocumentReference} from "firebase/firestore";

export type Tenant = {
  firstName: string,
  lastName: string,
  email: string,
  moveInDate: Date | undefined,
  flat: string,
}

type TenantContextType = {
  tenant: Tenant,
  setTenant: Dispatch<SetStateAction<Tenant>>,
  tenants: Tenant[],
  loading: boolean,
  addTenant: (tenant: Tenant) => Promise<DocumentReference<Tenant>>,
}

export const TenantContext = createContext<TenantContextType | undefined>(undefined)