import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import News from "../components/News";

export default function Home() {
  return (
    <div className="px-[7vw] py-12">
      <News />
    </div>
  );
}
