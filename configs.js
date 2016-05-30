var inputs = document.querySelectorAll('input'),
    i,

    data = {Config: {}},

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

        chrome.storage.sync.get('Config', function(config) {
            data = config || data;
            value = config['Config'][field] || false;

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

        data.Config[element.name] = value;

        saveConfig(data);
    });
}
