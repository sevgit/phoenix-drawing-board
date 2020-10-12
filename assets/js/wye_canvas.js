class WyeCanvas {
    constructor(socket) {
        this.socket = socket;
        this.channel = this.socket.channel('wye_canvas:lobby', {});
        this.channel.join();
        this.setupCanvas();
        this.setupListeners();
    }

    setupCanvas = () => {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        document.body.style.margin = 0;
        this.canvas.style.position = 'fixed';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        /*         this.foreignCursor = new Image();
                this.foreignCursor.src = "/images/cursor.svg"
                this.foreignCursor.width = 10;
                this.foreignCursor.height = 10; */
    }

    setupListeners = () => {
        document.addEventListener('mousemove', this.shoutDrawing);
        document.addEventListener('touchmove', this.shoutDrawing);
        this.channel.on('shout', payload => {
            console.log(payload)
            this.draw(payload)
        })
    }

    draw = ({ clientX, clientY }) => {
        /*      this.ctx.drawImage(this.foreignCursor, clientX, clientY); */
        this.ctx.beginPath(); // begin
        this.ctx.moveTo(clientX, clientY); // from
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#c0392b';
        this.ctx.lineTo(clientX, clientY); // to
        this.ctx.stroke(); // draw it!
    }

    shoutDrawing = ({ clientX, clientY, buttons }) => {
        if (buttons !== 1) return;
        console.log({ clientX, clientY })
        this.channel.push('shout', { clientX, clientY })
    }

}

export default WyeCanvas;