import type { SweetAlertOptions } from 'sweetalert2';

export const createDeleteAlert = (
    title = 'Delete Element?',
    text = 'This action cannot be undone.'
): SweetAlertOptions => ({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
});

export default createDeleteAlert;