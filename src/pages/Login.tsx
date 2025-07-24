import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

import {IconGoogle, IconMeta, Logo} from "@/components/icons";

const Login = () => {
  return (
    <main className="relative min-h-dvh flex justify-center items-center px-6">
      <Logo className="absolute top-20" />
      <Card className="w-full max-w-sm flex flex-col">
        <CardHeader className="w-full">
          <CardTitle className="font-semibold text-2xl">Create an account</CardTitle>
          <CardDescription className="text-sm">Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Email</Label>
                <Input type="email" placeholder="mika@mouse.com"/>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Password</Label>
                <Input type="password"/>
              </div>
              <Button disabled type="submit" className="w-full">Create account</Button>
            </div>
          </form>

          <div className="relative w-full mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">Or continue with</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" className="w-full">
            <IconGoogle/>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <IconMeta/>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
export default Login
