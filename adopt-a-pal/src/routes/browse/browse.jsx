import { React, useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import CarouselCard from '../../components/CarouselCard';

function Browse(props) {
  const animalUrl = "/api/animals";
  const [ animals, setAnimals ] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch( animalUrl ); 

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const animalData = await response.json();

        console.log(animalData);
        setAnimals(animalData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [animalUrl]);


  return (
    <>
      <NavBar currentPage={"browse"} />
      <div className="w-[1280px] flex flex-col mt-36 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown">
          Browse Pets
        </div>





        {/* PAGE CONTENT */}
        <div className="carousel carousel-center w-[50em] mx-auto space-x-8 rounded-box">
          {/* Creates CarouselCard for each item in list of animal instances */}
          {animals?.map((animal, i) => (
            <div className="carousel-item">
              <CarouselCard animal={animal} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Browse;
