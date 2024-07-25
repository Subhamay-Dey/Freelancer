import AppNav from "@/components/common/AppNav";
import MobileAppNav from "@/components/common/MobileAppNav";
import { createClient } from "@/supabase/supabaseServer"; 
import { cookies } from "next/headers";

export default async function FrontLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const supabase = createClient(cookies())
    const {data} = await supabase.auth.getSession()
    return (
      <div className="container relative h-screen">
        <MobileAppNav/>
        <AppNav user={data.session?.user!}/>
        {children}
    </div>
    );
  }