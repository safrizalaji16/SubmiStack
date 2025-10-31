import Swal from "sweetalert2"

export const alertSuccess = async (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message
    })
}

export const alertError = async (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    })
}

export const alertWarning = async (message) => {
    return Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message
    })
}

export const alertInfo = async (message) => {
    return Swal.fire({
        icon: 'info',
        title: 'Info',
        text: message
    })
}

export const confirm = async (message) => {
    return await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'Cancel'
    })
}