import {NavLink, Outlet} from "react-router-dom";
import {useAuthContext} from "@/context/Auth/useAuthContext.ts";
import {Separator} from "@/components/ui/separator";
import {Calculator, Users} from "lucide-react"

const Main = () => {
  const {user} = useAuthContext();

  return (
    <main className="flex-grow flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Hey there, {user?.displayName}!</h1>
        <p className="text-base">Ready to record this month’s readings?</p>
      </div>

      <div className="flex-grow flex flex-col gap-4">
        <div className="flex gap-4">
          <NavLink
            to="/home"
            end
            className={({isActive})=>
              isActive ?
              "underline flex gap-2 underline-offset-4":
              "flex gap-2 hover:underline underline-offset-4 opacity-50"
            }
          ><Calculator/> Calculator</NavLink>
          <NavLink
            to="tenants"
            className={({isActive})=>
              isActive ?
              "underline flex gap-2 underline-offset-4":
              "flex gap-2 hover:underline underline-offset-4 opacity-50"
            }
          ><Users/> Tenants</NavLink>
        </div>
        <Separator/>
        <Outlet/>
      </div>
    </main>
  )
}
export default Main
