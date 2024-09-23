let playersData = [];

self.onmessage = function(e) {
    const { players } = e.data;
    playersData = players; // Actualiza la información de los jugadores

    // Revisa las colisiones
    checkCollisions();
};

function checkCollisions() {
    const collisions = [];
    
    for (let i = 0; i < playersData.length; i++) {
        for (let j = i + 1; j < playersData.length; j++) {
            const player1 = playersData[i];
            const player2 = playersData[j];

            const distance = Phaser.Math.Distance.Between(player1.sprite.x, player1.sprite.y, player2.sprite.x, player2.sprite.y);
            const threshold = 50; // Distancia mínima para considerar que han colisionado

            if (distance < threshold) {
                collisions.push({ player1: player1.playerName, player2: player2.playerName });
            }
        }
    }

    self.postMessage(collisions); // Enviar las colisiones detectadas
}
