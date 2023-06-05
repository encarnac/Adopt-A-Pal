import { React, useEffect, useState } from "react";

function FilterBar({ handleAnimalUrl, admin }) {
  // Changes the search paramters
  // const handleAnimalUrl = handleAnimalUrlprops.handleAnimalUrl;

  // Search Query Paramaters
  const [availability, setAvailability] = useState("");
  const [date, setDate] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");

  const [dispositionAnimals, setDispositionAnimals] = useState("");
  const [activeAnimalBtn, setActiveAnimalBtn] = useState(false);
  const handleDispAnimals = () => {
    setActiveAnimalBtn(!activeAnimalBtn);
    dispositionAnimals === true
      ? setDispositionAnimals("")
      : setDispositionAnimals(true);
  };

  const [dispositionChildren, setDispositionChildren] = useState("");
  const [activeChildBtn, setActiveChildBtn] = useState(false);
  const handleDispChildren = () => {
    setActiveChildBtn(!activeChildBtn);
    dispositionChildren === true
      ? setDispositionChildren("")
      : setDispositionChildren(true);
  };

  const [dispositionLeash, setDispositionLeash] = useState("");
  const [activeLeashBtn, setActiveLeashBtn] = useState(false);
  const handleDispLeash = () => {
    setActiveLeashBtn(!activeLeashBtn);
    dispositionLeash === true
      ? setDispositionLeash("")
      : setDispositionLeash(true);
  };

  // Handles new search queries
  const handleSearch = (event) => {
    event.preventDefault();
    handleAnimalUrl(
      `/api/animals?availability=${availability}&date=${date}&species=${species}&breed=${breed}&disposition_animals=${dispositionAnimals}&disposition_children=${dispositionChildren}&disposition_leash=${dispositionLeash}`
    );
  };

  const animalUrl = '/api/animals';
  const [breedOptions, setBreedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(animalUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const animalData = await response.json();
        const breeds = animalData.map((animal) => animal.breed);

        setBreedOptions(breeds);

        console.log("BREEDS = ", breeds);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [animalUrl]);



  return (
    <>
      <form onSubmit={handleSearch} className=" mx-auto">
        <div className="join justify-center items-center justify-items content-center flex flex-row flex-wrap md:no-wrap gap-x-2 mb-8 gap-y-2 w-full">
          {/* AVAILABILITY - DROP DOWN SELECT (FOR ADMIN ONLY) */}
          {admin === true && (
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="select bg-white border-primary opacity-50 text-brown join-item"
            >
              <option disabled selected value="">
                Availability
              </option>
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
              <option value="Not Available">Not Available</option>
            </select>
          )}

          {/* DATE POSTED - DROP DOWN SELECT */}
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="select bg-white border-primary opacity-50 text-brown join-item"
          >
            <option value="" disabled selected>
              Date Posted
            </option>
            <option value="">All</option>
            <option value="week">&lt; 1 week ago</option>
            <option value="month">&lt; 1 month ago</option>
            <option value="6months">&lt; 6 months ago</option>
          </select>

          {/* SPECIES - DROP DOWN SELECTES */}
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="select bg-white border-primary opacity-50 text-brown join-item"
          >
            <option disabled selected value=""> 
              Species
            </option>
            <option value="">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>

          {/* BREED - TEXT INPUT */}
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="select bg-white border-primary opacity-50 text-brown join-item"
          >
            <option disabled selected value="">
              Breed
            </option>
            <option value="">All</option>
            {breedOptions?.map((option, i) => (
              <option value={`${option}`}>{option}</option>
            ))}
          </select>

          {/* DISPOSITIONS FOR CHILDREN - BUTTON  */}
          <button
            onClick={handleDispChildren}
            className={
              activeChildBtn
                ? "btn bg-success opacity-70 text-white normal-case hover:bg-success hover:text-white hover:opacity-50 join-item"
                : "btn bg-white border-primary opacity-50 text-brown normal-case hover:bg-success hover:text-white join-item"
            }
          >
            Kid Friendly
          </button>

          {/* DISPOSITIONS FOR OTHER ANIMALS - BUTTON  */}
          <button
            onClick={handleDispAnimals}
            className={
              activeAnimalBtn
                ? "btn bg-success opacity-70 text-white normal-case hover:bg-success hover:text-white hover:opacity-50 join-item"
                : "btn bg-white border-primary opacity-50 text-brown normal-case hover:bg-success hover:text-white join-item"
            }
          >
            Animal Friendly
          </button>

          {/* DISPOSITIONS FOR LEASH - BUTTON (ADMIN ONLY) */}
          <button
            onClick={handleDispLeash}
            className={
              activeLeashBtn
                ? "btn bg-success opacity-70 text-white normal-case hover:bg-success hover:text-white hover:opacity-50 join-item"
                : "btn bg-white border-primary opacity-50 text-brown normal-case hover:bg-success hover:text-white join-item"
            }
          >
            Leash Required
          </button>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn btn-primary text-white join-item"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterBar;
