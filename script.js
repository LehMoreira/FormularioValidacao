const selectTipo = document.querySelector("#tipoContrato");
const cepInput = document.querySelector(".cep");
const cpfInput = document.querySelector(".cpf");
const telefone = document.querySelector(".telefone");
const dataNascimento = document.querySelector(".dataNascimento");
const emailInput = document.querySelector(".email");
const dataNasciJA = document.querySelector("#dataNascimentoJA");
const cnpjInput = document.querySelector("#cnpj");
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
const ufSelect = document.querySelector(".uf");
const escolaridadeSelect = document.querySelector(".escolaridade");
const radiosCargo = document.querySelectorAll('input[name="cargo"]');
const turnos = document.querySelectorAll('input[name="turno"]');

let idadeUsuario = 0;
let entrada = [];
const fecharModals = () => document.querySelectorAll(".modals").forEach(modal => modal.close());
selectTipo.addEventListener("change", e => {
    fecharModals();
  if (selectTipo.value === "clt"){
    modalCLT.show();
    entrada=entradaTextoCLT;
    return entrada;
  } 
  if (selectTipo.value === "pj") {
    modalPJ.show();
    entrada=entradaTextoPJ;
    return entrada;
}
  if (selectTipo.value === "ja") {
    modalJA.show();
    entrada=entradaTextoJA;
    return entrada;
  }
  if (selectTipo.value === "freel") {
    modalFreel.show();
    entrada=entradaTextoFree;
    return entrada;
}
});
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(nomeInput.value === ""){
            alert("O campo Nome não pode ser vazio!");
            return;
    }
    const selects = formulario.querySelectorAll("select");
    for (let select of selects) {
    if (select.value === "" || select.value === "UF" || select.value === "Selecione") {
        const nomeCampo = select.previousElementSibling ? select.previousElementSibling.innerText: "Campo de seleção";
        alert(`Por favor, selecione uma opção válida para "${nomeCampo}".`);
        select.focus();
        return; 
    }
    }

    for (let indice = 0; indice < entrada.length; indice++) {
    let entradaInput = entrada[indice];
    if (entradaInput.value.trim() === "") {
        const nomeCampo = entradaInput.previousElementSibling ? entradaInput.previousElementSibling.innerText: "";
        alert(`O campo ${nomeCampo} não pode ser vazio!`);
        entradaInput.focus();
        return;
    }
    if (cpfInput.value.length<14){
        alert("CPF incompleto ou vazio");
        return;
    }
    
    if(escolaridadeSelect.value === "invalida"){
        alert("Selecione sua escolaridade");
        return;
    }
    const algumSelecionado = Array.from(radiosCargo).some(cargo => cargo.checked);
    if (!algumSelecionado) {
        alert("Selecione um cargo.");
        return;
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
    const algumTurno = Array.from(turnos).some(turno => turno.checked);
    
    if (!algumTurno) {
        alert("Selecione pelo menos um turno.");
        return;
    }

    alert("Cadastro realizado!")
    formulario.submit();
});

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

cpfInput.addEventListener("input", () => {
  let valor = cpfInput.value;
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/(\d{1,3})(\d{1,3})(\d{1,3})(\d{1,2})$/, "$1.$2.$3-$4");
  cpfInput.value = valor;
});

cnpjInput.addEventListener("input", () => {
  let valor = cnpjInput.value;
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/(\d{1,2})(\d{1,3})(\d{1,3})(\d{1,4})(\d{1,2})$/, "$1.$2.$3.$4-$5");
  cnpjInput.value = valor;
});

cepInput.addEventListener("input", () => {
  let valor = cepInput.value;
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/(\d{1,5})(\d{1,3})$/, "$1-$2");
  cepInput.value = valor;
});

telefone.addEventListener("input", () => {
  let valor = telefone.value;
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/(\d{2})(\d{1})(\d{1,4})(\d{1,4})$/, "($1) $2 $3-$4");
  telefone.value = valor;
});

dataNascimento.addEventListener("change", () => {
idadeUsuario = calcularIdade(dataNascimento.value);

  if (idadeUsuario < 18) {
    alert("Você precisa ter pelo menos 18 anos.");
    e.target.value = "";
  }
});

dataNascimentoJA.addEventListener("change", () => {
idadeUsuario = calcularIdade(dataNascimentoJA.value);
    if (idadeUsuario < 14) {
        alert("Você precisa ter pelo menos 14 anos.");
        e.target.value = "";
    }
    else if (idadeUsuario > 24) {
        alert("Você não se enquadra para as vagas de Jovem Aprendiz!");
        e.target.value = "";
    } 
    else if (idadeUsuario <18) {
        const turnoNoite = document.querySelector("#noite");
        turnoNoite.addEventListener("click", (e) => {
        e.target.checked = false;
        });
    }
});



