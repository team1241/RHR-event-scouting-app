import { Input } from "~/components/ui/input";

export default function manavPage() {
  return (
    <div>
      {/* match selection */}
      {/* match selection again*/}
      <div className="flex flex-row justify-center items-center h-full">
        <div className=" bg-cyan-500 box-border h-25 w-25 p-5 size-1/3 flex flex-row justify-center">
          <p className="text-black text-2xl text font-bold">MATCH SELECTION</p>
        </div>
      </div>

      <div>
        <p>MATCH NUMBER</p>
        <Input
          placeholder="Match Number here"
          className="box-border h-25 w-25 p-7 size-1/6 flex flex-row justify-center "
        ></Input>
      </div>
    </div>
  );
}
