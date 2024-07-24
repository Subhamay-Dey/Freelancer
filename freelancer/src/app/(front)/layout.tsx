import AppNav from "@/components/common/AppNav";

export default function FrontLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="container">
        <AppNav/>
        {children}
    </div>
    );
  }