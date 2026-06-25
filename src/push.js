import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Enable Pusher debug logs so you can see connection state and events in DevTools console
Pusher.logToConsole = true;

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    forceTLS: true,
});