export default function startingPositionPage() {
  return (
    <div>
      {/* Starting Position */}
      <div className="flex justify-center items-center h-full mb-6">
        <div className="bg-cyan-500 p-10">
          <p className="text-black text-4xl font-bold">STARTING POSITION</p>
        </div>
      </div>

      <div className="flex justify-between items-start p-4">
        <div className="flex flex-col items-start space-y-4"></div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-end space-y-4 mb-6">
            <p className="text-white text-xl font-bold">MATCH NUMBER :</p>
            <p className="text-white text-xl font-bold">TEAM SCOUTING :</p>
            <p className="text-white text-xl font-bold">SCOUTER NAME :</p>
          </div>

          <div className="flex flex-col space-y-4">
            <button className="bg-green-500 h-16 w-64 flex items-center justify-center text-black text-xl font-bold">
              FLIP
            </button>
            <button className="bg-green-500 h-16 w-64 flex items-center justify-center text-black text-xl font-bold">
              LATE
            </button>
            <button className="bg-green-500 h-16 w-64 flex items-center justify-center text-black text-xl font-bold">
              NO SHOW
            </button>
            <button className="bg-green-500 h-16 w-64 flex items-center justify-center text-black text-xl font-bold">
              START
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
