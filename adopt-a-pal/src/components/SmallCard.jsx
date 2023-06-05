import { React, useState } from "react";
import AnimalCard from "./AnimalCard";
import FadeAnimation from "../modules/FadeAnimation";
import "../styles.css";

function SmallCard({ animal, uid, admin, updateCount }) {
  const [show, setShow] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(false);

  const availabilityBadge =
    animal.availability === "Available"
      ? "badge-success"
      : animal.availability === "Pending"
      ? "badge-warning"
      : animal.availability === "Not Available"
      ? "badge-error"
      : "bg-[#D6D6D6] text-[#fff]";

  const handleDisplayInfo = () => {
    setDisplayInfo(!displayInfo);
  };

  const deleteAnimal = async () => {
    try {
      if (admin) {
        const token = localStorage.getItem("token");
        await fetch(`/api/animals/${animal.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        });
      } else {
        await fetch(`/api/users/${uid}/${animal.id}`, {
          method: "DELETE",
        });
      }
      updateCount();
      setShow(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <FadeAnimation show={show}>
        <div class="card mx-[100rem] w-[20rem]   p-2 my-4 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <div className="relative">
            <button
              onClick={() => deleteAnimal()}
              className="absolute z-50 inset-2 btn btn-circle btn-xs bg-white opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            onClick={() => handleDisplayInfo()}
            className="flex flex-col basis-1/2"
          >
            <img
              class="object-cover h-56 rounded-xl"
              src={animal.avatars[0]}
              alt=""
            />
          </div>
          <div
            onClick={() => handleDisplayInfo()}
            className="flex flex-col flex-wrap basis-1/2"
          >
            <div class="p-2 flex flex-row flex-wrap items-center justify-between">
              <h2 class="font-bold text-[18px]">{animal.name}</h2>
              <p className={`badge badge-lg ${availabilityBadge}`}>
                {animal.availability}
              </p>
            </div>
            <div class="px-2 pb-2 flex flex-row">
              <p class="text-sm text-light-grey">{animal.added.slice(0, 10)}</p>
            </div>
          </div>
        </div>

        {displayInfo && (
          <AnimalCard
            animal={animal}
            admin={admin}
            handleDisplayInfo={handleDisplayInfo}
            deleteAnimal={deleteAnimal}
          />
        )}
      </FadeAnimation>
    </>
  );
}

export default SmallCard;
