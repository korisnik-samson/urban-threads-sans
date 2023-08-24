import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {currentUser} from "@clerk/nextjs";
import {fetchUser, fetchUsers} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import {fetchCommunities} from "@/lib/actions/community.actions";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    members: {
        image: string;
    }[];
    isCommunity: boolean;
}

async function Suggested({ id, name, username, imgUrl, bio, members, isCommunity }: Props) {
    let id_string: string

    if (!isCommunity) id_string = '/user/'
    else id_string = '/community/'

    return (
        <article className="">
            <div className='flex flex-wrap items-center gap-3'>
                <Link href={`${id}${id_string}`} className='relative h-12 w-12'>
                    <Image src={imgUrl} alt='community_logo' fill className='rounded-full object-cover' />
                </Link>

                <div>
                    <Link href={`${id}${id_string}`}>
                        <h4 className='text-base-semibold text-light-1'>{name}</h4>
                    </Link>
                    <p className='text-small-medium text-gray-1'>@{username}</p>
                </div>

                {members != null && members.length > 0 && (
                    <div className='flex items-center'>
                        {members.map((member, index) => (
                            <Image key={index} src={member.image} alt={`user_${index}`} width={28} height={28}
                                className={`${index !== 0 && "-ml-2"} rounded-full object-cover`}
                            />
                        ))}
                        {members.length > 3 && (
                            <p className='ml-1 text-subtle-medium text-gray-1'>
                                {members.length}+ Users
                            </p>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}


async function RightSideBar() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    //Fetch communities
    const communityResult = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    })

    const usersResult = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
        sortBy: 1
    })

    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>

                <div className="pt-10 pl-5 justify-center">
                    {communityResult.communities.map((community) => (
                        <Suggested id={community.id} name={community.name} username={community.username}
                                   imgUrl={community.image} bio={community.bio} members={community.members} isCommunity={true}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-10 mb-5">
                    <Link href={`/communities/`}>
                        <Button size='sm' className='community-card_btn'>
                            View All
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>

                <div className="pt-10 pl-5 justify-center">
                    {usersResult.users.map((user) => (
                        <Suggested id={user.id} name={user.name} username={user.username}
                                   imgUrl={user.image} bio={user.bio} members={user.members} isCommunity={false}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-10 mb-5">
                    <Link href={`/communities/`}>
                        <Button size='sm' className='community-card_btn'>
                            View All
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default RightSideBar;