import LinkGuestForm from "@/components/user/link-guest-form";
import { getGuestUsers } from "@/queries/user";

const LinkGuestPage = async () => {
  const guestUsers = await getGuestUsers();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LinkGuestForm guestUsers={guestUsers} />
    </div>
  );
};

export default LinkGuestPage;
