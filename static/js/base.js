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