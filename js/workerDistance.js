let distances = { jugador1: 0, jugador2: 0 };

self.onmessage = function(e) {
    const { player, distance } = e.data;    
    if (distances.hasOwnProperty(player) && distance >= 0) {
        distances[player] += distance;
        console.log("Worker funcionando");
        self.postMessage({ player, distance: distances[player] });
    }
};
 