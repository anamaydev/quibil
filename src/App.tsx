import { ThemeProvider } from "@/components/theme-provider"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="min-h-dvh flex flex-col justify-center items-center">
        App
      </main>
    </ThemeProvider>
  )
}
export default App
