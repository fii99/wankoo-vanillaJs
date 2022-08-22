document.addEventListener("DOMContentLoaded", () => {
  const formField = document.querySelector("form");
  lookData(formField);
  formField.addEventListener("submit", (event) => {
    event.preventDefault();
    getUserValue();
  });
});

const datas = [];
const RENDER_EVENT = "render-event";

document.addEventListener(RENDER_EVENT, () => {
  const savingsCard = document.querySelector(".container-data-savings");
  savingsCard.innerHTML = "";

  datas.forEach((property) => {
    const savingsElement = createSavingsCard(property);
    savingsCard.append(savingsElement);
  });
});

function lookData(getFormField) {
  const openCloseField = document.querySelector("#input-data-icon > .icon");

  openCloseField.addEventListener("click", () => {
    const icon = openCloseField;
    const hidden = getFormField.classList.toggle("hidden");

    !hidden
      ? (icon.innerHTML = '<i class="uil uil-angle-down"></i>')
      : (icon.innerHTML = '<i class="uil uil-angle-up"></i>');
  });
}

function getUserValue() {
  const name = document.getElementById("name").value;
  const nisn = document.getElementById("nisn").value;
  const classroom = document.getElementById("class").value;
  const birth = document.getElementById("birthdate").value;
  const checkGender = document.querySelector(
    'input[type="radio"]:checked'
  ).value;
  const isValidation = false;

  const pushToArray = generateObjectValue(
    name,
    nisn,
    classroom,
    birth,
    checkGender,
    isValidation
  );

  datas.push(pushToArray);
  getValidation(nisn);
  resetInputElement();
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function resetInputElement() {
  const formField = document.getElementById("form-input-data");
  const name = document.getElementById("name");
  name.focus();
  formField.reset();
}

function getValidation(nisn) {
  const overlayNisnValidation = document.querySelector("body");
  const buttonNisnValidation = document.querySelector(
    "#modal-nisn-exist button"
  );

  const idNisn = document.querySelector("#modal-nisn-exist #id-nisn");

  datas.forEach((m) => {
    idNisn.classList.add("font-medium");
    if (m.userValidation == false) {
      if (m.userNisn == nisn) return (m.userValidation = true);
    } else {
      if (m.userValidation == true && m.userNisn == nisn) {
        datas.pop();
        overlayNisnValidation.classList.add("overlay-is-open");
        idNisn.innerHTML = `<p style="display:inline;">${m.userNisn}</p>`;

        buttonNisnValidation.addEventListener("click", () => {
          overlayNisnValidation.classList.remove("overlay-is-open");
        });
      }
    }
  });
}

function generateObjectValue(
  userName,
  userNisn,
  userClass,
  userBirthdate,
  userGender,
  userValidation
) {
  return {
    userName,
    userNisn,
    userClass,
    userBirthdate,
    userGender,
    userValidation,
  };
}

function pickColor(getClass) {
  switch (getClass) {
    case "1":
      value = "#EB1D36";
      break;
    case "2":
      value = "#FFA500";
      break;
    case "3":
      value = "#F9D923";
      break;
    case "4":
      value = "#00FFAB";
      break;
    case "5":
      value = "#3B44F6";
      break;
    case "6":
      value = "#F900BF";
      break;
    default:
      value = "#3B44F6";
      break;
  }

  return value;
}

function searchFiltered(getContainer, getFilterbyName, getFilterbyNisn) {
  const searchField = document.getElementById("search-field");

  searchField.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    const isVisible =
      getFilterbyName.toLowerCase().includes(value) ||
      getFilterbyNisn.toLowerCase().includes(value);

    console.log(isVisible);

    !isVisible
      ? getContainer.classList.add("hidden")
      : getContainer.classList.remove("hidden");

    return getContainer;
  });
}

function createSavingsCard(item) {
  const nameElement = document.createElement("p");
  nameElement.classList.add("bold-element");
  nameElement.innerText = item.userName;

  const nisnElement = document.createElement("p");
  nisnElement.innerText = item.userNisn;

  const shortTextElement = document.createElement("div");
  shortTextElement.append(nameElement, nisnElement);

  const iconElement = document.createElement("div");
  iconElement.classList.add("icon");
  iconElement.innerHTML = `<i class="uil uil-user-plus"></i>`;
  iconElement.style.fontSize = "15px";
  iconElement.style.backgroundColor = pickColor(item.userClass);

  const container = document.createElement("div");
  container.classList.add("card", "card-savings", "flex-row");
  container.setAttribute("id", "data-savings");

  searchFiltered(container, item.userName, item.userNisn);
  container.append(iconElement, shortTextElement);
  return container;
}
