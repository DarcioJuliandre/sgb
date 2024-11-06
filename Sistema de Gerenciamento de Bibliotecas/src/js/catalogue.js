const catalogueContent = document.querySelector(".livros-content");

async function inserirLivrosDisponiveis() {
  const livros = await carregarLivros();

  if (livros.length) {
    const catalogueContent = document.querySelector(".livros-content");

    for (let i = 0; i < livros.length; i++) {
      const livro = livros[i];
      const { idLivro, nomeDoLivro, autor, genero, status } = livro;

      if (status !== "Disponível") continue;

      const catalogueCard = document.createElement("div");
      catalogueCard.classList.add("catalogue-item");

      const itemImageDiv = document.createElement("div");
      itemImageDiv.classList.add("catalogue-item-image");

      const overlayDiv = document.createElement("div");
      overlayDiv.classList.add("catalogue-item-overlay");
      overlayDiv.innerHTML = `Solicitar Livro<span class="material-symbols-outlined">book_2</span>`;
      itemImageDiv.appendChild(overlayDiv);

      const img = document.createElement("img");
      img.src = `src/assets/img/${idLivro}.jpg`;
      img.alt = `Capa do Livro ${nomeDoLivro}`;
      itemImageDiv.appendChild(img);

      const itemInfoDiv = document.createElement("div");
      itemInfoDiv.classList.add("catalogue-item-info");

      const title = document.createElement("h2");
      title.classList.add("catalogue-item-title");
      title.textContent = nomeDoLivro;
      itemInfoDiv.appendChild(title);

      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("catalogue-item-details");

      const authorP = document.createElement("p");
      authorP.classList.add("catalogue-item-author");
      authorP.textContent = `Autor(a): ${autor}`;
      detailsDiv.appendChild(authorP);

      const categoryP = document.createElement("p");
      categoryP.classList.add("catalogue-item-category");
      categoryP.textContent = `Categoria: ${genero}`;
      detailsDiv.appendChild(categoryP);

      const statusP = document.createElement("p");
      statusP.classList.add("catalogue-item-status");
      statusP.textContent = `Status: ${status}`;
      detailsDiv.appendChild(statusP);

      itemInfoDiv.appendChild(detailsDiv);
      catalogueCard.appendChild(itemImageDiv);
      catalogueCard.appendChild(itemInfoDiv);
      catalogueContent.appendChild(catalogueCard);

      catalogueCard.addEventListener("click", () => {
        criarPrompt(livro);
      });
    }
  } else {
    console.error("Nenhum livro encontrado.");
  }
}

document.addEventListener("DOMContentLoaded", inserirLivrosDisponiveis);