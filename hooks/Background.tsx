"use client"

import React from "react";
import { smallBackground, background_three } from "@/public/assets";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const Background = () => {
    const { width, height } = useWindowDimensions();

    return (
        <React.Fragment>
            {width && width < 640 ? (<Image src={smallBackground} alt="background" fill className="sm:object-center" />) : (
                <Image src={background_three} alt="background" fill className="sm:object-center" />
            )}
        </React.Fragment>
    );
}

export default Background