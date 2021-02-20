const campos = [
 document.querySelector('#data'),
 document.querySelector('#quantidade'),
 document.querySelector('#valor')
]

const table = document.querySelector('table tbody')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  const tr = document.createElement('tr')
  const tdVolume = document.createElement('td')
  
  campos.forEach(campo => {
    let td = document.createElement('td')
    td.textContent = campo.value
    tr.appendChild(td)
  })

  tdVolume.textContent = campos[1].value * campos[2].value
  tr.appendChild(tdVolume)
  table.appendChild(tr)

  document.querySelector('#data').value = ''
  document.querySelector('#quantidade').value = 1
  document.querySelector('#valor').value = 0
  document.querySelector('#data').focus()

})
