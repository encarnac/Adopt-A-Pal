function AnimalCard({ animal, admin, handleDisplayInfo, deleteAnimal }) {
  const availabilityBadge =
    animal.availability === "Available"
      ? "badge-success"
      : animal.availability === "Pending"
      ? "badge-warning"
      : "badge-error";

  return (
    <>
      {/* TO DO: Use the class "z-50 bg-black bg-opacity-30 backdrop-blur-sm" to toggle background for activate state */}
      <div className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-full min-h-screen gap-4 flex-wrap flex justify-center items-center">
        {/* <!-- CARD --> */}
        <div className="flex w-[50rem] h-[400px] p-0 bg-white rounded-[35px] shadow-lg hover:shadow-2xl">
          {/* !------ LEFT COLUMN FOR PET IMAGE -----> */}
          <div className="relative flex flex-col basis-1/2 justify-center p-0 m-0">
            {/* LEFT COLUMN - Close Button */}
            <button
              onClick={() => handleDisplayInfo()}
              className="absolute z-51 inset-4 btn btn-circle btn-sm bg-white opacity-50"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* LEFT COLUMN - IMAGE CAROUSEL */}
            <div className="carousel w-full h-full">
              {animal.avatars?.map((image, i) => (
                <div id={`${i}`} className="carousel-item w-full">
                  <img
                    className="object-cover w-full rounded-[35px]"
                    src={image}
                    alt=""
                  />
                </div>
              ))}
            </div>

            {/* LEFT COLUMN - CAROUSEL BUTTONS */}
            <div className="absolute bottom-0 justify-center w-full py-2 space-x-4">
              {animal.avatars?.map((image, i) => (
                <a
                  href={`#${i}`}
                  className="btn btn-xs btn-circle bg-white p-0 shadow-md hover:shadow-lg opacity-70"
                >
                  {" "}
                </a>
              ))}
            </div>
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
            <div className="flex flex-row flex-wrap gap-2 justify-start content-start">
              <p className={`badge badge-lg ${availabilityBadge}`}>
                {animal.availability}
              </p>
              <p className="badge badge-info badge-lg capitalize">
                {animal.species}
              </p>
              <p className="badge badge-primary badge-lg ">{animal.breed}</p>
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
              {/*  Opt 1: Inquire Button for "details" cardType */}
              {admin ? (
                <span
                  onClick={() => deleteAnimal()}
                  className="btn btn-primary bg-hot-pink shadow-md hover:shadow-lg"
                >
                  Delete
                </span>
              ) : (
                <a
                  href="mailto:adopt@adopt-a-pal.com"
                  className="btn btn-primary bg-hot-pink shadow-md hover:shadow-lg"
                >
                  Inquire
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimalCard;
