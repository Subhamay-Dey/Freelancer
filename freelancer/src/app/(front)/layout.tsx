import AppNav from "@/components/common/AppNav";
import MobileAppNav from "@/components/common/MobileAppNav";

export default function FrontLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="container relative h-screen">
        <MobileAppNav/>
        <AppNav/>
        {children}
    </div>
    );
  }