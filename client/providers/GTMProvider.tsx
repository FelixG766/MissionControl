"use client"
import React, { useEffect } from "react";
import { useUserContext } from "@/context/user/userContext";
import TagManager from "react-gtm-module";

function GTMProvider() {

    useEffect(() => {
        const tagManagerArgs = {
            gtmId: "GTM-PCFH5BDT"
        };

        TagManager.initialize(tagManagerArgs);
    }, [])

    return null;
}

export default GTMProvider;