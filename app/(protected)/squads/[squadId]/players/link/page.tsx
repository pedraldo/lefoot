import LinkGuestForm from "@/components/user/link-guest-form";
import { getSquadUsersAndGuestUsers } from "@/queries/squad";

export const dynamic = "force-dynamic";

const LinkGuestPage = async ({ params }: { params: { squadId: string } }) => {
  const squadId = params.squadId;
  const squadUsersAndGuests = await getSquadUsersAndGuestUsers(squadId);

  if (!squadUsersAndGuests?.id) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>Erreur lors de la récupération des données des invité·e·s.</p>
        <p>{`L'équipe est probablement inconnue.`}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LinkGuestForm
        squadId={squadId}
        users={squadUsersAndGuests.users}
        guestUsers={squadUsersAndGuests.guestUsers}
      />
    </div>
  );
};

export default LinkGuestPage;
