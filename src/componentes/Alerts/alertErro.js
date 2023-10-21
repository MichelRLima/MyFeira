import { toast } from 'react-toastify';

export function alertErro(message) {

    toast.error(message, { autoClose: 5000 });

}