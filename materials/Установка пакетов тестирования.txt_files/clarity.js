
  //
  // Clarity v1.12 (22.11.2023)
  // Part of Chatium Platform
  // https://chatium.com
  //
  ;(function () {

    function getCookie(name) {
      const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const cookieUid = getCookie('x-chtm-uid');
    const cookieSid = getCookie('x-chtm-uid-sid');

    const [visitorId, visitId, sessionId] = findGetcourseFormsVisitorVisitSession()

    let queryUid = null
    try {
      const url = new URL(window.location.href)
      if (url.searchParams.get('clarity_uid')) {
        queryUid = url.searchParams.get('clarity_uid')
      } else {
        if (window.parent) {
          const url = new URL(window.parent.location.href)
          if (url.searchParams.get('clarity_uid')) {
            queryUid = url.searchParams.get('clarity_uid')
          }
        }
      }

      if (queryUid) {
        removeQueryClarityUid();
      }
    } catch (error) {
      console.error(error)
    }

    const uid = queryUid || cookieUid || "N1bBWBcaY1ykx40MNdeAI5fgnd6RYP74";
    const sid = cookieSid || "_-u7y4j0VQo6Dz7HM1eEIK5QVA4z5bdt:1715611982743";

    const inferredUid = cookieUid || queryUid ? false : false;
    const inferredSid = cookieSid ? false : false;

    document.cookie = `x-chtm-uid=${uid}; max-age=31536000; path=/;`;
    document.cookie = `x-chtm-uid-sid=${sid}; max-age=1800; path=/;`;

    const query = {};
    const params = new URLSearchParams(location.search);

    [
      'utm_funnel', 'utm_node', 'utm_node_from',
      'utm_action', 'utm_action_params',
      'utm_action_param1', 'utm_action_param2', 'utm_action_param3',
      'utm_action_param1_float', 'utm_action_param2_float', 'utm_action_param3_float',
      'utm_action_param1_int', 'utm_action_param2_int', 'utm_action_param3_int',
    ].forEach(function (param) {
      if (params.get(param)) query[param] = params.get(param);
    })

    let referer = ''
    try {
      referer = document.referrer || sessionStorage.getItem('x-chtm-rfr') || '';
      sessionStorage.setItem('x-chtm-rfr-p', sessionStorage.getItem('x-chtm-rfr'));
      sessionStorage.setItem('x-chtm-rfr', window.location.href);
    } catch (_) {}

    function enrichUrl(url) {
      return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('event://')
        ? url
        : 'event://custom/' + url
    }

    window.clrtIsReactive = false
    function appendSocketStoreToBody() {
      if (false || window.clrtReactivity === true) {
        if (window.clrtIsReactive === false) {
          window.clrtIsReactive = true
          console.log('🚀 Clarity reactivity enabled')

          const script = document.createElement('script');
          script.src = "https://lk.result.school/chtm/s/metric/socket-bundle.8dU6jrcTp8rM8.js";
          script.onload = function () {
            const socketStore = new SocketStore({ baseURL: 'wss://app.chatium.io/' });
            socketStore.setToken();
            if (clrtUserSocketId) {
              socketStore.subscribeToData(clrtUserSocketId).listen(function (params) {
                console.log('🛜 Clarity user socket', params)

                window.dispatchEvent(new CustomEvent('claritySocket', { detail: { ...params } } ));
                window.postMessage(JSON.stringify({ source: 'clarity', action: 'claritySocket', params }));
              });
            }
            socketStore.subscribeToData(clrtSocketId).listen(function (params) {
              console.log('🛜 Clarity uid socket', params)

              window.dispatchEvent(new CustomEvent('claritySocket', { detail: { ...params } } ));
              window.postMessage(JSON.stringify({ source: 'clarity', action: 'claritySocket', params }));
            });
          }
          document.body.appendChild(script)
        }
      }
    }

    var clarityInit = false
    function clarityTrack(params) {
      const img = document.createElement('img');
      img.style.position = 'absolute';
      img.style.left = '-1px';
      img.style.top = '-1px';
      img.style.width = '1px';
      img.style.height = '1px';
      img.src = getClarityImageUrl(typeof params === 'string' ? { url: enrichUrl(params) } : params);
      img.onload = function () {
        img.remove();
      };

      function appendTrackerToBody() {
        document.body.appendChild(img)

        try {
          if (clarityInit === false) {
            window.dispatchEvent(new CustomEvent('clarityInit', { detail: { ...params } } ));
            window.postMessage(JSON.stringify({ source: 'clarity', action: 'clarityInit', params }));
          }

          window.dispatchEvent(new CustomEvent('clarityTrack', { detail: { ...params, initial: clarityInit === false } } ));
          window.postMessage(JSON.stringify({ source: 'clarity', action: 'clarityTrack', params: { ...params, initial: clarityInit === false } }));
        } catch (error) {
          console.error(error)
        }

        try {
          if (clarityInit === false) {
            appendSocketStoreToBody()
          }
        } catch (error) {
          console.error(error)
        }

        clarityInit = true
      }

      if (document.body) {
        appendTrackerToBody()
      } else {
        window.addEventListener("DOMContentLoaded", appendTrackerToBody, { once: true })
      }
    }

    function getClarityImageUrl(rewrite) {
      var baseUrl = "https://lk.result.school/chtm/s/metric/clarity.gif"
      var resultReferer = referer
      var resultUrl = document.location.href
      var resultDomain = document.location.hostname

      try {
        const params = new URLSearchParams(document.location.search)
        if (params.get('loc') !== null) {
          resultUrl = params.get('loc')
          var url = new URL(resultUrl)

          resultDomain = url.hostname
        }
        if (params.get('ref') !== null) {
          resultReferer = params.get('ref')
        }
      } catch (error) {
        console.error(error)
      }

      var params = {
        c: Date.now(),
        uid,
        sid,
        referer: resultReferer,
        url: resultUrl,
        domain: resultDomain,
        title: document.title,
        width: screen.width,
        height: screen.height,
        pr: window.devicePixelRatio,
        iuid: inferredUid,
        isid: inferredSid,
        visitor: visitorId,
        visit: visitId,
        session: sessionId,
        enc: window.chtmClarityEncoded ? window.chtmClarityEncoded : undefined,

        ...query,
        ...(rewrite || {}),
      }

      return baseUrl + '?' + Object.keys(params).map(function (param) {
        return params[param] ? param + "=" + encodeURIComponent(params[param]) : ''
      }).filter(Boolean).join('&');
    }

    function exposeUidToGetcourseForms() {
      try {
        function hiddenUidInput() {
          const input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', 'formParams[clarity_uid]');
          input.setAttribute('value', uid);
          input.setAttribute('style', 'display:none;position:absolute;width:0;max-width:0;height:0;max-height:0;left:-999999999px;pointer-events:none;vizability:hidden;')
          return input;
        }

        Array
          .from(document.forms)
          .filter(form => form.getAttribute('action') && form.getAttribute('action').includes('/pl/'))
          .forEach(form => form.appendChild(hiddenUidInput()));
      } catch (error) {
        console.error(error);
      }
    }

    function removeQueryClarityUid() {
      try {
        const url = new URL(window.location.href);
        url.searchParams?.delete('clarity_uid');
        if (window.history) {
          window.history.replaceState(null, null, url.toString())
        }
      } catch (error) {
        console.error(error);
      }
    }

    function replaceTelegramStartUid() {
      if (uid) {
        Array.from(document.querySelectorAll('a')).forEach(function (a) {
          if (a.href && a.href.includes('{clarity_uid}')) {
            a.href = a.href.replace('{clarity_uid}', 'uid-' + uid)
          }
        })
      }
    }

    function findGetcourseFormsVisitorVisitSession() {
      try {
        const forms = Array.from(document.forms).filter(form => form.getAttribute('action') && form.getAttribute('action').includes('gcVisitor'))
        if (forms.length > 0) {
          const action = forms[0].getAttribute('action')
          const url = new URL(action)

          let visitorId = undefined
          let visitId = undefined
          let sessionId = undefined

          try {
            const gcVisitorParam = url.searchParams.get('gcVisitor')
            const gcVisitor = JSON.parse(gcVisitorParam)
            if (gcVisitor.id) visitorId = gcVisitor.id
          } catch (_) {}

          try {
            const gcVisitParam = url.searchParams.get('gcVisit')
            const gcVisit = JSON.parse(gcVisitParam)
            if (gcVisit.id) visitId = gcVisit.id
            if (gcVisit.sid) sessionId = gcVisit.sid
          } catch (_) {}

          return [visitorId, visitId, sessionId]
        }
      } catch (error) {
        console.error(error)
      }

      return [undefined, undefined, undefined]
    }

    /** user webinar **/
    function webinarTrack(webinar) {
      if (webinar.status === undefined || (webinar.status != 'opened' && webinar.status != 'started')) {
        setTimeout(() => {
          webinarTrack(window.webinar)
        }, 1000); // wait 1 second, to check status later
        return;
      }

      const webinarId = webinar.id
      const visitorId = webinar.visitorId
      const launchId = webinar.launchId // maybe it's usefull
      const userId = window.accountUserId && window.accountUserId > 0 ? window.accountUserId : ''
      const fullUserId = userId && window.accountId ? window.accountId + ':' + userId : ''

      let adminMode = false;
      if (typeof isAdminView !== "undefined") { // global variable
        adminMode = !!isAdminView
      }
      const viewerMode = adminMode ? 'admin' : 'user'

      clarityTrack({
        url: "event://getcourse/webinar/visit?id=" + encodeURIComponent(webinarId),
        visitor: visitorId,
        userId: fullUserId,
        action_param1: webinarId,
        action_param2: viewerMode,
        action_param1_int: launchId,
      })
    }

    window.chtmClarityTrack = clarityTrack;
    window.rfnl = clarityTrack;
    window.clrtUid = uid;
    window.clrtSid = sid;
    window.clrtTrack = clarityTrack;
    window.clrtTracked = false;
    window.clrtMakeReactive = function () {
      window.clrtReactivity = true;
      appendSocketStoreToBody();
    }
    window.clrtUrlToTelegramBot = function (name) {
      return 'https://t.me/' + name + '?start=uid-' + uid;
    }
    window.clrtRedirectToTelegramBot = function (name, target, windowFeatures) {
      window.open(window.clrtUrlToTelegramBot(name), target, windowFeatures)
    }

    window.startFunnel = function (sceneId) {
      if (sceneId) {
        clarityTrack({
          url: "event://refunnels/startScenario/" + sceneId,
          action: "event_js"
        })
      }
    }

    document.addEventListener('DOMContentLoaded', function (event) {
      if (window.clrtTracked === false) {
        window.clrtTracked = true

        if (window.gcUniqId !== undefined) {
          try {
            if (localStorage.getItem('visit')) {
              clarityTrack();
            } else {
              const start = Date.now()
              const handler = setInterval(checkVisit, 500);

              function checkVisit() {
                if (localStorage.getItem('visit') || Date.now() - start > 1000 * 10) {
                  clearInterval(handler);
                  clarityTrack();
                }
              }
            }
          } catch (_) {
            clarityTrack();
          }
        } else {
          clarityTrack();
        }
      }
      // window.webinar object is not empty, has not empty "sign" property we are on a certain page
      if (window.webinar !== undefined && window.location.pathname.indexOf('pl/webinar/show') !== -1) {
        setTimeout(() => {
          webinarTrack(window.webinar)
        }, 10000); // wait 10 seconds, to be shure, that user hasn't closed the page.
      }
    }, { once: true });

    exposeUidToGetcourseForms();
    replaceTelegramStartUid();

  })();
