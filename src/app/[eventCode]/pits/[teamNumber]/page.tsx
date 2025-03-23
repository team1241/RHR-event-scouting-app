"use client";

import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import PageHeading from "~/components/common/page-heading";

const PitScoutingTeamPage = ({
  params,
}: {
  params: { eventCode: string; teamNumber: string };
}) => {
  const { teamNumber, eventCode } = params;
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex flex-row gap-4 align-middle items-center">
        <Link href={`/${eventCode}/pits`}>
          <MoveLeftIcon />
        </Link>
        <PageHeading>
          {teamNumber} Pit Scouting ({eventCode})
        </PageHeading>
      </div>
    </div>
  );
};

export default PitScoutingTeamPage;
