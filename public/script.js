const myForm = document.querySelector('#myForm');
myForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  try {
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      messaje: document.getElementById('messaje').value,
    };

    const response = await fetch('http://localhost:4000/formular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert('Date salvate');
    document.querySelector('#myForm').reset();
  } catch (error) {
    console.error('Error', error);
  }
});

const btnLoad = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', loadData);
async function loadData() {
  try {
    const res = await fetch('http://localhost:4000/formular');
    const result = await res.json();
    localStorage.setItem('formular', JSON.stringify(result));
    const dataList = document.querySelector('#dataList');
    dataList.innerHTML = '';
    result.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `Nume: <input type='taxt' value='${item.name}' id='name-${item.id}'> 
                                  Email: <input type='email' value='${item.email}' id='email-${item.id}'> 
                                  Mesaj: <p>${item.messaje}</p> 
                                <button onclick='updateData(${item.id})'>Salveaza</button> 
                                <button onclick='deleteData(${item.id})'>Sterge</button>`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

async function updateData(id) {
  const newName = document.querySelector(`#name-${id}`).value;
  const newEmail = document.querySelector(`#email-${id}`).value;
  await fetch(`http://localhost:4000/formular/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newName, email: newEmail }),
  });
  console.log('Date actualizate');
  loadData();
}

async function deleteData(id) {
  if (confirm('Sigur doriti sa stergeti aceste date?')) {
    await fetch(`http://localhost:4000/formular/${id}`, { method: 'DELETE' });

    console.log('Date sterse');
    loadData();
  }
}
