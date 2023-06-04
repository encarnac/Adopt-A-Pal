import { React, useEffect, useState } from "react";
import FilterBar from "../browse/filterbar";
import SmallCard from "../../components/SmallCard";

function Listings({ uid }) {
  const token = localStorage.getItem("token");
  const [animals, setAnimals] = useState([]); // Contains raw animal data returned
  const [animalUrl, setAnimalUrl] = useState("/api/animals");
  const handleAnimalUrl = (e) => {
    setAnimalUrl(e);
  };

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

  return (
    <>
      <div className="w-[70vw] flex flex-col mt-28 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown indicator">
          <span className="indicator-item badge badge-secondary">
            {animals.length}
          </span>
          Posted Pets
        </div>

        <FilterBar handleAnimalUrl={handleAnimalUrl} admin={true} />

        {/* PAGE CONTENT */}
        <div className="grid grid-cols-4 gap-8 mb-32">
          {animals?.map((animal, i) => (
            <SmallCard animal={animal} uid={uid} token={token} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Listings;
