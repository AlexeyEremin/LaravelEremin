import { lazy } from "react";


export const LazyHome = lazy(()=> import('./Home'))
export const LazyForm = lazy(()=> import("./Form"))
export const LazyUserData = lazy(()=> import("./UserData/UserData"))

