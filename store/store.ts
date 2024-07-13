// TODO : update this file to match with store-bis
// TODO : try to use this store (and adapt its users)

import { produce } from "immer"; // used to make state "mutable like"
import { StoreApi, UseBoundStore, create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { LoggedInUser } from "../queries/user";

export type StoreUser = LoggedInUser & {
  targetedSquadId: string;
};

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useAppStore = createSelectors(
  create(
    persist(
      combine(
        {
          user: null as null | StoreUser,
        },
        (set) => ({
          async login(user: LoggedInUser) {
            console.log("login in store");
            set(
              produce((state) => {
                state.user = {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  username: user.username,
                  email: user.email,
                  squads: user.squads,
                  targetedSquadId: user.squads[0].id,
                } satisfies StoreUser;
              })
            );
          },
          async logout() {
            set(
              produce((state) => {
                state.user = null;
              })
            );
          },
          updateUserNames(
            firstname: string | null,
            lastname: string | null,
            username: string | null
          ) {
            set(
              produce((state) => {
                state.user.firstname = firstname || state.user?.firstname || "";
                state.user.lastname = lastname || state.user?.lastname || "";
                state.user.username = username || state.user?.username || "";
              })
            );
          },
        })
      ),
      { name: "appStore", skipHydration: true }
    )
  )
);
