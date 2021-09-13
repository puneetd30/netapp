const $$ = (ele) => document.querySelector(ele);
const $$$ = (ele) => document.querySelectorAll(ele);
window.onload = async () => {

    const res = await fetch('/metrics', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const resJson = await res.json();
    console.log(resJson);
    let appDiv = '';
    for (let key in resJson) {
        appDiv += `<div class=container ><h2>${key}</h2>\
            <svg width="400" height="50">`;
        let initialStep = 150, stepDiff = 15;
        const appData = resJson[key];
        for (let ind = 0; ind < resJson[key].length; ind++) {
            appDiv += `<rect height="34" width="10" x=${initialStep} y="0" 
                        data-title=${appData[ind].status == 'green' ? 'No Outage Detected' : 'Outage Detected'} 
                        data-date=${appData[ind].reportDate} fill=${appData[ind].status == 'green' ? '#28a745' :
                         '#acaa19'}>
                         <title>${appData[ind].status == 'green' ? 'No Outage Detected' : 'Outage Detected'} on ${appData[ind].reportDate}
                         </title>
                        </rect>`;
            initialStep += stepDiff;
        }
    }

    $$('#graph-section').insertAdjacentHTML('beforeend', appDiv);

}