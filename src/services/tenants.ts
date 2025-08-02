import {db} from "@/lib/firebase";
import {collection, addDoc, getDocs} from "firebase/firestore";
import {type Tenant} from "@/context/Tenant/TenantContext";

const tenantsRef = collection(db, "tenants");

export function addTenant(tenantData: Tenant){
  return addDoc(tenantsRef, tenantData);
}

export function getTenants(){
  return getDocs(tenantsRef);
}