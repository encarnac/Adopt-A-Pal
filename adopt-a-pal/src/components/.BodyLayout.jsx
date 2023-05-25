// TO DO: Create modular layout to be used for both Browse and Dashboard screens
function BodyLayout({ title, content }) {
  // TO DO: GET DATA FROM API
  const savedAnimals = [
    {
      added: "2023-05-08 17:30:22.420313+00:00",
      avatars: [
        "https://storage.googleapis.com/adopt-a-pal-pics/Buttterscotch2673-721",
        "https://storage.googleapis.com/adopt-a-pal-pics/Buttterscotch2673-4382",
        "https://storage.googleapis.com/adopt-a-pal-pics/Buttterscotch2673-3876",
      ],
      availability: "Available",
      species: "Cat",
      breed: "Medium Hair",
      dispositions: [
        "Good with other animals",
        "Good with children",
        "Animal must be leashed at all times",
      ],
      name: "Buttterscotch",
      id: 5143677177430016,
    },
    {
      added: "2023-04-29 17:30:35.750316+00:00",
      avatars: [
        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-5528",
        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-2300",
        "https://storage.googleapis.com/adopt-a-pal-pics/Clair8747-8854",
      ],
      availability: "Available",
      species: "Dog",
      breed: "Cattle Dog",
      dispositions: [
        "Good with other animals",
        "Good with children",
        "Animal must be leashed at all times",
      ],
      name: "Clair",
      id: 5168126949851136,
    },
  ];

  return (
    <>
      <div className="w-[1280px] flex flex-col mt-36 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown">
          { title} 
        </div>

        {/* PAGE CONTENT */}
        {content}
      </div>
    </>
  );
}

export default BodyLayout;
