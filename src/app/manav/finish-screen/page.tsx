import { Input } from "~/components/ui/input";

export default function finishPage() {
  return (
    <div>
      <div className="flex justify-center items-center h-full mb-6">
        <div className="bg-cyan-500 p-5">
          <p className="text-black text-2xl font-bold">FINALIZE</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6">
        {/* Autonomous Section */}
        <div className=" p-4 rounded">
          <p className="text-white text-xl font-bold">AUTONOMOUS</p>
          <div className="mt-4 space-y-3">
            <Input
              placeholder="Intake #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Failed Intake #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Speaker Scored #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Failed Scored #"
              className="h-10 w-full p-2 text-center"
            />
            <p className="text-white mt-2">Start Position:</p>
          </div>
        </div>

        {/* Tele-Op Section */}
        <div className=" p-4">
          <p className="text-white text-xl font-bold">TELE-OP</p>
          <div className="mt-4 space-y-3">
            <Input
              placeholder="Intake #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Failed Intake #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Speaker Scored #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Failed Scored #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Amp Scored #"
              className="h-10 w-full p-2 text-center"
            />
          </div>
        </div>

        {/* End Game Section */}
        <div className="p-4 ">
          <p className="text-white text-xl font-bold">END GAME</p>
          <div className="mt-4 space-y-3">
            <Input
              placeholder="Intake #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Failed Intake #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Speaker Scored #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Failed Scored #"
              className="h-10 w-full p-2 text-center"
            />
            <Input
              placeholder="Climb?"
              className="h-10 w-full p-2 text-center"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <div className=" p-6 w-full">
          <p className="text-white text-xl font-bold mb-4">COMMENTS</p>
          <textarea
            className="h-40 w-full p-4 rounded text-white bg-black"
            placeholder="Enter comments here"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 px-8">
        <div className="flex flex-col space-y-2 items-center">
          <p className="text-white text-lg">Notify Admin?</p>
          <div className="flex space-x-4">
            <button className="h-12 w-12 bg-red-500  text-white">NO</button>
            <button className="h-12 w-12 bg-green-500  text-white">YES</button>
          </div>
        </div>
        <button className="h-12 w-32 bg-green-500 text-black font-bold ">
          FINISH
        </button>
      </div>
    </div>
  );
}
