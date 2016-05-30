var inputs = document.querySelectorAll('input'),
    i,

    data = {tuentiUanConfig: {}},

    saveConfig = function(data) {
        chrome.storage.sync.set(data, function() {
            var _status = document.getElementById('status');

            _status.textContent = 'Options saved.';

            setTimeout(function() {
                _status.textContent = '';
            }, 2000);
        });
    },

    restoreConfig = function(input) {
        var field = input.name;

        chrome.storage.sync.get('tuentiUanConfig', function(config) {
            data = config;
            value = config['tuentiUanConfig'][field] || false;

            if (value) {
                if (input.type === 'checkbox') {
                    input.checked = value;
                }

                input.value = value;
            }
        });
    };

for (i = 0; i < inputs.length; i++) {
    var input = inputs[i];

    restoreConfig(input);

    input.addEventListener('change', function(e){
            element = e.currentTarget,
            value = element.value;

        if (element.type === 'checkbox') {
            value = element.checked;
        }

        data.tuentiUanConfig[element.name] = value;

        saveConfig(data);
    });
}
