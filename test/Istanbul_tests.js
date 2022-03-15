const printNumber = require("./test_print");

it("tests printing 1", function () {
	printNumber(1);
});

it("tests printing not one", function () {
	printNumber(2);
});
