let startTime;
let intervalId;

self.addEventListener('message', (event) => {
    try {
        if (event.data === 'start') {
            console.log('Timer started'); // Log en la consola del Worker
            startTime = Date.now();
            intervalId = setInterval(() => {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                self.postMessage(elapsedTime);
            }, 1000);
        } else if (event.data === 'stop') {
            clearInterval(intervalId);
            const finalTime = Math.floor((Date.now() - startTime) / 1000);
            self.postMessage(finalTime);
        }
    } catch (error) {
        console.error('Error en el Worker:', error);
    }
});
