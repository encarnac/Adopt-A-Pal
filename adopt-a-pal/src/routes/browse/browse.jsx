import { React, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import FilterBar from "../../components/filterbar";
import CarouselCard from "../../components/CarouselCard";
import UseUserPals from "../../modules/UseUserPals";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import slide_image_1 from "../../assets/dog-cat.png";
// import slide_image_2 from "../../assets/features.png";
// import slide_image_3 from "../../assets/header-image.jpeg";
// import slide_image_4 from "../../assets/pet-owner.png";
// import slide_image_5 from "../../assets/pet-shelter.png";

function Browse(props) {
  // Get list of user's pals to be used as filter
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded.id;
  const userUrl = `/api/users/${userID}`;
  const userData = UseUserPals(userUrl);
  const userPals = userData.pals?.map((strID) => parseInt(strID));

  //  const filteredAnimals = [
  //    {
  //      added: "2023-05-08 17:30:22.420313+00:00",
  //      avatars: [
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Buttterscotch2673-721",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Buttterscotch2673-4382",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Buttterscotch2673-3876",
  //      ],
  //      availability: "Available",
  //      species: "Cat",
  //      breed: "Medium Hair",
  //      dispositions: [
  //        "Good with other animals",
  //        "Good with children",
  //        "Animal must be leashed at all times",
  //      ],
  //      name: "Buttterscotch",
  //      id: 5143677177430016,
  //    },
  //    {
  //      added: "2023-04-29 17:30:35.750316+00:00",
  //      avatars: [
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-5528",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-2300",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-8854",
  //      ],
  //      availability: "Available",
  //      species: "Dog",
  //      breed: "Cattle Dog",
  //      dispositions: [
  //        "Good with other animals",
  //        "Animal must be leashed at all times",
  //      ],
  //      name: "Clair",
  //      id: 5168126949851136,
  //    },
  //    {
  //      added: "2023-04-29 17:30:35.750316+00:00",
  //      avatars: [
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-5528",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-2300",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-8854",
  //      ],
  //      availability: "Available",
  //      species: "Dog",
  //      breed: "Cattle Dog",
  //      dispositions: [
  //        "Good with other animals",
  //        "Animal must be leashed at all times",
  //      ],
  //      name: "Clair",
  //      id: 5168126949851136,
  //    },
  //    {
  //      added: "2023-04-29 17:30:35.750316+00:00",
  //      avatars: [
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-5528",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-2300",
  //        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-8854",
  //      ],
  //      availability: "Available",
  //      species: "Dog",
  //      breed: "Cattle Dog",
  //      dispositions: [
  //        "Good with other animals",
  //        "Animal must be leashed at all times",
  //      ],
  //      name: "Clair",
  //      id: 5168126949851136,
  //    },
  //  ];

  const [animals, setAnimals] = useState(null); // Contains raw animal data returned
  const [filteredAnimals, setFilteredAnimals] = useState(null); // Contains animal data filtered by userPals

  // API call to handle query params
  const [animalUrl, setAnimalUrl] = useState("/api/animals");
  const handleAnimalUrl = (e) => {
    setAnimalUrl(e);
  };

  // Handles API GET fetch request to get raw animal data from db
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
  }, [animalUrl]);

  // Removes animals returned from db if already in userPals
  useEffect(() => {
    const filterData = () => {
      if (userData && userPals && userPals.length > 0) {
        const filteredAnimalData = animals.filter(
          (animal) => !userPals.includes(animal.id)
        );
        setFilteredAnimals(filteredAnimalData);
      } else {
        setFilteredAnimals(animals);
      }
      setLoading(false);
    };
    filterData();
    console.log("FILTERED ANIMALS = ", filteredAnimals);
  }, [animals]);

  return (
    <>
      <NavBar currentPage={"browse"} />
      <div className="w-[70vw] flex flex-col mt-28 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown">
          Browse Pets
        </div>

        {/* FILTER AND SEARCH BAR*/}
        <FilterBar handleAnimalUrl={handleAnimalUrl} admin={false} />

        <div className="mb-2 p-2 text-start text-sm text-taupe">
          Returned {filteredAnimals?.length} results
        </div>

        {/* PAGE CONTENT */}
        {/* <div className="carousel carousel-center w-[65vw] mx-auto mt-12 mb-28 space-x-8 rounded-box"> */}
        {/* <div> */}
          {/* Creates CarouselCard for each item in list of animal instances */}
          {/* {filteredAnimals?.map((animal, i) => (
            <div className="carousel-item">
              <CarouselCard animal={animal} userID={userID} />
            </div>
          ))} */}
          {loading ? (
            <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
          ) : (
            <Swiper
              className="swiper_container h-full w-full mb-28"
              grabCursor={true}
              centeredSlides={true}
              effect={"coverflow"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 3,
              }}
              modules={[Navigation, EffectCoverflow, A11y]}
              spaceBetween={1}
              slidesPerView={1.4}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              initialSlide={1}
            >
              {filteredAnimals?.map((animal, i) => (
                <SwiperSlide>
                  <CarouselCard animal={animal} userID={userID} />
                </SwiperSlide>
              ))}

              {/* BUTTON SLIDER CONTROLLERS*/}
              <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow shadow-sm hover:shadow-lg">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow shadow-sm hover:shadow-lg">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
              </div>
            </Swiper>
          )}
        </div>
      {/* </div> */}

      <Footer />
    </>
  );
}

export default Browse;
