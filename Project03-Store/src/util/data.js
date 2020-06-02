module.exports = {
    date(timestamp) {
        const formattedDate = new Date(timestamp);
        ano = formattedDate.getUTCFullYear();
        mes = String("0" + (formattedDate.getUTCMonth() + 1)).slice(-2);
        dia = String("0" + formattedDate.getUTCDate()).slice(-2);

        return {
            dia,
            mes,
            ano,
            iso: `${ano}-${mes}-${dia}`,
        };
    },
    formatPreco(value){
        value = value.replace(/\D/g , "") //remove digitos que n sejam numeros
        value = new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
        
        return value
    }
}