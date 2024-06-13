import UserStats from "@/components/stats/user-stats";

const PlayerPage = ({ params }: { params: { playerId: string } }) => {
  return <UserStats userId={params.playerId} />;
};

export default PlayerPage;
