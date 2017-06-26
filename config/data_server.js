var protocol = "http://";
var cloud = {
    host: 'development.mcdebos.com', //process.env.CLOUD_HOST,
    port: 80
};
var np_sharp = {
    host: 'dev-localapp.mcdebos.com',
    port: 8123
};
var data_server = {
    host: 'devel-data-lb.mcdebos.com',
    port: 10000
}

var DataService ={
    protocol: protocol,
    cloud: {
        host: cloud.host,
        port: cloud.port,
        full_uri: protocol  + cloud.host + ':' + cloud.port + '/api/'
    },
    np_sharp:  {
        host: np_sharp.host,
        port: np_sharp.port,
        full_uri:  protocol  + np_sharp.host + ':' + np_sharp.port + '/npsharp/'
    },
    data_server: {
        host: data_server.host,
        port: data_server.port,
        full_uri:  protocol  + data_server.host + ':' + data_server.port + '/'
    }
};

module.exports = DataService;
