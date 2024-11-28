// const getRandomImageUrl = () => {
//   const randomId = Math.floor(Math.random() * 1000);
//   return `https://picsum.photos/seed/${randomId}/200`;
// };


const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-primary/10 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
                // style={{
                //   backgroundImage: `url(${getRandomImageUrl()})`,
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
                
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;




















  // For the random images in the right sidebar to be done after


//   import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AuthImagePattern = ({ title, subtitle }) => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("https://api.unsplash.com/photos/random", {
//           params: { query: "technology dark", count: 9 },
//           headers: {
//             Authorization: `Client-ID YOUR_ACCESS_KEY`,
//           },
//         });
//         setImages(response.data);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//       <div className="max-w-md text-center">
//         <div className="grid grid-cols-3 gap-3 mb-8">
//           {images.map((image, i) => (
//             <div
//               key={i}
//               className={`aspect-square rounded-2xl ${i % 2 === 0 ? "animate-pulse" : ""}`}
//               style={{
//                 backgroundImage: `url(${image.urls.small})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             />
//           ))}
//         </div>
//         <h2 className="text-2xl font-bold mb-4">{title}</h2>
//         <p className="text-base-content/60">{subtitle}</p>
//       </div>
//     </div>
//   );
// };

// export default AuthImagePattern;
