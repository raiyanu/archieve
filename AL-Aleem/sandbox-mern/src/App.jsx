import './App.css'
import Card from './components/Card'
import ThemeContextProvider  from './components/ThemeContext';

function App(){
  return (
    <>
    <ThemeContextProvider >
    <h1 className='text-center text-2xl text-blue-400 m-6'>Test on useContext providers</h1>
    <Card/>
    </ThemeContextProvider>
    </>
  )
}

export default App
