import React from "react";

import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from 'next/navigation'
import { fetchUser, fetchUsers, searchUsersAndCommunities } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/shared/SearchBar";
import CommunityCard from "@/components/cards/CommunityCard";

async function Page(): Promise<React.JSX.Element | null> {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    //Fetch users
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    });

    return (
        <section>
            <SearchBar placeHolder="Search Threads" />

            <div className="ml-24 mt-14 flex flex-col gap-9 w-[650px]">
                {result.users.length === 0 ? (
                    <p className="no-result">No users</p>
                ) : (
                    <div>
                        {result.users ?
                            (
                                <React.Fragment>
                                    {result.users.map((person) => (
                                        <UserCard key={person.id} id={person.id} name={person.name} username={person.username}
                                                  imgUrl={person.image} personType='User' />
                                    ))}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {/* Render component with query results */}
                                </React.Fragment>
                            )
                        }
                    </div>
                )}
            </div>
        </section>
    );
}

export default Page;