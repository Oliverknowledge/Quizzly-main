  "use client"
  import Image from "next/image";
   
  import { AnimatedModalDemo } from "./animated-Button";


  const Dashboard = ( ) => {
    
    
      return (
        <div className="flex w-full h-full  ">
          <div className = "rounded-2xl border border-gray-400   h-[50vh] w-[40vw] ml-10 mt-10 ">
              <div className = " flex justify-center mt-4 items-center flex-col w-full ">
                  <h3 className = "uppercase text-[rgb(113,113,133)] leading-4 py-2  ">
                      Test
                  </h3>
                  <h2 className = "text-3xl font-semibold">Your introductory test</h2>
                  <p className = "text-md text-gray-400 text-center mt-2 text-wrap">Get tailored questions based on your syllabus and difficulty level. <br></br>
                  Practice smarter, not harder.
                  </p>
                  <Image src = "/trophy.png" width = {200} height = {400} alt = "Maths"  className = "pb-4"/> 
                      <AnimatedModalDemo/>
                    <p className = "text-gray-500 mt-2 text-sm">Tip: use pen and paper</p>


              </div>
          </div>
        </div>
      );
    };
  export default Dashboard