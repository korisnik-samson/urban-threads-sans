"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {community, magnifyingGlass, search, searchGray, user} from "@/public/assets";

const SearchButton = ({ declarations }: { declarations: string }) => {
    return (
        <button type="submit" className={`-ml-3 z-10 ${declarations}`}>
            <Image src={magnifyingGlass} alt="search" width={40} height={40} className="object-contain" />
        </button>
    );
}

const SearchBar = ({ setName, setUserName, placeHolder }: any) => {
    const [searchName, setSearchName] = useState('');
    const [searchUserName, setSearchUserName] = useState('');

    const router = useRouter();

    const handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (searchName === '' && searchUserName === '')
            return alert('Please provide a search term')

        setName(searchName);
        setUserName(searchUserName)
    }

    return (
        /*TODO: Try not to limit to what you can search, search for ANYTHING*/

        <form className="searchbar" onSubmit={handleSearch}>
            <SearchButton declarations="sm:hidden" />

            <div className="w-full p-3">
                <input type="text" name="user" value={searchName} onChange={(e): void => {
                    setSearchName(e.target.value)
                }} placeholder={placeHolder} className="w-full searchbar_input" />

                <SearchButton declarations="sm:hidden" />
            </div>

            <div className="flex gap-2 -ml-3 mr-6 z-10">
                <Image src={user} alt="user_icon" width={20} height={20} className="object-contain" />
                <Image src={community} alt="user_icon" width={20} height={20} className="object-contain" />
            </div>

            <SearchButton declarations="max-sm:hidden" />
        </form>
    );
}

export default SearchBar;