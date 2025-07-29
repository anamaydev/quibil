import {db} from "@/lib/firebase";
import {collection, addDoc} from "firebase/firestore";
import {type Tenant} from "@/context/Tenant/TenantContext";

const tenantsRef = collection(db, "tenants");

export function addTenant(tenantData: Tenant){
  return addDoc(tenantsRef, tenantData);
}
