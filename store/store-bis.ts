import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoggedInUser } from "../queries/user";

export type StoreUser = Omit<LoggedInUser, "guestSquads"> & {
  targetedSquad: {
    id: string;
    name: string;
  } | null;
};

export type State = {
  user: StoreUser | null;
};

export type Actions = {
  login: (user: LoggedInUser) => void;
  logout: () => void;
  updateUserNames: (
    firstname: string,
    lastname: string,
    username: string
  ) => void;
  updateTargetedSquad: (squad: { id: string; name: string }) => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      login: (user: LoggedInUser) => {
        set(() => ({
          user: user
            ? {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                image: user.image,
                targetedSquad: user.targetedSquad
                  ? {
                      id: user.targetedSquad.id,
                      name: user.targetedSquad.name,
                      isGuest: user.guestSquads
                        .map((s) => s.id)
                        .includes(user.targetedSquad.id),
                    }
                  : null,
              }
            : null,
        }));
      },
      logout: () =>
        set(() => ({
          user: null,
        })),
      updateUserNames(firstname, lastname, username) {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                firstname: firstname || state.user?.firstname || "",
                lastname: lastname || state.user?.lastname || "",
                username: username || state.user?.username || "",
              }
            : null,
        }));
      },
      updateTargetedSquad(squad) {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                targetedSquad: squad,
              }
            : null,
        }));
      },
    }),
    { name: "appStore", skipHydration: true }
  )
);
