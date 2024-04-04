
const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}

function AddExp() {
    let table = document.querySelector("#exp_table");
    let rows = document.querySelectorAll("#exp_table tr");
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                        <td>Company Name :</td>
                        <td><input type="text" name="company_name[]" id="company_name${rows.length + 1}" onchange="disableinputExp(${rows.length + 1})">
                            <br><span id="error_company_name${rows.length + 1}"></span>
                        </td>
                        <td>Designation :</td>
                        <td><input type="text" name="designationc[]" id="designation${rows.length + 1}">
                            <br><span id="error_designation${rows.length + 1}"></span>
                        </td>
                        <td>From :</td>
                        <td><input type="date" name="fromdate[]" id="fromdate${rows.length + 1}">
                            <br><span id="error_fromdate${rows.length + 1}"></span>
                        </td>
                        <td>To :</td>
                        <td><input type="date" name="todate[]" id="todate${rows.length + 1}">
                            <br><span id="error_todate${rows.length + 1}"></span>
                        </td>
                    </tr>`
    table.appendChild(tr);
    disableinputExp(rows.length + 1)
}

function RemoveExp() {
    let rows = document.querySelectorAll("#exp_table tr");

    if (rows.length > 1) {
        rows[rows.length - 1].remove();
    }
}

function AddRef() {
    let table = document.querySelector("#ref_table");
    let rows = document.querySelectorAll("#ref_table tr");
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                                <td>Name :</td>
                                <td><input type="text" name="referance_name[]" id="ref_name_${rows.length + 1}" onchange="disableinputRef(${rows.length + 1})">
                                    <br><span id="error_ref_name_${rows.length + 1}"></span></td>
                                <td>Contact Number :</td>
                                <td><input type="number" name="referance_contact_number[]" id="ref_contact_${rows.length + 1}">
                                    <br><span id="error_ref_contact_${rows.length + 1}"></span></td>
                                <td>Relation :</td>
                                <td><input type="text" name="referance_relation[]" id="ref_relation_${rows.length + 1}">
                                    <br><span id="error_ref_relation_${rows.length + 1}"></span></td>
                            </tr>`
    table.appendChild(tr);
    disableinputRef(rows.length + 1)
}

function RemoveRef() {
    let rows = document.querySelectorAll("#ref_table tr");

    if (rows.length > 1) {
        rows[rows.length - 1].remove();
    }
}

function validateForm() {
    const requiredFields = ['first_name', 'last_name', 'designation', 'address1', 'email', 'mobile_number', 'relationship_status', 'zip_code', 'dob', 'state', 'city', 'ssc_board', 'ssc_year', 'ssc_percentage', 'hsc_board', 'hsc_year', 'hsc_percentage', 'course_name', 'university', 'bachelor_year', 'bachelor_percentage' ,'preferd-location', 'department', 'expacted_ctc', 'current_ctc'];
    const onlyLetters = ['first_name', 'last_name', 'designation', 'ssc_board', 'hsc_board', 'course_name', 'university'];
    const onlyNumber = ['mobile_number', 'zip_code', 'ssc_year', 'ssc_percentage', 'hsc_year', 'hsc_percentage', 'bachelor_year', 'bachelor_percentage', 'expacted_ctc', 'current_ctc'];

    // add exp for requered store to requiredFields array
    let exp_names = document.querySelectorAll('[id^="company_name"]');
    for (let r = 0; r < exp_names.length; r++) {
        if (exp_names[r].value != "") {
            requiredFields.push(`designation${r + 1}`, `fromdate${r + 1}`, `todate${r + 1}`, `company_name${r + 1}`);
        }
    }

    // add referrence for requered store to requiredFields array
    let ref_names = document.querySelectorAll('[id^="ref_name_"]');
    for (let r = 0; r < ref_names.length; r++) {
        if (ref_names[r].value != "") {
            requiredFields.push(`ref_contact_${r + 1}`, `ref_relation_${r + 1}`);
        }
    }

    // merge all arrays to common mergearr(unique values) 
    const merge1 = merge(requiredFields, onlyLetters);
    const mergearr = merge(merge1, onlyNumber);

    // requiredFields and other global validation
    for (const field of mergearr) {
        const tag = document.getElementById(field);
        const value = tag.value.trim();
        const errorSpan = document.getElementById(`error_${field}`);

        if (requiredFields.includes(field) && value == '') {
            errorSpan.textContent = `Please fill in the ${field.replace('_', ' ')}`;
        } else if (onlyLetters.includes(field) && !(value.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/))) {
            errorSpan.textContent = 'Please Enter only letters';                            // check only alphabets
        } else if (onlyNumber.includes(field) && !(value.match(/^[0-9]+$/))) {
            errorSpan.textContent = 'Please Enter only number';                            // check only number
        } else if (field == "mobile_number" && value.length != 10) {                        // check mobile number validation
            errorSpan.textContent = 'Mobile Number must be 10 digit';
        } else if (field == "zip_code" && value.length != 6) {                              // check zip code validation
            errorSpan.textContent = 'Zip code must be 6 digit';
        } else {
            errorSpan.textContent = '';
        }
    }

    // gender radio validation 
    const gender = document.getElementsByClassName("gender");
    const error_gender = document.getElementById("error_gender");
    if (!gender[0].checked && !gender[1].checked) {
        error_gender.textContent = `Please select gender`;
    }
    else {
        error_gender.textContent = ``;
    }

    // if any span error tag has value then return flase
    for (const field of mergearr) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }

    return true;
}

function disableinputExp(i) {
    let arr = [`designation${i}`, `fromdate${i}`, `todate${i}`];
    let value = document.getElementById(`company_name${i}`).value;

    if (value.trim() == "") {
        arr.forEach(element => {
            document.getElementById(element).disabled = true;
            document.getElementById(element).value = null;
            document.getElementById(`error_${element}`).textContent = "";
        });
    } else {
        arr.forEach(element => {
            document.getElementById(element).disabled = false;
        });
    }

}

function disableinputRef(i) {
    let arr = [`ref_contact_${i}`, `ref_relation_${i}`];
    let value = document.getElementById(`ref_name_${i}`).value;

    if (value.trim() == "") {
        arr.forEach(element => {
            document.getElementById(element).disabled = true;
            document.getElementById(element).value = null;
            document.getElementById(`error_${element}`).textContent = "";
        });
    } else {
        arr.forEach(element => {
            document.getElementById(element).disabled = false;
        });
    }
}

function disableCheckbox(e) {
    const inputtag = e.target;
    const id = inputtag.id;
    const checkboxs = document.querySelectorAll(`[id^="${id}_"]`)

    if (!inputtag.checked) {
        checkboxs.forEach(element => {
            element.disabled = true;
            element.checked = false;
        });

    } else {
        checkboxs.forEach(element => {
            element.disabled = false;
        });
    }
}
disableinputExp(1); // when page load the exp first row disable
disableinputExp(2); // when page load the exp second row disable
disableinputRef(1); // when page load the Ref first row disable
disableinputRef(2); // when page load the Ref second row disable
