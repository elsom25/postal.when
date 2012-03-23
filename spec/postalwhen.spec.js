QUnit.specify("postal.when", function(){
	describe("when calling when with default behavior", function() {
		var data_a, data_b, data_c, data_d, callbackCount = 0, pw;

		before(function(){
			pw = postal.when([
				{ channel: "ChannelA", topic: "topic.on.channel.a" },
				{ channel: "ChannelB", topic: "topic.on.channel.b" },
				{ channel: "ChannelC", topic: "topic.on.channel.c" },
				{ channel: "ChannelD", topic: "topic.on.channel.d" },
			], function(a, b, c, d){
				data_a = a;
				data_b = b;
				data_c = c;
				data_d = d;
				callbackCount++;
			});
			for(var i = 0; i < 3; i++ ) {
				postal.publish( { channel: "ChannelD", topic: "topic.on.channel.d", data: "And it's testable!" } );
				postal.publish( { channel: "ChannelB", topic: "topic.on.channel.b", data: "Deferred behavior!" } );
				postal.publish( { channel: "ChannelA", topic: "topic.on.channel.a", data: "Hey look!" } );
				postal.publish( { channel: "ChannelC", topic: "topic.on.channel.c", data: "Via message bus!" } );
			}
		});
		after(function(){
			data_a = undefined;
			data_b = undefined;
			data_c = undefined;
			data_d = undefined;
			callbackCount = 0;
			pw.dispose();
		});
		it("should invoke the callback the expected number of times", function(){
			assert(callbackCount).equals(3);
		});
		it("data_a should match expected", function(){
			assert(data_a).equals("Hey look!");
		});
		it("data_b should match expected", function(){
			assert(data_b).equals("Deferred behavior!");
		});
		it("data_c should match expected", function(){
			assert(data_c).equals("Via message bus!");
		});
		it("data_d should match expected", function(){
			assert(data_d).equals("And it's testable!");
		});
	});
	describe("when calling when with once = true", function() {
		var data_a, data_b, data_c, data_d, callbackCount = 0, pw;

		before(function(){
			pw = postal.when([
				{ channel: "ChannelA", topic: "topic.on.channel.a" },
				{ channel: "ChannelB", topic: "topic.on.channel.b" },
				{ channel: "ChannelC", topic: "topic.on.channel.c" },
				{ channel: "ChannelD", topic: "topic.on.channel.d" },
			], function(a, b, c, d){
				data_a = a;
				data_b = b;
				data_c = c;
				data_d = d;
				callbackCount++;
			}, { once: true });
			postal.publish( { channel: "ChannelD", topic: "topic.on.channel.d", data: "And it's testable!" } );
			postal.publish( { channel: "ChannelB", topic: "topic.on.channel.b", data: "Deferred behavior!" } );
			postal.publish( { channel: "ChannelA", topic: "topic.on.channel.a", data: "Hey look!" } );
			postal.publish( { channel: "ChannelC", topic: "topic.on.channel.c", data: "Via message bus!" } );
		});
		after(function(){
			data_a = undefined;
			data_b = undefined;
			data_c = undefined;
			data_d = undefined;
			callbackCount = 0;
			pw.dispose();
		});
		it("should only invoke the callback once", function(){
			assert(callbackCount).equals(1);
		});
		it("data_a should match expected", function(){
			assert(data_a).equals("Hey look!");
		});
		it("data_b should match expected", function(){
			assert(data_b).equals("Deferred behavior!");
		});
		it("data_c should match expected", function(){
			assert(data_c).equals("Via message bus!");
		});
		it("data_d should match expected", function(){
			assert(data_d).equals("And it's testable!");
		});
	});
});