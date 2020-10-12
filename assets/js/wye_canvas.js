class WyeCanvas {
    constructor(socket) {
        this.socket = socket;
        this.channel = this.socket.channel('wye_canvas:lobby', {});
        this.channel.join();
        this.setupCanvases();
        this.setupListeners();
        this.id = Math.random() * 100
    }

    setupCanvases = () => {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        document.body.style.margin = 0;
        this.canvas.style.position = 'fixed';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

        // Cursor canvas
        this.cursorCanvas = document.createElement('canvas');
        document.body.appendChild(this.cursorCanvas);
        document.body.style.margin = 0;
        this.cursorCanvas.style.position = 'fixed';
        this.cursorCtx = this.cursorCanvas.getContext('2d');
        this.cursorCtx.canvas.width = window.innerWidth;
        this.cursorCtx.canvas.height = window.innerHeight;


        this.foreignCursor = new Image();
        this.foreignCursor.src = "/images/cursor.svg"
        this.foreignCursor.width = 10;
        this.foreignCursor.height = 10;
    }

    setupListeners = () => {
        document.addEventListener('mousemove', this.shoutDrawing);
        document.addEventListener('touchmove', this.shoutDrawing);
        this.channel.on('shout', payload => {
            this.draw(payload)
        })
    }

    draw = ({ clientX, clientY, isDrawing, id }) => {
        if (id !== this.id) {
            this.cursorCtx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
            this.cursorCtx.drawImage(this.foreignCursor, clientX, clientY);
        }
        if (!isDrawing) return;
        this.ctx.beginPath();
        this.ctx.moveTo(clientX, clientY);
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#c0392b';
        this.ctx.lineTo(clientX, clientY);
        this.ctx.stroke();
    }

    shoutDrawing = ({ clientX, clientY, buttons }) => {
        this.channel.push('shout', { clientX, clientY, isDrawing: buttons === 1, id: this.id })
    }

}

export default WyeCanvas;