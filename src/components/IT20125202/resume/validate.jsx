import swal from 'sweetalert';

/**
 * @param {object} obj
 * @returns {boolean}
 * @description validate the resume
 */

const validate = (obj) => {
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(obj.email)) {
        swal("Please enter a valid email address", "", "info");
        return false;
    }
    else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(obj.mobile)) {
        swal("Please enter a valid mobile number", "", "info");
        return false;
    }
    return true;
}

export default validate;