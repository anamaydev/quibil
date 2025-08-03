import Header from "@/components/Header";
import Main from "@/components/Main";

const HomeLayout = () => {
  return (
    <section className="min-h-dvh w-screen p-5 flex flex-col gap-6 sm:flex-row">
      <Header/>
      <Main/>
    </section>
  )
}
export default HomeLayout
