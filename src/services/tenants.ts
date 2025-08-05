import {db} from "@/lib/firebase";
import {collection, addDoc, getDocs, query, where, orderBy} from "firebase/firestore";
import {type Tenant} from "@/context/Tenant/TenantContext";
import {type MonthlyBillType} from "@/pages/Calculator";

const tenantsRef = collection(db, "tenants");
const monthlyBillRef = collection(db, "monthlyBill");

export function addTenant(tenantData: Tenant){
  return addDoc(tenantsRef, tenantData);
}

export function getTenants(userId: string){
  // return getDocs(tenantsRef);
  const qry = query(tenantsRef, where("ownerId", "==", userId))
  return getDocs(qry);
}

export function addMonthlyBill(monthlyBill: MonthlyBillType){
  return addDoc(monthlyBillRef, monthlyBill);
}

export function getMonthlyBill(userId: string){
  const qry = query(monthlyBillRef, where("ownerId", "==", userId), orderBy("year", "desc"), orderBy("month", "desc"));
  return getDocs(qry);
}