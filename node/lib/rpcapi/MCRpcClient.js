// Generated by CoffeeScript 1.10.0
(function() {
  var JSServiceCall, MCRpcClient, MProto, Uuid, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  MProto = global.InexorMessageProtocol;

  Uuid = require('uuid');

  _ = require('lodash');

  JSServiceCall = (function() {
    function JSServiceCall(name, payload, callback, uuid, type) {
      this.name = name;
      this.payload = payload;
      this.callback = callback;
      this.uuid = uuid != null ? uuid : Uuid();
      this.type = type != null ? type : "CALL";
      this.toBuffer = bind(this.toBuffer, this);
      this.toProtobuf = bind(this.toProtobuf, this);
    }

    JSServiceCall.fromProtobuf = function(d) {
      return new JSServiceCall(d.function_name, d.payload, null, d.call_uuid, d.type);
    };

    JSServiceCall.fromBuffer = function(msg_codr, buf) {
      return JSServiceCall.fromProtobuf(msg_codr.decode(buf));
    };

    JSServiceCall.prototype.toProtobuf = function(msg_codr) {
      return new msg_codr({
        function_name: this.name,
        call_uuid: this.uuid,
        type: this.type,
        payload: this.payload.toBuffer()
      });
    };

    JSServiceCall.prototype.toBuffer = function(msg_codr) {
      return this.toProtobuf(msg_codr).toBuffer();
    };

    return JSServiceCall;

  })();

  MCRpcClient = (function() {
    function MCRpcClient(con, protocol, msg_coder) {
      this.con = con;
      this.protocol = protocol;
      this.msg_coder = msg_coder;
      this.rpc_recv = bind(this.rpc_recv, this);
      this.rpc_send = bind(this.rpc_send, this);
      this.con.msg_listener = this.rpc_recv;
      this.calls = {};
    }

    MCRpcClient.prototype.rpc_send = function(full_name, msg, cb) {
      var call;
      if (cb == null) {
        cb = function() {};
      }
      call = new JSServiceCall(full_name, msg, cb);
      this.con.send(call.toBuffer(this.msg_coder));
      return this.calls[call.uuid] = call;
    };

    MCRpcClient.prototype.rpc_recv = function(buf) {
      var call, cb, msg, msg_type;
      call = JSServiceCall.fromBuffer(this.msg_coder, buf);
      msg_type = this.protocol.reflect.resolve(call.name).resolvedResponseType.clazz;
      msg = msg_type.decode(call.payload);
      cb = this.calls[call.uuid].callback;
      delete this.calls[call.uuid];
      return cb(msg, call);
    };

    return MCRpcClient;

  })();

  module.exports = MCRpcClient;

  module.exports.JSServiceCall = JSServiceCall;

}).call(this);
