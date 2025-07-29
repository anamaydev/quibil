import {useContext} from "react";
import {TenantContext} from "@/context/Tenant/TenantContext";

export function useTenantContext(){
  const context = useContext(TenantContext);
  if(context === undefined) throw new Error("useTenantContext must be used within a TenantProvider");
  return context;
}