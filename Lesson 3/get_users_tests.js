const expect = require("chai").expect;
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("request");
chai.should();
chai.use(sinonChai);

const getUsers = require("./get_users");

describe("GetUsers Tests", function () {
	let spy;

	beforeEach(function () {
		spy = sinon.spy();
		sinon.stub(request, "get").callsFake(function (url, callback) {
			callback({}, { body: '{"users":["user1","user2"]}' });
		});
	});
	afterEach(function () {
		sinon.restore();
	});

	it("Calls the callback", function () {
		getUsers(spy);
		spy.should.have.been.calledOnce;
	});

	it("Calls the correct URL", function () {
		getUsers(spy);
		request.get.should.have.been.calledWith("https://www.mysite.com/api/users");
	});

	it("Returns correct data", function () {
		getUsers(spy);
		spy.should.have.been.calledWith({ users: ["user1", "user2"] });
	});
});
