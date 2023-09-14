"use client"

import React, { useState } from "react";
import Image from "next/image";
import { fetchUsers, searchUsersAndCommunities } from "@/lib/actions/user.actions";
import { community, magnifyingGlass, user } from "@/public/assets";
import UserCard from "@/components/cards/UserCard";

const SearchButton = ({ declarations, onClick }: any) => {
    return (
        <button type="submit" className={`-ml-3 z-10 ${declarations}`} onClick={onClick}>
            <Image src={magnifyingGlass} alt="search" width={40} height={40} className="object-contain" />
        </button>
    );
}

const SearchBar = ({ placeHolder, onSearch }: any) => {
    const [searchString, setSearchString] = useState('');

    const searchQuery = async(searchString: string): Promise<any> => {
        try {
            const results = await searchUsersAndCommunities({
                userId: user.id,
                searchString: searchString,
                pageNumber: 1,
                pageSize: 25
            });

            console.log(results)

            return results

        } catch (error: any) {
            console.log(`Error fetching search results: ${error.message}`);
            throw error;
        }
    }

    const handleSearch = async (ev: React.FormEvent<HTMLFormElement>): Promise<any> => {
        ev.preventDefault();

        if (searchString === '')
            await searchQuery('')

        await searchQuery(searchString)
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <SearchButton declarations="sm:hidden" />

            <div className="w-full p-3">
                <input type="text" name="user" value={searchString} onChange={(e): void => {
                    setSearchString(e.target.value)
                }} placeholder={placeHolder} className="w-full searchbar_input_light" />

                <SearchButton declarations="sm:hidden" />
            </div>
            <div className="flex gap-2 -ml-3 mr-6 z-10">
                <Image src={user} alt="user_icon" width={20} height={20} className="object-contain" />
                <Image src={community} alt="user_icon" width={20} height={20} className="object-contain" />
            </div>

            <SearchButton declarations="max-sm:hidden" onClick={onSearch}/>
        </form>
    );
}

export default SearchBar;