function addToCart(id) {
	const courseList = getCourseList(); // Getting data from data list
	const updatedCourseList = courseList.map((course) =>
		+course.id === +id ? { ...course, addedToCart: true } : course
	);

	setCourseList(updatedCourseList);
	updateCartCountDot();
}

function removeFromCart(id) {
	const courseList = getCourseList();
	const updatedCourseList = courseList.map((course) =>
		+course.id === +id ? { ...course, addedToCart: false } : course
	);
	setCourseList(updatedCourseList);
	updateCartCountDot();
}

function setCourseList(courseList) {
	localStorage.setItem("courseList", JSON.stringify(courseList));
}
//Function to fetch course list
function setInitialCourseList(courseList) {
	const localStorageCourseList = localStorage.getItem("courseList");

	if (localStorageCourseList === null)
		localStorage.setItem("courseList", JSON.stringify(courseList));
}
//Function to take course file data
function getCourseList() {
	const localStorageCourseList = localStorage.getItem("courseList");
	return JSON.parse(localStorageCourseList);
}
//Function to display courses in cart

//to update cart
function updateCartCountDot() {
	const courseList = getCourseList();
	const cartCount = courseList.filter((course) => course.addedToCart).length;
	const cartElm = document.querySelector("#nav-cart");
	cartElm.setAttribute("data-cart-count", cartCount > 9 ? "9+" : cartCount);
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

function main() {
	const isCurrentProductAddedToCart = isProductAddedToCart();
	document.getElementById("addToCart").innerHTML = isCurrentProductAddedToCart
		? "Remove from Cart"
		: "Add to Cart";
	updateCartCountDot();
}
function toggleCart() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const courseId = urlParams.get("id");

	// if (courseId === null) return;
	const isCurrentProductAddedToCart = isProductAddedToCart();

	if (isCurrentProductAddedToCart) {
		removeFromCart(courseId);
		window.location.reload();
	} else {
		addToCart(courseId);
		window.location.reload();
	}
}

function isProductAddedToCart() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const courseId = urlParams.get("id");
	const courseList = getCourseList();

	const isAddedToCart =
		courseList.find((course) => +course.id === +courseId)?.addedToCart ?? false;

	return isAddedToCart;
}

window.toggleCart = toggleCart;

main();
