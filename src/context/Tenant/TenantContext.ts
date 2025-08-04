import {createContext, type Dispatch, type SetStateAction} from "react";
import {type DocumentReference} from "firebase/firestore";
import type {MonthlyBillType} from "@/pages/Calculator.tsx";

export type Tenant = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  moveInDate: string | undefined;
  flat: string;
  ownerId: string | undefined;
}

type TenantContextType = {
  tenant: Tenant;
  setTenant: Dispatch<SetStateAction<Tenant>>;
  tenants: Tenant[];
  loading: boolean;
  addTenant: (tenant: Tenant) => Promise<DocumentReference>;
  addMonthlyBill: (monthlyBill: MonthlyBillType) => Promise<DocumentReference>;
  monthlyBills: MonthlyBillType[];
  monthlyBillsLoading: boolean;
  fetchMonthlyBills: () => Promise<void>;
  fetchTenants: () => Promise<void>;
}

export const TenantContext = createContext<TenantContextType | undefined>(undefined)