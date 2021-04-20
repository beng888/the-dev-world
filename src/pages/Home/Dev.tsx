const Dev: React.FC<{ dev: any }> = ({ dev }) => {
  let currentDate = new Date(dev?.joined_at);
  const fd: string = currentDate.toDateString();

  return (
    <div className="relative overflow-hidden h-200vw md:h-auto group md:w-80vh">
      {dev && (
        <>
          <img
            src={dev.profile_image}
            alt={dev.github_username}
            className="object-cover w-full transform md:h-full md:group-hover:scale-125 duration-3000"
          />
          <div className="absolute inset-0 hidden duration-1000 bg-black bg-opacity-0 md:block md:group-hover:bg-opacity-50" />
          <div
            className="flex flex-col justify-between duration-500 bg-white cursor-pointer gap-10vw md:gap-0 h-fit px-6vw pt-6vw md:inset-0 md:mx-auto md:mt-auto md:w-9/12 md:absolute md:p-4vh md:h-4/6 md:hover:bg-transparent md:hover:text-white"
            onClick={() => window.open(dev.url)}
          >
            <div>
              <div className="flex md:gap-2vh gap-4vw mb-5vw md:mb-2vh md:text-2vh">
                <span>{fd}</span>
                <span>{dev.username}</span>
              </div>
              <div className="md:text-4vh md:leading-5vh text-5vw">
                {dev.name}: {dev.summary}
                <br /> <br /> {dev.tag_line}
              </div>
            </div>
            <div className="border-t border-gray-500 pt-4vw md:pt-1vh md:text-2vh leading-3vh">
              {dev.tech_stack}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dev;
