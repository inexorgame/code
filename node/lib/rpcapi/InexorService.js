// Generated by CoffeeScript 1.10.0
(function() {
  var InexorService, MCRpcClient, MProto, SocketMessageConnect, default_config;

  MProto = require("./MessageProto");

  SocketMessageConnect = require("./SocketMessageConnect");

  MCRpcClient = require("./MCRpcClient");

  default_config = function() {
    var cfg;
    cfg = {
      socket: {
        path: "/tmp/inexor.socket"
      },
      proto: __dirname + "/inexor_service.proto"
    };
    if (process.platform.match(/^win/)) {
      cfg.socket = {
        port: 56732
      };
    }
    return cfg;
  };

  InexorService = function(config) {
    var R, messages, msg_con, protocol, rpc_client;
    if (config == null) {
      config = default_config();
    }
    msg_con = new SocketMessageConnect(config.socket);
    protocol = new MProto(config.proto);
    rpc_client = new MCRpcClient(msg_con, protocol, protocol.inexor.rpc.ServiceCall);
    messages = protocol.inexor.rpc;
    R = new messages.InexorService(rpc_client.rpc_send);
    R.messages = messages;
    R.msg_con = msg_con;
    R.protocol = protocol;
    R.rpc_client = rpc_client;
    return R;
  };

  module.exports = InexorService;

}).call(this);
