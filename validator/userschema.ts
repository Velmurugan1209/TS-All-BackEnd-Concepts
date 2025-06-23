import { z} from 'zod' ;


export const UserSchema = z.object({
    name : z.string().nonempty(),
    age :  z.number(), 
    tech : z.string().nonempty() ,
    empid : z.number().nonnegative(),
});




