// Generated by CoffeeScript 1.10.0
(function() {
  var BufferBuilder,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BufferBuilder = (function() {
    BufferBuilder.prototype.bs = null;

    BufferBuilder.prototype.alloc = null;

    BufferBuilder.prototype.len = null;

    BufferBuilder.prototype.buf = null;

    function BufferBuilder(opts) {
      if (opts == null) {
        opts = {};
      }
      this.finalize = bind(this.finalize, this);
      this.toBuffer = bind(this.toBuffer, this);
      this.sliceThis = bind(this.sliceThis, this);
      this.append = bind(this.append, this);
      this.ensureFree = bind(this.ensureFree, this);
      this.ensureSize = bind(this.ensureSize, this);
      this.resize = bind(this.resize, this);
      this.bs = opts.bs || 1024;
      this.alloc = this.bs;
      this.buf = new Buffer(this.alloc);
      this.len = 0;
      if (opts.buf) {
        this.append(opts.buf);
      }
    }

    BufferBuilder.prototype.resize = function(size) {
      var old;
      old = this.buf;
      this.alloc = this.bs * Math.ceil(size / this.bs);
      this.len = Math.min(this.len, this.alloc);
      this.buf = new Buffer(this.alloc);
      return old.copy(this.buf, 0, 0, this.len);
    };

    BufferBuilder.prototype.ensureSize = function(size) {
      if (size < this.alloc) {
        return this.resize(size);
      }
    };

    BufferBuilder.prototype.ensureFree = function(size) {
      return this.ensureSize(this.len + size);
    };

    BufferBuilder.prototype.append = function(buf) {
      this.ensureFree(buf.length);
      buf.copy(this.buf, this.len);
      return this.len += buf.length;
    };

    BufferBuilder.prototype.sliceThis = function(start, end) {
      var bad;
      if (end == null) {
        end = this.len;
      }
      bad = start < 0 || start > this.len || end < 0 || end > this.len || start > end;
      if (bad) {
        throw new Error("That's not a sane buffer range");
      }
      this.len = end;
      this.buf = this.buf.slice(start);
      this.len -= start;
      return this.alloc -= start;
    };

    BufferBuilder.prototype.toBuffer = function() {
      var out;
      out = new Buffer(this.len);
      this.buf.copy(out, 0, 0, this.len);
      return out;
    };

    BufferBuilder.prototype.finalize = function() {
      return this.buf.slice(0, this.len);
    };

    return BufferBuilder;

  })();

  module.exports = BufferBuilder;

}).call(this);
