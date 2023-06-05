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
        <div className="justify-items-center max-w-[1240px] mx-[18rem] lg:mx-auto grid lg:grid-cols-3 grid-cols-1 gap-12">
          {/* CARD 1 */}
          <div class="h-200 min-w-[15rem] bg-white rounded-[35px] min-w-[18rem] w-full px-10 lg:px-14 py-10 lg:py-0 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img
              className="mx-auto object-cover w-1/2 bg-transparent"
              src={PetShelter}
              alt="/"
            />
            <h2 className="text-2xl text-taupe/80 leading-8 font-bold text-center bg-transparent px-4 pt-4">
              Adopt from non-profit shelters
            </h2>
          </div>

          {/* CARD 2 */}
          <div class=" min-w-[15rem] bg-white rounded-[35px] min-w-[18rem] px-10 lg:px-14 py-10 lg:py-20 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img
              className="mx-auto object-cover w-1/2  bg-transparent"
              src={PetOwner}
              alt="/"
            />
            <h2 className="text-2xl text-taupe/80 leading-8 font-bold text-center bg-transparent px-4 pt-4">
              Search by breed, type, dispositions, and more!
            </h2>
          </div>

          {/* CARD 3 */}
          <div class="h-250 min-w-[15rem] bg-white rounded-[35px] min-w-[18rem] px-10 lg:px-14 py-10 flex flex-col justify-center shadow-xl duration-300 hover:scale-105 gap-4">
            <img
              className="mx-auto object-cover w-1/2 bg-transparent"
              src={Pets}
              alt="/"
            />
            <h2 className="text-2xl text-taupe/80 leading-8 font-bold text-center bg-transparen px-4 pt-4">
              Get news and updates on the latest pets
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
