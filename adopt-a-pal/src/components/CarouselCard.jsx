import { React, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

function CarouselCard({ animal, userID }) {
  const [visible, setVisible] = useState(true);
  const [addState, setAddState] = useState(false);

  if (!visible) return null;

  // Add animal or delete from user's account depending on button state
  const handleSelect = async (e) => {
    try {
      if (!addState) {
        const addResponse = await fetch(`/api/users/${userID}/${animal.id}`, {
          method: "POST",
        });

        if (!addResponse.ok) {
          throw new Error("Failed to add animal");
        }

        setAddState(true);
        setVisible(false);

      } else {
         const deleteResponse = await fetch(`/api/users/${userID}/${animal.id}`, {
           method: "DELETE",
         });

        if (!deleteResponse.ok) {
          throw new Error("Failed to add animal");
        }

        setAddState(false);
        setVisible(true);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      {/* TO DO: Use the class "z-50 bg-black bg-opacity-30 backdrop-blur-sm" to toggle background for activate state */}
      <div className="w-full gap-4 flex-wrap flex justify-center items-center">
        {/* <!-- CARD --> */}
        <div className="flex w-[50rem] h-[400px] p-0 bg-white rounded-[35px] shadow-lg hover:shadow-2xl">
          {/* !------ LEFT COLUMN FOR PET IMAGE -----> */}
          <div className="flex flex-col basis-1/2 justify-center p-0 m-0">
            <img
              className="object-cover h-full rounded-[35px]"
              src={animal.avatars[0]}
              alt=""
            />
          </div>

          {/* <!------RIGHT COLUMN FOR PET INFO ------> */}
          <div className="flex flex-col relative basis-1/2 p-8 space-y-2 text-start">
            {/* <!-- 1st ROW - NAME --> */}
            <h2 className="font-bold text-xl text-black" t>
              {animal.name}
            </h2>

            {/* <!-- 2nd ROW - POST DATE --> */}
            <p className="text-[14px] text-light-grey">
              Post date: {animal.added.slice(0, 10)}
            </p>

            {/* <!-- 3rd ROW - AVAILABILITY, SPECIES, BREED --> */}
            <div className="flex flex-row flex-wrap space-x-2">
              <p className="badge badge-success badge-lg ">
                {animal.availability}
              </p>
              <p className="badge badge-info badge-lg ">{animal.species}</p>
              <p className="badge badge-warning badge-lg ">{animal.breed}</p>
            </div>

            {/* <!-- 4th ROW - DISPOSITIONS LIST --> */}
            <ul className="text-[15px] text-grey">
              {animal.dispositions?.map((description, i) => (
                <li>{description}</li>
              ))}
              {/* <li>Good with other animals</li>
              <li>Good with children</li>
              <li>Animal must be leashed at all times</li> */}
            </ul>

            {/* <!-- 5th ROW - CALL TO ACTION BUTTON --> */}
            <div className="absolute bottom-4 right-4">
              {/* Opt 1: Like Button for "browse" cardType */}
              {addState ? (
                <button
                  onClick={() => handleSelect()}
                  className="btn btn-success btn-circle shadow-md hover:shadow-lg"
                >
                  <HiHeart style={{ color: "white", fontSize: "1.5em" }} />
                </button>
              ) : (
                <button
                  onClick={() => handleSelect()}
                  className="btn btn-primary btn-circle shadow-md hover:shadow-lg"
                >
                  {" "}
                  <HiOutlineHeart
                    style={{ color: "white", fontSize: "1.5em" }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarouselCard;
