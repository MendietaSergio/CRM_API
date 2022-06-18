import './App.css'
import { Header } from './components/Header/Header'
import { Navigations } from './components/Navigations/Navigations'

function App() {

  return (
    <div className="App">
      <Header />
      <div className="grid container  container-principal">
          <Navigations/>
          
      </div>
    </div>
  )
}

export default App
