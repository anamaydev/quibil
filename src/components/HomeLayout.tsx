import Header from "@/components/Header";
import Main from "@/components/Main";

const HomeLayout = () => {
  return (
    <section>
      <div className="min-h-dvh w-screen p-5 flex flex-col gap-6">
        <Header/>
        <Main/>
      </div>
    </section>
  )
}
export default HomeLayout
