export class Player {
    constructor(scene, x, y, spriteKey, playerName) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, spriteKey);
        this.sprite.setCollideWorldBounds(true);
        this.distance = 0;
        this.laps = 0;
        this.previousPosition = { x: this.sprite.x, y: this.sprite.y };
        this.controls = this.setupControls(playerName);
        this.playerName = playerName
    }

    static setFinishLine(line) {
        Player.finishLine = line;
    }

    setupControls(playerName) { 
        if (playerName === 'jugador1') {
            return this.scene.input.keyboard.createCursorKeys();
        } else { 
            return {
                up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
                right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
            };
        }
    }

    update() {
        this.handleMovement();
        this.calculateDistance();
    }

    handleMovement() {
        if (this.controls.left.isDown) {
            this.sprite.setAngularVelocity(-150);
        } else if (this.controls.right.isDown) {
            this.sprite.setAngularVelocity(150);
        } else {
            this.sprite.setAngularVelocity(0);
        }
        if (this.controls.up.isDown) {
            this.scene.physics.velocityFromRotation(this.sprite.rotation, 200, this.sprite.body.velocity);
        } else {
            this.sprite.setVelocity(0);
        }
    }

    calculateDistance() {
        const deltaDistance = Phaser.Math.Distance.Between(this.previousPosition.x, this.previousPosition.y, this.sprite.x, this.sprite.y);
        this.distance += deltaDistance;
        this.crossedFinishLine();
        this.previousPosition.x = this.sprite.x;
        this.previousPosition.y = this.sprite.y;
    }

    crossedFinishLine() {
        const finishLineX = 550;
        const finishLineY = this.scene.game.config.height / 1.18;
        const finishLineHeight = 190;

        if (this.sprite.x >= finishLineX - 5 && this.sprite.x <= finishLineX + 5 &&
            this.sprite.y >= finishLineY - finishLineHeight / 2 && this.sprite.y <= finishLineY + finishLineHeight / 2 &&
            this.previousPosition.x < finishLineX && this.sprite.x >= finishLineX) {
            
            this.laps++;
            // Indica que se cruzó la línea de meta para ver las vueltas
            return true; 
        }
        // No se cruzó la línea de meta para ver las vueltas
        return false; 
    }    
}
