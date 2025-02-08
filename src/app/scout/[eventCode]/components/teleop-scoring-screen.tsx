        "use client";

<<<<<<< HEAD
import { useContext, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "../context";
import PageHeading from "~/components/common/page-heading";
import MatchScoutingLayout from "./common/match-scouting-layout";
import UndoActionButton from "./common/undo-action-button";
import ContinueButton from "./common/continue-button";
import ScoutActionButton from "./common/scout-action-button";
import { ACTION_NAMES, GAME_PIECES, LOCATIONS } from "../constants";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { toast } from "sonner";

const TeleopScoringScreen = () => {
  const context = useContext(ScoutDataContext);
  const screenContext = useContext(ScoutScreenContext);
  const [brownOutLabel, setBrownOutLabel] = useState("BROWNOUT")
  const [screenDisabled, setScreenDisabled] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-4">
          <PageHeading>Teleop</PageHeading>
          <UndoActionButton
            className="text-2xl font-bold w-36 h-16 dark:bg-red-600"
            onClick={() => {
              if (context.isDefending) {
                context.setIsDefending(false);
              }
            }}
          />
        </div>
      </div>
      <MatchScoutingLayout isDisabled={screenDisabled} />
      <div className="flex flex-row gap-3 justify-end w-full">
        <Button
          className={cn(
            "dark:bg-orange-400 w-44 h-20 dark:text-white font-bold text-xl",
            context.wasDefended && "dark:ring-yellow-400 ring-2 ring-offset-4"
          )}
          disabled={context.isDefending}
          onClick={() => {
            if (context.wasDefended) {
              context.setWasDefended(false);
            } else {
              context.setWasDefended(true);
            }
          }}
        >
          Was Defended
        </Button>

        <ScoutActionButton
          actionName={ACTION_NAMES.DEFENDING}
          gamePiece={GAME_PIECES.NOGAMEPIECE}
          location={LOCATIONS.OPPONENT_HALF}
          className="font-bold text-xl dark:bg-orange-400 w-44 h-20"
          label="Is Defending"
          onClick={() => {
            if (context.isDefending) {
              context.setIsDefending(false);
            } else {
              context.setIsDefending(true);
            }
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

        <div className="flex grow justify-end">
          <ContinueButton
            onClick={() => {
              context.setIsDefending(false);
              context.setWasDefended(false);
              screenContext.nextScreen();
            }}
          />
        </div>
      </div>
    </>
  );
};
=======
    

        const TeleopScoringScreen = () => {


          return (
            <>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-4">
                  <PageHeading>Teleop</PageHeading>
                  <UndoActionButton className="text-2xl font-bold w-36 h-16 dark:bg-red-600" />
                </div>
              </div>
              <MatchScoutingLayout isDisabled={screenDisabled} />
              <div className="flex flex-row justify-between">
>>>>>>> 59282ce (final commit before rebase hopefully - added brownout buttons, better button feedback for endgame screen, as well as reworking how recording climbs work w the start climb button)


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
                  onClick={() => {
                    screenContext.nextScreen();
                  }}

                />

                

                
              </div>
            </>
          );
        };

        export default TeleopScoringScreen;
