window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/games/tictactoe/sw.js', { scope: '/games/tictactoe/' });
    }
}