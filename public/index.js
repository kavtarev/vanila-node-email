let form = document.forms[0]

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let data = await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hui: 'gulag' }),
  })
  let res = data.json()
  console.log(res)
})
