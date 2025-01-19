"use client"

import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import BackButton from "./common/back-button";
import ContinueButton from "./common/continue-button";
import { useState } from "react";

export default function BallScoutSetup() {
    const [redHumanPlayerSelected, setRedHumanPlayerSelected] = useState(false);
    const [blueHumanPlayerSelected, setBlueHumanPlayerSelected] = useState(false);
    return (
        <><div className="flex flex-row"> 
            <PageHeading>Team Human Player</PageHeading>
        </div>
        <div className="flex flex-row justify-between my-4">
            <div className="flex flex-col gap-y-3">
                <h1 className="text-2xl font-semibold">Red Alliance</h1>
                <Button 
                    variant ={"redTeam"} 
                    id ="redOne"
                    className="h-20 w-72 dark:hover:border-2 border-yellow-400 border-solid"
                    onClick={() => setRedHumanPlayerSelected(true)}
                    >Red 1</Button>
                <Button 
                    variant ={"redTeam"} 
                    id = "redTwo" 
                    className="h-20 dark:hover:border-2 border-yellow-400 border-solid"
                    onClick={() => setRedHumanPlayerSelected(true)}
                    >Red 2</Button>
                <Button 
                    variant ={"redTeam"} 
                    id = "redThree" 
                    className="h-20 dark:hover:border-2 border-yellow-400 border-solid"
                    onClick={() => setRedHumanPlayerSelected(true)}
                    >Red 3</Button>
            </div>
            <div className="flex flex-col gap-y-3">
                <h1 className="text-2xl font-semibold">Blue Alliance</h1>
                <Button 
                    variant ={"blueTeam"} 
                    id = "blueOne"
                    className="h-20 w-72 dark:hover:border-2 border-yellow-400 border-solid"
                    onClick={() => setBlueHumanPlayerSelected(true)}
                    > Blue 1</Button>
                <Button 
                    variant ={"blueTeam"} 
                    id = "blueTwo" 
                    className="h-20 dark:hover:border-2 border-yellow-400 border-solid"
                    onClick={() => setBlueHumanPlayerSelected(true)}
                    > Blue 2</Button>
                <Button 
                    variant ={"blueTeam"} 
                    id = "blueThree" 
                    className="h-20 dark:hover:border-2 border-yellow-400 border-solid"
                    onClick={() => setBlueHumanPlayerSelected(true)}
                    > Blue 3</Button>
            </div>
        </div>

        <div className="flex flex-row justify-between my-20">
            <BackButton />
            <ContinueButton disabled={redHumanPlayerSelected === false || blueHumanPlayerSelected === false} />
        </div></>
    ); 
}