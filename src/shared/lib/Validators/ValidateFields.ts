import moment from "moment";

const dateFormat = "MM-DD-YYYY";
const timeFormat = "h:mm A";


export const validateDate = (value: any) => {
    let errors;

    if (!value) {
        errors = "Required!";
    } else if (
        moment(value).format(dateFormat) < moment(Date.now()).format(dateFormat)
    ) {
        errors = "Invalid date!";
    }

    return errors;
};

export const validateEmail = (value: any) => {
    let errors;

    if (!value) {
        errors = "Required!";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errors = "Invalid email address!";
    }

    return errors;
};

export const isRequired = (value: any) => (!value ? "Required!" : "");
