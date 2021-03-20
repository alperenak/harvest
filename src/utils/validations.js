export default {
    checkValidation(value = "", validations, errorList) {
        let result = true;
        for (let key in validations) {
            if (key === "customValidations") {
                if (Array.isArray(validations["customValidations"])) {
                    for (let customValidations in validations["customValidations"]) {
                        if (typeof customValidations === "function")
                            result = result && customValidations(value);
                    }
                }
            } else {
                errorList.find(e => e.key === key).valid = this[key](value, validations[key]);
                result = result && this[key](value, validations[key]);
            }

        }
        return result;
    },
    shouldHaveString(value = "", { whatToHave = [], shouldHave = true, canEmpty = false }) {
        if (!value.length && canEmpty) return true;
        for (let key of whatToHave) {
            if (value.toLowerCase().indexOf(key.toLowerCase()) > -1)
                return shouldHave;
        }
        return !shouldHave;
    },
    isNumeric(value = "", { shouldHave = true, canEmpty = false }) {
        if (!value.toString().length && canEmpty) return true;
        return (!isNaN(parseFloat(value)) && isFinite(value)) && shouldHave;
    },
    checkRegex(value = "", { whatToHave = "!#%&+,-.@", shouldHave = true, canEmpty = false }) {
        if (!value.length && canEmpty) return true;
        let regex = new RegExp(whatToHave);
        return regex.test(value) && shouldHave;
    },
    hasContent(value = "") {
        // console.log(value);
        return (value + "").length > 0;
    },
    shouldHaveLowerCase(value = "", { shouldHave = true }) {
        return value === value.toLowerCase() && value !== value.toUpperCase() && shouldHave;
    },
    shouldHaveNumber(value = "", { shouldHave = true }) {
        return !(/\d/.test(value) ^ shouldHave);
    },
    shouldHaveNumberWithCount(value = "", { count = 24, shouldHave = true }) {
        return !(/\d/.test(value) ^ shouldHave);
    },
    shouldHaveUpperCase(value = "", { shouldHave = true }) {
        return value !== value.toLowerCase() && value === value.toUpperCase() && shouldHave;
    },
    lengthValidator(value, { start = 0, stop = value?.toString().length, canEmpty = false }) {
        if (!value?.toString().length && canEmpty) { return true; }
        return start <= value?.toString().length && value.toString().length <= stop;
    },
    sWith(value, { endsWith = false, whatToHave = "", shouldHave = true, canEmpty = false }) {
        value = value.toLowerCase();
        if (!value.length && canEmpty) return true;
        if (typeof whatToHave != "string") {
            for (let val of whatToHave) {
                if (!((endsWith ? value.endsWith(val) : value.startsWith(val)) == shouldHave)) {
                    return false
                }
            }
            return true
        }
        return (endsWith ? value.endsWith(whatToHave) : value.startsWith(whatToHave)) == shouldHave;
    },
}
