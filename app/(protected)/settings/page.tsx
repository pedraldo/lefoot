import UserSettingsForm from "@/components/user/user-settings-form";

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start">
      <h1 className="text-3xl font-bold mb-8">Mes informations</h1>
      <UserSettingsForm />
    </div>
  );
};

export default SettingsPage;
