"use client";

import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import FieldImage from "./common/field-image";
import { useContext, useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import { cn } from "~/lib/utils";
import ScoutActionButton from "./common/scout-action-button";
import {
  GAME_PIECES,
  LOCATIONS,
  ACTION_NAMES,
} from "~/app/scout/[eventCode]/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import ContinueButton from "./common/continue-button";
import BackButton from "./common/back-button";
import UndoActionButton from "./common/undo-action-button";
import { getFlexDirection } from "../utils";
import { toast } from "sonner";
export default function EndgameScreen() {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const [hangPositionSelected, setHangPositionSelected] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<string>("");
  const [isMatchSelectionOpen, setIsMatchSelectionOpen] = useState(false);
  const [actionDone, setActionDone] = useState(false);
  const [positionSelected, setPositionSelected] = useState(false);
  useEffect(() => {
    setCurrentAction(context.previousEndgameAction.actionMessage);
    setHangPositionSelected(context.previousEndgameAction.positionSelected);
    setActionDone(context.previousEndgameAction.actionDone);
  }, [context.previousEndgameAction]);


  function checkActionButtonDisabled() {
    let disability = false;
    if (!positionSelected || actionDone) {
      disability = true;
    }

    return disability;
  }

  const [screenDisabled, setScreenDisabled] = useState(false);
  const [climbStarted, setClimbStarted] = useState(false);
  const [brownOutLabel, setBrownOutLabel] = useState("BROWNOUT")
  const [button1Style, setButton1Style] = useState("mb-1 h-16 w-40 font-bold text-xl bg-pink-600")
  const [button2Style, setButton2Style] = useState("mb-1 h-16 w-40 font-bold text-xl bg-pink-600")
  const [button3Style, setButton3Style] = useState("mb-1 h-16 w-40 font-bold text-xl bg-blue-500")
  const [button4Style, setButton4Style] = useState("mb-1 h-16 w-40 font-bold text-xl bg-blue-500")
  const [popoverButton1Style, setPopoverButton1Style] = useState("mb-1 h-16 w-40 font-bold text-xl !bg-pink-600 !text-white")
  const [popoverButton2Style, setPopoverButton2Style] = useState("mb-1 h-16 w-40 font-bold text-xl !bg-pink-600 !text-white")
  const [startClimbButtonStyle, setStartClimbButtonStyle] = useState("mb-1 h-16 w-40 font-bold text-xl !bg-green-700 !text-white")
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row justify-items-start gap-2">
          <div className="mt-4">
            <PageHeading>Endgame</PageHeading>
          </div>
          <UndoActionButton
            onClick={() => {
              if (hangPositionSelected !== "") {
                setHangPositionSelected("");
                setActionDone(false);
                setCurrentAction("");
                setPositionSelected(false);
              }
            }}
            className="text-xl bg-red-600 h-16 w-40"
          />
        </div>
        <p className="text-2xl font-bold mt-4 ml-[5rem]">{`Most Recent: ${currentAction} `}</p>
      </div>

      <FieldImage imageSize="100%" fieldSize="half">
        <div
          className={cn(
            "flex justify-between gap-20 h-full",
            getFlexDirection(context.uiOrientation, context.allianceColour).row
          )}
        >
          <div className="flex flex-col justify-evenly h-full mx-28">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.SHALLOW}
              location={hangPositionSelected}
              className={button1Style}
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Successfully Climbed Shallow");
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Successfully Climbed Shallow",
                });
                toast.error("Robot climbed shallow cage!");
                setCurrentAction("Successfully Climbed Shallow Cage");
                setClimbStarted(false)
                setButton1Style("mb-1 h-16 w-40 font-bold text-xl bg-white text-black")
                setTimeout(() => setButton1Style("mb-1 h-16 w-40 font-bold text-xl bg-pink-600"),500)
              }}

              disabled={checkActionButtonDisabled() || screenDisabled || climbStarted === false}
              label="Shallow Hang"
            />
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.SUCCESS}
              gamePiece={GAME_PIECES.CAGE.DEEP}
              location={hangPositionSelected}
              className={button2Style}
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Successfully Climbed Deep");
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Successfully Climbed Deep",
                });
           
                toast.error("Robot climbed deep cage!");
                setCurrentAction("Successfully Climbed Deep Cage");
                setClimbStarted(false)
                setButton2Style("mb-1 h-16 w-40 font-bold text-xl bg-white text-black")
                setTimeout(() => setButton2Style("mb-1 h-16 w-40 font-bold text-xl bg-pink-600"),500)
              }}
              disabled={checkActionButtonDisabled() || screenDisabled || climbStarted === false}
              label="Deep Hang"
            />

            <ScoutActionButton
              actionName={ACTION_NAMES.PARK}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className={button3Style}
              onClick={() => {
                setActionDone(true);
                setCurrentAction("Successfully Parked");
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Successfully Parked",
                });
              
                toast.error("Robot parked!");
                setCurrentAction("Successfully Parked");
                setButton3Style("mb-1 h-16 w-40 font-bold text-xl bg-white text-black")
                setTimeout(() => setButton3Style("mb-1 h-16 w-40 font-bold text-xl bg-blue-500"),500)
              }}
              disabled={checkActionButtonDisabled() || screenDisabled || climbStarted}
              label="Park"
            />

            <Popover
              open={isMatchSelectionOpen}
              onOpenChange={setIsMatchSelectionOpen}
              
            >
              <PopoverTrigger disabled={checkActionButtonDisabled() || screenDisabled || climbStarted === false}>
                <Button
                  className="mb-1 h-16 w-40 font-bold text-xl !text-white !bg-pink-600 hover:dark:bg-white"
                  disabled={checkActionButtonDisabled() || screenDisabled || climbStarted === false}
                >
                  {" "}
                  Failed Attempt
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[12rem]" side="right">
                <ScoutActionButton
                  actionName={ACTION_NAMES.CLIMB.FAIL}
                  gamePiece={GAME_PIECES.CAGE.SHALLOW}
                  location={hangPositionSelected}
                  className={popoverButton1Style}
                  onClick={() => {
                    setActionDone(true);
                    setCurrentAction("Shallow Climb Failed ");
                    setIsMatchSelectionOpen(false);
                    context.setPreviousEndgameAction({
                      actionDone: true,
                      positionSelected: hangPositionSelected,
                      actionMessage: "Shallow Climb Failed ",
                    });
                    toast.error("Robot failed shallow climb!");
                    setCurrentAction("Shallow Climb Failed ");
                    setTimeout(() => setIsMatchSelectionOpen(false),500)
                    setPopoverButton1Style("mb-1 h-16 w-40 font-bold text-xl !bg-white !text-black");
                    setTimeout(() => setPopoverButton1Style("mb-1 h-16 w-40 font-bold text-xl !bg-pink-600 !text-white"),1000);
                    setClimbStarted(false)                                
                  }}
                  disabled={checkActionButtonDisabled() || screenDisabled || climbStarted === false}
                  label="Shallow Hang"
                />

                <ScoutActionButton
                  actionName={ACTION_NAMES.CLIMB.FAIL}
                  gamePiece={GAME_PIECES.CAGE.DEEP}
                  location={hangPositionSelected}
                  className={popoverButton2Style}
                  onClick={() => {
                    setActionDone(true);
                    setCurrentAction("Deep Climb Failed");
                    setIsMatchSelectionOpen(false);
                    context.setPreviousEndgameAction({
                      actionDone: true,
                      positionSelected: hangPositionSelected,
                      actionMessage: "Deep Climb Failed",
                    });
                    toast.error("Robot failed deep climb!");
                    setCurrentAction("Deep Climb Failed");
                    setTimeout(() => setIsMatchSelectionOpen(false),500)
                    setPopoverButton2Style("mb-1 h-16 w-40 font-bold text-xl !bg-white !text-black");
                    setTimeout(() => setPopoverButton2Style("mb-1 h-16 w-40 font-bold text-xl !bg-pink-600 !text-white"),1000);
                    setClimbStarted(false)
                  }}
                  disabled={checkActionButtonDisabled() || screenDisabled || climbStarted === false}
                  label="Deep Hang"
                />
              </PopoverContent>
            </Popover>
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.NOTHING}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className={button4Style}
              disabled={checkActionButtonDisabled() || screenDisabled || climbStarted}
              onClick={() => {
                setActionDone(true);
                toast.error("Robot did not attempt endgame action!");
                setCurrentAction("Endgame action skipped");
                context.setPreviousEndgameAction({
                  actionDone: true,
                  positionSelected: hangPositionSelected,
                  actionMessage: "Endgame action skipped",
                });
                setButton4Style("mb-1 h-16 w-40 font-bold text-xl bg-white text-black")
                setTimeout(() => setButton4Style("mb-1 h-16 w-40 font-bold text-xl bg-blue-600"),500)
              }}
              label="Not Attempted"
            />
          </div>

          <div className="flex flex-col justify-center h-full">
            <ScoutActionButton
              actionName={ACTION_NAMES.CLIMB.START}
              gamePiece={GAME_PIECES.NOGAMEPIECE}
              location={hangPositionSelected}
              className={startClimbButtonStyle}
              disabled={checkActionButtonDisabled() || climbStarted === true || screenDisabled}
              onClick={() => {
                toast.error("Climb started!");
                setCurrentAction("Started Climb Attempt");
                setStartClimbButtonStyle("mb-1 h-16 w-40 font-bold text-xl bg-white text-black")
                setTimeout(() => setStartClimbButtonStyle("mb-1 h-16 w-40 font-bold text-xl bg-green-700"),500)
                setClimbStarted(true)
              }}
              label="Start Climb"
            />
          </div>




          <div
            className={cn(
              "flex flex-col my-[3rem] gap-2 mx-[5rem]",
              getFlexDirection(context.uiOrientation, context.allianceColour)
                .col
            )}
          >
            <Button
              className={cn(
                "h-12 w-40 font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.OUTER &&
                "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setPositionSelected(true);
                setHangPositionSelected(LOCATIONS.BARGE.OUTER);
              }}

              disabled={screenDisabled}
            >
              Far Cage
            </Button>
            <Button
              className={cn(
                " h-12 w-40  font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.MIDDLE &&
                "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setHangPositionSelected(LOCATIONS.BARGE.MIDDLE);
                setPositionSelected(true);
              }}
              disabled={screenDisabled}
            >
              Middle Cage
            </Button>
            <Button
              className={cn(
                " mb-1 h-12 w-40  font-bold text-xl opacity-90 !bg-cyan-100",
                hangPositionSelected === LOCATIONS.BARGE.INNER &&
                "dark:ring-2 ring-yellow-400  ring-offset-4"
              )}
              onClick={() => {
                setPositionSelected(true);
                setHangPositionSelected(LOCATIONS.BARGE.INNER);
              }}
              disabled={screenDisabled}
            >
              Near Cage
            </Button>
          </div>
        </div>
      </FieldImage>
      <div className="flex flex-row justify-between mt-14 ">
        <BackButton
          onClick={() => {
            screenContext.prevScreen();
          }}
        />

        <ScoutActionButton
          className="bg-red-500 flex items-center justify-center text-black font-bold text-xl h-20 w-64 px-4 py-2"
          actionName={ACTION_NAMES.BROWN_OUT}
          gamePiece="null"
          location="null"
          label={brownOutLabel}
          onClick={() => {
            if (screenDisabled == false){
              setScreenDisabled(true);
              toast.error("Robot has stopped. Screen disabled!");
              setBrownOutLabel("ROBOT RESTARTED")

            }
            else{
              setScreenDisabled(false)
              toast.error("Robot has restarted. Screen enabled!");
              setBrownOutLabel("BROWNOUT")
            } 
    
          }}

        />

        <ContinueButton
          // disabled={currentAction === "" || context.isTimerRunning}
          onClick={() => {
            screenContext.nextScreen();
          }}
        />
      </div>
    </>
  );
}
