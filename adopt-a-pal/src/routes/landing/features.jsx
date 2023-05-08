import React from "react";
import Pets from "../../assets/dog-cat.png";
import PetOwner from "../../assets/pet-owner.png";
import PetShelter from "../../assets/pet-shelter.png";

const Features = () => {
  return (
    <>
      {/* FEATURES TITLE*/}
      <div className="mx-auto mt-50" id="features">
        <img src={require("../../assets/features.png")} alt="" />
      </div>

      {/* FEATURES CARDS */}
      <div className=" w-full pt-[5rem] pb-[10rem] lg:px-20">
        <div className="justify-items-center max-w-[1240px] mx-[20rem] lg:mx-auto grid lg:grid-cols-3 grid-cols-1 gap-12">
          {/* CARD 1 */}
          <div class="h-200 min-w-[15rem] bg-white rounded-[35px] px-10 lg:px-14 py-10 lg:py-0 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img className="mx-auto bg-transparent" src={PetShelter} alt="/" />
            <h2 className="text-xl text-[#735858] leading-10 font-bold text-center bg-transparent">
              ADOPT FROM NON-PROFIT ANIMAL SHELTERS
            </h2>
          </div>

          {/* CARD 2 */}
          <div class=" min-w-[15rem] bg-white rounded-[35px] px-10 lg:px-14 py-10 lg:py-20 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img className="mx-auto bg-transparent" src={PetOwner} alt="/" />
            <h2 className="text-xl text-[#735858] leading-10 font-bold text-center bg-transparent">
              SEARCH BY TYPE, BREED, DISPOSITION, AND MORE!
            </h2>
          </div>

          {/* CARD 3 */}
          <div class="h-250 min-w-[15rem] bg-white rounded-[35px] px-10 lg:px-14 py-10 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img className="mx-auto bg-transparent" src={Pets} alt="/" />
            <h2 className="text-xl text-[#735858] leading-10 font-bold text-center bg-transparent">
              GET NEWS & UPDATES ON THE NEWEST PETS
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
