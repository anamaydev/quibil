import LogoIcon from "@/components/icons/LogoIcon";
import {Settings, LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuthContext} from "@/context/Auth/useAuthContext.ts";

const Header = () => {
  const {logOut} = useAuthContext();

  return (
    <header className="p-3 rounded-md bg-card flex justify-between items-center">
      <LogoIcon/>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer">
          <Settings className="size-6"/>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={logOut}
        >
          <LogOut className="size-6"/>
        </Button>
      </div>
    </header>
  )
}
export default Header
