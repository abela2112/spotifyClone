const DetailsHeader = ({ artistId, artistdata, songData }) => {
  return (
    <div className="relative flex flex-col w-full">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center ">
        <img src={`http://localhost:5000/${songData?.img}`} alt="art" className="w-28 h-28 sm:h-48 sm:w-48 object-cover border-2 shadow-xl shadow-black rounded-full" />

        <div className="ml-5">
          <p className="text-xl sm:text-3xl font-bold text-white">artist name</p>

        </div>
      </div>
    </div>
  )
}

export default DetailsHeader;
