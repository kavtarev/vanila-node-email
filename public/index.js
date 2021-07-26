let form = document.forms[0]

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  let result = await fetch('/api/file', {
    method: 'POST',

    body: new FormData(e.target),
  })
  let res = await result.json()

  location.href = '/text'
})
