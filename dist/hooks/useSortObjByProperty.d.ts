import { OrderType } from '../interfaces/const';
interface ObjectType {
    [key: string]: any;
}
declare const useSortObjByProperty: (arr: ObjectType[], property: string, order?: OrderType) => ObjectType[];
export default useSortObjByProperty;
