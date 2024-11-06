const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginButton = document.querySelector(".auth-button");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = inputEmail.value;
  const senha = inputPassword.value;
  const user = await login(email, senha);
  if (user) {
    console.log("User autenticado");
  } else {
    console.log("Email ou senha inválidos");
  }
});

async function login(email, senha) {
  try {
    const response = await fetch("http://localhost:5500/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    if (!response.ok) {
      console.log("Erro de autenticação");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Erro na requisição:", error);
    return null;
  }
}
