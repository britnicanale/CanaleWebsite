var body;
var timelineDiv; // Container holding the timeline and the information.
var timeCol; // Container holding the timeline
var main;
var inner;
var colors;

const PIXELS_PER_YEAR = 400;
const TIMELINE_WIDTH = 50;
const YEAR_LENGTH = 800;
const MONTHS = ['January', 
                'February', 
                'March', 
                'April', 
                'May', 
                'June', 
                'July', 
                'August', 
                'September', 
                'October', 
                'November', 
                'December'];

function initColors() {
    fetch('/static/data/company-colors.json')
        .then((response) => response.json())
        .then((json) => {
            colors = json
        });
}

/* Functions to show different types of experience */

function showAllExperience(){
    elements = document.getElementsByClassName('all');
    for (element of elements){
        element.style.display = 'block';
    }
}

function showProgrammingExperience(){
    elements = document.getElementsByClassName('all');
    for (element of elements) {
        if (element.classList.contains('programming')) {
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    }
}

function showGeneralExperience(){
    elements = document.getElementsByClassName('all');
    for (element of elements){
        if (element.classList.contains('general')) {
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    }
}

function putExperiencesInOrder(experiences) {
    let date = new Date();
    let numTimelines = 0;
    while (experiences.length > 0) {
        let stackedExperienceCol = document.createElement('div');
        stackedExperienceCol.classList.add('col-auto');
        stackedExperienceCol.style['padding'] = 2;
        // Add timeline divs based on current date.
        let latestMonth = date.getMonth();
        let latestYear = date.getFullYear();
        // Job get the job that ends the latest that is earlier then the date given.
        let latestJobBefore = latestDateEarlierThan(experiences, latestMonth, latestYear)
        // Check that latestJobBefore is not NaN
        while (latestJobBefore === latestJobBefore) {
            let expDiv = document.createElement('div');
            // Difference between end of current job and reference date.
            let endDiff = (latestYear - latestJobBefore.endYear) + 
                (latestMonth - latestJobBefore.endMonth) / 12;
            expDiv.style.marginTop = endDiff * PIXELS_PER_YEAR + 2;
            // Duration of current job.
            let duration = (latestJobBefore.endYear - latestJobBefore.startYear) + 
                (latestJobBefore.endMonth - latestJobBefore.startMonth) / 12;
            expDiv.style.height = duration * PIXELS_PER_YEAR - 2;
            expDiv.style.backgroundColor = latestJobBefore.company ? colors[latestJobBefore.company] : colors[latestJobBefore.school];
            expDiv.style.background = latestJobBefore.company ? colors[latestJobBefore.company] : colors[latestJobBefore.school];
            expDiv.style.borderRadius = '' + TIMELINE_WIDTH / 2 + 'px';
            expDiv.style.width = TIMELINE_WIDTH;
            // Update reference date to the start of the current job.
            latestMonth = latestJobBefore.startMonth;
            latestYear = latestJobBefore.startYear;
            // Remove current job from list of experiences.
            experiences = experiences.filter(exp => exp != latestJobBefore);
            // Update latestJobBefore with reference to new date.
            latestJobBefore = latestDateEarlierThan(experiences, latestMonth, latestYear);
            stackedExperienceCol.appendChild(expDiv);
        }
        timeCol.appendChild(stackedExperienceCol);
    }
}

function isDateEarlier(month1, year1, month2, year2) {
    return year2 > year1 || 
        (year2 == year1 && month2 >= month1)
}

function earliestDateLaterThan(experiences, cutoffMonth, cutoffYear) {
    let earliestDateExp = NaN;
    experiences.forEach((experience) => {
        if (isDateEarlier(cutoffMonth, cutoffYear, experience.startMonth, experience.startYear) &&
            isDateEarlier(experience.startMonth, experience.startYear, earliestDateExp.startMonth, earliestDateExp.startYear)) {
            earliestDateExp = experience;
        }    
    });
}

function latestDateEarlierThan(experiences, cutoffMonth, cutoffYear) {
    let latestDateExp = NaN;
    let latestDateExpEndMonth = 8
    let latestDateExpEndYear = 2019
    experiences.forEach((experience) => {
        if (isDateEarlier(experience.endMonth, experience.endYear, cutoffMonth, cutoffYear) &&
            isDateEarlier(latestDateExpEndMonth, latestDateExpEndYear, experience.endMonth, experience.endYear)) {
            latestDateExp = experience;
            latestDateExpEndMonth = experience.endMonth;
            latestDateExpEndYear = experience.endYear;
        }    
    });
    return latestDateExp;
}


function createExperienceTime(exp) {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear()
    let edDiv = document.createElement('div');
    edDiv.style.backgroundColor = 'black';
    edDiv.style.width = '25px'
    let duration = (exp.endYear - exp.startYear) + 
        (exp.endMonth - exp.startMonth) / 12;
    edDiv.style.height = duration * 400;
    let endDiff = (year - exp.endYear) + 
        (month - exp.endMonth) / 12;
    edDiv.style['margin-top'] = endDiff * 400
    edDiv.style['margin-right'] = '5px'
    edDiv.classList.add('col')
    timeCol.appendChild(edDiv);
}

function createTimeline() {
    timeCol.classList.add('row');
    fetch('/static/data/experience.json')
        .then((response) => response.json())
        .then((json) => {
            work = json.work;
            education = json.education;

            let earliestStartingJob = education.reduce(earliestJobStart);
            let date = new Date();
            let month = date.getMonth();
            let year = date.getFullYear();

            let careerDuration = (year - earliestStartingJob.startYear) + 
                (month - earliestStartingJob.startMonth) / 12;

            timeCol.style.height = careerDuration * 400

            putExperiencesInOrder(education)
            putExperiencesInOrder(work);
        });
}

function compareDates(experience1, experience2) {
    let yearDiff = experience2.endYear - experience1.endYear;
    if (yearDiff == 0) {
        return experience2.endMonth - experience1.endMonth;
    }
    return yearDiff;
}

function laterJobEnd(experience1, experience2) {
    let yearDiff = experience2.endYear - experience1.endYear;
    if (yearDiff == 0) {
        let monthDiff = experience2.endMonth - experience1.endMonth;
        if (monthDiff == 0) return laterJobStart(experience1, experience2);
        return monthDiff > 0 ? experience2 : experience1;
    }
    return yearDiff > 0 ? experience2 : experience1;
}

function laterJobStart(experience1, experience2) {
    let yearDiff = experience2.startYear - experience1.startYear;
    if (yearDiff == 0) {
        let monthDiff = experience2.startMonth - experience1.startMonth;
        return monthDiff > 0 ? experience2 : experience1;
    }
    return yearDiff > 0 ? experience2 : experience1;
}

function earliestJobEnd(experience1, experience2) {
    let yearDiff = experience2.startYear - experience1.startYear;
    if (yearDiff == 0) {
        let monthDiff = experience2.endMonth - experience1.endMonth;
        if (monthDiff == 0) return earilestJobStart(experience1, experience2);
        return monthDiff > 0 ? experience1 : experience2;
    }
    return yearDiff > 0 ? experience1 : experience2;
}

function earliestJobStart(experience1, experience2) {
    let yearDiff = experience2.startYear - experience1.startYear;
    if (yearDiff == 0) {
        let monthDiff = experience2.startMonth - experience1.startMonth;
        return monthDiff > 0 ? experience1 : experience2;
    }
    return yearDiff > 0 ? experience1 : experience2;
}

function addExperiences() {
    fetch('/static/data/experience.json')
        .then((response) => response.json())
        .then((json) => {
            work = json.work;
            work = work.sort(compareDates)
            work.forEach((experience) => {
                let experienceCard = document.createElement('div');
                experienceCard.classList.add('card');
                experienceCard.classList.add('all');
                experienceCard.classList.add('experience-card');
                experienceCard.classList.add(experience.type)

                let row = document.createElement('div');
                row.classList.add('row');
                row.classList.add('g-0');
                experienceCard.appendChild(row);

                let experienceCol = document.createElement('div');
                experienceCol.classList.add('col-sm-6');
                experienceCol.classList.add('experience-col');
                row.appendChild(experienceCol)

                let title = document.createElement('h5');
                title.classList.add('fst-bold');
                title.classList.add('experience-text');
                title.innerHTML = experience.position + ', ';
                experienceCol.appendChild(title);

                let company = document.createElement('span');
                company.classList.add('company');
                company.innerHTML = experience.company;
                title.appendChild(company);

                let dates = document.createElement('h6');
                dates.classList.add('fst-italic');
                dates.classList.add('experience-text');
                dates.innerHTML = MONTHS[experience.startMonth - 1] + ' ' + 
                    experience.startYear + ' - ' +
                    MONTHS[experience.endMonth - 1] + ' ' + 
                    experience.endYear;
                experienceCol.appendChild(dates);

                let location = document.createElement('h6');
                location.classList.add('experience-text');
                location.innerHTML = experience.location;
                experienceCol.appendChild(location);

                let aboutCol = document.createElement('div');
                aboutCol.classList.add('about');
                aboutCol.classList.add('col');
                aboutCol.classList.add('mx-auto');
                row.appendChild(aboutCol);

                let aboutText = document.createElement('div');
                aboutText.classList.add('about-text');
                aboutCol.appendChild(aboutText);
                let ul = document.createElement('ul');
                aboutText.appendChild(ul);

                experience.bulletPoints.forEach((bullet => {
                    let li = document.createElement('li');
                    li.innerHTML = bullet;
                    ul.append(li);
                }))

                inner.appendChild(experienceCard);
            })
        });
    
}

function initExperience() {
    body = document.body;
    main = document.getElementById('main');
    inner = document.getElementById('inner');

    timelineDiv = document.getElementById('timeline');
    timelineDiv.classList.add('row')
    timelineDiv.classList.add('mx-auto')

    let descriptionCol = document.createElement('div');
    descriptionCol.classList.add('col')

    timeCol = document.createElement('div');
    timeCol.classList.add('col-auto');

    timelineDiv.appendChild(timeCol)
    timelineDiv.appendChild(descriptionCol)

    initColors();

    addExperiences();
    createTimeline();
}

initExperience()