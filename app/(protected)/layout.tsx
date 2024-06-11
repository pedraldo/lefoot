import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 max-w-3xl m-auto w-full p-4">{children}</main>
      <Footer />
    </div>
  );
}
