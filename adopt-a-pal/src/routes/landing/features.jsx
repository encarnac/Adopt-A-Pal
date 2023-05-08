import React from "react";
import Pets from "../../assets/dog-cat.png";
import PetOwner from "../../assets/pet-owner.png";
import PetShelter from "../../assets/pet-shelter.png";

const Features = () => {
  return (
    <>
      {/* FEATURES TITLE*/}
      <div className="mx-auto py-0" id="features">
        <img src={require("../../assets/features.png")} alt="" />
      </div>

      {/* FEATURES CARDS */}
      <div className="w-full py-[10rem] px-3">
        <div className="max-w-[1240px] mx-[15rem] lg:mx-auto grid lg:grid-cols-3 grid-cols-1 gap-12">
          {/* CARD 1 */}
          <div class="h-200 w-200 bg-white rounded-[35px] px-10 lg:px-5 py-10 lg:py-0 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img className="mx-auto bg-transparent" src={PetShelter} alt="/" />
            <h2 className="text-3xl text-[#735858] leading-10 font-bold text-center bg-transparent">
              ADOPT FROM NON-PROFIT ANIMAL SHELTERS
            </h2>
          </div>

          {/* CARD 2 */}
          <div class="h-250 w-200 bg-white rounded-[35px] px-10 lg:px-5 py-10 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img className="mx-auto bg-transparent" src={PetOwner} alt="/" />
            <h2 className="text-3xl text-[#735858] leading-10 font-bold text-center bg-transparent">
              SEARCH BY TYPE, BREED, DISPOSITION, AND MORE!
            </h2>
          </div>

          {/* CARD 3 */}
          <div class="h-250 w-200 bg-white rounded-[35px] px-10 lg:px-5 py-10 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img className="mx-auto bg-transparent" src={Pets} alt="/" />
            <h2 className="text-3xl text-[#735858] leading-10 font-bold text-center bg-transparent">
              GET NEWS & UPDATES ON THE NEWEST PETS
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
