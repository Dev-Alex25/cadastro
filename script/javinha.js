    let cadastros = [];

    function generateDisciplineInputs() {
        const quantidade = document.getElementById('quantidade').value;
        const disciplinasDiv = document.getElementById('disciplinas');
        disciplinasDiv.innerHTML = '';

        for (let i = 0; i < quantidade; i++) {
            disciplinasDiv.innerHTML += `
                <label for="disciplina${i}">Nome da Disciplina ${i + 1}:</label>
                <input type="text" id="disciplina${i}" required>
                <label for="tempo${i}">Tempo Estimado (horas):</label>
                <input type="number" id="tempo${i}" required>
            `;
        }
    }

    document.getElementById('cadastroForm').onsubmit = function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const matricula = document.getElementById('matricula').value;

       
        if (!/^\d{6}$/.test(matricula)) {
            alert('O número de matrícula deve ter exatamente 6 dígitos.');
            return;
        }

        const disciplinas = [];
        const quantidade = document.getElementById('quantidade').value;

        for (let i = 0; i < quantidade; i++) {
            const disciplina = document.getElementById(`disciplina${i}`).value;
            const tempo = document.getElementById(`tempo${i}`).value;
            disciplinas.push({ nome: disciplina, tempo });
        }

        cadastros.push({ nome, matricula, disciplinas });
        alert('Cadastro realizado com sucesso!');
        
        // Adiciona animação ao botão "Ver Cadastro"
        const btnView = document.querySelector('.btn-view');
        btnView.classList.add('btn-highlight'); // Isso se mantém o mesmo

        // Remove a animação após um tempo
        setTimeout(() => {
            btnView.classList.remove('btn-highlight');
        }, 3000); // Duração da animação


        document.getElementById('cadastroForm').reset();
        document.getElementById('disciplinas').innerHTML = '';
    };

    function viewCadastro() {
        const matricula = document.getElementById('viewMatricula').value;
        const cadastro = cadastros.find(c => c.matricula == matricula);
        const resultadoDiv = document.getElementById('resultado');

        if (cadastro) {
            resultadoDiv.innerHTML = `
                <h3>${cadastro.nome} - Matrícula: ${cadastro.matricula}</h3>
                <ul>
                    ${cadastro.disciplinas.map(d => `<li>${d.nome} - ${d.tempo} horas</li>`).join('')}
                </ul>
            `;
        } else {
            resultadoDiv.innerHTML = '<p>Cadastro não encontrado.</p>';
        }
    }

    function showRegister() {
        document.getElementById('register').style.display = 'block';
        document.getElementById('view').style.display = 'none';
    }

    function showView() {
        document.getElementById('register').style.display = 'none';
        document.getElementById('view').style.display = 'block';
    }
