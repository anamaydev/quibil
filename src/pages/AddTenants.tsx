import {type FormEvent, useEffect, useState} from "react";
import {Logo} from "@/components/icons";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import DatePicker from "@/components/DatePicker";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {ChevronRight} from "lucide-react";
import {useTenantContext} from "@/context/Tenant/useTenantContext.ts";
import {useAuthContext} from "@/context/Auth/useAuthContext.ts";

const AddTenants = () => {
  const {tenant, setTenant, addTenant} = useTenantContext();
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [moveInDate, setMoveInDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    console.log(tenant);
  }, [tenant]);

  useEffect(() => {
    if(moveInDate === undefined) return;
    setTenant(prevTenant=> ({...prevTenant, moveInDate: moveInDate.toLocaleDateString()}))
  }, [moveInDate, setTenant]);

  async function handleAddTenant(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /* console error if any field is empty */
    if(tenant.email === ""|| tenant.firstName === "" || tenant.lastName === "" || tenant.moveInDate === undefined || tenant.flat === "") {
      console.error("Please enter all the required fields.");
    }

    /* set ownerId as user ID */
    const tenantInfo = {...tenant, ownerId: user?.uid};

    try{
      await addTenant(tenantInfo);
    }catch(err){
      console.error(err);
    }finally {
      /* reset tenant object */
      setTenant({email: "", firstName: "", lastName: "", moveInDate: "", flat: "", ownerId: "",});
      setMoveInDate(undefined);
    }
  }

  return (
    <main  className="relative min-h-dvh flex flex-col gap-2 justify-center items-center px-6">
      <Logo className="absolute top-20"/>
      <Card className="w-full max-w-sm flex flex-col">
        <CardHeader className="w-full">
          <CardTitle className="font-semibold text-2xl">Tenant Information</CardTitle>
          <CardDescription className="text-sm">Add minimum 3 tenants for better result</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/" onSubmit={handleAddTenant}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <Label className="px-1">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Jake"
                    value={tenant.firstName}
                    onChange={(e)=>setTenant(prevTenants => ({...prevTenants, firstName: e.target.value}))}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="px-1">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Paralta"
                    value={tenant.lastName}
                    onChange={(e)=>setTenant(prevTenants => ({...prevTenants, lastName: e.target.value}))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label className="px-1">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="jakeparalta@email.com"
                  value={tenant.email}
                  onChange={(e)=>setTenant(prevTenants => ({...prevTenants, email: e.target.value}))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DatePicker label={"Move In Date"} date={moveInDate} setDate={setMoveInDate}/>
                <div className="flex flex-col gap-3">
                  <Label className="px-1">Flat</Label>
                  <Input
                    type="text"
                    name="flatNumber"
                    placeholder="A001"
                    value={tenant.flat}
                    onChange={(e)=>setTenant(prevTenants => ({...prevTenants, flat: e.target.value}))}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full cursor-pointer">Add tenant</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Button
        className="flex gap-0.5 justify-center items-center"
        variant={"secondary"}
        onClick={()=> navigate("/")}
      >
        <span>Next</span>
        <ChevronRight className="translate-y-[1px]"/>
      </Button>
    </main>
  )
}
export default AddTenants
