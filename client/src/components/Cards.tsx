// import thumbnail from "../assets/personal-blog.webp"

// const Cards = () => {
//   return (
//     <div className="flex bg-white border-4  border-red-600">
//         <div className="p-2 mr-2">
//             <img src={thumbnail} alt="thumbnail" className="h-42 w-96" />
//         </div>
//         <div>
//        <h3 className="text-2xl font-medium">Random Name</h3>
//        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores facere deserunt amet quidem, ea exercitationem? Nesciunt aliquam rem fugit est, iusto doloribus quasi praesentium placeat id facilis repellendus adipisci maiores! Unde vel iure, culpa dolore illo, facilis nisi quos voluptatibus reiciendis soluta amet asperiores nostrum minima consequatur. Cumque delectus eaque, aperiam sed eum id explicabo ipsa saepe in deserunt tempore.</p>
//        <div className="flex">
//         <h4 className="text-1xl font-bold">07 June 2024 |</h4>
//         <h4 className="text-1xl font-serif"> John Doe</h4>
//        </div>
//         </div>
//         </div>
//   )
// }

// export default Cards


import { Link } from "react-router-dom"
import thumbnail from "../assets/personal-blog.webp"


const Cards = () => {
  return (
    <div className="flex items-center bg-white ">
      <div className="flex-shrink-0 ">
        <img src={thumbnail} alt="thumbnail" className="h-48 w-48 " />
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-medium">Random Name</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores facere deserunt amet quidem, ea exercitationem? Nesciunt aliquam rem fugit est, iusto doloribus quasi praesentium placeat id facilis repellendus adipisci maiores! Unde vel iure, culpa dolore illo, facilis nisi quos voluptatibus reiciendis soluta amet asperiores nostrum minima consequatur. Cumque delectus eaque, aperiam sed eum id exp......
        </p>
        <Link to="/home" className="text-gray-950 font-semibold">Read More</Link>
        <div className="flex">
          <h4 className="text-1xl font-bold">07 June 2024 |</h4>
          <h4 className="text-1xl font-serif ml-2">John Doe</h4>
        </div>
      </div>
    </div>
  )
}

export default Cards
