const $$ = (ele) => document.querySelector(ele);
const $$$ = (ele) => document.querySelectorAll(ele);


window.onload = () => {

    $$('#add-header-btn').addEventListener('click', () => {
        addHeader();
    });

    $$$('input').forEach(e => e.addEventListener('input', (evt) => {
        e.setCustomValidity('');
        e.checkValidity();
        console.log(e.checkValidity());

    }));


    $$$('input').forEach(e => e.addEventListener('invalid', (evt) => {
        if (!evt.target.value) {
            e.setCustomValidity("Please fill the field");
        }
    }));


    $$('#register-btn').addEventListener('click', async () => {

        const appName = $$('#app-id').value;
        const freq = $$('#freq').value;
        const appUrl = $$('#app-url').value;

        if (!appName) {
            $$('#app-id').reportValidity();
            return;
        }

        if (!appUrl) {
            $$('#app-url').reportValidity();
            return;
        } else {
            // var res = appUrl.match(/(http(s)?:\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            var res = appUrl.match(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/g);
            if (res == null) {
                $$('#app-url').reportValidity();
                return;
            }

        }

        if (!freq) {
            $$('#freq').reportValidity();
            return;
        } else {
            if (freq > 300) {
                $$('#freq').reportValidity();
                return;
            }
        }


        const headers = $$('.headers');
        const keys = headers.querySelectorAll('.header-key');
        const values = headers.querySelectorAll('.header-value');

        const headerJson = {};
        for (let ind = 0; ind < keys.length; ind++) {
            if (keys[ind] && values[ind]) {
                headerJson[keys[ind].value]=values[ind].value;
            }
        }

        await fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appId: appName, freq: freq, appUrl: appUrl, headers: headerJson })
        }).then((err) => {
            console.log(err);
            $$('#success-alert').hidden = false;
        }).catch((err) => {
            console.log(err);
            $$('#warning-alert').hidden = false;
        });

    });

    $$$(".closebtn").forEach(e => e.addEventListener('click', () => {
        let div = e.parentElement;
        div.hidden = true;
    }));


}


const addHeader = () => {

    return $$('.headers').insertAdjacentHTML('beforeend',
        '<div class="header-row"> \
    <span ><input type="text" class="header-key" placeholder="key"></span> \
    <span class="value"><input type="text" class="header-value" placeholder="value"></span> \
    </div>');

}

