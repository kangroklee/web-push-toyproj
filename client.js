/* check if navigator supports service workers */
/* if so, register service worker */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("worker.js");   
}

/* create a subscription then send it to backend */
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then(async (subscription) => {
            if(subscription) {
                console.log(subscription.endpoint);
                // console.log(subscription.getKey("p256dh"));
                // console.log(subscription.getKey("auth"));
                console.log(subscription.toJSON().keys.p256dh)
                console.log(subscription.toJSON().keys.auth)
                

                const endpoint = subscription.endpoint;
                const keys_p256dh = subscription.toJSON().keys.p256dh;
                const keys_auth = subscription.toJSON().keys.auth;
                

                const subscriptionArr = [endpoint, keys_p256dh, keys_auth];
                const response = await sendSubscription(subscriptionArr);
                return response;

                // subscription.getKey("p256dh").then((p256dhKey) => {
                //     console.log(`p256dh: ${btoa(String.fromCharCode.apply(null, new Uint8Array(p256dhKey)))}`)
                // });
                // subscription.getKey("auth").then((authKey) => {
                //     console.log(`auth: ${btoa(String.fromCharCode.apply(null, new Uint8Array(authKey)))}`);
                // });
                // Now you have the base64-encoded p256dh and auth keys.
            } else {
                registration.pushManager.subscribe({
                    applicationServerKey: 'BMzr1JI7U2GVnJOQlfQlTGmnA8f7ADgUQi6N3muL-56PmVlmLk2Fm3BaR-epF5bB6o3Pm3GMarTVxOQPEx5EXUA',
                    userVisibleOnly: true,
                })
                .then(async (subscription) => {
                    const endpoint = subscription.endpoint;
                    const keys_p256dh = subscription.toJSON().keys.p256dh;
                    const keys_auth = subscription.toJSON().keys.auth;
                    

                    const subscriptionArr = [endpoint, keys_p256dh, keys_auth];
                    const response = await sendSubscription(subscriptionArr);
                    return response;
                })
            }
        })
    })
})


// subscriptionArr = [endpoint, keys_auth, keys_p256dh]
async function sendSubscription(subscriptionArr) {
    const JSONBody = createJSONBody(subscriptionArr);
    const response = await postJSON(JSONBody);
    return response;
}

function createJSONBody(arr) {
    const body = {
        endpoint: arr[0],
        keys: {
            p256dh: arr[1],
            auth: arr[2]
        }
    };
    return JSON.stringify(body);
}

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:3000/subscribe", { //need http://
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        if(response.status === 201) {
            alert('Subscription successfully saved to DB');
        } else {
            alert(`ERROR ${response.status}`)
        }
        // const result = await response;
        // return result;
    } catch(e) {
        throw e;
    }
}

