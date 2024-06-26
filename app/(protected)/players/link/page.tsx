import LinkGuestForm from "@/components/user/link-guest-form";
import { getGuestUsers } from "@/queries/user";

export const dynamic = "force-dynamic";

const LinkGuestPage = async () => {
  const guestUsers = await getGuestUsers();

  if (!guestUsers) {
    return (
      <div className="w-full text-center">
        Erreur lors de la récupération des données des invité·e·s ...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LinkGuestForm guestUsers={guestUsers} />
    </div>
  );
};

export default LinkGuestPage;
