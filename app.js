
let day_equivalent = {
    A: "Sunday",
    B: "Monday",
    C: "Tuesday",
    D: "Wednesday",
    E: "Thursday",
    F: "Friday",
    G: "Saturday"
}



let subjects = [];
let detailed_subject_sched = [];


function getData() {
    let subject_color = document.getElementById("colorpicker").value;
    let subject_name = document.getElementById("subject").value;
    let local_schedule = getArrayOfSched();

    inputSubject({
        subjectName: subject_name,
        schedule: local_schedule,
        color: subject_color
    });

    detailed_subject_sched.push(listDownSched({
        subjectName: subject_name,
        schedule: local_schedule,
        color: subject_color
    }));

    updateDeleteDropDown(listDownSched({
        subjectName: subject_name,
        schedule: local_schedule,
        color: subject_color
    }))

    
}

function getArrayOfSched() {
    let local_schedule = [];
    let starting_time_num = document.getElementById("starting-time").value;
    let ending_time_num = document.getElementById("ending-time").value;
    let day = [];

    let sched_alpha = document.getElementsByName("subject-day");
    for (let i = 0; i < sched_alpha.length; i++){
        if (sched_alpha[i].checked == true) {
            day.push(sched_alpha[i].value);
        }
    }

    for (let j = 0; j < day.length; j++) {
        local_schedule.push([]);
        for (let k = 0; k < (+ending_time_num + 1) - +starting_time_num; k++) {
            local_schedule[j].push(day[j] + (+starting_time_num + k));
        }
    }

    return local_schedule;
}

function generateSched() {
    for (let i = 0; i < subjects.length; i++) {
        subName(subjects[i]);
        color(subjects[i]);
        border(subjects[i]);
    }
}

function updatedSched(subjects) {
    for (let i = 0; i < subjects.length; i++) {
        subName(subjects[i]);
        color(subjects[i]);
        border(subjects[i]);
    }
}


function subName(subject) {
    for (let i = 0; i < subject.schedule.length; i++) {
        document.getElementById(subject.schedule[i][Math.round(subject.schedule[i].length/2) - 1]).innerHTML = `<b>${subject.subjectName}</b>`;
    }
}


function color(subject) {
    for (let i = 0; i < subject.schedule.length; i++) {
        for (let j = 0; j < subject.schedule[i].length; j++) {
            document.getElementById(subject.schedule[i][j]).style.backgroundColor = subject.color;
        }
    } 
}

function border(subject) {
    for (let i = 0; i < subject.schedule.length; i++) {
        for (let j = 0; j < subject.schedule[i].length - 1; j++) {
            document.getElementById(subject.schedule[i][j]).style.borderBottom = `1px solid ${subject.color}`;
        }
    }
}

function inputSubject(subject) {
    subjects.push(subject);
}


function equalsCheck(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function listDownSched(subject) {
     let detailed_sched = "";
    for (let i = 0; i < subject.schedule.length; i++) {
        detailed_sched += day_equivalent[subject.schedule[i][0][0]] + " ";
    }
    detailed_sched += ": ";

    for (let j = 0; j < subject.schedule[0].length; j++) {
        let starting = document.getElementById("starting-time");
        let ending = document.getElementById("ending-time");

        if (j == 0) {
            detailed_sched += starting.options[+subject.schedule[0][j].match(/\d+/g).join("") - 1].text;
            detailed_sched += " - ";
        }

        if (j == subject.schedule[0].length - 1) {
            detailed_sched += ending.options[+subject.schedule[0][j].match(/\d+/g).join("") - 1].text;
            detailed_sched += " : " + subject.subjectName;
        }
    }

    return detailed_sched;
}


function updateDeleteDropDown (detailed_subject_sched_local) {
    let opt = document.createElement("option");
    opt.innerText = detailed_subject_sched_local;
    document.getElementById("spec-del").appendChild(opt);
}


function deleteAll() {
    document.location.reload();
}

function deleteThisSub() {
    subToDel = document.getElementById("spec-del");
    deleteSpecSched(subToDel);
    
    for (let i = 0; i < detailed_subject_sched.length; i++) {
        if (detailed_subject_sched[i] === subToDel.value) {
            detailed_subject_sched.splice(i, 1);
        }
    }
    
    subToDel.innerHTML = "";
    
    for (let j = 0; j < detailed_subject_sched.length; j++) {
        updateDeleteDropDown(detailed_subject_sched[j]);
    }

}

function deleteSpecSched(subToDel) {
    for (let i = 0; i < subjects.length; i++) {
        if (new RegExp(subjects[i].subjectName).test(subToDel.value) === true) {
            let counter = 0;
            for (let j = 0; j < subjects[i].schedule[0].length; j++) {
                let starting = document.getElementById("starting-time");
                let ending = document.getElementById("ending-time");
        
        
                if (j == 0) {
                    let starting_time = starting.options[+subjects[i].schedule[0][j].match(/\d+/g).join("") - 1].text;
                    if (new RegExp(starting_time).test(subToDel.value) === true) {
                        counter+=1;
                    }
                }
        
                if (j == subjects[i].schedule[0].length - 1) {
                    let ending_time = ending.options[+subjects[i].schedule[0][j].match(/\d+/g).join("") - 1].text;
                    if (new RegExp(ending_time).test(subToDel.value) === true) {
                        counter+=1;
                    }
                }
            }

            if (counter == 2) {
                let days = "";
                for (let k = 0; k < subjects[i].schedule.length; k++) {
                    days += day_equivalent[subjects[i].schedule[k][0][0]] + " ";
                }

                if (new RegExp(days).test(subToDel.value) === true) {
                    clearScheduleTable();
                    subjects.splice(i, 1);
                    generateSched();
                    
                }
            }
        }
    }
}

function clearScheduleTable() {
    // Code to clear the subjects' names and colors on the schedule table
    // For example, if your schedule table is represented by a grid with IDs like "cell-1", "cell-2", etc.:
    for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < subjects[i].schedule.length; j++) {
            for (let k = 0; k < subjects[i].schedule[j].length; k++) {
                const cellId = subjects[i].schedule[j][k];
                document.getElementById(cellId).innerHTML = '';
                document.getElementById(cellId).style.backgroundColor = '';
                document.getElementById(cellId).style.borderBottom = '';
            }
        }
    }
}

