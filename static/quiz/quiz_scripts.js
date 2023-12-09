function morph(int, array) {
    return (array = array || ['раздел', 'раздела', 'разделов']) && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
}

function timeToMinutes(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    return Math.round(totalSeconds / 60);
}

function findParent(element) {
    while (element && element.tagName !== 'FORM') {
        element = element.parentNode;
    }

    return element;
}

function submitForm(event) {
    const form = findParent(event.target);
    const questionIndex = parseInt(form.querySelector('[name="question_index"]').value);
    const sectionName = form.querySelector(`[name="section_name"]`).value
    const timer = form.querySelector(`[name="timer"]`).value

    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            /*console.log(data.session_question_ids);
            console.log(data.session_question_ids.type);*/

            localStorage.setItem("section_name", sectionName)
            localStorage.setItem("session_id", data.quiz_session_id)
            localStorage.setItem("question_ids", JSON.stringify(data.session_question_ids))
            localStorage.setItem("question_index", (questionIndex).toString())
            localStorage.setItem("timer", timer)

            if (questionIndex < data.session_question_ids.length) {
                console.log(data);
                window.location.href = getQuestionUrl + `?question_id=` + data.session_question_ids[questionIndex];
            } else {
                // TODO: make PUT request and redirect to finish page
                window.location.href = finishSessionUrl + "?id=" + data.quiz_session_id;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
