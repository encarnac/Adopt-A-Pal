import { React, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import FilterBar from "./filterbar";
import CarouselCard from '../../components/CarouselCard';
import UseUserPals from "../../modules/UseUserPals";


function Browse(props) {
  // Get list of user's pals to be used as filter
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded.id;
  const userUrl = `/api/users/${userID}`;
  const userData = UseUserPals(userUrl);
  const userPals = userData.pals?.map((strID) => parseInt(strID));
  console.log("USER PALS = ", userPals);

  const [animals, setAnimals] = useState(null); // Contains raw animal data returned
  const [filteredAnimals, setFilteredAnimals] = useState(null); // Contains animal data filtered by userPals

  // API call to handle query params
  const [animalUrl, setAnimalUrl] = useState("/api/animals");
  const handleAnimalUrl = (e) => {
    setAnimalUrl(e);
  };

  // Handles API GET fetch request to get raw animal data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(animalUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const animalData = await response.json();

        setAnimals(animalData);

        console.log("ANIMALS = ", animals);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [animalUrl]);

  // Removes animals returned from db if already in userPals  
  useEffect(() => {
    const filterData = () => {
      if (userData && userPals && userPals.length > 0) {
        const filteredAnimalData = animals.filter(
          (animal) => !userPals.includes(animal.id)
        );
        setFilteredAnimals(filteredAnimalData);
      } else {
        setFilteredAnimals(animals)
      }
    };
    filterData();
    console.log("FILTERED ANIMALS = ", filteredAnimals);
  }, [animals]);



  return (
    <>
      <NavBar currentPage={"browse"} />
      <div className="w-[70vw] flex flex-col mt-36 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown">
          Browse Pets
        </div>

        {/* FILTER AND SEARCH BAR*/}
        <FilterBar handleAnimalUrl={handleAnimalUrl} />

        <div className="mb-8 p-2 text-start text-sm text-taupe">
          Returned {filteredAnimals?.length} results
        </div>

        {/* PAGE CONTENT */}
        <div className="carousel carousel-center w-[50em] mx-auto mt-12 mb-28 space-x-8 rounded-box">
          {/* Creates CarouselCard for each item in list of animal instances */}
          {filteredAnimals?.map((animal, i) => (
            <div className="carousel-item">
              <CarouselCard animal={animal} userID={userID} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Browse;
