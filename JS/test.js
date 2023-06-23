let users = []

loadUsers = () => {
  return fetch('https://randomuser.me/api/?results=20&inc=name,picture')
    .then(result => result.json())
    .then(data => {
      users = data.results
      displayUsers(users)
    })
}

displayUsers = (users) => {
  document.querySelector('#users').innerHTML = users.map(user => `<li class="list-group-item">${user.name.first} ${user.name.last}
  <img class="img-responsive pull-right" style="max-height:20px; border-radius: 50%" src="${user.picture.thumbnail}"/></li>`).join('')
}

filterUsers = (e) => {
  let search = e.target.value
  if(search !== ''){
    const filtered = users.filter(user => {
      return user.name.last.includes(search) || user.name.first.includes(search)
    })

    displayUsers(filtered)  
  } else {
    displayUsers(users)
  }
}

loadUsers()

document.querySelector('#search').addEventListener('input', filterUsers)