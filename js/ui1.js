export class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.timerWorker = new Worker('timerWorker.js');
        this.timer = 0;
        this.timerWorker.onmessage = (event)=>{
            this.updateTimer(event.data);
        }
        this.createUI();
    }
 
    createUI() {
        this.distanceText1 = this.scene.add.text(16, 16, 'Metros Jugador 1: 0', { fontSize: '32px', fill: '#fff' });
        this.distanceText2 = this.scene.add.text(16, 56, 'Metros Jugador 2: 0', { fontSize: '32px', fill: '#fff' });
        this.lapsText1 = this.scene.add.text(16, 96, 'Vueltas Jugador 1: 0', { fontSize: '32px', fill: '#fff' });
        this.lapsText2 = this.scene.add.text(16, 136, 'Vueltas Jugador 2: 0', { fontSize: '32px', fill: '#fff' });
        this.timeText = this.scene.add.text(16, 176, 'Tiempo: ', { fontSize: '32px', fill: '#fff' });                        
    } 

    updateUI(players) {
        this.distanceText1.setText('Metros Jugador 1: ' + Math.floor(players[0].distance));
        this.distanceText2.setText('Metros Jugador 2: ' + Math.floor(players[1].distance));
        this.lapsText1.setText('Vueltas Jugador 1: ' + players[0].laps);
        this.lapsText2.setText('Vueltas Jugador 2: ' + players[1].laps);                          
    }
    updateTimer() {
        this.timer++;
        this.timeText.setText('Tiempo: ' + this.timer + 's');
    }

    startTimer() {
        this.timerWorker.postMessage('start');
    }

    stopTimer() {
        this.timerWorker.postMessage('stop');
    }
    showVictoryMessage(message) {
        const victoryText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, message, { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    }
}
