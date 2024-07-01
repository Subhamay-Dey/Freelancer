import { Button } from "@/components/ui/button";
import React from "react";
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from "next/headers";

export default async function Home() {

  const supabase = createClient(cookies())

  const {data, error} = await supabase.auth.getSession()

  return (
    <>
      <Button>button</Button>
      {/* {JSON.stringify(data.session?.user)} */}
    </>
  );
}