

// ========================= start Step form js ====================== //

const circleBox = document.querySelectorAll(".circle-box");
circleBox.forEach(element => {
    element.addEventListener('click', function(event){
        changeStep(event.target.innerHTML);
    })
});

function changeStep(id){
    // console.log(id);
    const cbox = document.querySelectorAll(".circle-box");
    const form = document.querySelector(`#form-${id}`);
    if(id <= cbox.length && id > 0){
        // Tab change 
        cbox.forEach(element => {
            element.classList.remove("active-circle-box");
        });
        cbox[id-1].classList.add("active-circle-box")

        // form change
        const forms = document.querySelectorAll(".single-form");
        forms.forEach(element => {
            element.classList.remove("active-form");
        });
        form.classList.add("active-form");
    }

}

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener('click',function (){
    
        const activebox = document.querySelector(".active-circle-box");
        if(basic_validation() && activebox.innerHTML == 1){
            const id =Number(activebox.innerHTML) + 1;
            changeStep(id);
            console.log(id);
        }else if(education_validation() && activebox.innerHTML == 2 ){
            const id =Number(activebox.innerHTML) + 1;
            changeStep(id);
            console.log(id);
        } else if(activebox.innerHTML == 3 && work_experience_validation()){
            const id =Number(activebox.innerHTML) + 1;
            changeStep(id);
        }
})

const preBtn = document.getElementById("preBtn");
preBtn.addEventListener('click',function (){
    const activebox = document.querySelector(".active-circle-box");
    const id =Number(activebox.innerHTML) - 1;
    // console.log();
    changeStep(id);
})

// ====== end ========/

// ========================= Exp add & remove ===============//

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

// ========================= Reference add & remove ===============//

function AddRef() {
    let table = document.querySelector("#ref_table");
    let rows = document.querySelectorAll("#ref_table tr");
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                                <td>Name : <input type="hidden" name="hidden_ref[]" value =""></td></td>
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

// ========================= disable exp,ref,checkbox ===============//

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

// ====== end ========/
const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}
// ========================= validation start ====================//

function basic_validation(){
    const requiredFields = ['first_name', 'last_name', 'designation', 'address1', 'email', 'mobile_number', 'relationship_status', 'zip_code', 'dob', 'state', 'city'];
    const onlyLetters = ['first_name', 'last_name', 'designation'];
    const onlyNumber = ['mobile_number', 'zip_code'];
    const merge1 = merge(requiredFields, onlyLetters);
    const mergearr = merge(merge1, onlyNumber);

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

    for (const field of mergearr) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }
    return true;

}


function education_validation(){
    const requiredFields = ['ssc_board','ssc_year','ssc_percentage','hsc_board','hsc_year','hsc_percentage','course_name','university','bachelor_year','bachelor_percentage','master_course','master_university','master_year','master_percentage'];
    const onlyLetters = ['ssc_board','hsc_board','course_name','university','master_course','master_university'];
    const onlyNumber = ['ssc_year','ssc_percentage','hsc_year','hsc_percentage','bachelor_year','bachelor_percentage','master_year','master_percentage'];
    const merge1 = merge(requiredFields, onlyLetters);
    const mergearr = merge(merge1, onlyNumber);

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
        } else {
            errorSpan.textContent = '';
        }
    }

    for (const field of mergearr) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }
    return true;
}

function work_experience_validation(){
    let requiredFields = [];
    let onlyLetters = [];
    let onlyNumber = [];
    

    // add exp for requered store to requiredFields array
    let exp_names = document.querySelectorAll('[id^="company_name"]');
    // console.log(exp_names);
    for (let r = 0; r < exp_names.length; r++) {
        if (exp_names[r].value != "") {
            requiredFields.push(`designation${r + 1}`, `fromdate${r + 1}`, `todate${r + 1}`, `company_name${r + 1}`);
            onlyLetters.push(`designation${r + 1}`);
        }
    }

    let merge1 = merge(requiredFields, onlyLetters);
    let mergearr = merge(merge1, onlyNumber);
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
        } else {
            errorSpan.textContent = '';
        }
    }

    for (const field of mergearr) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }
    return true;
}

function referance_preferances_validation(){
    let requiredFields = ['preferd-location','notice_period','department','expacted_ctc','current_ctc'];
    let onlyLetters = [];
    let onlyNumber = [];
    
    let ref_names = document.querySelectorAll('[id^="ref_name_"]');
    for (let r = 0; r < ref_names.length; r++) {
        if (ref_names[r].value != "") {
            requiredFields.push(`ref_contact_${r + 1}`, `ref_relation_${r + 1}`);
            onlyNumber.push(`ref_contact_${r + 1}`); 
            onlyLetters.push(`ref_relation_${r + 1}`);
        }
    }

    let merge1 = merge(requiredFields, onlyLetters);
    let mergearr = merge(merge1, onlyNumber);
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
        } else {
            errorSpan.textContent = '';
        }
    }

    for (const field of mergearr) {
        const errorSpan = document.getElementById(`error_${field}`);
        if (errorSpan.textContent != '') {
            return false;
        }
    }
    return true;
}
// ====== end ========/


// ========================= state and city data fetch ===============//

 function fetch_data(type) {
    var url;
    const state = document.querySelector("#state");
    const city = document.querySelector("#city");

    if(type == 'state'){
        url = "/api/getstate";
    } else if(type == 'city'){
        const state_id = state.value;
        url = `/api/city?stateId=${state_id}`;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if(type == 'state'){
                html = '<option value="">Select State</option>';
            } else if(type == 'city'){
                city.innerHTML = '<option value="">select city</option>'
                html = '<option value="">select city</option>';
            }

            let data = JSON.parse(this.responseText);

            data.forEach(element => {
                // console.log(element);
                html += `<option value="${element.id}">${element.name}</option>`;
            });

            if(type == 'state'){
                state.innerHTML = html;
            } else if(type == 'city'){
                city.innerHTML = html;
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}
fetch_data("state");

function insert(form_id) {
    if(referance_preferances_validation()){
        let formData = new FormData(document.querySelector(`#${form_id}`));
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/api/insertBasicData");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       
        const Data = new URLSearchParams(formData);
        console.log(Data);
       
        xhr.onload = () => {
            if (xhr.status == 200) {
                const alert_box = document.getElementById("alert");
                alert_box.style.display = "block";
                alert_box.innerHTML = "Data Inserted Successfully";
                document.getElementById("insert-btn").style.display = 'none';
    
                // console.log(xhr.responseText);
                if(xhr.responseText[0].status == 201){
                    console.log(xhr.responseText);
                }
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(Data);
    }
    

}

function Fillinputs(obj,keys,arr){
    keys.forEach(element => {
        if (arr.includes(element)) {
         let inp = document.getElementById(`${element}`);
         inp.value = obj[element];
        }
     });
} 
function SelectInput(str){
    const option = document.querySelector(`${str}`);
    console.log(option);
    option.selected = true;
}

// before update showed data fetch
function fetch_all_data(id){
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let data = JSON.parse(this.responseText);

            // ================ basic_details fileds ================== //
            let basic_ids= ['first_name','last_name','designation','email','zip_code','mobile_number','dob','address1','address2']
            const keys = Object.keys(data.basic_details[0]);
            Fillinputs(data.basic_details[0],keys,basic_ids);

            document.getElementById("emp_id").value = data.basic_details[0].id;

            // select state
            console.log(data.basic_details[0].state);
            SelectInput(`#state option[value="${data.basic_details[0].state}"]`);

            fetch_data("city");

            SelectInput(`#relationship_status option[value="${data.basic_details[0].relationship_status}"]`)
            
            // checked gender
            document.getElementById(`${data.basic_details[0].gender}`).checked =  true;
            // ================ end ==================//


            // ================ education fileds ==================//
            // ssc
            document.getElementById("ssc_board").value = data.edu_details[0].university;
            document.getElementById("ssc_year").value = data.edu_details[0].passing_year;
            document.getElementById("ssc_percentage").value = data.edu_details[0].percentage;

            // hsc
            document.getElementById("hsc_board").value = data.edu_details[1].university;
            document.getElementById("hsc_year").value = data.edu_details[1].passing_year;
            document.getElementById("hsc_percentage").value = data.edu_details[1].percentage;

            // bachelor 
            document.getElementById("course_name").value = data.edu_details[2].course;
            document.getElementById("university").value = data.edu_details[2].university;
            document.getElementById("bachelor_year").value = data.edu_details[2].passing_year;
            document.getElementById("bachelor_percentage").value = data.edu_details[2].percentage;

            // master
            if(data.edu_details.length > 3){
                document.getElementById("master_course").value = data.edu_details[3].course;
                document.getElementById("master_university").value = data.edu_details[3].university;
                document.getElementById("master_year").value = data.edu_details[3].passing_year;
                document.getElementById("master_percentage").value = data.edu_details[3].percentage;
            }

            // ================ end ==================//

            // ================ Work Experience ==================//
            ExptableBody = document.querySelector("#exp_table tbody");
            ExptableBody.innerHTML = '';

            data.exp_details.forEach((element,i) => {
                let tr = document.createElement('tr');
                tr.innerHTML = ` 
                <td>Company Name : <input type="hidden" name="hiiden[]" value="${element.id}"> </td>
                <td><input type="text" name="company_name[]" id="company_name${i+1}" value="${element.company_name}" onchange="disableinputExp(${i+1})">
                    <br><span id="error_company_name1"></span>
                </td>
                <td>Designation :</td>
                <td><input type="text" name="designationc[]" id="designation${i+1}" value="${element.designation}">
                    <br><span id="error_designation${i+1}"></span>
                </td>
                <td>From :</td>
                <td><input type="date" name="fromdate[]" id="fromdate${i+1}" value="${element.fromdate}">
                    <br><span id="error_fromdate${i+1}"></span>
                </td>
                <td>To :</td>
                <td><input type="date" name="todate[]" id="todate${i+1}" value="${element.to_date}">
                    <br><span id="error_todate${i+1}"></span>
                </td>`;

                ExptableBody.appendChild(tr);
            });
            // ================ end ==================//


            // ================ Language Know ==================//
            let lang = ['hindi','english','gujarati'];
            lang.forEach(element => {
                if(data.lang_details.hasOwnProperty(element)){
                    document.getElementById(`${element}_read`).disabled = false;
                    document.getElementById(`${element}_write`).disabled = false;
                    document.getElementById(`${element}_speak`).disabled = false;
                }
            });

            if(data.lang_details.hasOwnProperty('hindi')){
                document.getElementById("hindi").checked = true;
                
                if(data.lang_details.hindi.includes('read')){
                    const read = document.getElementById("hindi_read");
                    read.checked = true;
                }

                if(data.lang_details.hindi.includes('write')){
                    const write = document.getElementById("hindi_write");
                    write.checked = true;
                }

                if(data.lang_details.hindi.includes('speak')){
                    const speak = document.getElementById("hindi_speak");
                    speak.checked = true;
                }
            }

            if(data.lang_details.hasOwnProperty('english')){
                document.getElementById("english").checked = true;
                
                if(data.lang_details.english.includes('read')){
                    const read = document.getElementById("english_read");
                    read.checked = true;
                }

                if(data.lang_details.english.includes('write')){
                    const write = document.getElementById("english_write");
                    write.checked = true;
                }

                if(data.lang_details.english.includes('speak')){
                    const speak = document.getElementById("english_speak");
                    speak.checked = true;
                }
            }

            if(data.lang_details.hasOwnProperty('gujarati')){
                document.getElementById("gujarati").checked = true;
                
                if(data.lang_details.gujarati.includes('read')){
                    const read = document.getElementById("gujarati_read");
                    read.checked = true;
                }

                if(data.lang_details.gujarati.includes('write')){
                    const write = document.getElementById("gujarati_write");
                    write.checked = true;
                }

                if(data.lang_details.gujarati.includes('speak')){
                    const speak = document.getElementById("gujarati_speak");
                    speak.checked = true;
                }
            }
            // ================ end ==================//


            // ================ Technologies Know ==================//

            let tech = ['php','mysql','laravel','oracle'];
            tech.forEach(element => {
                if(data.tech_details.hasOwnProperty(element)){
                    let inp = document.getElementById(element);
                    inp.checked = true;
                    
                    let radio = document.getElementById(`${element}_${data.tech_details[element]}`);
                    radio.checked = true;
                    radio.disabled = false;
                }
            });

            // ================ end ==================//

            // ================ Referance Contact ==================//
            ReftableBody = document.querySelector("#ref_table tbody");
            ReftableBody.innerHTML = '';

            data.refer_details.forEach((element,i) => {
                let tr = document.createElement('tr');
                tr.innerHTML = ` 
                <td>Name :  <input type="hidden" name="hidden_ref[]" value ="${element.id}"></td>
                <td><input type="text" name="referance_name[]" id="ref_name_${i+1}" onchange="disableinputRef(${i+1})" value="${element.name}">
                <br><span id="error_ref_name_${i+1}"></span></td>
                <td>Contact Number :</td>
                <td><input type="number" name="referance_contact_number[]" id="ref_contact_${i+1}" value="${element.contact_number}">
                <br><span id="error_ref_contact_${i+1}"></span></td>
                <td>Relation :</td>
                <td><input type="text" name="referance_relation[]" id="ref_relation_${i+1}" value="${element.relation}">
                <br><span id="error_ref_relation_${i+1}"></span></td>`

                ReftableBody.appendChild(tr);
            });
            // ================ end ==================//

            // ================ Preferances ==================//
            
            SelectInput(`#preferd-location option[value="${data.preferances_details[0].preferd_location}"]`);
            SelectInput(`#department option[value="${data.preferances_details[0].department}"]`);

            let preferances= ['notice_period','expacted_ctc','current_ctc']
            const pkeys = Object.keys(data.preferances_details[0]);
            Fillinputs(data.preferances_details[0],pkeys,preferances);
            // ================ end ==================//


            document.getElementById('insert-btn').style.display="none";
            const up_btn = document.getElementById('update-btn');
            up_btn.style.display = "block";
   
        }
    };

    xhttp.open("GET", `/api/fetch_single_data?id=${id}`, true);
    xhttp.send();
}

// if url has parameters than fetch the id data
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('id')){
    const id = urlParams.get('id')
    fetch_all_data(id);
}

// send data for update
function updateData(form_id){
    if(referance_preferances_validation()){
        let formData = new FormData(document.querySelector(`#${form_id}`));
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/api/updateAllData");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       
        const Data = new URLSearchParams(formData);
        console.log(Data);
       
        xhr.onload = () => {
            if (xhr.status == 200) {
                console.log("hello");
                const alert_box = document.getElementById("alert");
                alert_box.style.display = "block";
                alert_box.innerHTML = "Data Update Successfully";
    
                document.getElementById("update-btn").style.display = 'none';
            } else {
                console.log(`Error: ${xhr}`);
            }
        };
        xhr.send(Data);
    }
}