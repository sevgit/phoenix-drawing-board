let WyeCanvas = {
    init(socket) {
        let channel = socket.channel('wye_canvas:lobby', {});
        channel.join();
        this.listenForDrawings(channel);
    },

    listenForDrawings(channel) {
        document.getElementById('canvas').addEventListener('change', function (e) {
            console.log(e.target.value)

            channel.push('shout', { value: e.target.value })
        })

        channel.on('shout', payload => {
            document.getElementById('canvas').value = payload.value;
        })
    }
}

export default WyeCanvas;