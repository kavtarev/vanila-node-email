let form = document.forms[0]

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  let result = await fetch('/api/mail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: e.target.email.value }),
  })
  let res = await result.json()
  console.log(res)
})
