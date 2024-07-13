"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiUser3Line } from "react-icons/ri";
import { useAppStore } from "@/store/store-bis";
import { useEffect } from "react";

type UserLinkProps = {
  userId: string;
  image: string | null;
  username: string;
  isGuest: boolean;
};

const UserLink = ({ userId, image, username, isGuest }: UserLinkProps) => {
  const user = useAppStore((state) => state.user);

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Link
      href={
        user.targetedSquad
          ? `/squads/${user.targetedSquad.id}/players/${userId}`
          : "#"
      }
      prefetch={false}
    >
      <div className="flex items-center gap-2 [@media(width<=480px)]:flex-col">
        <Avatar size="default">
          {image ? <AvatarImage src={image} alt={username ?? ""} /> : null}
          <AvatarFallback>
            {isGuest ? (
              <RiUser3Line className="h-4 w-4" />
            ) : (
              username.slice(0, 2).toUpperCase()
            )}
          </AvatarFallback>
        </Avatar>
        <span className="text-center">{username}</span>
      </div>
    </Link>
  );
};

export default UserLink;
