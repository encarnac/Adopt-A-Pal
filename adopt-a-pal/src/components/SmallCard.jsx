import { React, useState } from "react";
import AnimalCard from "./AnimalCard";

function SmallCard({ animal }) {
  const [displayInfo, setDisplayInfo] = useState(false);

  const handleDisplayInfo = () => {
    setDisplayInfo(!displayInfo);
  }

  return (
    <>
      <div
        onClick={() => handleDisplayInfo()}
        class="w-64 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl"
      >
        <div className="flex flex-col basis-1/2">
          <img
            class="object-cover h-52 rounded-xl"
            src={animal.avatars[0]}
            alt=""
          />
        </div>
        <div className="flex flex-col basis-1/2">
          <div class="p-2 flex flex-row items-center justify-between">
            <h2 class="font-bold text-[18px]">{animal.name}</h2>
            <p class="badge badge-success">{animal.availability}</p>
          </div>
          <div class="px-2 pb-2 flex flex-row">
            <p class="text-sm text-light-grey">{animal.added.slice(0, 10)}</p>
          </div>
        </div>
      </div>

      {displayInfo && (
        <AnimalCard
          animal={animal}
          handleDisplayInfo={handleDisplayInfo}
          cardType="dashboard"
        />
      )}
    </>
  );
}

export default SmallCard;
