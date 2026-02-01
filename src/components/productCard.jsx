import { Link } from "react-router-dom";

function ProductCard(props) {

  console.log(props);
  const product = props.product;

  return (
    <div className="w-[300px] h-[400px] shadow-2xl m-4 cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0">
      <div className="w-full h-[250px] bg-red-900 relative">
        <img src={product.images[1]} className="w-full h-full absolute bg-white object-cover" />
        <img src={product.images[0]} className="w-full h-full absolute bg-white primary-image transition-opacity duration-500 object-cover" />
      </div>
      <div className="w-full h-[150px] p-2 flex flex-col justify-between">
        <h1 className="text-lg text-center">{product.productName}</h1>
        <div className="w-full flex flex-col items-center justify-center">
          {
            product.labelPrice > product.price &&
            <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 m-2">
              LKR. {product.labelPrice.toFixed(2)}
            </h2>
          }
          <h2 className="text-black m-2">
            LKR. {product.price.toFixed(2)}
          </h2>
        </div>
      </div>
      <div className="w-full h-[150px] bottom-0 opacity-0 bg-white transition-opacity duration-300 absolute buttons flex flex-row items-center justify-center gap-4">
          <Link to={"/overview/" + product.productID} className=" h-[70px] w-[200px] border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-150 flex items-center justify-center ">View Details</Link>
          
      </div>
    </div>
  );
}

export default ProductCard;