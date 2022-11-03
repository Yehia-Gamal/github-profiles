let APIURL = "https://api.github.com/users/";
let main = document.getElementById("main");
let form = document.getElementById("form");
let search = document.getElementById("search");

// getUser("bradtraversy");
// getUser("florinpop17");

async function getUser(username) {
  try {
    let { data } = await axios(APIURL + username);

    createUserCard(data);
    getRepos(username);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("No Profile With this username");
    }
  }
}

async function getRepos(username) {
  try {
    let { data } = await axios(APIURL + username + "/repos?sort=created");

    addReposToCard(data);
  } catch (error) {
    createErrorCard("Problem fetching Repos");
  }
}

function createUserCard(user) {
  let cardHTMl = `
    <div class="card rounded-3 d-flex p-5 m-4 mt-0 mb-0">
    <img
      class="avatar rounded-pill"
      src="${user.avatar_url}" alt="${user.name}"
    />
    <div class="user-info">
      <h2 class="mt-0">${user.name}</h2>
      <p>${user.bio}</p>
      <ul class="d-flex justify-content-between list-unstyled">
        <li class="d-flex align-items-center">${user.followers}<strong>Followers</strong>
        </li>
        <li class="d-flex align-items-center">${user.following}<strong>Following</strong>
        </li>
        <li class="d-flex align-items-center">${user.public_repos}<strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
  `;

  main.innerHTML = cardHTMl;
}

function createErrorCard(message) {
  let cardHTMl = `
    <div class="card p-3"><h1>${message}</h1></div>
  `;
  main.innerHTML = cardHTMl;
}

function addReposToCard(repos) {
  let reposEl = document.getElementById("repos");

  repos.forEach((repo) => {
    let repoEl = document.createElement("a");
    repoEl.className =
      "repo d-inline-block text-decoration-none text-white p-2 pt-1 pb-1";
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
