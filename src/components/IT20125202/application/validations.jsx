import swal from 'sweetalert';

/**
 * @param {object} obj
 * @returns {boolean}
 * @description validate the application form
 */

const validateApplication = (obj) => {

    if (obj.vacancyNo === '' || obj.companyId === '' || obj.campanyName === '' || obj.applicantId === '' || obj.jobTitle === '') {
        swal("Error!", "Something wend wrong.. Please try again", "error");
        return false;
    }
    else if (obj.applicantFirstName === '' || obj.applicantLastName === '' || obj.applicantEmail === '' || obj.applicantPhone === '' || obj.coverLetter === '') {
        swal("Please fill all the required fields", "", "info");
        return false;
    }
    else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(obj.applicantEmail)) {
        swal("Please enter a valid email address", "", "info");
        return false;
    }
    else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(obj.applicantPhone)) {
        swal("Please enter a valid mobile number", "", "info");
        return false;
    }

    return true;
}

export default validateApplication;