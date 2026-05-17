exports.domain = function () {
    let IP = process.env.IP || '127.0.0.1';
    let PORT = process.env.PORT || '8080'
    return 'http://' + IP + ':' + PORT;
}
