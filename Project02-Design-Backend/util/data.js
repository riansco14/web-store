exports.dateAniversarioParser = function (timestamp) {
    let dataAtual = new Date();
    let dataNascimento = new Date(timestamp);

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

    const mesVariation = dataAtual.getMonth() - dataNascimento.getMonth();
    const diaVariation = dataAtual.getDate() - dataNascimento.getDate();

    if (mesVariation <= 0 && diaVariation < 0) {
        idade -= 1;
    }

    return idade;
}

exports.dateFormarter = function (timestamp) {
    const formattedDate = new Date(timestamp);
    return `${formattedDate.getDate()}/${formattedDate.getMonth()}/${formattedDate.getFullYear()}`;
}

exports.dateFormarterHTML = function (timestamp) {
    const formattedDate = new Date(timestamp);
    console.log(`${formattedDate.getUTCFullYear()}-${String("0"+formattedDate.getUTCMonth()).slice(-2)}-${String("0"+formattedDate.getUTCDate()).slice(-2)}`);
    return `${formattedDate.getUTCFullYear()}-${String("0"+(formattedDate.getUTCMonth()+1)).slice(-2)}-${String("0"+formattedDate.getUTCDate()).slice(-2)}`;
}