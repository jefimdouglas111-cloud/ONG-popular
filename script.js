function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

function scrollActive(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerHeight = 70;
  const sectionPosition = section.offsetTop - headerHeight;
  window.scrollTo({
    top: sectionPosition,
    behavior: 'smooth'
  });

  const menu = document.getElementById('navMenu');
  if (menu) {
    menu.classList.remove('active');
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('volunteerForm');
  if (!form) return;
  if (form.dataset.submitted === 'true') return;

  form.dataset.submitted = 'true';

  const formData = {
    nome: form.nome.value,
    email: form.email.value,
    telefone: form.telefone.value.trim(),
    idade: form.idade.value.trim(),
    disponibilidade: form.disponibilidade.value.trim(),
    areainteresse: form.areainteresse.value.trim(),
    experiencia: form.experiencia.value.trim(),
    motivacao: form.motivacao.value.trim(),
    dataCadastro: new Date().toLocaleDateString()
  };

  let voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
  voluntarios.push(formData);
  localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.classList.add('show');
    successMessage.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);
  }

  setTimeout(() => {
    form.reset();
    form.dataset.submitted = 'false';
  }, 2000);

  exibirVoluntarios();
}

const form = document.getElementById('volunteerForm');
if (form) {
  form.addEventListener('submit', handleSubmit);
}

const exibirVoluntarios = () => {
  const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
  const tabelaContainer = document.getElementById('tabelaVoluntarios');
  if (!tabelaContainer) return;

  if (voluntarios.length === 0) {
    tabelaContainer.innerHTML = '<p>Nenhum voluntario cadastrado.</p>';
    return;
  }

  let tabelaHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Idade</th>
          <th>Disponibilidade</th>
          <th>Área de Interesse</th>
          <th>Experiência Anterior</th>
          <th>Motivação</th>
          <th>Data de Cadastro</th>
        </tr>
      </thead>
      <tbody>
  `;

  voluntarios.forEach(voluntario => {
    tabelaHTML += `
      <tr>
        <td>${voluntario.nome}</td>
        <td>${voluntario.email}</td>
        <td>${voluntario.telefone}</td>
        <td>${voluntario.idade}</td>
        <td>${voluntario.disponibilidade}</td>
        <td>${voluntario.areainteresse}</td>
        <td>${voluntario.experiencia}</td>
        <td>${voluntario.motivacao}</td>
        <td>${voluntario.dataCadastro}</td>
      </tr>
    `;
  });

  tabelaHTML += `
      </tbody>
    </table>
  `;
  tabelaContainer.innerHTML = tabelaHTML;
};


exibirVoluntarios();

const botaoTema = document.getElementById('alternar-tema');
const corpoDaPagina = document.body;
if (botaoTema) {
  botaoTema.addEventListener('click', function() {
    corpoDaPagina.classList.toggle('tema-escuro');
  });
}
