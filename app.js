document.getElementById('yr').textContent = new Date().getFullYear();

// Guestbook
const guestForm = document.getElementById('guestForm');
const guestEntries = document.getElementById('guestEntries');

function loadGuestbook(){
  guestEntries.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('guestbook')||'[]');
  entries.forEach(e=>{
    const div=document.createElement('div');
    div.className='guest-note';
    div.innerHTML=`<div class="guest-name">💖 ${e.name}</div>
                   <div class="guest-text">${e.msg}</div>`;
    guestEntries.prepend(div);
  });
}

guestForm.addEventListener('submit', e=>{
  e.preventDefault();
  const name=document.getElementById('guestName').value.trim();
  const msg=document.getElementById('guestMessage').value.trim();
  if(!name||!msg) return;
  const entries=JSON.parse(localStorage.getItem('guestbook')||'[]');
  entries.push({name, msg});
  localStorage.setItem('guestbook', JSON.stringify(entries));
  guestForm.reset();
  loadGuestbook();
});

loadGuestbook


document.querySelector('#guestForm button').addEventListener('click', ()=>{
  const heart=document.createElement('div');
  heart.textContent='💗';
  heart.style.position='fixed';
  heart.style.left=Math.random()*100+'vw';
  heart.style.top='100vh';
  heart.style.fontSize='2rem';
  heart.style.animation='floatUp 3s ease-out forwards';
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),3000);
});

