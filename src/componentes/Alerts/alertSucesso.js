import { toast } from 'react-toastify';

export function alertSucesso(message) {

    toast.success(message, { autoClose: 5000 });

}