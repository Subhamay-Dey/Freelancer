import Login from "@/components/auth/Login"
import Register from "@/components/auth/Register"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

export default function TabsDemo() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="mb-4 flex flex-col justify-center items-center">
        <Image src="/images/logo_512.png" width={80} height={80} alt="logo"/>
        <p><strong>Freelancer</strong></p>
        <p>a community of Freelancers</p>
      </div>

    <Tabs defaultValue="login" className="w-full p-2 md:w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login/>
      </TabsContent>
      <TabsContent value="register">
        <Register/>
      </TabsContent>
    </Tabs>
    </div>
  )
}
