import { User } from "./types/types";


declare global {
    interface CustomJwtSessionClaims extends User {//for adding extra claims to the jwt later}
}