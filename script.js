const selectTipo = document.querySelector("#tipoContrato");
const dataNascimento = document.querySelector(".dataNascimento");
const modalCLT = document.querySelector("#modalCLT");
const modalPJ = document.querySelector("#modalPJ");
const modalJA = document.querySelector("#modalJA");
const modalFreel = document.querySelector("#modalFreel");
const formulario = document.querySelector("#formCadastro");
const entradaTextoCLT = document.querySelectorAll(".entrada-textoCLT");
const entradaTextoJA = document.querySelectorAll(".entrada-textoJA");
const entradaTextoPJ = document.querySelectorAll(".entrada-textoPJ");
const entradaTextoFree = document.querySelectorAll(".entrada-textoFree");
const nomeInput = document.querySelector("#nome");

let idadeUsuario = 0;
let entrada = [];

function calcularIdade (dataNascimento){
    const data = new Date(dataNascimento);
    const hoje = new Date();

  let idade = hoje.getFullYear() - data.getFullYear();
  console.log(idade);
  const mes = hoje.getMonth() - data.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() <= data.getDate())){
    idade--;
  }
  return idade;
}

function validaDataNascimento(modal) {
  if (!modal) return;
  const campoData = modal.querySelector('input[type="date"]');
  if (!campoData) return; 
  campoData.onchange = () => {
    const valor = campoData.value;
    if (!valor) return; 

    const idade = calcularIdade(valor);
    const tipo = selectTipo.value;

    if (tipo === "clt" || tipo === "pj" || tipo === "freel") {
      if (idade < 18) {
        alert("Você precisa ter pelo menos 18 anos.");
        campoData.value = "";
      }
    }
    if (tipo === "ja") {
      if (idade < 14) {
        alert("Você precisa ter pelo menos 14 anos.");
        campoData.value = "";
      } else if (idade > 24) {
        alert("Você não se enquadra nas vagas de Jovem Aprendiz!");
        campoData.value = "";
      } else if (idade < 18) {
        const turnoNoite = modal.querySelector("#noite");
        turnoNoite.addEventListener("click", (e) => {
        e.target.checked = false;
        });
      }
    }
  };
}

const fecharModals = () => document.querySelectorAll(".modals").forEach(modal => modal.close());
selectTipo.addEventListener("change", e => {
    fecharModals();
  if (selectTipo.value === "clt"){
    modalCLT.show();
    entrada=entradaTextoCLT;
    validaDataNascimento(modalCLT);
    return entrada;
  } 
  if (selectTipo.value === "pj") {
    modalPJ.show();
    entrada=entradaTextoPJ;
    validaDataNascimento(modalPJ);
    return entrada;
}
  if (selectTipo.value === "ja") {
    modalJA.show();
    entrada=entradaTextoJA;
    validaDataNascimento(modalJA);
    return entrada;
  }
  if (selectTipo.value === "freel") {
    modalFreel.show();
    entrada=entradaTextoFree;
    validaDataNascimento(modalFreel);
    return entrada;
}
});

//regex para cpf,telefone,cnpj,cep
document.addEventListener("input", (e) => {
  const input = e.target;
  let valor = input.value.replace(/\D/g, "");

  if (input.classList.contains("cpf")) {
    input.value = valor.replace(/(\d{1,3})(\d{1,3})(\d{1,3})(\d{1,2})$/, "$1.$2.$3-$4");
  }

  if (input.id === "cnpj") {
    input.value = valor.replace(/(\d{1,2})(\d{1,3})(\d{1,3})(\d{1,4})(\d{1,2})$/, "$1.$2.$3.$4-$5");
  }

  if (input.classList.contains("cep")) {
    input.value = valor.replace(/(\d{1,5})(\d{1,3})$/, "$1-$2");
  }
  if (input.classList.contains("telefone")) {
    input.value = valor.replace(/(\d{2})(\d{1})(\d{1,4})(\d{1,4})$/, "($1) $2 $3-$4");
  }
});


formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(nomeInput.value === ""){
            alert("O campo Nome não pode ser vazio!");
            return;
    }
    const modalAtivo = document.querySelector(".modals[open]");
    const escolaridadeSelect = modalAtivo.querySelector(".escolaridade");
    const cepInput = modalAtivo.querySelector(".cep");
    const cpfInput = modalAtivo.querySelector(".cpf");
    const telefone = modalAtivo.querySelector(".telefone");
    const ufSelect = modalAtivo.querySelector(".uf");
    const cnpjInput = modalAtivo.querySelector("#cnpj");
    const radiosCargo = modalAtivo.querySelectorAll('input[name="cargo"]');
    const turnos = modalAtivo.querySelectorAll('input[name="turno"]');
    for (let indice = 0; indice < entrada.length; indice++) {
    let entradaInput = entrada[indice];
    if (entradaInput.value.trim() === "") {
        const nomeCampo = entradaInput.previousElementSibling ? entradaInput.previousElementSibling.innerText: "";
        alert(`O campo ${nomeCampo} não pode ser vazio!`);
        entradaInput.focus();
        return;
    }
    
    if (selectTipo.value === "clt" || selectTipo.value === "ja" || selectTipo.value === "freel") {
        if (!cpfInput.value || cpfInput.value.length < 14) {
            alert("CPF incompleto ou vazio");
            cpfInput.focus();
            return;
        }
    }

    if (selectTipo.value === "pj") {
        if (!cnpjInput.value || cnpjInput.value.length < 18) {
            alert("CNPJ incompleto ou vazio");
            cnpjInput.focus();
            return;
        }
    }
    
    if(escolaridadeSelect.value === "invalida"){
        alert("Selecione sua escolaridade");
        return;
    }
    
    if (radiosCargo.length > 0) {
    const algumCargo = Array.from(radiosCargo).some(cargo => cargo.checked);
        if (!algumCargo) {
        alert("Selecione um cargo.");
        return;
        }
    }
    if (cepInput.value.length<9){
        alert("CEP incompleto ou vazio!");
        return;
    }
    
    }
    if(ufSelect.value === "invalida"){
        alert("Selecione o seu estado");
        return;
    }

    if (telefone.value.length<16){
        alert("Telefone incompleto");
        return;
    }
    if (turnos.length > 0) {
    const algumTurno = Array.from(turnos).some(turno => turno.checked);
        if (!algumTurno) {
        alert("Selecione pelo menos um turno.");
        return;
        }
    }

    alert("Cadastro realizado!")
    formulario.submit();
});


// dataNascimento.addEventListener("change", () => {
// idadeUsuario = calcularIdade(dataNascimento.value);

//   if (idadeUsuario < 18) {
//     alert("Você precisa ter pelo menos 18 anos.");
//     e.target.value = "";
//   }
// });

// dataNascimentoJA.addEventListener("change", () => {
// idadeUsuario = calcularIdade(dataNascimentoJA.value);
//     if (idadeUsuario < 14) {
//         alert("Você precisa ter pelo menos 14 anos.");
//         e.target.value = "";
//     }
//     else if (idadeUsuario > 24) {
//         alert("Você não se enquadra para as vagas de Jovem Aprendiz!");
//         e.target.value = "";
//     } 
//     else if (idadeUsuario <18) {
//         const turnoNoite = document.querySelector("#noite");
//         turnoNoite.addEventListener("click", (e) => {
//         e.target.checked = false;
//         });
//     }
// });



