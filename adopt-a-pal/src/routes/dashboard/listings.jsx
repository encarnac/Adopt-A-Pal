import { React, useEffect, useState } from "react";
import FilterBar from "../../components/filterbar";
import SmallCard from "../../components/SmallCard";
import NewPost from "./newpost";

function Listings({ uid, show, showNewPost }) {
  const [animals, setAnimals] = useState([]); // Contains raw animal data returned
  const [animalUrl, setAnimalUrl] = useState("/api/animals");
  const handleAnimalUrl = (e) => {
    setAnimalUrl(e);
  };

  const [updateRender, setUpdateRender] = useState(null);
  const handleUpdate = (e) => {
    setUpdateRender(e);
  }


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
  }, [animalUrl, updateRender]);

  return (
    <>
      <NewPost
        show={show}
        showNewPost={showNewPost}
        handleUpdate={handleUpdate}
      />
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
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center mb-32 md:mx-0 mx-8">
          {animals?.map((animal, i) => (
            <SmallCard animal={animal} uid={uid} admin={true} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Listings;
