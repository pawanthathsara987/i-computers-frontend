import './App.css'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <ProductCard name="Laptop" price="100,000.00" img="https://picsum.photos/id/1/200/300"/>
      <ProductCard name="Phone" price="50,000.00" img="https://picsum.photos/id/2/200/300"/>
      <ProductCard name="Tablet" price="30,000.00" img="https://picsum.photos/id/3/200/300"/>
    </>
  )
}

export default App
