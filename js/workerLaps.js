let laps = { jugador1: 0, jugador2: 0 };

self.onmessage = function(e) {    
    const { player } = e.data;    
    if (laps.hasOwnProperty(player)) {
        laps[player]++;
        self.postMessage({ player, laps: laps[player] });
    }
};
 