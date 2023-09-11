"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { community, magnifyingGlass, user } from "@/public/assets";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import {searchUsersAndCommunities} from "@/lib/actions/user.actions";

const SearchButton = ({ declarations }: { declarations: string }) => {
    return (
        <button type="submit" className={`-ml-3 z-10 ${declarations}`}>
            <Image src={magnifyingGlass} alt="search" width={40} height={40} className="object-contain" />
        </button>
    );
}

const SearchBar = ({ setSearch, placeHolder }: any) => {
    const pageNumber: number = 1;
    const pageSize: number = 20;

    const [searchString, setSearchString] = useState('');

    const router: AppRouterInstance = useRouter();

    async function search(searchString: string): Promise<void> {
        try {
            const { users, communities, isNext } = await searchUsersAndCommunities({
                searchString, pageNumber, pageSize
            });

            console.log("Users: ", users)
            console.log("Communities: ", communities)
            console.log("Next Page?: ", isNext)

        } catch (error: any) {
            console.log("Error fetching search results", error.message);
            throw error;
        }
    }

    const handleSearch = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (searchString === '')
            return alert('Please provide a search term')

        await search(searchString);
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <SearchButton declarations="sm:hidden" />

            <div className="w-full p-3">
                <input type="text" name="user" value={searchString} onChange={(e): void => {
                    setSearchString(e.target.value)
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