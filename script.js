const ApiUrl = "https://api.github.com/users/";
const form = document.getElementById("search");
const input = document.getElementById("input");

async function getUser(user) {
  try {
    const { data } = await axios(ApiUrl + user);
    let main = document.getElementById("main");
    main.innerHTML = `
              <div class="card">
        <div>
          <img
            src="${data.avatar_url}"
            alt="profile image"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>
            ${data.bio}
          </p>
          <ul>
            <li>${data.followers}  <strong>Followers</strong></li>
            <li>${data.following}  <strong>Following</strong></li>
            <li>${data.public_repos} <strong>repos</strong></li>
          </ul>
          <div id="repos">
          </div>
        </div>
      </div>
        `;
  } catch (error) {
    main.innerHTML = `
    <div class="card">
    <h1>Something Went Wrong</h1>
    </div>
    `;
  }
}

async function getRepos(user) {
  let { data } = await axios(ApiUrl + user + "/repos?sort=created");
  let repos = document.getElementById("repos");
  data.slice(0, 5).forEach((d) => {
    let link = document.createElement("a");
    link.classList.add("repo");
    link.href = d.html_url;
    link.innerHTML = d.name;
    link.target = "_blank";

    repos.appendChild(link);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = input.value;
  if (userName) {
    getUser(userName);
    getRepos(userName);
    input.value = "";
  }
});
