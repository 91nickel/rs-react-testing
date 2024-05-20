/**
 * click.ru anti-fraud script
 */

(function() {
    var ref_url = document.referrer;

    var ur = (new RegExp(/[?&]id=([^&#]+)/)).exec(document.currentScript.src);
    var id = '';
    if (ur) {
        id = ur[1];
    }

    if (window.is_already_loaded_af_click) {
        console.warn('af.click.ru - already loaded');
        return;
    }

    window.is_already_loaded_af_click = true;

    if ((
            ref_url.indexOf('yabs.yandex') !== -1 ||
            ref_url.indexOf('https://yandex.ru') !== -1 ||
            ref_url.indexOf('yclid=') !== -1 ||
            ref_url.indexOf('utm_source=') !== -1 ||
            window.document.location.href.indexOf('utm_source=') !== -1 ||
            window.document.location.href.indexOf('yclid=') !== -1
        ) &&
        id) {
        var iframe = document.createElement("iframe");
        iframe.style.display = 'none';
        iframe.setAttribute(
            "src",
            'https://af.click.ru/collect_stat_iframe.html' +
            '?referer=' + encodeURIComponent(ref_url) +
            '&counter_id=' + encodeURIComponent(id) +
            '&url=' + encodeURIComponent(window.location.href)
        );

        if (!document.body) {
            document.addEventListener("DOMContentLoaded", function(event) {
                document.body.appendChild(iframe);
            });
        } else {
            document.body.appendChild(iframe);
        }
    }
})();
