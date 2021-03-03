import store from '../store';
import { getCookie } from "./cookie";

export const formCVData = async (formData) => {
    let res = await store.getIntern(getCookie('user_id'));
    let user = res.data;
    let payload = {
        "intern": user?.id,
        "title": formData ? formData.title : "",
        "phone": user?.phone,
        "birthDate": user?.birthDate,
        "location": user?.location,
        "gradStatus": user?.gradStatus,
        "experiences": formData ? formData.items.find(e => e.title.toLowerCase() === 'experiences').items : [
        ],
        "universities": formData ? formData.items.find(e => e.title.toLowerCase() === 'universities').items : [
        ],
        "highSchools": formData ? formData.items.find(e => e.title.toLowerCase() === 'highschools').items : [
        ],
        "skills": formData ? formData.items.find(e => e.title.toLowerCase() === 'skills').items : [
        ],
        "languages": formData ? formData.items.find(e => e.title.toLowerCase() === 'languages').items : [
        ],
        "certificates": formData ? formData.items.find(e => e.title.toLowerCase() === 'certificates').items : [
        ],
        "hobbies": formData ? formData.items.find(e => e.title.toLowerCase() === 'hobbies').items : [
        ],
        "photo": user?.photo
    };

    if (formData) payload.id = formData.id;

    return payload;
};

export const formJobData = async (formData) => {
    let id = getCookie('user_id');
    let payload = {
        "Employer": id,
        "position": formData ? formData.position : "",
        "country": formData ? formData.country : [],
        "description": formData ? formData.description : "",
        "endDate": formData ? formData.endDate : "",
        "gpa": formData ? formData.gpa : "",
        "internLevel": formData ? formData.internLevel : [],
        "internQuota": formData ? formData.internQuota : "",
        "internshipLength": formData ? formData.internshipLength : "",
        "languages": formData ? formData.languages : [],
        "maxSalary": formData ? formData.maxSalary : "",
        "minSalary": formData ? formData.minSalary : "",
        "qualifications": formData ? formData.qualifications : "",
        "startDate": formData ? formData.startDate : ""
    };

    if (formData) {
        payload.id = formData.id;
    }

    return payload;
};

export const formTaskData = (formData) => {
    let id = getCookie('user_id');
    let payload = {
        "Employer": id,
        "Members": formData ? [formData.Members] : [],
        "title": formData ? formData.title : "",
        "label": formData ? formData.label : "",
        "description": formData ? formData.description : "",
        "deadline": formData ? formData.deadline : "",
    };

    if (formData) {
        payload.id = formData.id;
    }

    return payload;
};

export const onCVFormChange = (value, formData, sectionKey, itemKey, index) => {
    if (sectionKey === 'title')
        formData[sectionKey] = value;
    else if (formData[sectionKey]?.length > 0) {
        if (value) {
            if (itemKey === 'country' || itemKey === 'city')
                if (formData[sectionKey][index]['location'])
                    formData[sectionKey][index]['location'][itemKey] = value;
                else
                    formData[sectionKey][index]['location'] = { [itemKey]: value };
            else
                formData[sectionKey][index][itemKey] = value;
        } else {
            if (itemKey === 'country' || itemKey === 'city')
                delete formData[sectionKey][index]['location'][itemKey];
            else
                delete formData[sectionKey][index][itemKey];
        }
    } else {
        if (value) {
            if (itemKey === 'country' || itemKey === 'city') {
                formData[sectionKey] = [];
                formData[sectionKey].push({ ['location']: { [itemKey]: value } });
            } else {
                formData[sectionKey] = [];
                formData[sectionKey].push({ [itemKey]: value });
            }
        }
    }

    return formData;
};

export const onJobFormChange = (value, formData, sectionKey) => {
    if (sectionKey === 'education' || sectionKey === 'experiences') {
        formData['requirements'][sectionKey] = [value];
    } else {
        formData[sectionKey] = value;
    }

    return formData;
};

export const onTaskFormChange = (value, formData, key) => {
    if (key === 'Intern') {
        formData[key] = [value.key];
    } else {
        formData[key] = value;
    }
    return formData;
};

export const formatDate = (date) => {
    let months = [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec',
    ];

    let tempDate = new Date(date.toString());
    return `${tempDate.getUTCDate()} ${months[tempDate.getUTCMonth()]} ${tempDate.getFullYear()}`
};
