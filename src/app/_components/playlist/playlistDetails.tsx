"use client";

import { useState } from "react";

interface PlayListDetailsProps {
  detailsId: string;
}

export default function PlayListDetails({ detailsId }: PlayListDetailsProps) {
  const [data, setData] = useState("");

  const response = fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${detailsId}&format=json`
  );

  response
    .then((res) => res.json())
    .then((data) => {
      setData(data.title);
    });

  return <span className="text-zinc-400 break-all">{data}</span>;
}
