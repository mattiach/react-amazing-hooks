import { Dispatch, SetStateAction } from "react";
import { StorageType } from "../interfaces/const";
declare const useStorage: <T>(key: string, storageType?: StorageType, expirationDays?: number) => [T | undefined, Dispatch<SetStateAction<T | undefined>>];
export default useStorage;
