const sidebarMenuContainer = document.getElementById("sidebarMenuContainer");

function createSidebarMenu() {
  const sidebarMenu = document.createElement("div");
  sidebarMenu.classList.add("sidebar-menu");

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("logo-container");

  const toggleButton = document.createElement("div");
  toggleButton.classList.add("toggle-button");

  const menuIcon = document.createElement("span");
  menuIcon.classList.add("material-symbols-outlined");
  menuIcon.textContent = "menu";
  toggleButton.appendChild(menuIcon);

  const logoIcon = document.createElement("span");
  logoIcon.classList.add("material-symbols-outlined", "logo");
  logoIcon.textContent = "auto_stories";

  const title = document.createElement("h1");
  title.textContent = "SGB";

  logoContainer.appendChild(toggleButton);
  logoContainer.appendChild(logoIcon);
  logoContainer.appendChild(title);

  const quickSearchContainer = document.createElement("div");
  quickSearchContainer.classList.add("quick-search-container");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Pesquisa rápida";
  searchInput.classList.add("search-input");

  const searchIcon = document.createElement("span");
  searchIcon.classList.add("material-symbols-outlined");
  searchIcon.textContent = "search";

  const searchResultsContainer = document.createElement("section");
  searchResultsContainer.classList.add("search-results-container");

  const searchResultsList = document.createElement("ul");
  searchResultsList.classList.add("search-results");

  searchResultsContainer.appendChild(searchResultsList);
  quickSearchContainer.appendChild(searchInput);
  quickSearchContainer.appendChild(searchIcon);
  quickSearchContainer.appendChild(searchResultsContainer);

  const mainMenu = document.createElement("nav");
  mainMenu.classList.add("main-menu");

  const mainMenuList = document.createElement("ul");
  mainMenu.appendChild(mainMenuList);

  const mainMenuItems = [
    { title: "Início", icon: "home", href: "/" },
    {
      title: "Solicitações",
      icon: "payments",
      href: "solicitacoes.html",
    },
  ];

  mainMenuItems.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.classList.add("item-menu");
    menuItem.title = item.title;

    const link = document.createElement("a");
    link.href = item.href;

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined", "nav-icon");
    icon.textContent = item.icon;

    const text = document.createElement("p");
    text.textContent = item.title;

    link.appendChild(icon);
    link.appendChild(text);
    menuItem.appendChild(link);
    mainMenuList.appendChild(menuItem);
  });

  const secondaryMenu = document.createElement("nav");
  secondaryMenu.classList.add("secondary-menu");

  const secondaryMenuList = document.createElement("ul");
  secondaryMenu.appendChild(secondaryMenuList);

  const secondaryMenuItems = [
    { title: "Dashboard", icon: "dashboard", href: "dashboard.html" },
    { title: "Relatórios", icon: "finance", href: "relatorios.html" },
  ];

  secondaryMenuItems.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.classList.add("item-menu");
    menuItem.title = item.title;

    const link = document.createElement("a");
    link.href = item.href;

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined", "nav-icon");
    icon.textContent = item.icon;

    const text = document.createElement("p");
    text.textContent = item.title;

    link.appendChild(icon);
    link.appendChild(text);
    menuItem.appendChild(link);
    secondaryMenuList.appendChild(menuItem);
  });

  const accountContainer = document.createElement("div");
  accountContainer.classList.add("account-container");

  const accountIcon = document.createElement("span");
  accountIcon.classList.add("material-symbols-outlined", "account");
  accountIcon.textContent = "account_circle";

  const accountText = document.createElement("p");
  accountText.textContent = "Conta";

  accountContainer.appendChild(accountIcon);
  accountContainer.appendChild(accountText);

  const divOverlay = document.createElement("div");
  divOverlay.classList.add("dark-overlay");

  sidebarMenu.appendChild(logoContainer);
  sidebarMenu.appendChild(quickSearchContainer);
  sidebarMenu.appendChild(mainMenu);
  sidebarMenu.appendChild(secondaryMenu);

  sidebarMenuContainer.appendChild(sidebarMenu);
  sidebarMenuContainer.appendChild(accountContainer);
  insertAfter(divOverlay, sidebarMenuContainer);
}

createSidebarMenu();

const links = document.querySelectorAll(".sidebar-menu-container nav a");
const toggleButton = document.querySelector(".toggle-button");
const toggleButtonIcon = document.querySelector(".toggle-button span");

async function resultados() {
  const livros = await carregarLivros();

  livros.sort((a, b) => a.nomeDoLivro.localeCompare(b.nomeDoLivro));

  const searchInput = document.querySelector(".search-input");
  const searchResults = document.querySelector(".search-results");
  let activeIndex = -1;
  let filteredResults = [];

  searchInput.addEventListener("input", () => {
    const value = normalizeString(searchInput.value);
    if (value === "") {
      searchResults.innerHTML = "";
      activeIndex = -1;
      return;
    }

    filteredResults = livros.filter((livro) => {
      return (
        livro.status === "Disponível" &&
        (normalizeString(livro.nomeDoLivro).includes(value) ||
          normalizeString(livro.autor).includes(value))
      );
    });

    if (filteredResults.length === 0) {
      searchResults.innerHTML = `
        <li class="search-results-item">
          <span class="material-symbols-outlined">search_off</span>
          <p>Nenhum resultado encontrado</p>
        </li>
      `;
      activeIndex = -1;
      return;
    }

    searchResults.innerHTML = filteredResults
      .map((livro, index) => {
        return `
          <li class="search-results-item ${
            index === activeIndex ? "active" : ""
          }" data-index="${index}">
            <p>${livro.nomeDoLivro}</p>
            <p>${livro.autor}</p>
          </li>
        `;
      })
      .join("");
  });

  searchResults.addEventListener("mousedown", (event) => {
    const item = event.target.closest(".search-results-item");
    if (item) {
      const index = item.getAttribute("data-index");
      const selectedItem = filteredResults[index];
      if (selectedItem) {
        criarPrompt(selectedItem);
      }
    }
  });

  searchInput.addEventListener("keydown", (event) => {
    const items = document.querySelectorAll(".search-results-item");

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const selectedItem = filteredResults[activeIndex];
      if (selectedItem) {
        criarPrompt(selectedItem);
      }
    }
  });

  function updateActiveItem(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.toggle("active", i === activeIndex);
    }
  }
}

function toggleSidebar() {
  toggleButton.addEventListener("click", () => {
    sidebarMenuContainer.classList.add("show");
  });

  document.addEventListener("click", (event) => {
    if (
      !sidebarMenuContainer.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      sidebarMenuContainer.classList.remove("show");
    }
  });
}

toggleSidebar();

document.addEventListener("DOMContentLoaded", resultados);
