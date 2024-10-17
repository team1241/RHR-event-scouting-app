import { Input } from "~/components/ui/input";

export default function manavPage() {
  return (
    <div>
      {/* Match selection */}
      <div className="flex justify-center items-center h-full mb-6">
        <div className="bg-cyan-500 p-5">
          <p className="text-black text-2xl font-bold">MATCH SELECTION</p>
        </div>
      </div>

      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col items-center">
          <p className="text-white text-xl font-bold">MATCH NUMBER</p>
          <div className="h-16 w-64 flex items-center justify-center mt-2">
            <Input
              placeholder="Match Number here"
              className="h-full w-full p-3 text-center"
            ></Input>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-green-500 h-16 w-64 flex items-center justify-center text-black text-xl font-bold">
              CONFIRM
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-white text-xl font-bold mb-3">TEAM NUMBER</p>
          <div className="flex space-x-5">
            <div className="space-y-3">
              <Input
                placeholder="Team Number"
                className="h-16 w-32 bg-blue-600 p-3 text-center text-white"
              ></Input>
              <Input
                placeholder="Team Number"
                className="h-16 w-32 bg-blue-600 p-3 text-center text-white"
              ></Input>
              <Input
                placeholder="Team Number"
                className="h-16 w-32 bg-blue-600 p-3 text-center text-white"
              ></Input>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="Team Number"
                className="h-16 w-32 bg-red-600 p-3 text-center text-white"
              ></Input>
              <Input
                placeholder="Team Number"
                className="h-16 w-32 bg-red-600 p-3 text-center text-white"
              ></Input>
              <Input
                placeholder="Team Number"
                className="h-16 w-32 bg-red-600 p-3 text-center text-white"
              ></Input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
