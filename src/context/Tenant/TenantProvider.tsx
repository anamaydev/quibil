import {useState, useEffect, useCallback} from "react";
import {TenantContext, type Tenant} from "./TenantContext";
import {addTenant, getTenants, addMonthlyBill, getMonthlyBill} from "@/services/tenants.ts";
import {Outlet} from "react-router-dom";
import type {MonthlyBillType} from "@/pages/Calculator";
import {useAuthContext} from "@/context/Auth/useAuthContext.ts";

const TenantProvider = () => {

  const {user} = useAuthContext();
  const [tenant, setTenant] = useState<Tenant>({
    firstName: "",
    lastName: "",
    email: "",
    moveInDate: undefined,
    flat: "",
    ownerId: ""
  })
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [monthlyBills, setMonthlyBills] = useState<MonthlyBillType[]>([]);
  const [monthlyBillsLoading, setMonthlyBillsLoading] = useState<boolean>(true);

  async function fetchTenants(){
    try{
      const snapshot = await getTenants();
      const tenantsData = snapshot.docs.map(doc => (
        {id: doc.id, ...doc.data() as Omit<Tenant, "id">}
      ))

      setTenants(tenantsData);
      setLoading(false);
      sessionStorage.setItem("tenantsData", JSON.stringify(tenantsData));
    }catch(err){
      console.error(err);
      setLoading(false);
    }
  }

  const fetchMonthlyBills = useCallback(async () => {
    if(!user) return;
    const uid = user.uid;

    try {
      const snapshot = await getMonthlyBill(uid);
      const monthlyBillsData = snapshot.docs.map(doc => (
        {id: doc.id, ...doc.data() as Omit<MonthlyBillType, "id">}
      ))
      setMonthlyBills(monthlyBillsData);
      setMonthlyBillsLoading(false);
      sessionStorage.setItem("monthlyBills", JSON.stringify(monthlyBillsData));
    }catch(err){
      console.error(err);
      setMonthlyBillsLoading(false);
    }
  }, [user])

  /* getting tenants from firestore */
  useEffect(() => {
    const cached = sessionStorage.getItem("tenantsData");
    if(cached) {
      setTenants(JSON.parse(cached));
      setLoading(false);
    }
    else{
      /* void to suppress ESLint warning of returned Promise is ignored*/
      void fetchTenants();
    }
  }, []);

  useEffect(()=>console.log("tenants: ", tenants), [tenants]);

  /* getting monthly bills from firestore */
  useEffect(() => {
    const cached = sessionStorage.getItem("monthlyBills");
    if(cached){
      setMonthlyBills(JSON.parse(cached));
      setMonthlyBillsLoading(false);
    }else{
      /* void to suppress ESLint warning of returned Promise is ignored*/
      void fetchMonthlyBills();
    }
  }, [fetchMonthlyBills]);

  useEffect(() => console.log("monthlyBills: ", monthlyBills), [monthlyBills]);

  return (
    <TenantContext.Provider value={{tenant, setTenant, tenants, loading, addTenant, addMonthlyBill, monthlyBills, monthlyBillsLoading, fetchMonthlyBills, fetchTenants}}>
      {/*{loading ? <h1>Loading...</h1> : <Outlet/>}*/}
      <Outlet/>
    </TenantContext.Provider>
  )
}
export default TenantProvider

/*
* TODO:
*  [] remove handleFetching function
*  [] put outside,
*  [] export via context
*  [] re-fetch after new entry
*  [] fetch tenants only after user is fetched else return (put it in dependency array)
*/