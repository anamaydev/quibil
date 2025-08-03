import {useState, useEffect} from "react";
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


  /* getting tenants from firestore */
  useEffect(() => {
    const cached = sessionStorage.getItem("tenantsData");
    if(cached) {
      setTenants(JSON.parse(cached));
      setLoading(false);
    }
    else{
      async function handleGetTenants(){
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
      handleGetTenants();
    }
  }, []);

  useEffect(()=>console.log("tenants: ", tenants), [tenants]);

  /* getting monthly bills from firestore */
  useEffect(() => {
    if(!user) return;
    const uid = user.uid;

    const cached = sessionStorage.getItem("monthlyBills");
    if(cached){
      setMonthlyBills(JSON.parse(cached));
      setMonthlyBillsLoading(false);
    }else{
      async function handleGetMonthlyBills(){
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
      }

      handleGetMonthlyBills();
    }
  }, [user]);

  useEffect(() => console.log("monthlyBills: ", monthlyBills), [monthlyBills]);

  return (
    <TenantContext.Provider value={{tenant, setTenant, tenants, loading, addTenant, addMonthlyBill, monthlyBills, monthlyBillsLoading}}>
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