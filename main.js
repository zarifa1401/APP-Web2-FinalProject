// Load list items from local storage when the page loads
window.onload = function () {
  let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
  savedItems.forEach((item) => {
    addListItemToDOM(item.text, item.category);
  });
};

// Event listener for Add button
document.querySelector("button").addEventListener("click", add);

// Function to add list item
function add(event) {
  event.preventDefault();

  console.log("Running add function");

  if (isValidated()) {
    const textInput = document.querySelector("input").value;
    const dropdownValue = document.querySelector("select").value;

    // Save the list item to local storage
    saveListItemToLocalStorage(textInput, dropdownValue);

    addListItemToDOM(textInput, dropdownValue);

    // Clear input fields
    document.querySelector("input").value = "";
    document.querySelector("select").value = "";
  }
}

// Function to add list item to the DOM
function addListItemToDOM(text, category) {
  const list = document.getElementById("list-items");

  const listItem = document.createElement("li");
  listItem.classList.add("border-b", "flex", "justify-start", "ml-10", "py-2");

  const emojiSpan = document.createElement("span");
  emojiSpan.textContent = "➡️";

  const textSpan = document.createTextNode(text);

  const categorySpan = document.createElement("span");
  categorySpan.classList.add("ml-4");

  emojiSpan.addEventListener("click", function (event) {
    event.target.parentNode.remove();
    removeFromLocalStorage(text);
  });

  listItem.addEventListener("click", function () {
    listItem.classList.toggle("line-through");
    updateLocalStorage(
      text,
      category,
      listItem.classList.contains("line-through")
    );
  });
  if (category.trim() === "") {
    alert("Please Select a category!");
  }
  if (category === "Studies") {
    categorySpan.textContent = "Studies";
    categorySpan.classList.add("bg-blue-300", "rounded-full", "px-2");
  } else if (category === "Dairy") {
    categorySpan.textContent = "Dairy";
    categorySpan.classList.add("bg-green-500", "rounded-full", "px-2");
  } else if (category === "HouseWork") {
    categorySpan.textContent = "HouseWork";
    categorySpan.classList.add("bg-yellow-500", "rounded-full", "px-2");
  } else if (category === "Shopping") {
    categorySpan.textContent = "Shopping";
    categorySpan.classList.add("bg-pink-400", "rounded-full", "px-2");
  }

  listItem.appendChild(emojiSpan);
  listItem.appendChild(textSpan);
  listItem.appendChild(categorySpan);

  list.appendChild(listItem);
}

// Function to save list item to local storage
function saveListItemToLocalStorage(text, category) {
  let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
  savedItems.push({ text: text, category: category, completed: false });
  localStorage.setItem("listItems", JSON.stringify(savedItems));
}

// Function to update local storage when list item is clicked
function updateLocalStorage(text, category, completed) {
  let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
  savedItems = savedItems.map((item) => {
    if (item.text === text && item.category === category) {
      return { ...item, completed: completed };
    }
    return item;
  });
  localStorage.setItem("listItems", JSON.stringify(savedItems));
}

// Function to remove list item from local storage
function removeFromLocalStorage(text) {
  let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
  savedItems = savedItems.filter((item) => item.text !== text);
  localStorage.setItem("listItems", JSON.stringify(savedItems));
}

// Function to validate user input
function isValidated() {
  console.log("Running isValidated function");

  const textInput = document.querySelector("input").value;
  const dropdownValue = document.querySelector("select").value;

  if (textInput.trim() === "") {
    alert("Please Write something!");
    document.querySelector("input").classList.add("border-red-500");
    return false;
  } else {
    document.querySelector("input").classList.remove("border-red-500");
  }

  return true;
}
