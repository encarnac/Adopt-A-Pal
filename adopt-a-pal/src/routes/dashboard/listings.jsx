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

  const [count, setCount] = useState(0);
  const updateCount = () => {
    setCount((count) => count - 1);
  };

  useEffect(() => {
    setCount(animals?.length);
  }, [animals]);


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
      <div className="w-[83vw] flex flex-col mt-28 mb-10 mx-auto px-12 justify-center">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown indicator">
          <span className="indicator-item badge badge-secondary">{count}</span>
          Posted Pets
        </div>

        <FilterBar handleAnimalUrl={handleAnimalUrl} admin={true} />

        {/* PAGE CONTENT */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 justify-items-center auto-cols-auto gap-x-56 lg:gap-x-24 gap-y-8 mb-32 mx-auto px-2">
          {animals?.map((animal, i) => (
            <SmallCard
              animal={animal}
              uid={uid}
              admin={true}
              updateCount={updateCount}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Listings;
